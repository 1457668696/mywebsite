[[toc]]
## 集合
### ArrayList
``` java
//底层为数组，在添加第一个元素的时候，默认先创建一个长度为10的数组。size是数组的位置（个数），每加一个就往后移动一位，当size到达10以后就会执行grow()方法，扩容1.5倍。
//插入元素，首先指针往后移动一位，往后赋值，再插入对应的元素。
//删除元素，指针往前移动一位，然后互相赋值即可。
public class ArrayList1 {
    public static void main(String[] args) {
        List<String> list= new ArrayList<>();
        list.add("java");
        list.add("Java");
        list.add("MySql");
        list.add("程序语言");

        list.add(2,"html");
        //根据索引增加元素
        
        list.remove(3);
        //根据索引删除元素，返回的是元素本身

        System.out.println(list.get(0));
        //索引取值

        System.out.println( list.set(0,"我才是第一个") );
        //根据索引修改值，返回的是之前的元素
        
       //for循环
        for (int i = 0; i < list.size(); i++) {                  
            System.out.println(list.get(i));
        }

        //增强for
        for (String s : list) {                                
            System.out.println(s);
        }

        //迭代器，迭代子iterator
        Iterator<String> it = list.iterator();
        while (it.hasNext()){
            String s= it.next();
            System.out.println(s);
        }
        
        //foreach
        //最原始
         list.forEach(new Consumer<String>() {            //匿名接口类
           @Override
           public void accept(String s) {
               System.out.println(s);
           }
       });

        //简化1
        list.forEach(s -> {
            System.out.println(s);
        });
        
        //简化2
        list.forEach(s -> System.out.println(s));   //简化代码
        
        //简化3
        list.forEach(System.out::println); 
    }
    
    //并发修改异常
     Iterator<String> iterator = list.iterator();
        //使用迭代器删除元素，
        while (iterator.hasNext()) {
            String s = iterator.next();
            if ("你好".equals(s)) {
                  //list.remove("你好");
                  // 这样删有风险,并发修改异常
                iterator.remove();
                //使用迭代器自身方法删除当前元素，内部有自减逻辑，指针往后移动一位
            }
        }
        System.out.println(list);
        //foreach和lambda也会报错，无法解决

        for (int i = 0; i < list.size(); i++) {
            //使用for循环，可以倒着或者正着减减
            String s=list.get(i);
            if("大家好".equals(s)){
                list.remove("大家好");
                i--;
            }
    
        Object[] objects = list.toArray();
        //集合转成数组
        System.out.println(objects);
        Arrays.asList(list);
        //数组转集合，这里不用list对象哦
        System.out.println(list);
}
```

### LinkedList
``` java
public class LinkList1 {
    public static void main(String[] args) {
        //首尾操作极快，双链表加数组
        List<String> link = new LinkedList<>();
        //使用List多态无法使用独有方法,在多态中，继承，重写，向上转型即（父类引用指向子类对象），只能调用到来自父类的属性／行为，这是编译阶段在，要确认父类是不是有子类中重写的方法。即在父类的角度看子类，所有动物都可以玩游戏。因为这是向上转型（把小的赋值给大），把子类的对象地址指向了父类，可以通过这个父类引用调用共有的方法，，如果父类没有这个方法那就会编译报错，不过向下转型（子类引用指向父类对象，父类赋值给子类引用，就可以先通过子类中的方法，）就可以了，
        List<String> link2= new  ArrayList<>();

        //LinkedList link3=(LinkedList) link2;
        //强转的弊端
        //把Array强转成Link编译不报错，但是这俩不是子类继承关系，所以无法强行转换，应该做一个判断。
        if(link instanceof LinkedList) {
        
            //栈实现
            LinkedList link1=(LinkedList)link;
            link1.addFirst("第一个");
            //栈，弹夹，先进后出
            link1.addFirst("第二个");
            //push内部有addF方法
            link1.addFirst("第三个");
            link1.addFirst("第四个");
            System.out.println(link1.getFirst());
            System.out.println(link1.removeFirst());
            
            //pop内部也有ref方法,取出并移除掉
            //link3.addFirst("第五个");
        } else if (link instanceof ArrayList) {
            ArrayList<String> a= new ArrayList<>();
            a.add("dd");
            System.out.println(a);
        }
            
        //队列实现
        LinkedList<String> queue = new LinkedList<>();
        //排队从最后一个开始排
        queue.addLast("1号");
        queue.addLast("2号");
        queue.addLast("3号");
        queue.addLast("4号");
        System.out.println(queue);
        //离开从第一个离开
        System.out.println(queue.removeFirst());
        System.out.println(queue);
    }
```

### HashMap
``` java
public static void main(String[] args) {
        Map<String, Integer> m = new HashMap<>();
        //无序、不重复（键）、无索引，值不做要求。重复的值会覆盖
        Map<String, Integer> a = new LinkedHashMap<>();
        //有序
        Map<String, Integer> z = new TreeMap<>();
        //可排序
        
        m.put("特步", 50);
        m.put("鸿星尔克", 50);
        m.put("阿迪达斯", 60);
        m.clear();
        System.out.println(m.isEmpty());
        System.out.println(m.get("特步"));
        m.remove("阿迪达斯");
        //移除键，值也会消失
        System.out.println(m);
        System.out.println(m.containsKey("鸿星尔克"));
        System.out.println(m.containsValue(60));
        
        Set<String> strings = m.keySet();
        //取得键的集合，并把他赋给集合Set，都是无序，不重复，无索引
        Collection<Integer> values = m.values();
        //取得值的集合，赋值给Collection，是可重复的

        System.out.println(m.size());
        //集合大小
        m.putAll(m2); 把m2集合添加到m中，后来的会覆盖原来的。

        //1.键找值
        Set<String> strings1 = m.keySet();
        //把键的集合赋给Set集合
        for (String s : strings1
        ) {
            int value = m.get(s);
            System.out.println(s + value);
        }

        //2.把Map的元素作为一个对象封装到Set里面
        Set<Map.Entry<String, Integer>> entries = m.entrySet();
          for (Map.Entry<String, Integer> entry:entries){
          String key=entry.getKey();
          int value=entry.getValue();
          System.out.println(key+value);
  
        //foreach遍历，内部有entry遍历
        m.forEach(new BiConsumer<String, Integer>() {
        
            @Override
            public void accept(String s, Integer integer) {
                System.out.println(key+value);
            }
        });
```