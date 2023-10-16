# mysql
[[toc]]
## 创建表 create table 
``` sql
# 用户表
create table tb_user(
	id int ,
	username varchar(20),
	password varchar(32)
);

# 学生表
create table tb_stu(
	id int ,-- 编号
	name varchar(10),-- 姓名
	gender char(1),-- 性别
	birthday date,-- 生日
	score double(5,2) ,-- 分数
	email varchar(64),-- 邮箱
	tel varchar(20),-- 手机号
	status tinyint-- 状态
);
```
## 插入表 insert into val
``` sql
#字段和值一一对应
insert into stu (id, NAME)
values
            	(1, '张三');
	
#省略列名
insert into stu
values
	(
		2,
		'李四',
		'男',
		'1999-11-11',
		88.88,
		'lisi@itcast.cn',
		'13888888888',
		1
	);	
```

## 修改表 update set
``` sql
#不加where会全部修改
update stu set sex = '女' where name = '张三';
```


## 删除表 delete from
``` sql
delete from stu where name = '张三';
#删除全部
delete from stu;
```

## 查询表 select from
``` sql
# 查询name、age两列
select name,age from stu;         

#查询所有列
select * from stu;  

#去重
select distinct name from stu;

#显示别名,用as或者直接跟别名
select name 姓名,math as 数学成绩,english as 英文成绩 from stu;
select name 姓名,math 数学成绩,english 英文成绩 from stu;
```


### 条件查询 condition
``` sql
#查询年龄大于20岁的学员信息
select * from stu where age > 20;

#查询年龄大于等于20岁 并且 年龄 小于等于 30岁 的学员信息
select * from stu where age >= 20 &&  age <= 30;
select * from stu where age >= 20 and  age <= 30;
select * from stu where age BETWEEN 20 and 30;

#查询入学日期在'1998-09-01' 到 '1999-09-01'  之间的学员信息
select * from stu where hire_date BETWEEN '1998-09-01' and '1999-09-01';

#查询年龄等于18岁 或者 年龄等于20岁 或者 年龄等于22岁的学员信息
select * from stu where age = 18 or age = 20 or age = 22;
select * from stu where age in (18,20 ,22);

#查询英语成绩为 null或者不为null的学员信息  
select * from stu where english is null;
select * from stu where english is not null;

/*    通配符
    _:代表单个任意字符，相当于.
    %:代表任意个数字符，相当于.+
*/
#查询姓'马'的学员信息
select * from stu where name like '马%';

#查询第二个字是'花'的学员信息   
select * from stu where name like '_花%';

#查询名字中包含 '德' 的学员信息
select * from stu where name like '%德%';
```

### 排序查询 order by
``` sql
#查询学生信息，按照年龄升序排列 
select * from stu order by age ;

#查询学生信息，按照数学成绩降序排列
select * from stu order by math desc ;

#查询学生信息，按照数学成绩降序排列，如果数学成绩一样，再按照英语成绩升序排列
select * from stu order by math desc , english asc ;
```

### 统计查询 count（）
``` sql
# 统计班级一共有多少个学生,字段不会统计null
select count(id) from stu;
select count(english) from stu;
select count(*) from stu;

#查询数学成绩的最高分
select max(math) from stu;


#查询数学成绩的最低分
select min(math) from stu;

#查询数学成绩的总分
select sum(math) from stu;

#查询数学成绩的平均分
select avg(math) from stu;

#查询英语成绩的最低分
select min(english) from stu;
```

### 分组查询 group by
``` sql
/*
	分组函数
	SELECT 字段列表 FROM 表名 [WHERE 分组前条件限定] GROUP BY 分组字段名 [HAVING 分组后条件过滤]…;
*/
#查询男同学和女同学各自的数学平均分
select sex, avg(math) from stu group by sex;

-- 注意：分组之后，查询的字段为聚合函数和分组字段，查询其他字段无任何意义
select name, sex, avg(math) from stu group by sex;

#查询男同学和女同学各自的数学平均分，以及各自人数
select sex, avg(math),count(*) from stu group by sex;

#查询男同学和女同学各自的数学平均分，以及各自人数，要求：分数低于70分的不参与分组
select sex, avg(math),count(*) from stu where math > 70 group by sex;

#查询男同学和女同学各自的数学平均分，以及各自人数，要求：分数低于70分的不参与分组，分组之后人数大于2个的。
select sex, avg(math),count(*) from stu where math > 70 group by sex having count(*)  > 2;
```


### 分页查询 limit by
``` sql
#从0开始查询，查询3条数据
select * from stu limit 0 , 3;

#返回第一条数据
select * from stu limit 1;

#从21行开始查询，查询10条数据
select * from stu limit 20 , 10;

#起始索引 = （当前页码 - 1） * 每页显示的条数
#比如我一页显示10条数据，
#第一页就是(1-1)*10=0   显示0,9 共十条
#第二页就是(2-1)*10=10  显示10,19 共十条
```


### 内联查询 
``` sql

```

### 外联查询 
``` sql

```


### 子查询 
``` sql

```


## mybatis plus

###  where
- eq(pojo::getXX,传入的数据)
- select * from employee where username = ?
``` java
 LambdaQueryWrapper<Employee> em = new LambdaQueryWrapper<>();
 
    em.eq(Employee::getUsername,employee.getUsername());
    Employee one = employService.getOne(em);
```
``` sql
==> Preparing: SELECT * FROM employee WHERE (username = ?)
==> Parameters: admin(String)
<== Columns: id, username, name, password, phone, sex, id_number, status, create_time, update_time, create_user, update_user
<== Row: 1, admin, 管理员, e10adc3949ba59abbe56e057f20f883e, 13812312312, 1, 110101199001010047, 1, 2021-05-06 17:20:07, 2021-05-10 02:24:09, 1, 1
```

