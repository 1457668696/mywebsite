[[toc]]
## 用户业务

### 发验证码
::: tip 分析
传入两个参数，一注解@RequestParam接匹配收前端的参数，二Session准备储存。工具类生成验证码，存到session或者redis中,第三方发送给用户
:::
- 正则类校验手机号
- 工具类生成验证码，保存到session或redis
- 第三方发送验证码给用户
- 返回结果

```java
//Controller
@PostMapping("code")
public Result sendCode(@RequestParam("phone") String phone, HttpSession session) {
    return userService.sendCode(phone,session);
}

//Service
@Resource
private StringRedisTemplate stringRedisTemplate;
@Override
public Result sendCode(String phone, HttpSession session) {

    //1.检验手机号
    if(RegexUtils.isPhoneInvalid(phone)){
        //2.不符合，返回错误信息
        return Result.fail("手机号错误");
    }

    //3.符合生产验证码,使用工具包生成验证码。这里是第三方工具包生产随机数
     String code= RandomUtil.randomNumbers(6);

    //4.保存验证码到session
    //session.setAttribute("code",code);

    //4.保存到redis,记得设置有效期，和前缀区分
    stringRedisTemplate.opsForValue().set(LOGIN_CODE_KEY+phone,code,LOGIN_CODE_TTL, TimeUnit.MINUTES);

    //5.发送验证码
    log.debug("发送成功：{}",code);

    //6.返回结果
    return Result.ok();
}
```


### 登录业务
::: tip 分析
传入两个参数，一注解@RequestBody接收匹配前端的登录参数自动转成javaDTO对象，二Session准备验证。其次为了方便调用把用户对象存到一个Thread-local本地线程类，
:::
- 正则类校验手机号
- 查询session/redis校验颜值码
- 查询数据库对比手机号码，用户是否存在
- 用户存在，存入DTO对象到session登录，这里也可以转成map存入登录
- 用户不存在，新建用户，存入session登录
- 返回给前端token或者个人信息
```java
//Controller
@PostMapping("/login")
public Result login(@RequestBody LoginFormDTO loginForm, HttpSession session){ 
    return userService.login(loginForm,session);
}

//Service
public Result login(LoginFormDTO loginForm, HttpSession session) {

    String phone = loginForm.getPhone();
    //1.检验手机号
    if(RegexUtils.isPhoneInvalid(phone)){
        //2.不符合，返回错误信息
        return Result.fail("手机号错误");
    }
          //3.检验验证码,使用反向校验避免嵌套if
         //Object cachecode = session.getAttribute("code");
    String code = loginForm.getCode();
    String cachecode = stringRedisTemplate.opsForValue().get(LOGIN_CODE_KEY + phone);

    //4.判断验证码是否正确
    if (cachecode==null||!cachecode.equals(code)){
        return Result.fail("验证码错误");
    }

     //一致，根据手机账号查询用户select * from tb_user where phone=?
    User user = query().eq("phone", phone).one();

   //6.判断用户是否存在
    if (user==null){
            user=createUserWithPhone(phone);
    }

   //7.1随机生成token,true=省略空格，作为登录令牌
   String token= UUID.randomUUID().toString(true);

    //7.2将user对象转化为hash存储
    UserDTO userDTO= BeanUtil.copyProperties(user, UserDTO.class);
    Map<String, Object> userMap = BeanUtil.beanToMap(userDTO, new HashMap<>(),
            CopyOptions.create()
                    .setIgnoreNullValue(true)
                    .setFieldValueEditor((fieldName, fieldValue) -> fieldValue.toString()));

    String tokenkey=LOGIN_USER_KEY+token;

     //7.3储存到redis，先转成map。用工具类
    stringRedisTemplate.opsForHash().putAll(tokenkey,userMap);

    //7.4设置过期时间
    stringRedisTemplate.expire(tokenkey,LOGIN_USER_TTL,TimeUnit.MINUTES);
//        // 7.保存用户信息到session中         //自动转成DTo对象，复制对象
//        session.setAttribute("user", BeanUtil.copyProperties(user, UserDTO.class));

    //7.4返回给客户端
    return Result.ok(token);
}

private User createUserWithPhone(String phone) {

    User user=new User();
    user.setPhone(phone);
    user.setNickName(USER_NICK_NAME_PREFIX+RandomUtil.randomString(10));
    save(user);
    return user;
}
}
}
```
### 登录校验
::: tip 分析
如何判断用户是否登录，实际上有一个逻辑，也就是请求头中会有一个字段cookies，是根据后端密码/令牌生成的，每一次请求，后端都会根据cookies中的字段验证是否存在该用户判断是否登录
:::
- 首先准备一个工具类，用于把用户信息储存到本地线程中
- 拦截器，从本地线程获取用户，null拦截返回404，有则放行
- 用户存在，存入session登录，这里也可以转成map存入登录

