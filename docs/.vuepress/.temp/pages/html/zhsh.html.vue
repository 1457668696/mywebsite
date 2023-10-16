<template><div><h1 id="纵横四海经验展示" tabindex="-1"><a class="header-anchor" href="#纵横四海经验展示" aria-hidden="true">#</a> 纵横四海经验展示</h1>
<nav class="table-of-contents"><ul><li><router-link to="#接口详情">接口详情</router-link></li><li><router-link to="#后端逻辑">后端逻辑</router-link><ul><li><router-link to="#控制器-controller">控制器 Controller</router-link></li><li><router-link to="#实现类-serviceimpl">实现类 Serviceimpl</router-link></li></ul></li><li><router-link to="#前端逻辑">前端逻辑</router-link><ul><li><router-link to="#定义接口">定义接口</router-link></li><li><router-link to="#调用接口">调用接口</router-link></li></ul></li><li><router-link to="#前后端分离">前后端分离</router-link><ul><li><router-link to="#nginx配置文件">nginx配置文件</router-link></li></ul></li></ul></nav>
<div class="custom-container tip"><p class="custom-container-title">代码如下，通用的的返回结果json内容</p>
</div>
<h2 id="接口详情" tabindex="-1"><a class="header-anchor" href="#接口详情" aria-hidden="true">#</a> 接口详情</h2>
<ul>
<li>接口地址: https://106.55.7.113/api/game/zhsh</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
<span class="token property">"code"</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
<span class="token property">"msg"</span><span class="token operator">:</span> <span class="token string">"最新数据"</span><span class="token punctuation">,</span>
<span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token property">"level"</span><span class="token operator">:</span> <span class="token number">211</span><span class="token punctuation">,</span>
<span class="token property">"experienceNow"</span><span class="token operator">:</span> <span class="token number">16823.444</span><span class="token punctuation">,</span>
<span class="token property">"experienceNeed"</span><span class="token operator">:</span> <span class="token number">187899.712</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="后端逻辑" tabindex="-1"><a class="header-anchor" href="#后端逻辑" aria-hidden="true">#</a> 后端逻辑</h2>
<h3 id="控制器-controller" tabindex="-1"><a class="header-anchor" href="#控制器-controller" aria-hidden="true">#</a> 控制器 Controller</h3>
<ul>
<li>注入service接口</li>
<li>调用具体的实现方法,返回实体类对象</li>
<li>通过R对象封装好code、data、msg返回前端</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/game"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GameController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">ZhshService</span> zhshService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/zhsh"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Zhsh</span><span class="token punctuation">></span></span> <span class="token function">queryGame3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">Zhsh</span> aNew <span class="token operator">=</span> zhshService<span class="token punctuation">.</span><span class="token function">getNew</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>aNew<span class="token punctuation">,</span><span class="token string">"最新数据"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实现类-serviceimpl" tabindex="-1"><a class="header-anchor" href="#实现类-serviceimpl" aria-hidden="true">#</a> 实现类 Serviceimpl</h3>
<ul>
<li>先查缓存，有直接返回</li>
<li>没有缓存，查数据库</li>
<li>构造最新一条数据的条件</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Zhsh</span> <span class="token function">getNew</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">//先查缓存，不存在再查数据库</span>
    <span class="token class-name">Object</span> game2 <span class="token operator">=</span> redisUtils<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"game_"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>game2 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span>  <span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span>game2<span class="token punctuation">,</span> <span class="token class-name">Zhsh</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
        
    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Zhsh</span><span class="token punctuation">></span></span> queryWrapper<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//根据id倒叙查询</span>
    queryWrapper<span class="token punctuation">.</span><span class="token function">orderByDesc</span><span class="token punctuation">(</span><span class="token class-name">Zhsh</span><span class="token operator">::</span><span class="token function">getLevel</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">last</span><span class="token punctuation">(</span><span class="token string">"limit 1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span>  <span class="token function">getOne</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="前端逻辑" tabindex="-1"><a class="header-anchor" href="#前端逻辑" aria-hidden="true">#</a> 前端逻辑</h2>
<h3 id="定义接口" tabindex="-1"><a class="header-anchor" href="#定义接口" aria-hidden="true">#</a> 定义接口</h3>
<ul>
<li>二次封装基本对象</li>
<li>定义具体接口</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> http <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// 通用请求前缀,是为了前后端分离区分的前缀</span>
    <span class="token literal-property property">baseURL</span><span class="token operator">:</span><span class="token string">"/api"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">timeout</span><span class="token operator">:</span><span class="token number">5000</span><span class="token punctuation">,</span>
    <span class="token literal-property property">headers</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//定义接口，并暴露</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">getEX</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    <span class="token comment">// 返回promise对象，就可以.then截获内容</span>
    <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/game/zhsh'</span><span class="token punctuation">,</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="调用接口" tabindex="-1"><a class="header-anchor" href="#调用接口" aria-hidden="true">#</a> 调用接口</h3>
<ul>
<li>定义空容器</li>
<li>根据特定条件解析赋值给空容器</li>
<li>选择适合的方式在展示数据</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>div<span class="token operator">></span>
    <span class="token operator">&lt;</span>h1<span class="token operator">></span>当前等级<span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">{</span>level<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
    <span class="token operator">&lt;</span>p<span class="token operator">></span>当前经验：<span class="token punctuation">{</span><span class="token punctuation">{</span>experienceNow<span class="token punctuation">}</span><span class="token punctuation">}</span>万<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
    <span class="token operator">&lt;</span>p<span class="token operator">></span>升级需要<span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">{</span>experienceNeed<span class="token punctuation">}</span><span class="token punctuation">}</span>万<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">{</span>
      <span class="token literal-property property">level</span><span class="token operator">:</span><span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token literal-property property">experienceNow</span><span class="token operator">:</span><span class="token string">''</span><span class="token punctuation">,</span>
      <span class="token literal-property property">experienceNeed</span><span class="token operator">:</span><span class="token string">''</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  
 <span class="token keyword">import</span> <span class="token punctuation">{</span> getEX<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@/api"</span><span class="token punctuation">;</span>
  
 <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
    <span class="token function">getEX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>data<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">//解构赋值</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span>experienceNow<span class="token punctuation">,</span>experienceNeed<span class="token punctuation">,</span>level<span class="token punctuation">}</span> <span class="token operator">=</span> data<span class="token punctuation">.</span>data
      <span class="token keyword">this</span><span class="token punctuation">.</span>experienceNow<span class="token operator">=</span>experienceNow<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>experienceNeed<span class="token operator">=</span>experienceNeed<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>level<span class="token operator">=</span>level<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="前后端分离" tabindex="-1"><a class="header-anchor" href="#前后端分离" aria-hidden="true">#</a> 前后端分离</h2>
<div class="custom-container tip"><p class="custom-container-title">不再把dist打包文件放在stiac目录下,而是nginx部署前端,单独部署后端</p>
<p>前端部署80端口，后端部署8080端口，nginx配置文件，把/api的接口映射到:8080/api。</p>
</div>
<div class="custom-container tip"><p class="custom-container-title">http://xyjxww.cn/api/game/zhsh  &nbsp&nbsp&nbsp&nbsp&nbsp >>> &nbsp&nbsp&nbsp&nbsp http://xyjxww.cn:8080/game/zhsh</p>
</div>
<h3 id="nginx配置文件" tabindex="-1"><a class="header-anchor" href="#nginx配置文件" aria-hidden="true">#</a> nginx配置文件</h3>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/json</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>

   <span class="token comment">#前端配置，端口，ssl，证书</span>
     <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">443</span> ssl</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  127.0.0.1 xyjxww.cn</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_certificate</span>      /usr/local/ssl/xyjxww.crt</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_certificate_key</span>  /usr/local/ssl/xyjxww.key</span><span class="token punctuation">;</span>
        
        <span class="token directive"><span class="token keyword">ssl_ciphers</span>  HIGH:!aNULL:!MD5</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_prefer_server_ciphers</span>  <span class="token boolean">on</span></span><span class="token punctuation">;</span>
		

        <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$server_port</span> = <span class="token number">80</span> )</span> <span class="token punctuation">{</span>
                <span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$host</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> REMOTE-HOST <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>


      <span class="token comment">#加载压缩打包文件</span>
        <span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_min_length</span> <span class="token number">100</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_types</span> text/plain text/css application/xml application/javascript</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_vary</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>



        <span class="token comment"># 指定前端项目所在的位置</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
            
         <span class="token comment">#vue路由histroy路由跳转问题</span>
            <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#错误重定向</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#图标重定向</span>
        <span class="token directive"><span class="token keyword">location</span> /favicon.ico</span> <span class="token punctuation">{</span>  
            <span class="token directive"><span class="token keyword">root</span> html</span><span class="token punctuation">;</span>  
            <span class="token punctuation">}</span>  

       <span class="token comment">#前缀重定向</span>
        <span class="token directive"><span class="token keyword">location</span> /api</span> <span class="token punctuation">{</span>  
            <span class="token directive"><span class="token keyword">default_type</span>  application/json</span><span class="token punctuation">;</span>
            <span class="token comment">#internal;  </span>
            <span class="token directive"><span class="token keyword">keepalive_timeout</span>   <span class="token number">30s</span></span><span class="token punctuation">;</span>  
            <span class="token directive"><span class="token keyword">keepalive_requests</span>  <span class="token number">1000</span></span><span class="token punctuation">;</span>  
            <span class="token comment">#支持keep-alive  </span>
            <span class="token directive"><span class="token keyword">proxy_http_version</span> 1.1</span><span class="token punctuation">;</span>  
      <span class="token comment"># 指定接口前缀</span>
            <span class="token directive"><span class="token keyword">rewrite</span> /api(/.*) <span class="token variable">$1</span> break</span><span class="token punctuation">;</span>  
            <span class="token directive"><span class="token keyword">proxy_pass_request_headers</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_next_upstream</span> error timeout</span><span class="token punctuation">;</span>  
      <span class="token comment"># 反向代理地址</span>
            <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:8080</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