###  select
``` java
em.select(Employee::getPassword,Employee::getStatus,Employee::getId)
  .eq(Employee::getUsername,employee.getUsername());
```
``` sql
==> Preparing: SELECT password,status,id FROM employee WHERE (username = ?)
==> Parameters: admin(String)
<== Columns: password, status, id
<== Row: e10adc3949ba59abbe56e057f20f883e, 1, 1
```

### 查询一条
``` java
    Employee one = employService.getOne(em);
```
``` sql
==> Preparing: SELECT password,status,id FROM employee WHERE (username = ?)
==> Parameters: admin(String)
<== Columns: password, status, id
<== Row: e10adc3949ba59abbe56e057f20f883e, 1, 1
```

### 排序查询列表
``` java
//不使用条件构建器，quary接条件（排序），list返回所有列表
typeService.query().orderByAsc("sort").list();
```

### 分页查询
``` java
employService.page(pageInfo,queryWrapper);
```

``` sql
==>  Preparing: SELECT id,username,name,password,phone,sex,id_number,status,create_time,update_time,create_user,update_user FROM employee ORDER BY update_time DESC LIMIT ?
==> Parameters: 10(Long)
<==    Columns: id, username, name, password, phone, sex, id_number, status, create_time, update_time, create_user, update_user
<==        Row: 1590552074041061378, 12456, 大苏打的, e10adc3949ba59abbe56e057f20f883e, 15989563654, 1, 522369856321455, 0, 2022-11-10 11:49:00, 2023-05-20 21:15:15, 1, 1
```



### 增加一条
``` java
employService.save(employee);
```

``` sql
==>  Preparing: INSERT INTO employee ( id, username, name, password, phone, sex, id_number, create_time, update_time, create_user, update_user ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
==> Parameters: 1659814404851425282(Long), 14576686967(String), 红米(String), e10adc3949ba59abbe56e057f20f883e(String), 13885963696(String), 1(String), 522365666656321(String), 2023-05-20T14:52:46.634400100(LocalDateTime), 2023-05-20T14:52:46.634400100(LocalDateTime), 1(Long), 1(Long)
<==    Updates: 1
```

### 修改一条
``` java
employService.updateById(employee);
```

``` sql
==>  Preparing: UPDATE employee SET username=?, name=?, password=?, phone=?, sex=?, id_number=?, status=?, create_time=?, update_time=?, create_user=?, update_user=? WHERE id=?
==> Parameters: 12456(String), 大苏打的(String), e10adc3949ba59abbe56e057f20f883e(String), 15989563654(String), 1(String), 522369856321455(String), 0(Integer), 2022-11-10T11:49(LocalDateTime), 2023-05-20T21:15:14.822169200(LocalDateTime), 1(Long), 1(Long), 1590552074041061378(Long)
<==    Updates: 1
```
























## 约束 constraint
``` sql
DROP TABLE IF EXISTS emp;
-- 员工表
CREATE TABLE emp (
  id INT PRIMARY KEY auto_increment, -- 主键且自增
  ename VARCHAR(50) NOT NULL UNIQUE, -- 非空并且唯一
  joindate DATE NOT NULL , -- 非空
  salary DOUBLE(7,2) NOT NULL , -- 非空
  bonus DOUBLE(7,2) DEFAULT 0 -- 默认为0
);

INSERT INTO emp(id,ename,joindate,salary,bonus) 
         values(1,'张三','1999-11-11',8800,5000);

#演示主键约束：非空且唯一
INSERT INTO emp(id,ename,joindate,salary,bonus) 
         values(null,'张三','1999-11-11',8800,5000);
         
INSERT INTO emp(id,ename,joindate,salary,bonus) 
          values(1,'张三','1999-11-11',8800,5000);
          
INSERT INTO emp(id,ename,joindate,salary,bonus) 
          values(2,'李四','1999-11-11',8800,5000);

#演示非空约束
INSERT INTO emp(id,ename,joindate,salary,bonus) 
         values(3,null,'1999-11-11',8800,5000);
         
#演示唯一约束
INSERT INTO emp(id,ename,joindate,salary,bonus) 
         values(3,'李四','1999-11-11',8800,5000);
         
#演示默认约束
INSERT INTO emp(id,ename,joindate,salary) 
          values(3,'王五','1999-11-11',8800);
          
INSERT INTO emp(id,ename,joindate,salary,bonus) 
          values(4,'赵六','1999-11-11',8800,null);

#演示自动增长：auto_increment：当列是数字类型并且 唯一约束
INSERT INTO emp(ename,joindate,salary,bonus) 
          values('赵六','1999-11-11',8800,null);
          
INSERT INTO emp(id,ename,joindate,salary,bonus) 
         values(null,'赵六2','1999-11-11',8800,null);
         
INSERT INTO emp(id,ename,joindate,salary,bonus) 
         values(null,'赵六3','1999-11-11',8800,null);

```

## 事务 Transaction
``` sql

```

## 索引 Index
``` sql

```

## 视图 View
``` sql

```
## 存储过程 Stored Procedure
``` sql

```



## 分表 Sharding
``` sql

```
## 主从复制 Master-Slave Replication
``` sql

```


## 运维 Operations and Maintenance
``` sql

```
