```java
//Threadlocal
public class UserHolder {
    private static final ThreadLocal<UserDTO> tl = new ThreadLocal<>();

    public static void saveUser(UserDTO user){
        tl.set(user);
    }

    public static UserDTO getUser(){
        return tl.get();
    }

    public static void removeUser(){
        tl.remove();
    }
}

//拦截器
public class LoginInterceptor implements HandlerInterceptor {

@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

    //无用户拦截
    if (UserHolder.getUser() == null) {
        response.setStatus(401);
        return false;
    }
    
    //有用户，放行
    return true;
}

@Override
public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

     UserHolder.removeUser();

}

//注册拦截器，配置类
public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new LoginInterceptor())
            .excludePathPatterns(
            "/user/code",
            "/user/login",
            "/blog/hot",
            "/shop/**",
            "/shop-type/**",
            "/voucher/**",
            "/upload/**"
          ).order(1);
```


### 用户信息
::: tip 分析
从本地线程中获取用户信息，若不是DTO转换一下，记得登录的时候把User存到本地线程中
:::
``` java
@GetMapping("/me")
public Result me(){
    UserDTO user = UserHolder.getUser();
    return Result.ok(user);
}
```

### 状态刷新
::: tip 分析
当用户刷新时，token的有效期应该重置，使用拦截器实现
:::
- 非spring管理的类无法通过注解注入redistemplate,可以使用构造器注入，然后在配置类中传进去
``` java
public class RefreshTokenInterceptor implements HandlerInterceptor {

    //非spring创建的对象（手动创建的）需要自己构造，然后在配置类中注入该对象
    private StringRedisTemplate stringRedisTemplate;

    public RefreshTokenInterceptor(StringRedisTemplate stringRedisTemplate){
        this.stringRedisTemplate=stringRedisTemplate;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        //1.获取请求头中的token
        String token = request.getHeader("authorization");

        //判断是否为空，为空则放行
        if (StrUtil.isBlank(token)) {
            //未授权状态吗
            return true;
        }
        String tokenkey=LOGIN_USER_KEY+token;

        //2.获取用户
        Map<Object, Object> userMap = stringRedisTemplate.opsForHash().entries(tokenkey);

        //判断用户是否存在，不放心
        if (userMap.isEmpty()) {
            return true;
        }

       //3.将查询的hash对象转成UserDao对象,不忽略错误
        UserDTO userDTO = BeanUtil.fillBeanWithMap(userMap, new UserDTO(), false);

        //4，存到ThreadLocal
        UserHolder.saveUser(userDTO);

        //5.刷新token有效期
        stringRedisTemplate.expire(tokenkey, RedisConstants.CACHE_SHOP_TTL, TimeUnit.MINUTES);
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
         UserHolder.removeUser();
    }
}
//配置拦截器,优先级最高
registry.addInterceptor(new RefreshTokenInterceptor(stringRedisTemplate))
                              .addPathPatterns("/**")
                              .order(0);
```
::: tip 两个拦截器，第一个负责刷新token,第二个负责拦截未登录的用户
:::


### 用户签到
::: tip BigMap(0,1)映射关系
使用redis前缀+用户id+日期拼接为key,天数为位置（0-30和自然日1-31需要-1），true为成功
:::
```java
public Result sign() {
    //获取当前用户
    Long userId = UserHolder.getUser().getId();
    //获取日期
    LocalDateTime now = LocalDateTime.now();
    //拼接key
    String keySuffix = now.format(DateTimeFormatter.ofPattern(":yyyyMM"));
    String key = USER_SIGN_KEY + userId + keySuffix;
    //获取天数
    int dayOfMonth = now.getDayOfMonth();
    //写入Redis  BITSET key offset 1
    stringRedisTemplate.opsForValue().setBit(key, dayOfMonth - 1, true);
    return Result.ok();
}
```


### 签到统计
```java
public Result signCount() {
        //获取当前用户
        Long userId = UserHolder.getUser().getId();
        //获取日期
        LocalDateTime now = LocalDateTime.now();
        //拼接key
        String keySuffix = now.format(DateTimeFormatter.ofPattern(":yyyyMM"));
        String key = USER_SIGN_KEY + userId + keySuffix;
        //获取天数
        int dayOfMonth = now.getDayOfMonth();
        //5.获取截止至今日的签到记录  BITFIELD key GET uDay 0
        List<Long> result = stringRedisTemplate.opsForValue().bitField(key, BitFiel
        .get(BitFieldSubCommands.BitFieldType.unsigned(dayOfMonth)).valueAt
        if (result == null || result.isEmpty()) {
        return Result.ok(0);
        }
        //循环遍历
        int count = 0;
        Long num = result.get(0);
        while (true) {
        if ((num & 1) == 0) {
        break;
        } else
        count++;
        //数字右移，抛弃最后一位
        num >>>= 1;
        }
        return Result.ok(count);
        }
        }
```




