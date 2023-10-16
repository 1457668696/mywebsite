<template><div><div class="custom-container tip"><p class="custom-container-title">起因</p>
<p>某个Java挂机服务因为一些原因,一定时间后,会导致访问400，暂时没有办法解决。重启反而可以继续访问.故而使用shell脚本重启Java进程</p>
</div>
<h1 id="主要步骤" tabindex="-1"><a class="header-anchor" href="#主要步骤" aria-hidden="true">#</a> 主要步骤</h1>
<nav class="table-of-contents"><ul><li><router-link to="#shell脚本">shell脚本</router-link></li><li><router-link to="#定时任务">定时任务</router-link></li></ul></nav>
<h2 id="shell脚本" tabindex="-1"><a class="header-anchor" href="#shell脚本" aria-hidden="true">#</a> shell脚本</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">JAVA_COMMAND</span><span class="token operator">=</span><span class="token string">"java"</span>
<span class="token assign-left variable">JAVA_ARGS</span><span class="token operator">=</span><span class="token string">"-jar /home/mwxz/mwxz.jar"</span>
<span class="token assign-left variable">JAVA_NAME</span><span class="token operator">=</span><span class="token string">"mwxz.jar"</span>

<span class="token function-name function">restart_java_process</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token keyword">if</span> pgrep <span class="token parameter variable">-f</span> <span class="token string">"<span class="token variable">$JAVA_NAME</span>"</span> <span class="token operator">></span>/dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"停止java进程"</span>
    <span class="token function">pkill</span> <span class="token parameter variable">-f</span> <span class="token string">"<span class="token variable">$JAVA_NAME</span>"</span>
    <span class="token function">sleep</span> <span class="token number">5</span>
  <span class="token keyword">fi</span>
  <span class="token builtin class-name">echo</span> <span class="token string">"后台启动java进程"</span>
  <span class="token function">nohup</span> <span class="token string">"<span class="token variable">$JAVA_COMMAND</span>"</span> <span class="token variable">$JAVA_ARGS</span> <span class="token operator">></span>/home/mwxz/mwxz.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
<span class="token punctuation">}</span>



restart_java_process
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="顺序-声明命令变量-定义函数-执行函数。" tabindex="-1"><a class="header-anchor" href="#顺序-声明命令变量-定义函数-执行函数。" aria-hidden="true">#</a> 顺序：声明命令变量，定义函数，执行函数。</h6>
<ul>
<li>if then <strong>fi</strong> 是条件判断语句。</li>
<li>p开头的命令查 <strong>进程名</strong> -f搜索<strong>整个命令行</strong></li>
<li>&gt;/dev/null 重定向到null,相当于<strong>不输出</strong></li>
</ul>
<h2 id="定时任务" tabindex="-1"><a class="header-anchor" href="#定时任务" aria-hidden="true">#</a> 定时任务</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#打开定时任务表</span>
<span class="token function">crontab</span> <span class="token parameter variable">-e</span>

<span class="token comment">#插入一条任务</span>
 */8 * * *  /home/mwxz/restart_mwxz.sh <span class="token operator">></span> /home/mwxz/loginfo.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>注意，这里的表达式只有<strong>5个</strong>，没有<strong>秒</strong></li>
</ul>
</div></template>


