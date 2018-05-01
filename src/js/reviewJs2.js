/**
 * Created by ShayPatrickCormac on 2018/5/1.
 */
  function testFor()
{
    var arr = [1,2,3,4,5];
    for (var i=0;i<arr.length;i++)
    {
        document.write(arr[i]+'<br>');
    }

}

function testForIn()
{
    //在JavaScript中，for循环表现形式的还有一种是for ... in循环，它可以把一个对象的所有属性依次循环遍历出来：
    var boy={
        name:'Tony',
        age:28,
        dec:"这是一个傻逼"
    }

    for (var key in boy)
    {
        //遍历获取对象的key
        document.write("对象的key ==="+key+'<br>');
        //根据key的值获取value
        document.write("对象的值为：value==="+boy[key]+'<br>')

    }
    //我们通过for in 循环可以遍历出对象的key和value；由于Array也是对象，而它的每个元素的索引被视为对象的属性，因此，for ... in循环可以直接循环出Array的索引

    //todo  do..while和其他的循环遍历的区别

    //值得注意的是，如果在项目中使用do { ... } while()循环，该循环体至少会执行1次，而for和while循环如果不满足判断条件，则可能一次都不执行。
}

function testEndless() {

/*1）for循环的3个条件都是可以省略的，如果没有退出循环的判断条件，就必须使用break语句退出循环，否则就是死循环：

for循环的无限循环
    2）JavaScript的死循环会让浏览器无法正常显示或执行当前页面的逻辑，有的浏览器会直接挂掉，
    有的浏览器会在一段时间后提示你强行终止JavaScript的执行，因此，要特别注意死循环的问题。*/
var x=0;
 for (;;)
 {
     x++;
     document.write(x+'<br>');
 }

}

function testJsMap()
{

   /* 我们知道，在Java中，Map是一个抽象接口，它是通过键（key）和值( value )映射。我们可以通过键来获取值。在JavaScript中，
    初始化Map需要一个二维数组，或者直接初始化一个空Map。

Map初始化
    跟java一样，既然是map，肯定可以给他设置key设置value（put(Object key, Object value)）；根据key去获取value，那么，在JavaScript中，
    map新增key和设置value是通过set去进行操作的，取value的值是通过get进行操作的，如下图：*/


    var testMap = new Map();
    testMap.set('a',1);
    var b = testMap.get('a');
    alert("得到的值为"+b)

    /*那么，我们如何判断key是否存在；或者这个key不存在，我们取value值会如何显示；如何删除key？JavaScript对这些问题是如何做的？
    判断key是否存在，通过has去判断；删除key通过delete去操作；如果map中没有这个key，我们通过这个不存在的key去取值，
    JavaScript会提示我们这个属性undefined*/

    //确定ke'y的值是否存在
    var hasA = testMap.has('a');
    if (hasA)
    {
        document.write("a作为key存在");//打印出来了
    }

    //删除key
    testMap.delete('a');
    var aValue = testMap.get('a');
    document.write("a作为key存在已经被删除，那么没有ke'y的属性为"+aValue+'<br>');//打印出来了

}

function testSet()
{
    var testSet = new Set([1,2,2,3,'3']);
    testSet.add('haha');
    //可以重复添加，但是不会有效果
    testSet.add('haha');
    //通过delete(key)方法可以删除元素
    testSet.delete(2);
    alert(testSet)

}

function testItreateMap()
{

  /*  for ... in循环
    通过两幅图（for ... of与for ... in）的对比我们可以有以下结论：

1)for...in循环，它遍历的实际上是对象的属性名称。由于一个Array数组也是一个对象，数组中的每个元素的索引被视为属性名称，所以我们可以看到使用for...in循环Array数组时，拿到的其实是每个元素的索引。（参考的一些博客声称for ... in这是历史遗留问题，因为设计之初不可能面面俱到，都是通过版本维护和升级不断完善）

2）for ... in循环不能使用Set、Map

    3）for ... of循环则完全修复了这些问题，它只循环集合本身的元素,本质上算是对for ... in 的一种功能升级*/


    var map = new Map([[1,"x"],[2,'y'],[3,'z']]);

    //遍历map
    for (var x of map)
    {
        //x[0]是key，x[1]是value
        document.write("遍历map"+x[0]+'='+x[1]+'<br>');

    }

}


function testForEach()
{
    var map = new Map([[1,"x"],[2,'y'],[3,'z']]);
    map.forEach(function (element,index,map)
    {
      document.write("增强for循环，元素值=="+element+"索引值 index=="+index+'<br>')
    })

}
