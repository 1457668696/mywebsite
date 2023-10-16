<template><div><h1 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> mysql</h1>
<nav class="table-of-contents"><ul><li><router-link to="#创建表-create-table">创建表 create table</router-link></li><li><router-link to="#插入表-insert-into-val">插入表 insert into val</router-link></li><li><router-link to="#修改表-update-set">修改表 update set</router-link></li><li><router-link to="#删除表-delete-from">删除表 delete from</router-link></li><li><router-link to="#查询表-select-from">查询表 select from</router-link><ul><li><router-link to="#条件查询-condition">条件查询 condition</router-link></li><li><router-link to="#排序查询-order-by">排序查询 order by</router-link></li><li><router-link to="#统计查询-count">统计查询 count（）</router-link></li><li><router-link to="#分组查询-group-by">分组查询 group by</router-link></li><li><router-link to="#分页查询-limit-by">分页查询 limit by</router-link></li><li><router-link to="#内联查询">内联查询</router-link></li><li><router-link to="#外联查询">外联查询</router-link></li><li><router-link to="#子查询">子查询</router-link></li></ul></li><li><router-link to="#mybatis-plus">mybatis plus</router-link></li><li><router-link to="#约束-constraint">约束 constraint</router-link></li><li><router-link to="#事务">事务</router-link></li><li><router-link to="#索引">索引</router-link></li><li><router-link to="#视图">视图</router-link></li><li><router-link to="#存储过程">存储过程</router-link></li><li><router-link to="#分表">分表</router-link></li><li><router-link to="#主从复制">主从复制</router-link></li><li><router-link to="#运维">运维</router-link></li></ul></nav>
<h2 id="创建表-create-table" tabindex="-1"><a class="header-anchor" href="#创建表-create-table" aria-hidden="true">#</a> 创建表 create table</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment"># 用户表</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> tb_user<span class="token punctuation">(</span>
	id <span class="token keyword">int</span> <span class="token punctuation">,</span>
	username <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	password <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment"># 学生表</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> tb_stu<span class="token punctuation">(</span>
	id <span class="token keyword">int</span> <span class="token punctuation">,</span><span class="token comment">-- 编号</span>
	name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">-- 姓名</span>
	gender <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">-- 性别</span>
	birthday <span class="token keyword">date</span><span class="token punctuation">,</span><span class="token comment">-- 生日</span>
	score <span class="token keyword">double</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">,</span><span class="token comment">-- 分数</span>
	email <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">-- 邮箱</span>
	tel <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">-- 手机号</span>
	<span class="token keyword">status</span> <span class="token keyword">tinyint</span><span class="token comment">-- 状态</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="插入表-insert-into-val" tabindex="-1"><a class="header-anchor" href="#插入表-insert-into-val" aria-hidden="true">#</a> 插入表 insert into val</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">#字段和值一一对应</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> stu <span class="token punctuation">(</span>id<span class="token punctuation">,</span> NAME<span class="token punctuation">)</span>
<span class="token keyword">values</span>
            	<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'张三'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
<span class="token comment">#省略列名</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> stu
<span class="token keyword">values</span>
	<span class="token punctuation">(</span>
		<span class="token number">2</span><span class="token punctuation">,</span>
		<span class="token string">'李四'</span><span class="token punctuation">,</span>
		<span class="token string">'男'</span><span class="token punctuation">,</span>
		<span class="token string">'1999-11-11'</span><span class="token punctuation">,</span>
		<span class="token number">88.88</span><span class="token punctuation">,</span>
		<span class="token string">'lisi@itcast.cn'</span><span class="token punctuation">,</span>
		<span class="token string">'13888888888'</span><span class="token punctuation">,</span>
		<span class="token number">1</span>
	<span class="token punctuation">)</span><span class="token punctuation">;</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改表-update-set" tabindex="-1"><a class="header-anchor" href="#修改表-update-set" aria-hidden="true">#</a> 修改表 update set</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">#不加where会全部修改</span>
<span class="token keyword">update</span> stu <span class="token keyword">set</span> sex <span class="token operator">=</span> <span class="token string">'女'</span> <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token string">'张三'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除表-delete-from" tabindex="-1"><a class="header-anchor" href="#删除表-delete-from" aria-hidden="true">#</a> 删除表 delete from</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">delete</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token string">'张三'</span><span class="token punctuation">;</span>
<span class="token comment">#删除全部</span>
<span class="token keyword">delete</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查询表-select-from" tabindex="-1"><a class="header-anchor" href="#查询表-select-from" aria-hidden="true">#</a> 查询表 select from</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment"># 查询name、age两列</span>
<span class="token keyword">select</span> name<span class="token punctuation">,</span>age <span class="token keyword">from</span> stu<span class="token punctuation">;</span>         

