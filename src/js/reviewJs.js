/**
 * Created by ShayPatrickCormac on 2018/5/1.
 */


function test()
{
    alert("这是一个dialog")
}

function testNumber()
{
    //JavaScript不区分整数和浮点数，统一用Number表示，以下都是合法的Number类型：
    520;//整数
    0.456;//浮点数
    1.23564e3;//科学计算发表示1.23564*1000
    -99;//负数
    NaN;//not a number 当无法计算结果时用NaN表示
    Infinity;//无限大，当数量超过了JS的Number所能表示的最大值时，用这个表示
}

function testChar()
{
    //字符串是以单引号'或双引号"括起来的任意文本，比如'java'(这里是单引号)，"android"（这里是双引号） 等等。请注意，'  '或 "  "
    // 本身只是一种表示方式，并不是字符串的一部分。因此，字符串' abc '只有a，b，c这3个字符。（字符 穿成串 就是字符串）
    'adb';
    "abc";

}

function testBoolean()
{
   /* 布尔类型的使用注意：

要特别注意相等运算符 == 。JavaScript在设计时，有两种比较运算符：

第一种是 == 比较，它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果；

第二种是 === 比较，它不会自动转换数据类型，如果数据类型不一致，返回false，如果一致，再比较。

由于JavaScript这个设计缺陷，不要使用==比较，我们应该严谨的坚持使用 === 比较。

另一个例外是NaN这个特殊的Number与所有其他值都不相等，包括它自己，唯一能判断NaN的方法是通过isNaN()函数：*/

   //alert('a'==="a");//true

    //浮点数的比较，比较坑爹，正确的姿势是绝对值相减小于一个阈值
    if (1/3 ===(1-2/3))
    {
        alert("相等");
    }else
    {
        alert('mmp，竟然不相等，你逗我'); //不想等的
    }

  /*  看到这里你是不是觉得很纳闷， （1 - 2 / 3）不就是等于 1 / 3 嘛？JavaScript居然显示不等于。。。

首先，这不是JavaScript的设计缺陷。这是因为浮点数在运算过程中会产生误差，因为计算机无法精确表示无限循环小数。要比较两个浮点数是否相等，
    只能计算它们之差的绝对值，看是否小于某个阈值，比如我们把代码改成这样*/

  if (Math.abs(1/3 -(1-2/3))<0.00000001)
  {
      alert("近似相等");
  }else
  {
      alert("不想等");
  }
}

function testNullAndUndefine()
{
   /* null表示一个“空”的值，它和0以及空字符串''不同，0是一个数值类型，' '表示长度为0的字符串，而null表示“空”。
    例如Java中，对没有实例化的对象，这个对象也就是null，使用这个没有实例化的对象里面的方法就会抛出 NullPonitException。。
。在JavaScript中，还有一个和null类似的， 它叫undefined，它表示“未定义”。事实证明，两者区分的意义不大。
（或者这是中西文化理解差异的一种体现，比如，在考四六级把温泉翻译成 hot water，把药草翻译成 medic grass 等等）大多数情况下，
    我们都应该用null。undefined仅仅在判断函数参数是否传递的情况下有用。*/


    alert(null===undefined);//false

}

function testArray()
{
   /* 数组是一组按顺序排列的集合，集合的每个值称为元素。JavaScript的数组可以包括任意数据类型。记住，这里是任意数据类型，记住，
    这里是任意数据类型，JavaScript的数组索引的起始值为0。 从0开始，而且是任意类型，不存在泛型之说*/
   var arr=[520,-51.23,'zhangsan',null,false];
   var c=arr[3];
   var b=arr[5];
  alert(c+'---'+b);
  alert(arr.length);
}


function testVar()
{
    /*变量在JavaScript中就是用一个变量名表示，变量名是大小写英文、数字、$和_的组合，且不能用数字开头。变量名也不能是JavaScript的关键字
，如if、while等。申明一个变量用var语句*/
    var  a;//申明了变量a，但由于没有赋值，所以为undefined
    var $b=1;//申明了变量$b，同时给起赋值，
    var n=null;//n的值是null

    /*在JavaScript中，使用等号=对变量进行赋值。可以把任意数据类型赋值给变量，同一个变量可以反复赋值，而且可以是不同类型的变量，
    但是要注意只能用var申明一次，只能用var申明一次，例如：*/
    var a =123;
    a='我TM的又变成字符串了，好噶哈哈哈';
    alert('变量a是个什么东西？：'+a);


    /*JavaScript在设计之初，为了方便初学者学习，并不强制要求用var申明变量。这个设计错误带来了严重的后果：
    如果一个变量没有通过var申明就被使用，那么该变量就自动被申明为全局变量：*/
    i=10;
    /*使用var申明的变量则不是全局变量，它的范围被限制在该变量被申明的函数(也叫 方法 )体内，同名变量在不同的函数体内互不冲突。

为了修补JavaScript这一严重设计缺陷，ECMA在后续规范中推出了strict模式，在strict模式下运行的JavaScript代码，强制通过var申明变量，
    未使用var申明变量就使用的，将导致运行错误。

启用strict模式的方法是在JavaScript代码的第一行写上：

' use strict ' ;

    这是一个字符串，不支持strict模式的浏览器会把它当做一个字符串语句执行，支持strict模式的浏览器将开启strict模式运行JavaScript。
    所以，为了解决这个问题，我们最好严格要求自己，使用 var 变量进行对应的编码开发。*/

    /*JavaScript 变量的生命周期：

JavaScript 变量的生命期从它们被声明的时间开始。

局部变量会在函数运行以后被删除。

全局变量会在页面关闭后被删除。*/


}



function testObject()
{

    /*那么JavaScript的对象是什么？

首先，当我们这样声明一个 JavaScript 变量时：

var h = "Hello Word" ; 实际上已经创建了一个 JavaScript 字符串对象。JavaScript 中的几乎所有事务都是对象：字符串、数字、数组、
    日期、函数，等等。我们也可以自定义自己的对象。

JavaScript的自定义对象是一组由键-值（key - value）组成的无序集合，*/

    var person={
        name:'阿泰尔',
        age:26,
        score:22.5,
        tags:['混蛋','zhangsan',12,null,undefined],
    zipCode:null
    }
    alert('js中的自定义对象：person'+person.name+person.tags);


   /* 首先，JavaScript对象的键都是字符串类型，值可以是任意数据类型。上述person对象一共定义了6个键值对，其中每个键又称为对象的属性，
    例如，person的name属性为' tanzuowu '，age属性为26。要获取一个对象的属性，用  对象变量 . 属性名 的方式即可获取。*/





}
