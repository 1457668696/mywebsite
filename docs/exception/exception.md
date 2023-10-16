## 常见异常处理方式
[[toc]]
### 1.空指针异常       NullPointerException

::: tip 使用 if (object=!null)  规避。大多数情况是没有 注入依赖
:::


### 2.ssl问题

::: tip 安装证书或者 忽略证书 安全问题
:::


### 3.类转换异常       ClassCastException


::: tip 推荐使用 工具类 转换，内部有规避方法或者使用 instance of 先行判断再强转
:::

### 4.网络传输时，出现乱码

::: tip 使用 json序列化 对象
:::




### 5.非法参数 IllegalArgumentException,Numberformatexception


::: tip 严格控制好类型转换的 控制流 ，确保没有传入其他字段或用正则以及其他方式 处理以后再进行转换

:::


### 6.唯一约束异常    SQLException


::: tip 暂时没其他办法，先 捕获 提示

:::


### 7.数组越界异常      IndexOutOfBoundsException


::: tip 先判断 是否为空，并且限制在 length-1 。使用 并发集合

:::

### 8.更新数据库异常


::: tip 使用事务控制 注解

:::


### 9.文件输入输出异常   IOException



::: tip 判断 路径 是否正确

:::

### 10.OutOfMemoryException



::: tip 暂时没遇到， 调优 或者 手动回收 。弱引用

:::

### 11.重复注入，循环依赖



::: tip 遇到been冲突，循环依赖 注解@Lazy

:::

### 12.springclound的组件maven依赖异常



::: tip 注意clound和boot的版本一定要对应，不然找不到
:::