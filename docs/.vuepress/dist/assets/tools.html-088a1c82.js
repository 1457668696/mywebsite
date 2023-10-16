import{_ as p,r as o,o as c,c as l,a as n,b as s,w as t,d as e,e as i}from"./app-58ca2cdc.js";const u={},d={class:"table-of-contents"},k=i(`<h2 id="安全" tabindex="-1"><a class="header-anchor" href="#安全" aria-hidden="true">#</a> 安全</h2><h3 id="md5加密" tabindex="-1"><a class="header-anchor" href="#md5加密" aria-hidden="true">#</a> md5加密</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">String</span> password <span class="token operator">=</span> employee<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
password <span class="token operator">=</span> <span class="token class-name">DigestUtils</span><span class="token punctuation">.</span><span class="token function">md5DigestAsHex</span><span class="token punctuation">(</span>password<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hutool" tabindex="-1"><a class="header-anchor" href="#hutool" aria-hidden="true">#</a> hutool</h2><h3 id="随机数、字符串、token" tabindex="-1"><a class="header-anchor" href="#随机数、字符串、token" aria-hidden="true">#</a> 随机数、字符串、token</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">RandomUtil</span><span class="token punctuation">.</span><span class="token function">randomNumbers</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">RandomUtil</span><span class="token punctuation">.</span><span class="token function">randomString</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//token生成</span>
<span class="token class-name">String</span> token<span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="不为空" tabindex="-1"><a class="header-anchor" href="#不为空" aria-hidden="true">#</a> 不为空</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="对象转换" tabindex="-1"><a class="header-anchor" href="#对象转换" aria-hidden="true">#</a> 对象转换</h3><ul><li>json</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//json转对象</span>
<span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span>shopJson<span class="token punctuation">,</span> <span class="token class-name">Shop</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     

<span class="token comment">//对象转json</span>
<span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toJsonStr</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>复制属性</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//对象互相转换,redis转pojo，pojo转dto</span>
<span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span>game2<span class="token punctuation">,</span> <span class="token class-name">Zhsh</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span>mwxz<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">MwxzDto</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//map转对象，false忽略错误</span>
<span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">fillBeanWithMap</span><span class="token punctuation">(</span>userMap<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">UserDTO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//对象转map，且过滤</span>
<span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">beanToMap</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                         <span class="token class-name">CopyOptions</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">setIgnoreNullValue</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">setFieldValueEditor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>fieldName<span class="token punctuation">,</span> fieldValue<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>
                         fieldValue<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                         
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function r(m,v){const a=o("router-link");return c(),l("div",null,[n("nav",d,[n("ul",null,[n("li",null,[s(a,{to:"#安全"},{default:t(()=>[e("安全")]),_:1}),n("ul",null,[n("li",null,[s(a,{to:"#md5加密"},{default:t(()=>[e("md5加密")]),_:1})])])]),n("li",null,[s(a,{to:"#hutool"},{default:t(()=>[e("hutool")]),_:1}),n("ul",null,[n("li",null,[s(a,{to:"#随机数、字符串、token"},{default:t(()=>[e("随机数、字符串、token")]),_:1})]),n("li",null,[s(a,{to:"#不为空"},{default:t(()=>[e("不为空")]),_:1})]),n("li",null,[s(a,{to:"#对象转换"},{default:t(()=>[e("对象转换")]),_:1})])])])])]),k])}const b=p(u,[["render",r],["__file","tools.html.vue"]]);export{b as default};
