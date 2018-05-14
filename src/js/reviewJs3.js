//JavaScript基础学习 闭包，箭头函数

/*
在说到闭包以前，我们先复习下JavaScript中的变量作用域。JavaScript中变量的作用域无非就是两种：全局变量和局部变量。
需要注意的是，函数内部可以直接读取全局变量；但是在函数外部无法直接读取函数内的局部变量。*/

//需要注意！！！函数内部声明变量的时候，一定要使用var。如果不用的话，你实际上声明了一个全局变量！

function testVar()
{
    //提醒你了，局部变量一定要带上var
    data = 'not use var';

}

//闭包 有权访问另一个函数作用域内变量的函数都是闭包
//function的时候，希望从外部访问函数内部的变量，但是一般情况下是访问不了，这时候我们就会在这个函数内部继续定义一个子函数，
// 因为子函数可以访问外部函数的变量。所以我们就可以将子函数作为结果返回，达到外部访问函数内部变量的效果。

function testClosure() {
    var data = 'test 闭包！!!!';

    function useClosure()
    {
        //可以在这里面使用外部函数的局部变量
        alert(data);
    }
    //将子函数返回出去，相当于把这个局部变量带出去了
    return useClosure();
}

//闭包需要注意的是，循环的变量不要用，使用自己带的一个值
//坑
function count() {
    var arr =[];
    for (var i = 0; i <= 3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

//结果全部是返回的
//你可能认为调用f1()，f2()和f3()结果应该是1，4，9，但实际结果是：却是3个16，那么这种原因是什么导致的？
// 原因就在于返回的函数引用了变量 i，但它并非立刻执行。等到3个函数都返回时，它们所引用的变量 i 已经变成了4，因此最终结果为（4 * 4 = 16）
console.log(f1());
console.log(f2());
console.log(f3());

//正确姿势
//返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量。
//解决办法就是再创建一个函数，用该函数的参数绑定循环变量当前的值，无论该循环变量后续如何更改，已绑定到函数参数的值不变，这样就可以有效解决上面的问题
function correctCount() {
    var arr = [];
    for (var i = 0; i <=3; i++)
    {
        arr.push((function (n)
        {
            return function () {
                return n * n;
            }

        })(i));

    }
    return arr;
}

var results = correctCount();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];
console.log(f1());
console.log(f2());
console.log(f3());

//还有一点需要注意的是，由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，
// 否则会造成网页的性能问题，在IE中可能导致内存泄露。这种问题的解决方法是，在退出函数之前，将不使用的局部变量全部删除

//箭头函数
//但是在ES6标准之后，引入了箭头函数这一个新概念，这个箭头函数是帮助我们语法简

//普通的加法
function addNumber(n) {
    return n + 2;
}

var data = addNumber(2);
console.log("函数的和 ==" + data);

//转换成箭头函数后
var arrowData = (params) => params + 2;
console.log('箭头函数的和 == ' + arrowData(2));

//获取函数的运算结果，一定要带上括号

//无参的箭头函数写法
var demo1 = () => {

    return '没参的箭头函数写法';
};
//有一个参数的方法见上面

//有两个参数的写法
var arrowTwoParams = (x, y) => x + y;
console.log('有两个参数的箭头写法 == ' + arrowTwoParams(2,5));

//4：函数体多条语句判断的两种写法对比（注意：箭头函数在这里需要用到大括号）
var arrData = (x, y) => {
    if (x > y) {
        return x + ' 大于 ' + y;
    } else {
        return x + ' 小于等于 ' + y;
    }
};
var number = arrData(3, 1);
console.log('有两个参数 函数体语句 箭头函数写法 ' + number);

//1、箭头函数没有自己的this。箭头函数会捕获其所在上下文的 this 值，作为自己的 this 值。 
//
// 2、箭头函数 this 不可变。call()、apply()、bind()、这些方法也 无法改变 箭头函数 this 的指向。
//
// 3、箭头函数 不能用 new 关键字来实例化对象，不然会报错。 
//
// 4、箭头函数没有arguments对象
//
// 作者：骑小猪看流星
// 链接：https://www.jianshu.com/p/4c53bc956a09
// 來源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。