<span class="token comment">#查询所有列</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span>  

<span class="token comment">#去重</span>
<span class="token keyword">select</span> <span class="token keyword">distinct</span> name <span class="token keyword">from</span> stu<span class="token punctuation">;</span>

<span class="token comment">#显示别名,用as或者直接跟别名</span>
<span class="token keyword">select</span> name 姓名<span class="token punctuation">,</span>math <span class="token keyword">as</span> 数学成绩<span class="token punctuation">,</span>english <span class="token keyword">as</span> 英文成绩 <span class="token keyword">from</span> stu<span class="token punctuation">;</span>
<span class="token keyword">select</span> name 姓名<span class="token punctuation">,</span>math 数学成绩<span class="token punctuation">,</span>english 英文成绩 <span class="token keyword">from</span> stu<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="条件查询-condition" tabindex="-1"><a class="header-anchor" href="#条件查询-condition" aria-hidden="true">#</a> 条件查询 condition</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">#查询年龄大于20岁的学员信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> age <span class="token operator">></span> <span class="token number">20</span><span class="token punctuation">;</span>

<span class="token comment">#查询年龄大于等于20岁 并且 年龄 小于等于 30岁 的学员信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> age <span class="token operator">>=</span> <span class="token number">20</span> <span class="token operator">&amp;&amp;</span>  age <span class="token operator">&lt;=</span> <span class="token number">30</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> age <span class="token operator">>=</span> <span class="token number">20</span> <span class="token operator">and</span>  age <span class="token operator">&lt;=</span> <span class="token number">30</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> age <span class="token operator">BETWEEN</span> <span class="token number">20</span> <span class="token operator">and</span> <span class="token number">30</span><span class="token punctuation">;</span>

<span class="token comment">#查询入学日期在'1998-09-01' 到 '1999-09-01'  之间的学员信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> hire_date <span class="token operator">BETWEEN</span> <span class="token string">'1998-09-01'</span> <span class="token operator">and</span> <span class="token string">'1999-09-01'</span><span class="token punctuation">;</span>

<span class="token comment">#查询年龄等于18岁 或者 年龄等于20岁 或者 年龄等于22岁的学员信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> age <span class="token operator">=</span> <span class="token number">18</span> <span class="token operator">or</span> age <span class="token operator">=</span> <span class="token number">20</span> <span class="token operator">or</span> age <span class="token operator">=</span> <span class="token number">22</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> age <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">,</span><span class="token number">20</span> <span class="token punctuation">,</span><span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#查询英语成绩为 null或者不为null的学员信息  </span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> english <span class="token operator">is</span> <span class="token boolean">null</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> english <span class="token operator">is</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">;</span>

<span class="token comment">/*    通配符
    _:代表单个任意字符，相当于.
    %:代表任意个数字符，相当于.+
*/</span>
<span class="token comment">#查询姓'马'的学员信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> name <span class="token operator">like</span> <span class="token string">'马%'</span><span class="token punctuation">;</span>

<span class="token comment">#查询第二个字是'花'的学员信息   </span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> name <span class="token operator">like</span> <span class="token string">'_花%'</span><span class="token punctuation">;</span>

<span class="token comment">#查询名字中包含 '德' 的学员信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> name <span class="token operator">like</span> <span class="token string">'%德%'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="排序查询-order-by" tabindex="-1"><a class="header-anchor" href="#排序查询-order-by" aria-hidden="true">#</a> 排序查询 order by</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">#查询学生信息，按照年龄升序排列 </span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">order</span> <span class="token keyword">by</span> age <span class="token punctuation">;</span>

<span class="token comment">#查询学生信息，按照数学成绩降序排列</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">order</span> <span class="token keyword">by</span> math <span class="token keyword">desc</span> <span class="token punctuation">;</span>

<span class="token comment">#查询学生信息，按照数学成绩降序排列，如果数学成绩一样，再按照英语成绩升序排列</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">order</span> <span class="token keyword">by</span> math <span class="token keyword">desc</span> <span class="token punctuation">,</span> english <span class="token keyword">asc</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="统计查询-count" tabindex="-1"><a class="header-anchor" href="#统计查询-count" aria-hidden="true">#</a> 统计查询 count（）</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment"># 统计班级一共有多少个学生,字段不会统计null</span>
<span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span>english<span class="token punctuation">)</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span>

