<template><div><nav class="table-of-contents"><ul><li><router-link to="#mysql-8-0">mysql 8.0</router-link><ul><li><router-link to="#_1-准备一台linux服务器">1. 准备一台Linux服务器</router-link></li><li><router-link to="#_2-下载linux版mysql安装包">2. 下载Linux版MySQL安装包</router-link></li><li><router-link to="#_3-上传mysql安装包">3. 上传MySQL安装包</router-link></li><li><router-link to="#_4-创建目录-并解压">4. 创建目录,并解压</router-link></li><li><router-link to="#_5-安装mysql的安装包">5. 安装mysql的安装包</router-link></li><li><router-link to="#_6-启动mysql服务">6. 启动MySQL服务</router-link></li><li><router-link to="#_7-查询自动生成的root用户密码">7. 查询自动生成的root用户密码</router-link></li><li><router-link to="#_8-修改root用户密码">8. 修改root用户密码</router-link></li><li><router-link to="#_9-创建用户">9. 创建用户</router-link></li><li><router-link to="#_10-并给root用户分配权限">10. 并给root用户分配权限</router-link></li><li><router-link to="#_11-重新连接mysql">11. 重新连接MySQL</router-link></li></ul></li><li><router-link to="#redis">redis</router-link></li></ul></nav>
<h2 id="mysql-8-0" tabindex="-1"><a class="header-anchor" href="#mysql-8-0" aria-hidden="true">#</a> mysql 8.0</h2>
<h3 id="_1-准备一台linux服务器" tabindex="-1"><a class="header-anchor" href="#_1-准备一台linux服务器" aria-hidden="true">#</a> 1. 准备一台Linux服务器</h3>
<p>云服务器或者虚拟机都可以;</p>
<p>Linux的版本为 CentOS7;</p>
<h3 id="_2-下载linux版mysql安装包" tabindex="-1"><a class="header-anchor" href="#_2-下载linux版mysql安装包" aria-hidden="true">#</a> 2. 下载Linux版MySQL安装包</h3>
<p><a href="https://downloads.mysql.com/archives/community/" target="_blank" rel="noopener noreferrer">官网下载<ExternalLinkIcon/></a></p>
<h3 id="_3-上传mysql安装包" tabindex="-1"><a class="header-anchor" href="#_3-上传mysql安装包" aria-hidden="true">#</a> 3. 上传MySQL安装包</h3>
<h3 id="_4-创建目录-并解压" tabindex="-1"><a class="header-anchor" href="#_4-创建目录-并解压" aria-hidden="true">#</a> 4. 创建目录,并解压</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> mysql

<span class="token function">tar</span> <span class="token parameter variable">-xvf</span> mysql-8.0.26-1.el7.x86_64.rpm-bundle.tar <span class="token parameter variable">-C</span> mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-安装mysql的安装包" tabindex="-1"><a class="header-anchor" href="#_5-安装mysql的安装包" aria-hidden="true">#</a> 5. 安装mysql的安装包</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#云服务器先卸载依赖*yum re*move mysql-libs</span>
<span class="token builtin class-name">cd</span> mysql

<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-common-8.0.26-1.el7.x86_64.rpm 

<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-client-plugins-8.0.26-1.el7.x86_64.rpm 

<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-libs-8.0.26-1.el7.x86_64.rpm 

<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-libs-compat-8.0.26-1.el7.x86_64.rpm

yum <span class="token function">install</span> openssl-devel

<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span>  mysql-community-devel-8.0.26-1.el7.x86_64.rpm

<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql-community-client-8.0.26-1.el7.x86_64.rpm

<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span>  mysql-community-server-8.0.26-1.el7.x86_64.rpm

<span class="token comment">#最后一步如果依赖失败安装yum -y install numactl，或者其他的依赖</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-启动mysql服务" tabindex="-1"><a class="header-anchor" href="#_6-启动mysql服务" aria-hidden="true">#</a> 6. 启动MySQL服务</h3>
<div class="language-shellc line-numbers-mode" data-ext="shellc"><pre v-pre class="language-shellc"><code>systemctl start mysqld

systemctl restart mysqld

systemctl stop mysqld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-查询自动生成的root用户密码" tabindex="-1"><a class="header-anchor" href="#_7-查询自动生成的root用户密码" aria-hidden="true">#</a> 7. 查询自动生成的root用户密码</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">grep</span> <span class="token string">'temporary password'</span> /var/log/mysqld.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令行执行指令 :</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后输入上述查询到的自动生成的密码, 完成登录 .</p>
<h3 id="_8-修改root用户密码" tabindex="-1"><a class="header-anchor" href="#_8-修改root用户密码" aria-hidden="true">#</a> 8. 修改root用户密码</h3>
<p>登录到MySQL之后，需要将自动生成的不便记忆的密码修改了，修改成自己熟悉的便于记忆的密码。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ALTER  <span class="token environment constant">USER</span>  <span class="token string">'root'</span>@<span class="token string">'localhost'</span>  IDENTIFIED BY <span class="token string">'1234'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行上述的SQL会报错，原因是因为设置的密码太简单，密码复杂度不够。我们可以设置密码的复杂度为简单类型，密码长度为4。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">set</span> global validate_password.policy <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token builtin class-name">set</span> global validate_password.length <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>降低密码的校验规则之后，再次执行上述修改密码的指令。</p>
<h3 id="_9-创建用户" tabindex="-1"><a class="header-anchor" href="#_9-创建用户" aria-hidden="true">#</a> 9. 创建用户</h3>
<p>默认的root用户只能当前节点localhost访问，是无法远程访问的，我们还需要创建一个root账户，用户远程访问</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>create user <span class="token string">'root'</span>@<span class="token string">'%'</span> IDENTIFIED WITH mysql_native_password BY <span class="token string">'1234'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_10-并给root用户分配权限" tabindex="-1"><a class="header-anchor" href="#_10-并给root用户分配权限" aria-hidden="true">#</a> 10. 并给root用户分配权限</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>grant all on *.* to <span class="token string">'root'</span>@<span class="token string">'%'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_11-重新连接mysql" tabindex="-1"><a class="header-anchor" href="#_11-重新连接mysql" aria-hidden="true">#</a> 11. 重新连接MySQL</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后输入密码</p>
<h2 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> redis</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> update

yum <span class="token function">install</span> redis

systemctl status redis

<span class="token function">netstat</span> <span class="token parameter variable">-lnp</span> <span class="token operator">|</span> <span class="token function">grep</span> redis

firewall-cmd --add-port<span class="token operator">=</span><span class="token number">6379</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">-reload</span>

redis-cli

<span class="token function">find</span> / <span class="token parameter variable">-name</span> <span class="token string">"redis.config"</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null

<span class="token comment">#修改密码和远程链接redis.config</span>
<span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0
protect-mode no

requirepass yourpassword
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="nginx-不能放在中文目录下启动" tabindex="-1"><a class="header-anchor" href="#nginx-不能放在中文目录下启动" aria-hidden="true">#</a> nginx 不能放在中文目录下启动</h4>
</div></template>


