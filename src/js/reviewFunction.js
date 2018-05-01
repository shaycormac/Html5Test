/**
 * Created by ShayPatrickCormac on 2018/5/1.
 */
//复习js的函数

//如果没有return语句，函数执行完毕后也会返回结果，只是结果为undefined。

//特别注意：JavaScript有一个在行末自动添加分号的机制，这可能让你栽到return语句的一个大坑，
//如果把return语句拆成两行（也就是 return放在单独的一行）,

function test1()
{
    return{name:'f'};
    //打印结果 f

}

function testKeng()
{
    //要小心了，由于JavaScript在行末会自动为我们添加分号

    return// 自动添加了分号，相当于return undefined ; { name : 'f' };// 这行语句已经没法执行到了 }

    {name:'f'};
    //打印结果 undefine

}

//方式二 匿名函数
/*在这种方式下，function (x) { ... }是一个匿名函数，它没有函数名。但是，这个匿名函数赋值给了变量methodName，所以，通过变量 methodName 就可以调用该函数。

上述两种定义完全等价，注意第二种方式按照完整语法需要在函数体末尾加一个 ; （分号），表示赋值语句结束。*/

//传参风险，传多个参数的话，对于这个例子，只使用第一个参数，不传参数的话，得到的结果，undefined
var methodName = function (x)
{
    if (x>=0)
    {
        return x+1;
    }else
    {
        return x;
    }

};
//规避传参风险
//如何规避这种传参的风险？

/*我们能否在执行函数前，对参数进行一些检查：

JavaScript为了解决在函数使用前对参数进行一些检查，提供了一个关键字，叫 arguments，它只在函数内部起作用，
并且永远指向当前函数的调用者传入的所有参数。arguments类似Array但它不是一个Array，利用arguments，我们可以获得调用者传入的所有参数。
也就是说，即使函数不定义任何参数，还是可以拿到参数的值*/

var avoidArgumentMethod = function (x)
{
    //通过关键字argument规避参数风险
    for (var i=0;i<arguments.length;i++)
    {
        document.write("arguments =="+arguments[i]+'<br>')

    }
    //可以在上面的关键字argument进行校验
    if (x>=0)
    {
        return x+1;
    }else
    {
        return x;
    }


};

var constance='全局变量';
//alert(constance);
//JavaScript默认有一个全局对象window，全局作用域的变量实际上被绑定到window的一个属性，既然是绑定在window中，
// 我们就可以直接使用
alert(window.constance);




