/**
 * Created by ShayPatrickCormac on 2018/5/1.
 */

/*JavaScript实际上有一个全局作用域。任何变量（函数也视为变量），如果没有在当前函数作用域中找到，就会继续往上查找
最后如果在全局作用域中也没有找到，则报ReferenceError错误（也就是类似我们java的空指针）。

老司机可能会说，上面说到了，全局变量会绑定到window上。如果不同的JavaScript文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，
这种情况该怎么处理？
解决办法：减少命名冲突的一个有效方法是把 自己的所有变量和函数全部绑定到一个全局变量中。*/

var INFO={};
INFO.name='myinfo';
INFO.version=1.0;
//其他函数
INFO.test = function (x) {
    return 'mySelfTest';
};


/*JavaScript的方法定义有个特点，它首先会先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部，第三行的 var x = 'Hello, ' + y ;
 这一行并没有报错，原因是变量y在稍后申明了。但是console.log 显示 Hello, undefined，说明变量 y 的值为undefined。这正是因为JavaScript引擎自动提升了变量y的声明，
但不会提升变量y的赋值。因此我们在方法内部定义变量时，请严格遵守“在方法内部首先申明所有变量，然后在使用”这一开发原则。*/

function getAge()
{
    var y = new Date().getFullYear();
    return y-this.birth;

}

var objectTest =
    {
        name:"谢伊寇马克",
        birth:2008,
        age:getAge
    };
//document.write("今年是=="+objectTest.age()+"<br>");
//document.write("今年是=="+getAge()+"<br>");

/*概念一：

在一个方法内部，this是一个特殊变量，它始终指向当前对象，也就是objec这个变量。所以，this.birth可以拿到objec的birth属性。*/

/*
概念二：

如果以对象的方法形式调用，比如 objec.age()，该函数的this指向被调用的对象，也就是objec，这是符合我们预期的。

如果单独调用函数，比如getAge()，此时，该函数的this指向全局对象，也就是window。
*/

//使用apply函数解决this指针混乱问题
document.write("apply今年是=="+getAge.apply(objectTest,[])+"<br>");


