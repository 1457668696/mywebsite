[[toc]]
## 用户
### 登录
::: tip 登录接口,表单参数
{
"username": "admin",
"password": "123456"
}
:::
- 传入两个对象，1.前端传入的对象employee，2.request对象设置session
- 自己构造从数据库查出来的的真实对象one
- 现在有两个对象，一个是通过数据库查询出来的one对象，一个是前端封装的对象employee
- 把前端的和后端的对象字段对比，确认是否正确的用户
- 控制流分支到具体的处理办法
- null用户不存在
- 密码比对错误,密码输入错误
- 状态码，用户锁定
- 成功，设置session,key为"用户"，value为某个字段，并返回前端渲染数据


``` java
@PostMapping("/login")                               //传入为json时候用requestBody封装数据
public R<Employee> login(HttpServletRequest request, @RequestBody Employee employee){

    //密码加密
    String password = employee.getPassword();
    password = DigestUtils.md5DigestAsHex(password.getBytes());

    //查询数据库
    LambdaQueryWrapper<Employee> em = new LambdaQueryWrapper<>();
    em.eq(Employee::getUsername,employee.getUsername());
    Employee one = employService.getOne(em);

    //空值检测
    if(one==null){
        return R.error("登录失败");
    }

    //密码比对
    if(!one.getPassword().equals(password)){
        return  R.error("登录失败");
    }

    //查询状态
    if (one.getStatus()==0){
        return R.error("账号已锁定");
    }

   //登录成功，将id放入session中
    request.getSession().setAttribute("employee",one.getId());
    return R.success(one);
}
```
### 登出
- 传入request对象,移除employee的属性
``` java
 @PostMapping("/logout")
    public R<String> logout(HttpServletRequest request){
        request.getSession().removeAttribute("employee");
        return R.success("退出成功");
}
```

### 登录拦截器
- 定义需要拦截的路径
- 对比当前的url和需要拦截的url,封装方法
- 需要拦截时，从session取出用户判断是否为空
- 不为空,放行。存入到本地线程localThread中，方便其他处使用
- 为空，返回失败信息或者设置401状态码等
``` java
@Slf4j
@WebFilter(filterName = "loginCheckFilter", urlPatterns = "/*")
public class LoginCheckFilter implements Filter {

    //路径匹配器,类似正则url提取路径/
    public static final AntPathMatcher PATH_MATCHER = new AntPathMatcher();


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        //本身传入的不适用，强转过来
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;


        //定义不需要请求的路径
        String[] urls = new String[]{
                "/employee/login",
                "/employee/logout",
                "/backend/**",
                "/front/**",
                "/user/login",
                "/user/sendMsg"
        };

        //本次请求url
        String requestURI = request.getRequestURI();

        //判断本次是否需要处理
        boolean check = check(urls, requestURI);

        //不需要处理
        if (check) {
            //这是一个传递方法，意为继续向下过滤
            filterChain.doFilter(request, response);
            return;
        }

        //判断登录状态，已登录就放行
        if (request.getSession().getAttribute("employee") != null) {
            log.info("用户已经登录，用户id为：{}",request.getSession().getAttribute("employee"));

            //获取线程用户
            Long empId= (Long) request.getSession().getAttribute("employee");
            BaseContext.setCurrentId(empId);
            filterChain.doFilter(request, response);
            return;
        }

        //如果未登录，通过输出流向客服端响应数据
        log.info("用户未登录");
        
        //这是前端的特殊处理
        response.getWriter().write(JSON.toJSONString(R.error("NOTLOGIN")));
    }


    //封装一个方法，判断是否需要处理
    public boolean check(String[] urls, String requestURI) {
        for (String url : urls) {
            boolean match = PATH_MATCHER.match(url, requestURI);
            if (match) {
                return true;
            }

        }

        return false;
    }
}

```







## 用户管理
### 新增用户
::: tip 新增员工接口 post表单提交
{
"name": 红米",
"phone": "13885963369",
"sex": "1",
"idNumber": "522321195910266532",
"username": "1553235814"
}
:::
- 接受的表单对象并一定完整,需要后端给其他字段默认值
``` java
@PostMapping
public R<String> save(HttpServletRequest request,@RequestBody Employee employee){

   //设置初始密码
    employee.setPassword(DigestUtils.md5DigestAsHex("123456".getBytes()));
    
/*
     //公共字段全部交给处理器
     employee.setCreateTime(LocalDateTime.now());
     employee.setUpdateTime(LocalDateTime.now());

     //获取创建人
     long empId=(Long)request.getSession().getAttribute("employee"); 
     employee.setCreateUser(empId);
     employee.setUpdateUser(empId);
*/
      employService.save(employee);
      return R.success("新增员工成功");

}
```
### 查询用户

::: tip 编辑员工接口 get表单填充
http://localhost:8081/employee/{id}
:::
- 进入编辑页面时根据id查询数据填充表单
- 传入ID,返回需要的值
``` java
@GetMapping("/{id}")      //路径变量。res风格
public R<Employee> getById(@PathVariable Long id){
log.info("根据ID查询员工信息");
Employee employee = employService.getById(id);
if (employee!=null){
return R.success(employee);

        }
    return R.error("没有查询到相关信息");
    }
```

### 分页查询

::: tip 构造分页数据
http://localhost:8081/employee/page?page=1&pageSize=10
:::
- 接受前端的分页数据查询
- 
``` java
@GetMapping("/page")
public R<Page> page(int page,int pageSize,String name){
log.info("page= {},pageSize={},name={}",page,pageSize,name);
//构造分页构造器
Page<Employee> pageInfo= new Page<>(page, pageSize);

//构造条件过滤器
LambdaQueryWrapper<Employee> queryWrapper=new LambdaQueryWrapper<>();


    //过滤条件，like相似度
queryWrapper.like(StringUtils.isNotEmpty(name),Employee::getName,name);

    //添加排序条件，更新时间
queryWrapper.orderByDesc(Employee::getUpdateTime);

    //执行查询
    employService.page(pageInfo,queryWrapper);


    return R.success(pageInfo);
}
```

### 修改用户
::: tip 修改员工接口 put修改
http://localhost:8081/employee
:::
- update更新字段的值
- 直接提交修改
``` java
@PutMapping
public  R<String> update (HttpServletRequest request,@RequestBody Employee employee){
    log.info(employee.toString());

  //long id= (long)request.getSession().getAttribute("employee");
  //employee.setUpdateTime(LocalDateTime.now());
  //employee.setUpdateUser(id);
  employService.updateById(employee);

    return R.success("修改成功");
    }
```