<span class="token comment">#查询数学成绩的最高分</span>
<span class="token keyword">select</span> <span class="token function">max</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span>


<span class="token comment">#查询数学成绩的最低分</span>
<span class="token keyword">select</span> <span class="token function">min</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span>

<span class="token comment">#查询数学成绩的总分</span>
<span class="token keyword">select</span> <span class="token function">sum</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span>

<span class="token comment">#查询数学成绩的平均分</span>
<span class="token keyword">select</span> <span class="token function">avg</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span>

<span class="token comment">#查询英语成绩的最低分</span>
<span class="token keyword">select</span> <span class="token function">min</span><span class="token punctuation">(</span>english<span class="token punctuation">)</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分组查询-group-by" tabindex="-1"><a class="header-anchor" href="#分组查询-group-by" aria-hidden="true">#</a> 分组查询 group by</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">/*
	分组函数
	SELECT 字段列表 FROM 表名 [WHERE 分组前条件限定] GROUP BY 分组字段名 [HAVING 分组后条件过滤]…;
*/</span>
<span class="token comment">#查询男同学和女同学各自的数学平均分</span>
<span class="token keyword">select</span> sex<span class="token punctuation">,</span> <span class="token function">avg</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span> <span class="token keyword">from</span> stu <span class="token keyword">group</span> <span class="token keyword">by</span> sex<span class="token punctuation">;</span>

<span class="token comment">-- 注意：分组之后，查询的字段为聚合函数和分组字段，查询其他字段无任何意义</span>
<span class="token keyword">select</span> name<span class="token punctuation">,</span> sex<span class="token punctuation">,</span> <span class="token function">avg</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span> <span class="token keyword">from</span> stu <span class="token keyword">group</span> <span class="token keyword">by</span> sex<span class="token punctuation">;</span>

<span class="token comment">#查询男同学和女同学各自的数学平均分，以及各自人数</span>
<span class="token keyword">select</span> sex<span class="token punctuation">,</span> <span class="token function">avg</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">from</span> stu <span class="token keyword">group</span> <span class="token keyword">by</span> sex<span class="token punctuation">;</span>

<span class="token comment">#查询男同学和女同学各自的数学平均分，以及各自人数，要求：分数低于70分的不参与分组</span>
<span class="token keyword">select</span> sex<span class="token punctuation">,</span> <span class="token function">avg</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> math <span class="token operator">></span> <span class="token number">70</span> <span class="token keyword">group</span> <span class="token keyword">by</span> sex<span class="token punctuation">;</span>

<span class="token comment">#查询男同学和女同学各自的数学平均分，以及各自人数，要求：分数低于70分的不参与分组，分组之后人数大于2个的。</span>
<span class="token keyword">select</span> sex<span class="token punctuation">,</span> <span class="token function">avg</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> math <span class="token operator">></span> <span class="token number">70</span> <span class="token keyword">group</span> <span class="token keyword">by</span> sex <span class="token keyword">having</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span>  <span class="token operator">></span> <span class="token number">2</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分页查询-limit-by" tabindex="-1"><a class="header-anchor" href="#分页查询-limit-by" aria-hidden="true">#</a> 分页查询 limit by</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">#从0开始查询，查询3条数据</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">limit</span> <span class="token number">0</span> <span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">;</span>

<span class="token comment">#返回第一条数据</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">limit</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">#从21行开始查询，查询10条数据</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">limit</span> <span class="token number">20</span> <span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">;</span>

