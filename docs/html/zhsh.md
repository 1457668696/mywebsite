# 纵横四海经验展示
[[toc]]
::: tip 代码如下，通用的的返回结果json内容
:::
## 接口详情
- 接口地址: https://106.55.7.113/api/game/zhsh
``` json
{
"code": 200,
"msg": "最新数据",
"data": {
"level": 211,
"experienceNow": 16823.444,
"experienceNeed": 187899.712
}
}
```

## 后端逻辑
### 控制器 Controller
- 注入service接口
- 调用具体的实现方法,返回实体类对象
- 通过R对象封装好code、data、msg返回前端
``` java
@RestController
@RequestMapping("/game")
public class GameController {

    @Resource
    private ZhshService zhshService;

    @GetMapping("/zhsh")
    public R<Zhsh> queryGame3(){
        Zhsh aNew = zhshService.getNew();
        return R.success(aNew,"最新数据");
    }
```
### 实现类 Serviceimpl
- 先查缓存，有直接返回
- 没有缓存，查数据库
- 构造最新一条数据的条件
``` java
public Zhsh getNew() {

    //先查缓存，不存在再查数据库
    Object game2 = redisUtils.get("game_");
    if (game2 != null){
        return  BeanUtil.toBean(game2, Zhsh.class);
    }
        
    LambdaQueryWrapper<Zhsh> queryWrapper=new LambdaQueryWrapper<>();
    //根据id倒叙查询
    queryWrapper.orderByDesc(Zhsh::getLevel).last("limit 1");
    return  getOne(queryWrapper);
}
```

## 前端逻辑
### 定义接口 
- 二次封装基本对象
- 定义具体接口
``` js
const http = axios.create({
    // 通用请求前缀,是为了前后端分离区分的前缀
    baseURL:"/api",
    timeout:5000,
    headers:{
    }
})

//定义接口，并暴露
export const getEX=(data)=>{
    // 返回promise对象，就可以.then截获内容
    return http.get('/game/zhsh',data)
}
```
### 调用接口 
- 定义空容器
- 根据特定条件解析赋值给空容器
- 选择适合的方式在展示数据
``` javascript
<template>
  <div>
    <h1>当前等级:{{level}}</h1>
    <p>当前经验：{{experienceNow}}万</p>
    <p>升级需要:{{experienceNeed}}万</p>
  </div>
</template>

data(){
    return{
      level:'',
      experienceNow:'',
      experienceNeed:''
    }
  },
  
 import { getEX} from "@/api";
  
 mounted() {
 
    getEX().then(({data}) => {
    //解构赋值
      const {experienceNow,experienceNeed,level} = data.data
      this.experienceNow=experienceNow;
      this.experienceNeed=experienceNeed;
      this.level=level;
  })
```


## 前后端分离
::: tip 不再把dist打包文件放在stiac目录下,而是nginx部署前端,单独部署后端
前端部署80端口，后端部署8080端口，nginx配置文件，把/api的接口映射到:8080/api。
:::
::: tip http://xyjxww.cn/api/game/zhsh  &nbsp&nbsp&nbsp&nbsp&nbsp >>> &nbsp&nbsp&nbsp&nbsp http://xyjxww.cn:8080/game/zhsh
:::

### nginx配置文件
``` nginx
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/json;
    sendfile        on;
    keepalive_timeout  65;

   #前端配置，端口，ssl，证书
     server {
        listen       80;
        listen       443 ssl;
        server_name  127.0.0.1 xyjxww.cn;
        ssl_certificate      /usr/local/ssl/xyjxww.crt;
        ssl_certificate_key  /usr/local/ssl/xyjxww.key;
        
        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;
		

        if ($server_port = 80 ) {
                return 301 https://$host$request_uri;
        }
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;


      #加载压缩打包文件
        gzip on;
        gzip_min_length 100;
        gzip_types text/plain text/css application/xml application/javascript;
        gzip_vary on;



        # 指定前端项目所在的位置
        location / {
            root   html;
            index  index.html index.htm;
            
         #vue路由histroy路由跳转问题
            try_files $uri $uri/ /index.html;
        }

        #错误重定向
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        #图标重定向
        location /favicon.ico {  
            root html;  
            }  

       #前缀重定向
        location /api {  
            default_type  application/json;
            #internal;  
            keepalive_timeout   30s;  
            keepalive_requests  1000;  
            #支持keep-alive  
            proxy_http_version 1.1;  
      # 指定接口前缀
            rewrite /api(/.*) $1 break;  
            proxy_pass_request_headers on;
            proxy_next_upstream error timeout;  
      # 反向代理地址
            proxy_pass http://127.0.0.1:8080;
        }
    }

}

```


