<template><div><h2 id="强制删除文件" tabindex="-1"><a class="header-anchor" href="#强制删除文件" aria-hidden="true">#</a> 强制删除文件</h2>
<div class="custom-container tip"><p class="custom-container-title">基本思路</p>
<p>GTP生成可用，且常用放在这里</p>
</div>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> os

<span class="token keyword">def</span> <span class="token function">remove_pdf_string</span><span class="token punctuation">(</span>directory_path<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> root<span class="token punctuation">,</span> _<span class="token punctuation">,</span> files <span class="token keyword">in</span> os<span class="token punctuation">.</span>walk<span class="token punctuation">(</span>directory_path<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">for</span> <span class="token builtin">file</span> <span class="token keyword">in</span> files<span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token string">".pdf"</span> <span class="token keyword">in</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
                file_path <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>root<span class="token punctuation">,</span> <span class="token builtin">file</span><span class="token punctuation">)</span>
                new_file_name <span class="token operator">=</span> <span class="token builtin">file</span><span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">".pdf"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
                new_file_path <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>root<span class="token punctuation">,</span> new_file_name<span class="token punctuation">)</span>
                os<span class="token punctuation">.</span>rename<span class="token punctuation">(</span>file_path<span class="token punctuation">,</span> new_file_path<span class="token punctuation">)</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"文件重命名：</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">file</span><span class="token punctuation">}</span></span><span class="token string"> -> </span><span class="token interpolation"><span class="token punctuation">{</span>new_file_name<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token comment"># 目录路径</span>
directory_path <span class="token operator">=</span> <span class="token string">r"C:\Users\wxm\Desktop\新建文件夹"</span>  <span class="token comment"># 将此处路径替换为目标目录的实际路径</span>

remove_pdf_string<span class="token punctuation">(</span>directory_path<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


