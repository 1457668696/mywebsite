## 美味小镇
[[toc]]
::: tip 分析
通过抓包发现，添是一个**无参的post请求**。
设置Cookies定时访问就行了。
:::

### 获取油量 
::: tip 访问首页正则油量，需要注意marcher.find()方法只会 查找一次，匹配两个可能有个为null。保险点嵌套匹配或者写两次。并且使用的是 捕获组 。构造对象set属性，然后返回就ok。
:::
@[code](../mwxzCode/save.java)




### 获取体力
::: tip 分析
访问，然后使用 **节点选择器**，选择文本
:::
@[code](../mwxzCode/energy.java)


### 返回前端
::: tip 分析
DTO对象返回前端
:::
@[code](../mwxzCode/dto.java)



### 自动加油
- 封包基本网址与***cookies***
- post提交，执行ajax请求0
- if判断响应包含“请求成功”，则返回成功（true），否返回false

@[code](../mwxzCode/add.java)

然后添加到定时任务
@[code](../mwxzCode/autoAdd.java)

#### 另外有python版本,采用的是死循环加进程休眠
@[code](../mwxzCode/add.py)

### 自动买菜
- 封包基本网址与***cookies***
- 正则提取菜数据,存入集合
- 用if确保null时不会出现数组越界
- post提交，执行ajax请求
- 加入定时任务
``` java
 public Boolean buy() {
        ArrayList<String> dish=new ArrayList<>();
        //忽略ssl
        Unirest.config().verifySsl(false);
        //封包
        Unirest.config().defaultBaseUrl("https://dream233.com/mxxz")
                .addDefaultCookie(new Cookie("cache=ebcebb2e23389a192bbf87b04c98ae3a"));

        Matcher matcher = Pattern
                .compile("\\(&quot;(\\d+)&quot;,\\d\\)")
                .matcher(Unirest.get("/market").asString()
                         .getBody());

        while (matcher.find()){
            dish.add(matcher.group(1));
        }

        if (dish.size()>0){
            if (dish.size()==1){
                Integer DishOne=Integer.parseInt(dish.get(0));
                HttpResponse<String> foodId = Unirest.post("/buyDiscountFood").field("foodId", DishOne).asString();
                System.out.println(foodId.getBody().substring(46,54));
            }else {
                Integer DishOne=Integer.parseInt(dish.get(0));
                HttpResponse<String> foodId = Unirest.post("/buyDiscountFood").field("foodId", DishOne).asString();

                Integer DishTwo=Integer.parseInt(dish.get(1));
                HttpResponse<String> foodIdTwo = Unirest.post("/buyDiscountFood").field("foodId", DishTwo).asString();
                System.out.println(foodId.getBody().substring(46,54));
                System.out.println(foodIdTwo.getBody().substring(46,54));
            }

        return true;
        }
        log.info("当前没菜");
        return false;
    }
```
#### 定时任务也可以提一下
::: tip 定时任务 0 1 6-23 * * ?
- -是区间
- /是间隔
- 单个数字是指定
- *是所有时间
:::

#### 2023.6.2 失效重新编码
::: tip 分析
原来的正则不够完美，使用新的正则。
:::

``` java
Matcher matcher = Pattern
                .compile("buyDiscountFood\\(&quot;(\\d+)&quot;\\)")
                .matcher(Unirest.get("/market").asString()
                         .getBody());
```

### 自动蟑螂
::: tip 分析
这个比较复杂。请看下边流程
:::
- 爬取列表页，通过imp图标确定有蟑螂的饭店
- 定时判断体力是否足够，
- 足够打蟑螂，不足够退出
- 正则获取蟑螂位置，***封装成对象转成map提交*** post
- 其他层和第一层的区别，进入饭店后。如果***list集合为空***。则获取其他楼的链接再次匹配蟑螂
@[code](../mwxzCode/kill.java)


### 自动吃饭
::: tip 吃饭请求的参数是1，2，3，用if判断时间区间，定时任务执行就可以，
:::

``` java
 public void eat() {
    LocalTime now = LocalTime.now();
    int hour = now.getHour();

    int index=1;

    //忽略ssl
    Unirest.config().verifySsl(false);
    //封包
    Unirest.config().defaultBaseUrl("https://dream233.com/mxxz")
            .addDefaultCookie(new Cookie("cache=ebcebb2e23389a192bbf87b04c98ae3a"));


    if (hour>7 && hour<10){
        HttpResponse<String> index1 = Unirest.post("/getActivityEnergy").field("index", index).asString();
        log.info("吃早饭成功");
    }else if (hour>12 && hour<15){
        index=2;
        HttpResponse<String> index1 = Unirest.post("/getActivityEnergy").field("index", index).asString();
        log.info("吃午饭成功");
    }else if (hour>18 && hour<21){
        index=3;
        HttpResponse<String> index1 = Unirest.post("/getActivityEnergy").field("index", index).asString();
        log.info("吃晚饭成功");
    }else {
        log.info("还没有到吃饭时间");
    }
}
```
- 实测发现早上的饭没发吃，怀疑是定时任务的原因。
- linux是每天8点启动的，就无法在7.01时吃饭，综合评估，改为从8点开始更好

### 每日任务
::: tip 很简单，直接请求，太麻烦就不给返回值确认了
:::


``` java
//每日许愿
public void wish() {

    //忽略ssl
    Unirest.config().verifySsl(false);
    //封包
    Unirest.config().defaultBaseUrl("https://dream233.com/mxxz")
            .addDefaultCookie(new Cookie("cache=ebcebb2e23389a192bbf87b04c98ae3a"));


    for (int i=0;i<4;i++) {
        HttpResponse<String> wish = Unirest.post("/makeWish").field("type", 0).asString();
        log.info("许愿成功");
    }

}

//每日签到
public void sign() {
    Unirest.config().verifySsl(false);
    //封包
    Unirest.config().defaultBaseUrl("https://dream233.com/mxxz")
            .addDefaultCookie(new Cookie("cache=ebcebb2e23389a192bbf87b04c98ae3a"));

    HttpResponse<String> sign = Unirest.post("/sign_in").asString();

    System.out.println(sign.getBody());

}
```






## bug记录
::: warning 现存bug

:::



### 无法匹配
- 莫名其妙会匹配不到，怀疑是系统服务器,加入循环不断请求                  ***已测试无用***

- 循环获取也不行，打印请求体看看，到底是正则还是请求体的问题。                 ***排查都有问题***

- 也有可能是cookies的问题，据说tomcat曾经优化过                           ***暂时不解决***

- macher.find貌似只会匹配一次，需要内部匹配，不然就是null。                  ***已解决***

- 多次测试发现应该是服务器的限制，尝试定时重启java进程试试                     ***已解决***





### io异常
``` java
java.io.IOException: Connection reset by peer
```
- 暂时没想到解决办法



### 主键冲突
- 应该是mysql自增长的主键冲突，下一个主键更大或相同冲突了，
- ***删除该条数据***  或者 ***重置主键序数***



### 非法参数
``` java
IllegalArgumentException: HTTP method names must be tokens
```
- 怀疑是 ***忽略http*** 影响的。但是安装证书太麻烦了。





## 后续任务

- 将所有接口暴露到我的网站上，并展示。

- 定时吃饭， **抢菜** 和做日常任务。（已完成抢菜）

