<template><div><nav class="table-of-contents"><ul><li><router-link to="#微信定时问候">微信定时问候</router-link><ul><li><router-link to="#code">code</router-link></li><li><router-link to="#优化bug">优化bug</router-link></li><li><router-link to="#bug">BUG</router-link></li></ul></li></ul></nav>
<h2 id="微信定时问候" tabindex="-1"><a class="header-anchor" href="#微信定时问候" aria-hidden="true">#</a> 微信定时问候</h2>
<div class="custom-container tip"><p class="custom-container-title">基本思路</p>
<p>通过图片对比返回坐标点击，配合windows批处理脚本和定时任务运行</p>
</div>
<h3 id="code" tabindex="-1"><a class="header-anchor" href="#code" aria-hidden="true">#</a> code</h3>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> subprocess
<span class="token keyword">import</span> time
<span class="token keyword">from</span> datetime <span class="token keyword">import</span> datetime
<span class="token keyword">import</span> pyautogui
<span class="token keyword">import</span> pyperclip
<span class="token keyword">import</span> logzero
<span class="token keyword">from</span> logzero <span class="token keyword">import</span> logger

<span class="token comment"># 配置日志记录器</span>
logzero<span class="token punctuation">.</span>logfile<span class="token punctuation">(</span><span class="token string">r"C:\Users\wxm\log.txt"</span><span class="token punctuation">)</span>

user <span class="token operator">=</span> <span class="token string">"杨琦"</span>

<span class="token comment"># 指定应用程序的路径（如果是一个可执行文件）</span>
pathApp <span class="token operator">=</span> <span class="token string">r"C:\Program Files (x86)\Tencent\WeChat\WeChat.exe"</span>

<span class="token comment"># 打开应用程序</span>
subprocess<span class="token punctuation">.</span>Popen<span class="token punctuation">(</span>pathApp<span class="token punctuation">)</span>

<span class="token comment"># 鉴于微信无法自动登录，需要手机确认，所以只考虑登录后在线操作</span>

