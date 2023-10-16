<template><div><h2 id="批量加密压缩" tabindex="-1"><a class="header-anchor" href="#批量加密压缩" aria-hidden="true">#</a> 批量加密压缩</h2>
<div class="custom-container tip"><p class="custom-container-title">基本思路</p>
<p>有好几个版本，好像就这个可以用</p>
</div>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> os
<span class="token keyword">import</span> pyzipper


<span class="token keyword">def</span> <span class="token function">zip_file</span><span class="token punctuation">(</span>file_path<span class="token punctuation">,</span> password<span class="token punctuation">)</span><span class="token punctuation">:</span>
    base_name <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>basename<span class="token punctuation">(</span>file_path<span class="token punctuation">)</span>
    zip_filename <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>base_name<span class="token punctuation">}</span></span><span class="token string">.zip"</span></span>

    <span class="token keyword">with</span> pyzipper<span class="token punctuation">.</span>AESZipFile<span class="token punctuation">(</span>zip_filename<span class="token punctuation">,</span> <span class="token string">'w'</span><span class="token punctuation">,</span> compression<span class="token operator">=</span>pyzipper<span class="token punctuation">.</span>ZIP_DEFLATED<span class="token punctuation">,</span> encryption<span class="token operator">=</span>pyzipper<span class="token punctuation">.</span>WZ_AES<span class="token punctuation">)</span> <span class="token keyword">as</span> zipf<span class="token punctuation">:</span>
        zipf<span class="token punctuation">.</span>setpassword<span class="token punctuation">(</span>password<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        zipf<span class="token punctuation">.</span>write<span class="token punctuation">(</span>file_path<span class="token punctuation">,</span> arcname<span class="token operator">=</span>base_name<span class="token punctuation">)</span>

    <span class="token keyword">return</span> zip_filename


<span class="token comment"># 压缩目录下的所有文件</span>
directory_path <span class="token operator">=</span> <span class="token string">"/path/to/directory"</span>  <span class="token comment"># 将此处路径替换为要压缩的目录路径</span>
password <span class="token operator">=</span> <span class="token string">"javbus"</span>  <span class="token comment"># 设置密码，设为None或空字符串("")表示不设置密码</span>

<span class="token keyword">for</span> root<span class="token punctuation">,</span> _<span class="token punctuation">,</span> files <span class="token keyword">in</span> os<span class="token punctuation">.</span>walk<span class="token punctuation">(</span>directory_path<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> <span class="token builtin">file</span> <span class="token keyword">in</span> files<span class="token punctuation">:</span>
        file_path <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>root<span class="token punctuation">,</span> <span class="token builtin">file</span><span class="token punctuation">)</span>
        compressed_file <span class="token operator">=</span> zip_file<span class="token punctuation">(</span>file_path<span class="token punctuation">,</span> password<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"压缩完成，压缩文件为: </span><span class="token interpolation"><span class="token punctuation">{</span>compressed_file<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


