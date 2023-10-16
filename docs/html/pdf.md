## 保存pdf缺失
::: tip 现在博客都是使用的vue,导航栏的侧边栏都是默认显示的，如果保存成pdf第二页就会显示不完整。需要使用dom删除或者隐藏。
:::

``` javascript
//注意，如果属性有空格，就替换成.
let recommend= document.querySelector('#home-recommend')
let radius= document.querySelector('.index-pos-box.bgw.mtb15.radius4')
 
recommend.remove()
radius.remove()

//或者 recommend.style.display=none;
//这也是去广告的一种办法
```