<span class="token comment">#起始索引 = （当前页码 - 1） * 每页显示的条数</span>
<span class="token comment">#比如我一页显示10条数据，</span>
<span class="token comment">#第一页就是(1-1)*10=0   显示0,9 共十条</span>
<span class="token comment">#第二页就是(2-1)*10=10  显示10,19 共十条</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="内联查询" tabindex="-1"><a class="header-anchor" href="#内联查询" aria-hidden="true">#</a> 内联查询</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="外联查询" tabindex="-1"><a class="header-anchor" href="#外联查询" aria-hidden="true">#</a> 外联查询</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="子查询" tabindex="-1"><a class="header-anchor" href="#子查询" aria-hidden="true">#</a> 子查询</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="mybatis-plus" tabindex="-1"><a class="header-anchor" href="#mybatis-plus" aria-hidden="true">#</a> mybatis plus</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="约束-constraint" tabindex="-1"><a class="header-anchor" href="#约束-constraint" aria-hidden="true">#</a> 约束 constraint</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> emp<span class="token punctuation">;</span>
<span class="token comment">-- 员工表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> emp <span class="token punctuation">(</span>
  id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">auto_increment</span><span class="token punctuation">,</span> <span class="token comment">-- 主键且自增</span>
  ename <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">UNIQUE</span><span class="token punctuation">,</span> <span class="token comment">-- 非空并且唯一</span>
  joindate <span class="token keyword">DATE</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token punctuation">,</span> <span class="token comment">-- 非空</span>
  salary <span class="token keyword">DOUBLE</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token punctuation">,</span> <span class="token comment">-- 非空</span>
  bonus <span class="token keyword">DOUBLE</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token number">0</span> <span class="token comment">-- 默认为0</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>id<span class="token punctuation">,</span>ename<span class="token punctuation">,</span>joindate<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>bonus<span class="token punctuation">)</span> 
         <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">'张三'</span><span class="token punctuation">,</span><span class="token string">'1999-11-11'</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#演示主键约束：非空且唯一</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>id<span class="token punctuation">,</span>ename<span class="token punctuation">,</span>joindate<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>bonus<span class="token punctuation">)</span> 
         <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token boolean">null</span><span class="token punctuation">,</span><span class="token string">'张三'</span><span class="token punctuation">,</span><span class="token string">'1999-11-11'</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>id<span class="token punctuation">,</span>ename<span class="token punctuation">,</span>joindate<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>bonus<span class="token punctuation">)</span> 
          <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">'张三'</span><span class="token punctuation">,</span><span class="token string">'1999-11-11'</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>id<span class="token punctuation">,</span>ename<span class="token punctuation">,</span>joindate<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>bonus<span class="token punctuation">)</span> 
          <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">'李四'</span><span class="token punctuation">,</span><span class="token string">'1999-11-11'</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#演示非空约束</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>id<span class="token punctuation">,</span>ename<span class="token punctuation">,</span>joindate<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>bonus<span class="token punctuation">)</span> 
         <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token boolean">null</span><span class="token punctuation">,</span><span class="token string">'1999-11-11'</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         
<span class="token comment">#演示唯一约束</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>id<span class="token punctuation">,</span>ename<span class="token punctuation">,</span>joindate<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>bonus<span class="token punctuation">)</span> 
         <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">'李四'</span><span class="token punctuation">,</span><span class="token string">'1999-11-11'</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         
<span class="token comment">#演示默认约束</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>id<span class="token punctuation">,</span>ename<span class="token punctuation">,</span>joindate<span class="token punctuation">,</span>salary<span class="token punctuation">)</span> 
          <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">'王五'</span><span class="token punctuation">,</span><span class="token string">'1999-11-11'</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>id<span class="token punctuation">,</span>ename<span class="token punctuation">,</span>joindate<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>bonus<span class="token punctuation">)</span> 
          <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token string">'赵六'</span><span class="token punctuation">,</span><span class="token string">'1999-11-11'</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token boolean">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#演示自动增长：auto_increment：当列是数字类型并且 唯一约束</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>ename<span class="token punctuation">,</span>joindate<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>bonus<span class="token punctuation">)</span> 
          <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token string">'赵六'</span><span class="token punctuation">,</span><span class="token string">'1999-11-11'</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token boolean">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>id<span class="token punctuation">,</span>ename<span class="token punctuation">,</span>joindate<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>bonus<span class="token punctuation">)</span> 
         <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token boolean">null</span><span class="token punctuation">,</span><span class="token string">'赵六2'</span><span class="token punctuation">,</span><span class="token string">'1999-11-11'</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token boolean">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>id<span class="token punctuation">,</span>ename<span class="token punctuation">,</span>joindate<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>bonus<span class="token punctuation">)</span> 
         <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token boolean">null</span><span class="token punctuation">,</span><span class="token string">'赵六3'</span><span class="token punctuation">,</span><span class="token string">'1999-11-11'</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token boolean">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事务" tabindex="-1"><a class="header-anchor" href="#事务" aria-hidden="true">#</a> 事务</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="索引" tabindex="-1"><a class="header-anchor" href="#索引" aria-hidden="true">#</a> 索引</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="视图" tabindex="-1"><a class="header-anchor" href="#视图" aria-hidden="true">#</a> 视图</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="存储过程" tabindex="-1"><a class="header-anchor" href="#存储过程" aria-hidden="true">#</a> 存储过程</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="分表" tabindex="-1"><a class="header-anchor" href="#分表" aria-hidden="true">#</a> 分表</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="主从复制" tabindex="-1"><a class="header-anchor" href="#主从复制" aria-hidden="true">#</a> 主从复制</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="运维" tabindex="-1"><a class="header-anchor" href="#运维" aria-hidden="true">#</a> 运维</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


