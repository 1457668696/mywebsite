<template><div><nav class="table-of-contents"><ul><li><router-link to="#快速启动lol">快速启动LoL</router-link><ul><li><router-link to="#code">code</router-link></li><li><router-link to="#优化以及bug">优化以及bug</router-link></li></ul></li></ul></nav>
<h2 id="快速启动lol" tabindex="-1"><a class="header-anchor" href="#快速启动lol" aria-hidden="true">#</a> 快速启动LoL</h2>
<div class="custom-container tip"><p class="custom-container-title">基本思路</p>
<p>直接坐标移动，因为是自用，所以随便点了，延迟可以久一点。</p>
</div>
<h3 id="code" tabindex="-1"><a class="header-anchor" href="#code" aria-hidden="true">#</a> code</h3>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> subprocess
<span class="token keyword">import</span> time

<span class="token keyword">import</span> pyautogui

<span class="token comment"># 指定应用程序的路径（如果是一个可执行文件）</span>
pathApp <span class="token operator">=</span> <span class="token string">"C:\Program Files (x86)\WeGame\wegame.exe"</span>

<span class="token comment"># 打开应用程序</span>
subprocess<span class="token punctuation">.</span>Popen<span class="token punctuation">(</span>pathApp<span class="token punctuation">)</span>

time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
pyautogui<span class="token punctuation">.</span>moveTo<span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">,</span> <span class="token number">1050</span><span class="token punctuation">)</span>

pyautogui<span class="token punctuation">.</span>click<span class="token punctuation">(</span><span class="token punctuation">)</span>

time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
pyautogui<span class="token punctuation">.</span>moveTo<span class="token punctuation">(</span><span class="token number">900</span><span class="token punctuation">,</span> <span class="token number">250</span><span class="token punctuation">)</span>
pyautogui<span class="token punctuation">.</span>click<span class="token punctuation">(</span><span class="token punctuation">)</span>

pyautogui<span class="token punctuation">.</span>moveTo<span class="token punctuation">(</span><span class="token number">2400</span><span class="token punctuation">,</span> <span class="token number">1550</span><span class="token punctuation">)</span>
pyautogui<span class="token punctuation">.</span>click<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">图标点击</p>
<p>也写了个图标点击的，但发现一个bug,终端运行似乎有延迟科，不能实时识别图标,因为没有安装open-python的原因，可以开启灰度识别,并且加入模糊识别</p>
</div>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> ctypes
<span class="token keyword">import</span> logging
<span class="token keyword">import</span> subprocess
<span class="token keyword">import</span> time
<span class="token keyword">import</span> logzero
<span class="token keyword">from</span> logzero <span class="token keyword">import</span> logger
<span class="token keyword">import</span> pyautogui
<span class="token keyword">import</span> sys

logzero<span class="token punctuation">.</span>logfile<span class="token punctuation">(</span><span class="token string">r"log.txt"</span><span class="token punctuation">)</span>


<span class="token comment"># 执行操作</span>
<span class="token keyword">def</span> <span class="token function">opengame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>

        <span class="token comment"># 定位登录按钮</span>
        path <span class="token operator">=</span> <span class="token string">r"1.png"</span>
        x<span class="token punctuation">,</span> y <span class="token operator">=</span> pyautogui<span class="token punctuation">.</span>locateCenterOnScreen<span class="token punctuation">(</span>path<span class="token punctuation">,</span> grayscale<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
        pyautogui<span class="token punctuation">.</span>click<span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token operator">+</span> <span class="token number">150</span><span class="token punctuation">)</span>

    <span class="token comment"># 抛出异常</span>
    <span class="token keyword">except</span> TypeError<span class="token punctuation">:</span>
        logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">"未找到用户"</span><span class="token punctuation">)</span>

    <span class="token keyword">try</span><span class="token punctuation">:</span>
        time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>

        <span class="token comment"># 定位登录按钮</span>
        path <span class="token operator">=</span> <span class="token string">r"2.png"</span>
        x<span class="token punctuation">,</span> y <span class="token operator">=</span> pyautogui<span class="token punctuation">.</span>locateCenterOnScreen<span class="token punctuation">(</span>path<span class="token punctuation">,</span> grayscale<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
        pyautogui<span class="token punctuation">.</span>click<span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>

    <span class="token comment"># 抛出异常</span>
    <span class="token keyword">except</span> TypeError<span class="token punctuation">:</span>
        logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">"未找到主页"</span><span class="token punctuation">)</span>

    <span class="token keyword">try</span><span class="token punctuation">:</span>
        time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">)</span>

        <span class="token comment"># 定位登录按钮</span>
        path <span class="token operator">=</span> <span class="token string">r"3.png"</span>
        x<span class="token punctuation">,</span> y <span class="token operator">=</span> pyautogui<span class="token punctuation">.</span>locateCenterOnScreen<span class="token punctuation">(</span>path<span class="token punctuation">,</span> grayscale<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
        pyautogui<span class="token punctuation">.</span>click<span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>

    <span class="token comment"># 抛出异常</span>
    <span class="token keyword">except</span> TypeError<span class="token punctuation">:</span>
        logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">"未找到登录按钮"</span><span class="token punctuation">)</span>


<span class="token comment"># 系统提权</span>
<span class="token keyword">def</span> <span class="token function">is_admin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> ctypes<span class="token punctuation">.</span>windll<span class="token punctuation">.</span>shell32<span class="token punctuation">.</span>IsUserAnAdmin<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">except</span> OSError<span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token boolean">False</span>


<span class="token comment"># 提权后操作</span>
<span class="token keyword">if</span> is_admin<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    logging<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">"成功获得管理员权限"</span><span class="token punctuation">)</span>
    <span class="token comment"># 指定应用程序的路径（如果是一个可执行文件）</span>
    pathApp <span class="token operator">=</span> <span class="token string">r"C:\Program Files (x86)\WeGame\wegame.exe"</span>

    <span class="token comment"># 打开应用程序</span>
    subprocess<span class="token punctuation">.</span>Popen<span class="token punctuation">(</span>pathApp<span class="token punctuation">)</span>

    logging<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">"打开应用成功"</span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    opengame<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">else</span><span class="token punctuation">:</span>
    ctypes<span class="token punctuation">.</span>windll<span class="token punctuation">.</span>shell32<span class="token punctuation">.</span>ShellExecuteW<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token string">"runas"</span><span class="token punctuation">,</span> sys<span class="token punctuation">.</span>executable<span class="token punctuation">,</span> __file__<span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>pip <span class="token function">install</span> opencv-python
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="优化以及bug" tabindex="-1"><a class="header-anchor" href="#优化以及bug" aria-hidden="true">#</a> 优化以及bug</h3>
<ul>
<li>暂无</li>
</ul>
</div></template>