## 商铺查询
### 查询缓存
::: tip 缓存数据很简单，但是如果保证一致性是个问题，同时也要注意缓存的三大问题，穿透（空对象，布隆过滤），击穿（复杂业务缓存重建那段时间出问题，互斥锁），雪崩（ttl不同）。设置对应的解决方案
:::
- 先查缓存，有则转成Java对象直接返回
- 如果缓存为空，返回店铺不存在
- 查询数据库，有存入缓存返回，无返回不存在
- 数据库也为空时，缓存空对象，避免缓存穿透
- 记得设置缓存超时时间，避免长时间不更新
``` java
@Override
public Result queryById(Long id) {

    //1.从redis查询缓存
    String shopJson = stringRedisTemplate.opsForValue().get("cache:shop" + id);

    //2.判断是否存在，存在返回
    if (StrUtil.isNotBlank(shopJson)) {
        //存在，转成Java对象返回
        Shop shop = JSONUtil.toBean(shopJson, Shop.class);
        return  Result.ok(shop);
    }

    //判断命中的是否是空值
    if (shopJson!=null){
        return Result.fail("店铺不存在");
    }

    //3.不存在，查询数据库，存在，返回
    Shop shop = getById(id);
    if (shop==null){
  
        //将空值写入redis,避免缓存穿透
        stringRedisTemplate.opsForValue().set("cache:shop"+id,"",2L, TimeUnit.MINUTES);
        return Result.fail("店铺不存在");
    }
    
   //4.存在返回存入redis
    stringRedisTemplate.opsForValue().set("cache:shop"+id,JSONUtil.toJsonStr(shop),30L, TimeUnit.MINUTES);
    return Result.ok(shop);
}
```
### 缓存击穿
::: tip 缓存对象不存在的时候，会一直命中数据库。比如null。解决：缓存空对象，或者使用布隆通过器
:::
``` java
shop = getById(id);
if (shop==null){

    //将空值写入redis,避免缓存穿透
    stringRedisTemplate.opsForValue().set("cache:shop"+id,"",2L, TimeUnit.MINUTES);
    return null;    
}
```






### 缓存穿透
::: tip 如果遇到业务复杂的时候，重建缓存是需要一定时间的，
:::
``` java
//实现缓存重建（获取锁，成功重建，释放锁。失败休眠重试）
    String lockkey="lock:shop"+id;
    Shop shop;
    try {
        boolean isLock = tryLock(lockkey);
    
        //失败就递归调用，直到返回
        if (!isLock){
            Thread.sleep(5000);
            return queryWithMutex(id);
        }
    
        //3.不存在，查询数据库，存在，返回
        shop = getById(id);
        if (shop==null){
    
            //将空值写入redis,避免缓存穿透
            stringRedisTemplate.opsForValue().set("cache:shop"+id,"",2L, TimeUnit.MINUTES);   
            return null;
        }
        //4.存在返回存入redis
        stringRedisTemplate.opsForValue().set("cache:shop"+id,JSONUtil.toJsonStr(shop),30L, TimeUnit.MINUTES);
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    } finally {
     //释放锁
    unlock(lockkey);
    }
   

```




### 缓存雪崩
::: tip 大量key同一时间失效，服务器无法应付请求。解决：使用不同的ttl，或者服务器集群等
:::




### 缓存更新
::: tip 管理端进行更新，可以用postman测试
:::
- 为了避免报异常，一定要对参数进行非空检验。
- 选择先更新数据库再删除缓存，下次查询再自动存缓存
``` java 
//缓存更新策略。采取编码，加过时策略。          先操作数据库再操作缓存。
@Override
@Transactional          //事务控制
public Result update(Shop shop) {

    Long id = shop.getId();

    if (id==null){
        return Result.fail("店铺id不能为空");
    }

    //1.更新数据库
    updateById(shop);

    //2.删除缓存
    stringRedisTemplate.delete("cache:shop"+ id);
    return Result.ok();
}
```

## 秒杀业务
::: tip 分析 
:::
- 1
- 2
``` java
```


### 唯一ID
``` java
public class RedisIdWorker {
    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    //设置起始时间，我这里设定的是2022.01.01 00:00:00
    public static final Long BEGIN_TIMESTAMP = 1640995200L;
    //序列号长度
    public static final Long COUNT_BIT = 32L;
    public long nextId(String keyPrefix){
        //1. 生成时间戳
        LocalDateTime now = LocalDateTime.now();
        long currentSecond = now.toEpochSecond(ZoneOffset.UTC);
        long timeStamp = currentSecond - BEGIN_TIMESTAMP;
        //2. 生成序列号
        String date = now.format(DateTimeFormatter.ofPattern("yyyy:MM:dd"));
        long count = stringRedisTemplate.opsForValue().increment("inc:"+keyPref
        //3. 拼接并返回，简单位运算
        return timeStamp << COUNT_BIT | count;
    }
```









#### UA统计
- UA指代的是独立Unique的访问量，用户一天一次，PA是Page网站的访问量。一天可以很多次
::: tip HyperLogLog概率算法
确定非常大集合的基数，而不储存所有值，有概况性误差，不重复。唯一性统计.海量数据占用内存极小
:::

```shell
pfadd hl1 el e2 e4 e5
"1"
pfcount hl1
"4"
```

```java
stringRedisTemplate.opsForHyperLogLog().add("user",value)
stringRedisTemplate.opsForHyperLogLog().size()
```

