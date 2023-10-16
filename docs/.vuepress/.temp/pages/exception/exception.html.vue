<template><div><h2 id="常见异常处理方式" tabindex="-1"><a class="header-anchor" href="#常见异常处理方式" aria-hidden="true">#</a> 常见异常处理方式</h2>
<nav class="table-of-contents"><ul><li><router-link to="#常见异常处理方式">常见异常处理方式</router-link><ul><li><router-link to="#_1-空指针异常-nullpointerexception">1.空指针异常       NullPointerException</router-link></li><li><router-link to="#_2-ssl问题">2.ssl问题</router-link></li><li><router-link to="#_3-类转换异常-classcastexception">3.类转换异常       ClassCastException</router-link></li><li><router-link to="#_4-网络传输时-出现乱码">4.网络传输时，出现乱码</router-link></li><li><router-link to="#_5-非法参数-illegalargumentexception-numberformatexception">5.非法参数 IllegalArgumentException,Numberformatexception</router-link></li><li><router-link to="#_6-唯一约束异常-sqlexception">6.唯一约束异常    SQLException</router-link></li><li><router-link to="#_7-数组越界异常-indexoutofboundsexception">7.数组越界异常      IndexOutOfBoundsException</router-link></li><li><router-link to="#_8-更新数据库异常">8.更新数据库异常</router-link></li><li><router-link to="#_9-文件输入输出异常-ioexception">9.文件输入输出异常   IOException</router-link></li><li><router-link to="#_10-outofmemoryexception">10.OutOfMemoryException</router-link></li><li><router-link to="#_11-重复注入-循环依赖">11.重复注入，循环依赖</router-link></li><li><router-link to="#_12-springclound的组件maven依赖异常">12.springclound的组件maven依赖异常</router-link></li></ul></li></ul></nav>
<h3 id="_1-空指针异常-nullpointerexception" tabindex="-1"><a class="header-anchor" href="#_1-空指针异常-nullpointerexception" aria-hidden="true">#</a> 1.空指针异常       NullPointerException</h3>
<div class="custom-container tip"><p class="custom-container-title">使用 if (object=!null)  规避。大多数情况是没有 注入依赖</p>
</div>
<h3 id="_2-ssl问题" tabindex="-1"><a class="header-anchor" href="#_2-ssl问题" aria-hidden="true">#</a> 2.ssl问题</h3>
<div class="custom-container tip"><p class="custom-container-title">安装证书或者 忽略证书 安全问题</p>
</div>
<h3 id="_3-类转换异常-classcastexception" tabindex="-1"><a class="header-anchor" href="#_3-类转换异常-classcastexception" aria-hidden="true">#</a> 3.类转换异常       ClassCastException</h3>
<div class="custom-container tip"><p class="custom-container-title">推荐使用 工具类 转换，内部有规避方法或者使用 instance of 先行判断再强转</p>
</div>
<h3 id="_4-网络传输时-出现乱码" tabindex="-1"><a class="header-anchor" href="#_4-网络传输时-出现乱码" aria-hidden="true">#</a> 4.网络传输时，出现乱码</h3>
<div class="custom-container tip"><p class="custom-container-title">使用 json序列化 对象</p>
</div>
<h3 id="_5-非法参数-illegalargumentexception-numberformatexception" tabindex="-1"><a class="header-anchor" href="#_5-非法参数-illegalargumentexception-numberformatexception" aria-hidden="true">#</a> 5.非法参数 IllegalArgumentException,Numberformatexception</h3>
<div class="custom-container tip"><p class="custom-container-title">严格控制好类型转换的 控制流 ，确保没有传入其他字段或用正则以及其他方式 处理以后再进行转换</p>
</div>
<h3 id="_6-唯一约束异常-sqlexception" tabindex="-1"><a class="header-anchor" href="#_6-唯一约束异常-sqlexception" aria-hidden="true">#</a> 6.唯一约束异常    SQLException</h3>
<div class="custom-container tip"><p class="custom-container-title">暂时没其他办法，先 捕获 提示</p>
</div>
<h3 id="_7-数组越界异常-indexoutofboundsexception" tabindex="-1"><a class="header-anchor" href="#_7-数组越界异常-indexoutofboundsexception" aria-hidden="true">#</a> 7.数组越界异常      IndexOutOfBoundsException</h3>
<div class="custom-container tip"><p class="custom-container-title">先判断 是否为空，并且限制在 length-1 。使用 并发集合</p>
</div>
<h3 id="_8-更新数据库异常" tabindex="-1"><a class="header-anchor" href="#_8-更新数据库异常" aria-hidden="true">#</a> 8.更新数据库异常</h3>
<div class="custom-container tip"><p class="custom-container-title">使用事务控制 注解</p>
</div>
<h3 id="_9-文件输入输出异常-ioexception" tabindex="-1"><a class="header-anchor" href="#_9-文件输入输出异常-ioexception" aria-hidden="true">#</a> 9.文件输入输出异常   IOException</h3>
<div class="custom-container tip"><p class="custom-container-title">判断 路径 是否正确</p>
</div>
<h3 id="_10-outofmemoryexception" tabindex="-1"><a class="header-anchor" href="#_10-outofmemoryexception" aria-hidden="true">#</a> 10.OutOfMemoryException</h3>
<div class="custom-container tip"><p class="custom-container-title">暂时没遇到， 调优 或者 手动回收 。弱引用</p>
</div>
<h3 id="_11-重复注入-循环依赖" tabindex="-1"><a class="header-anchor" href="#_11-重复注入-循环依赖" aria-hidden="true">#</a> 11.重复注入，循环依赖</h3>
<div class="custom-container tip"><p class="custom-container-title">遇到been冲突，循环依赖 注解@Lazy</p>
</div>
<h3 id="_12-springclound的组件maven依赖异常" tabindex="-1"><a class="header-anchor" href="#_12-springclound的组件maven依赖异常" aria-hidden="true">#</a> 12.springclound的组件maven依赖异常</h3>
<div class="custom-container tip"><p class="custom-container-title">注意clound和boot的版本一定要对应，不然找不到</p>
</div>
</div></template>