<span class="token keyword">try</span><span class="token punctuation">:</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>

    <span class="token comment"># 定位搜索框并点击</span>
    path <span class="token operator">=</span> <span class="token string">r"C:\Users\wxm\search.png"</span>
    x<span class="token punctuation">,</span> y <span class="token operator">=</span> pyautogui<span class="token punctuation">.</span>locateCenterOnScreen<span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    pyautogui<span class="token punctuation">.</span>click<span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>

    <span class="token comment"># 搜索用户并跳转</span>
    pyperclip<span class="token punctuation">.</span>copy<span class="token punctuation">(</span>user<span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    pyautogui<span class="token punctuation">.</span>hotkey<span class="token punctuation">(</span><span class="token string">"ctrl"</span><span class="token punctuation">,</span> <span class="token string">"v"</span><span class="token punctuation">)</span>
    pyautogui<span class="token punctuation">.</span>click<span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token operator">+</span> <span class="token number">150</span><span class="token punctuation">)</span>


<span class="token comment"># 抛出异常</span>
<span class="token keyword">except</span> TypeError<span class="token punctuation">:</span>
    logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">"未找到用户"</span><span class="token punctuation">)</span>

<span class="token keyword">try</span><span class="token punctuation">:</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        hours <span class="token operator">=</span> datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>hour
        <span class="token keyword">if</span> hours <span class="token operator">==</span> <span class="token number">00</span><span class="token punctuation">:</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
            path <span class="token operator">=</span> <span class="token string">r"C:\Users\wxm\send.png"</span>
            x<span class="token punctuation">,</span> y <span class="token operator">=</span> pyautogui<span class="token punctuation">.</span>locateCenterOnScreen<span class="token punctuation">(</span>path<span class="token punctuation">)</span>
            pyautogui<span class="token punctuation">.</span>click<span class="token punctuation">(</span>x <span class="token operator">-</span> <span class="token number">100</span><span class="token punctuation">,</span> y <span class="token operator">-</span> <span class="token number">100</span><span class="token punctuation">)</span>

            <span class="token comment"># 输入文字</span>
            pyperclip<span class="token punctuation">.</span>copy<span class="token punctuation">(</span><span class="token string">'晚安'</span><span class="token punctuation">)</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
            pyautogui<span class="token punctuation">.</span>hotkey<span class="token punctuation">(</span><span class="token string">"ctrl"</span><span class="token punctuation">,</span> <span class="token string">"v"</span><span class="token punctuation">)</span>

            <span class="token comment"># 按下回车键</span>
            pyautogui<span class="token punctuation">.</span>press<span class="token punctuation">(</span><span class="token string">"enter"</span><span class="token punctuation">)</span>
            logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">"晚安！已经发送"</span><span class="token punctuation">)</span>
            pyautogui<span class="token punctuation">.</span>press<span class="token punctuation">(</span><span class="token string">"Esc"</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>

        <span class="token keyword">if</span> hours <span class="token operator">==</span> <span class="token number">8</span><span class="token punctuation">:</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
            path <span class="token operator">=</span> <span class="token string">r"C:\Users\wxm\send.png"</span>
            x<span class="token punctuation">,</span> y <span class="token operator">=</span> pyautogui<span class="token punctuation">.</span>locateCenterOnScreen<span class="token punctuation">(</span>path<span class="token punctuation">)</span>
            pyautogui<span class="token punctuation">.</span>click<span class="token punctuation">(</span>x <span class="token operator">-</span> <span class="token number">100</span><span class="token punctuation">,</span> y <span class="token operator">-</span> <span class="token number">100</span><span class="token punctuation">)</span>
            <span class="token comment"># 输入文字</span>
            pyperclip<span class="token punctuation">.</span>copy<span class="token punctuation">(</span><span class="token string">'早安'</span><span class="token punctuation">)</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
            pyautogui<span class="token punctuation">.</span>hotkey<span class="token punctuation">(</span><span class="token string">"ctrl"</span><span class="token punctuation">,</span> <span class="token string">"v"</span><span class="token punctuation">)</span>

            <span class="token comment"># 按下回车键</span>
            pyautogui<span class="token punctuation">.</span>press<span class="token punctuation">(</span><span class="token string">"enter"</span><span class="token punctuation">)</span>
            logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">"早安！已经发送"</span><span class="token punctuation">)</span>
            pyautogui<span class="token punctuation">.</span>press<span class="token punctuation">(</span><span class="token string">"Esc"</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>

        <span class="token keyword">else</span><span class="token punctuation">:</span>
            current_datetime <span class="token operator">=</span> datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span>
            current_datetime_str <span class="token operator">=</span> current_datetime<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">"%Y-%m-%d %H:%M:%S"</span><span class="token punctuation">)</span>
            logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">"未到时间问候,睡眠中,当前时间："</span> <span class="token operator">+</span> current_datetime_str<span class="token punctuation">)</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">)</span>


<span class="token keyword">except</span> TypeError<span class="token punctuation">:</span>
    logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">"未找到输入框"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="添加到windows的定时任务" tabindex="-1"><a class="header-anchor" href="#添加到windows的定时任务" aria-hidden="true">#</a> 添加到windows的定时任务</h4>
<p><img src="@source/python/time.png" alt="time.png"></p>
<h4 id="执行bat脚本" tabindex="-1"><a class="header-anchor" href="#执行bat脚本" aria-hidden="true">#</a> 执行bat脚本</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>@echo off
python C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>wxm<span class="token punctuation">\</span>weixin.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="优化bug" tabindex="-1"><a class="header-anchor" href="#优化bug" aria-hidden="true">#</a> 优化bug</h3>
<ul>
<li>应用扫描找到微信路径</li>
<li>每个版本识别图标不一致</li>
<li>多人问候如何实现</li>
<li>加入当天的实时咨询以及对方的爱好</li>
<li>写成配置文件问候人</li>
<li>自己写一个web播放器，加入每日问候。薛之谦</li>
</ul>
<h3 id="bug" tabindex="-1"><a class="header-anchor" href="#bug" aria-hidden="true">#</a> BUG</h3>
<ul>
<li>有时候无法执行，看日志是没有找到图像识别，有没有可能是延迟，我建议做很多次测试看看情况。是多次查找还是怎么滴</li>
<li>无法达成关闭再开机，必须要一直开机。</li>
<li>移植到其他电脑无法使用，图片和坐标都有问题。怀疑是图片识别策略问题，和全分辨率下的计算问题</li>
<li>步骤有时候有很多不同，该怎么解决呢</li>
</ul>
</div></template>


