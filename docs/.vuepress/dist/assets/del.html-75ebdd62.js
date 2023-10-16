import{_ as n,o as s,c as a,e as t}from"./app-58ca2cdc.js";const p={},e=t(`<h2 id="强制删除文件" tabindex="-1"><a class="header-anchor" href="#强制删除文件" aria-hidden="true">#</a> 强制删除文件</h2><div class="custom-container tip"><p class="custom-container-title">基本思路</p><p>先查到进程id,kill就可以正常删除了</p></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> os
<span class="token keyword">import</span> shutil
<span class="token keyword">import</span> psutil


<span class="token keyword">def</span> <span class="token function">kill_process</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    杀死指定路径下所有占用该路径的进程
    &quot;&quot;&quot;</span>
    <span class="token keyword">for</span> process <span class="token keyword">in</span> psutil<span class="token punctuation">.</span>process_iter<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            process_path <span class="token operator">=</span> process<span class="token punctuation">.</span>cwd<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> <span class="token punctuation">(</span>psutil<span class="token punctuation">.</span>NoSuchProcess<span class="token punctuation">,</span> psutil<span class="token punctuation">.</span>AccessDenied<span class="token punctuation">,</span> psutil<span class="token punctuation">.</span>ZombieProcess<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">continue</span>
        <span class="token keyword">if</span> process_path<span class="token punctuation">.</span>startswith<span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">:</span>
            os<span class="token punctuation">.</span>kill<span class="token punctuation">(</span>process<span class="token punctuation">.</span>pid<span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">force_delete_folder</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    强制删除指定文件夹及其下所有文件和子文件夹
    &quot;&quot;&quot;</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
      强制删除指定文件夹及其下所有文件和子文件夹
      &quot;&quot;&quot;</span>
    max_tries <span class="token operator">=</span> <span class="token number">5</span>  <span class="token comment"># 最大尝试次数</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>max_tries<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            kill_process<span class="token punctuation">(</span>path<span class="token punctuation">)</span>
            shutil<span class="token punctuation">.</span>rmtree<span class="token punctuation">(</span>path<span class="token punctuation">,</span> ignore_errors<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> onerror<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;删除 </span><span class="token interpolation"><span class="token punctuation">{</span>path<span class="token punctuation">}</span></span><span class="token string"> 失败，尝试次数 </span><span class="token interpolation"><span class="token punctuation">{</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span></span><span class="token string"> / </span><span class="token interpolation"><span class="token punctuation">{</span>max_tries<span class="token punctuation">}</span></span><span class="token string">，错误信息：</span><span class="token interpolation"><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
            <span class="token keyword">continue</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;成功删除 </span><span class="token interpolation"><span class="token punctuation">{</span>path<span class="token punctuation">}</span></span><span class="token string"> 及其下所有文件和子文件夹！&quot;</span></span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>


<span class="token comment"># 示例：删除名为 &quot;example&quot; 的文件夹及其下所有文件和子文件夹</span>
folder_path <span class="token operator">=</span> <span class="token string">r&quot;F:\\Program Files\\finalshell&quot;</span>
force_delete_folder<span class="token punctuation">(</span>folder_path<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[e];function i(c,l){return s(),a("div",null,o)}const r=n(p,[["render",i],["__file","del.html.vue"]]);export{r as default};
