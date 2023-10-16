import{_ as l,r as i,o,c as r,a as s,b as e,w as t,d as n,e as p}from"./app-58ca2cdc.js";const c={},d=s("div",{class:"custom-container tip"},[s("p",{class:"custom-container-title"},"起因"),s("p",null,"某个Java挂机服务因为一些原因,一定时间后,会导致访问400，暂时没有办法解决。重启反而可以继续访问.故而使用shell脚本重启Java进程")],-1),u=s("h1",{id:"主要步骤",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#主要步骤","aria-hidden":"true"},"#"),n(" 主要步骤")],-1),v={class:"table-of-contents"},m=p(`<h2 id="shell脚本" tabindex="-1"><a class="header-anchor" href="#shell脚本" aria-hidden="true">#</a> shell脚本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">JAVA_COMMAND</span><span class="token operator">=</span><span class="token string">&quot;java&quot;</span>
<span class="token assign-left variable">JAVA_ARGS</span><span class="token operator">=</span><span class="token string">&quot;-jar /home/mwxz/mwxz.jar&quot;</span>
<span class="token assign-left variable">JAVA_NAME</span><span class="token operator">=</span><span class="token string">&quot;mwxz.jar&quot;</span>

<span class="token function-name function">restart_java_process</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token keyword">if</span> pgrep <span class="token parameter variable">-f</span> <span class="token string">&quot;<span class="token variable">$JAVA_NAME</span>&quot;</span> <span class="token operator">&gt;</span>/dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;停止java进程&quot;</span>
    <span class="token function">pkill</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;<span class="token variable">$JAVA_NAME</span>&quot;</span>
    <span class="token function">sleep</span> <span class="token number">5</span>
  <span class="token keyword">fi</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;后台启动java进程&quot;</span>
  <span class="token function">nohup</span> <span class="token string">&quot;<span class="token variable">$JAVA_COMMAND</span>&quot;</span> <span class="token variable">$JAVA_ARGS</span> <span class="token operator">&gt;</span>/home/mwxz/mwxz.log <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
<span class="token punctuation">}</span>



restart_java_process
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="顺序-声明命令变量-定义函数-执行函数。" tabindex="-1"><a class="header-anchor" href="#顺序-声明命令变量-定义函数-执行函数。" aria-hidden="true">#</a> 顺序：声明命令变量，定义函数，执行函数。</h6><ul><li>if then <strong>fi</strong> 是条件判断语句。</li><li>p开头的命令查 <strong>进程名</strong> -f搜索<strong>整个命令行</strong></li><li>&gt;/dev/null 重定向到null,相当于<strong>不输出</strong></li></ul><h2 id="定时任务" tabindex="-1"><a class="header-anchor" href="#定时任务" aria-hidden="true">#</a> 定时任务</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#打开定时任务表</span>
<span class="token function">crontab</span> <span class="token parameter variable">-e</span>

<span class="token comment">#插入一条任务</span>
 */8 * * *  /home/mwxz/restart_mwxz.sh <span class="token operator">&gt;</span> /home/mwxz/loginfo.log <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>注意，这里的表达式只有<strong>5个</strong>，没有<strong>秒</strong></li></ul>`,7);function h(k,b){const a=i("router-link");return o(),r("div",null,[d,u,s("nav",v,[s("ul",null,[s("li",null,[e(a,{to:"#shell脚本"},{default:t(()=>[n("shell脚本")]),_:1})]),s("li",null,[e(a,{to:"#定时任务"},{default:t(()=>[n("定时任务")]),_:1})])])]),m])}const _=l(c,[["render",h],["__file","shell.html.vue"]]);export{_ as default};
