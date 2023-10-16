<template><div><nav class="table-of-contents"><ul><li><router-link to="#用户">用户</router-link><ul><li><router-link to="#登录">登录</router-link></li><li><router-link to="#登出">登出</router-link></li><li><router-link to="#登录拦截器">登录拦截器</router-link></li></ul></li><li><router-link to="#用户管理">用户管理</router-link><ul><li><router-link to="#新增用户">新增用户</router-link></li><li><router-link to="#查询用户">查询用户</router-link></li><li><router-link to="#分页查询">分页查询</router-link></li><li><router-link to="#修改用户">修改用户</router-link></li></ul></li></ul></nav>
<h2 id="用户" tabindex="-1"><a class="header-anchor" href="#用户" aria-hidden="true">#</a> 用户</h2>
<h3 id="登录" tabindex="-1"><a class="header-anchor" href="#登录" aria-hidden="true">#</a> 登录</h3>
<div class="custom-container tip"><p class="custom-container-title">登录接口,表单参数</p>
<p>{
&quot;username&quot;: &quot;admin&quot;,
&quot;password&quot;: &quot;123456&quot;
}</p>
</div>
<ul>
<li>传入两个对象，1.前端传入的对象employee，2.request对象设置session</li>
<li>自己构造从数据库查出来的的真实对象one</li>
<li>现在有两个对象，一个是通过数据库查询出来的one对象，一个是前端封装的对象employee</li>
<li>把前端的和后端的对象字段对比，确认是否正确的用户</li>
<li>控制流分支到具体的处理办法</li>
<li>null用户不存在</li>
<li>密码比对错误,密码输入错误</li>
<li>状态码，用户锁定</li>
<li>成功，设置session,key为&quot;用户&quot;，value为某个字段，并返回前端渲染数据</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span>                               <span class="token comment">//传入为json时候用requestBody封装数据</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Employee</span> employee<span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token comment">//密码加密</span>
    <span class="token class-name">String</span> password <span class="token operator">=</span> employee<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    password <span class="token operator">=</span> <span class="token class-name">DigestUtils</span><span class="token punctuation">.</span><span class="token function">md5DigestAsHex</span><span class="token punctuation">(</span>password<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//查询数据库</span>
    <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> em <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    em<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token class-name">Employee</span><span class="token operator">::</span><span class="token function">getUsername</span><span class="token punctuation">,</span>employee<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Employee</span> one <span class="token operator">=</span> employService<span class="token punctuation">.</span><span class="token function">getOne</span><span class="token punctuation">(</span>em<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//空值检测</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>one<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"登录失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//密码比对</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>one<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>password<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span>  <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"登录失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//查询状态</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>one<span class="token punctuation">.</span><span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"账号已锁定"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

   <span class="token comment">//登录成功，将id放入session中</span>
    request<span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"employee"</span><span class="token punctuation">,</span>one<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>one<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="登出" tabindex="-1"><a class="header-anchor" href="#登出" aria-hidden="true">#</a> 登出</h3>
<ul>
<li>传入request对象,移除employee的属性</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code> <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/logout"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">logout</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span><span class="token punctuation">{</span>
        request<span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token string">"employee"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">"退出成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="登录拦截器" tabindex="-1"><a class="header-anchor" href="#登录拦截器" aria-hidden="true">#</a> 登录拦截器</h3>
<ul>
<li>定义需要拦截的路径</li>
<li>对比当前的url和需要拦截的url,封装方法</li>
<li>需要拦截时，从session取出用户判断是否为空</li>
<li>不为空,放行。存入到本地线程localThread中，方便其他处使用</li>
<li>为空，返回失败信息或者设置401状态码等</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@WebFilter</span><span class="token punctuation">(</span>filterName <span class="token operator">=</span> <span class="token string">"loginCheckFilter"</span><span class="token punctuation">,</span> urlPatterns <span class="token operator">=</span> <span class="token string">"/*"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoginCheckFilter</span> <span class="token keyword">implements</span> <span class="token class-name">Filter</span> <span class="token punctuation">{</span>

    <span class="token comment">//路径匹配器,类似正则url提取路径/</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">AntPathMatcher</span> <span class="token constant">PATH_MATCHER</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AntPathMatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token class-name">ServletRequest</span> servletRequest<span class="token punctuation">,</span> <span class="token class-name">ServletResponse</span> servletResponse<span class="token punctuation">,</span> <span class="token class-name">FilterChain</span> filterChain<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>

        <span class="token comment">//本身传入的不适用，强转过来</span>
        <span class="token class-name">HttpServletRequest</span> request <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">)</span> servletRequest<span class="token punctuation">;</span>
        <span class="token class-name">HttpServletResponse</span> response <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">)</span> servletResponse<span class="token punctuation">;</span>


        <span class="token comment">//定义不需要请求的路径</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> urls <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span>
                <span class="token string">"/employee/login"</span><span class="token punctuation">,</span>
                <span class="token string">"/employee/logout"</span><span class="token punctuation">,</span>
                <span class="token string">"/backend/**"</span><span class="token punctuation">,</span>
                <span class="token string">"/front/**"</span><span class="token punctuation">,</span>
                <span class="token string">"/user/login"</span><span class="token punctuation">,</span>
                <span class="token string">"/user/sendMsg"</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token comment">//本次请求url</span>
        <span class="token class-name">String</span> requestURI <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getRequestURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//判断本次是否需要处理</span>
        <span class="token keyword">boolean</span> check <span class="token operator">=</span> <span class="token function">check</span><span class="token punctuation">(</span>urls<span class="token punctuation">,</span> requestURI<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//不需要处理</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>check<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//这是一个传递方法，意为继续向下过滤</span>
            filterChain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//判断登录状态，已登录就放行</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">"employee"</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"用户已经登录，用户id为：{}"</span><span class="token punctuation">,</span>request<span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">"employee"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//获取线程用户</span>
            <span class="token class-name">Long</span> empId<span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">)</span> request<span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">"employee"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">BaseContext</span><span class="token punctuation">.</span><span class="token function">setCurrentId</span><span class="token punctuation">(</span>empId<span class="token punctuation">)</span><span class="token punctuation">;</span>
            filterChain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//如果未登录，通过输出流向客服端响应数据</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"用户未登录"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">//这是前端的特殊处理</span>
        response<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">toJSONString</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"NOTLOGIN"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token comment">//封装一个方法，判断是否需要处理</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">check</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> urls<span class="token punctuation">,</span> <span class="token class-name">String</span> requestURI<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> url <span class="token operator">:</span> urls<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">boolean</span> match <span class="token operator">=</span> <span class="token constant">PATH_MATCHER</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> requestURI<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>match<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="用户管理" tabindex="-1"><a class="header-anchor" href="#用户管理" aria-hidden="true">#</a> 用户管理</h2>
<h3 id="新增用户" tabindex="-1"><a class="header-anchor" href="#新增用户" aria-hidden="true">#</a> 新增用户</h3>
<div class="custom-container tip"><p class="custom-container-title">新增员工接口 post表单提交</p>
<p>{
&quot;name&quot;: 红米&quot;,
&quot;phone&quot;: &quot;13885963369&quot;,
&quot;sex&quot;: &quot;1&quot;,
&quot;idNumber&quot;: &quot;522321195910266532&quot;,
&quot;username&quot;: &quot;1553235814&quot;
}</p>
</div>
<ul>
<li>接受的表单对象并一定完整,需要后端给其他字段默认值</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Employee</span> employee<span class="token punctuation">)</span><span class="token punctuation">{</span>

   <span class="token comment">//设置初始密码</span>
    employee<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token class-name">DigestUtils</span><span class="token punctuation">.</span><span class="token function">md5DigestAsHex</span><span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token comment">/*
     //公共字段全部交给处理器
     employee.setCreateTime(LocalDateTime.now());
     employee.setUpdateTime(LocalDateTime.now());

     //获取创建人
     long empId=(Long)request.getSession().getAttribute("employee"); 
     employee.setCreateUser(empId);
     employee.setUpdateUser(empId);
*/</span>
      employService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>employee<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">"新增员工成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询用户" tabindex="-1"><a class="header-anchor" href="#查询用户" aria-hidden="true">#</a> 查询用户</h3>
<div class="custom-container tip"><p class="custom-container-title">编辑员工接口 get表单填充</p>
<p>http://localhost:8081/employee/{id}</p>
</div>
<ul>
<li>进入编辑页面时根据id查询数据填充表单</li>
<li>传入ID,返回需要的值</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/{id}"</span><span class="token punctuation">)</span>      <span class="token comment">//路径变量。res风格</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> <span class="token function">getById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"根据ID查询员工信息"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Employee</span> employee <span class="token operator">=</span> employService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>employee<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>employee<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"没有查询到相关信息"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分页查询" tabindex="-1"><a class="header-anchor" href="#分页查询" aria-hidden="true">#</a> 分页查询</h3>
<div class="custom-container tip"><p class="custom-container-title">构造分页数据</p>
<p>http://localhost:8081/employee/page?page=1&amp;pageSize=10</p>
</div>
<ul>
<li>接受前端的分页数据查询</li>
<li></li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/page"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Page</span><span class="token punctuation">></span></span> <span class="token function">page</span><span class="token punctuation">(</span><span class="token keyword">int</span> page<span class="token punctuation">,</span><span class="token keyword">int</span> pageSize<span class="token punctuation">,</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">{</span>
log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"page= {},pageSize={},name={}"</span><span class="token punctuation">,</span>page<span class="token punctuation">,</span>pageSize<span class="token punctuation">,</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//构造分页构造器</span>
<span class="token class-name">Page</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> pageInfo<span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Page</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>page<span class="token punctuation">,</span> pageSize<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//构造条件过滤器</span>
<span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> queryWrapper<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">LambdaQueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token comment">//过滤条件，like相似度</span>
queryWrapper<span class="token punctuation">.</span><span class="token function">like</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token class-name">Employee</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//添加排序条件，更新时间</span>
queryWrapper<span class="token punctuation">.</span><span class="token function">orderByDesc</span><span class="token punctuation">(</span><span class="token class-name">Employee</span><span class="token operator">::</span><span class="token function">getUpdateTime</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//执行查询</span>
    employService<span class="token punctuation">.</span><span class="token function">page</span><span class="token punctuation">(</span>pageInfo<span class="token punctuation">,</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>pageInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改用户" tabindex="-1"><a class="header-anchor" href="#修改用户" aria-hidden="true">#</a> 修改用户</h3>
<div class="custom-container tip"><p class="custom-container-title">修改员工接口 put修改</p>
<p>http://localhost:8081/employee</p>
</div>
<ul>
<li>update更新字段的值</li>
<li>直接提交修改</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@PutMapping</span>
<span class="token keyword">public</span>  <span class="token class-name">R</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> update <span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Employee</span> employee<span class="token punctuation">)</span><span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>employee<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//long id= (long)request.getSession().getAttribute("employee");</span>
  <span class="token comment">//employee.setUpdateTime(LocalDateTime.now());</span>
  <span class="token comment">//employee.setUpdateUser(id);</span>
  employService<span class="token punctuation">.</span><span class="token function">updateById</span><span class="token punctuation">(</span>employee<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">R</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">"修改成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


