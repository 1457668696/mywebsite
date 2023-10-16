[[toc]]
## 安全
### md5加密
``` java
String password = employee.getPassword();
password = DigestUtils.md5DigestAsHex(password.getBytes());
```
## hutool
### 随机数、字符串、token
``` java
RandomUtil.randomNumbers(6);
RandomUtil.randomString(10);

//token生成
String token= UUID.randomUUID().toString(true);
```
### 不为空
``` java
StrUtil.isBlank(str);
```
### 对象转换
- json
``` java
//json转对象
JSONUtil.toBean(shopJson, Shop.class);     

//对象转json
JSONUtil.toJsonStr(user);
```
- 复制属性
``` java
//对象互相转换,redis转pojo，pojo转dto
BeanUtil.toBean(game2, Zhsh.class);
BeanUtil.toBean(mwxz.class, MwxzDto.class);

//map转对象，false忽略错误
BeanUtil.fillBeanWithMap(userMap, new UserDTO(), false);

//对象转map，且过滤
BeanUtil.beanToMap(userDTO, new HashMap<>(),
                         CopyOptions.create()
                        .setIgnoreNullValue(true)
                        .setFieldValueEditor((fieldName, fieldValue) ->
                         fieldValue.toString()));                         
```


