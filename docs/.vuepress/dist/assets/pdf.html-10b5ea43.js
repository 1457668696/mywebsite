import{_ as n,o as s,c as a,e}from"./app-58ca2cdc.js";const t={},c=e(`<h2 id="保存pdf缺失" tabindex="-1"><a class="header-anchor" href="#保存pdf缺失" aria-hidden="true">#</a> 保存pdf缺失</h2><div class="custom-container tip"><p class="custom-container-title">现在博客都是使用的vue,导航栏的侧边栏都是默认显示的，如果保存成pdf第二页就会显示不完整。需要使用dom删除或者隐藏。</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//注意，如果属性有空格，就替换成.</span>
<span class="token keyword">let</span> recommend<span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#home-recommend&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> radius<span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;.index-pos-box.bgw.mtb15.radius4&#39;</span><span class="token punctuation">)</span>
 
recommend<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
radius<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">//或者 recommend.style.display=none;</span>
<span class="token comment">//这也是去广告的一种办法</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[c];function p(i,l){return s(),a("div",null,o)}const u=n(t,[["render",p],["__file","pdf.html.vue"]]);export{u as default};
