/**
 * Created by ShayPatrickCormac on 2018/5/1.
 */
//使用高阶函数装装逼

var arr=[1,2,3,4,'dd'];

function square(x)
{
    return x*x;

}

var mapFunction = arr.map(square);
console.log(mapFunction);
