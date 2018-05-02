
//map .reduce ,filter的函数学习
//实现将普通的数组变成字符串数组
function arr2String(array)
{
    var arr =array;
    var stringArray = arr.map(String);
    console.log(stringArray);

}

//将数组内的字符串，各元素变为首字母大写的字符串数组
//注意，map返回的是一个新的数组，原来的数组不变
function firstCharUpperCase(array)
{
    var arr = array;
   var result =  arr.map(function (str) {
        return str[0].toUpperCase()+str.substring(1).toLowerCase();
    });
    console.log(result);
}

//将字符串数组转换成int数组
function String2Int(array)
{
    var arr = array;
    var result = arr.map(function (item) {
        //ascll 码转换？
        return item - '0';
    });
    console.log(result);

}

//reduce的使用
function reduceAdd(array)
{
    //数组内的两辆之和，如果是偶数，正好，如果不是，最后一个单独为一个呗。
    var arr = array;
    var result = arr.reduce(function (x,y)
    {
        return x + y;
    })
    console.log('数组的元素之和：'+result);
}
//filter 过滤
/*
filter关键字也是一个常用的操作，它用于把Array的某些元素过滤掉，然后返回剩下的元素。和map()类似，
Array的filter()也接收一个函数。和map()不同的是，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素*/

//过滤掉数组的奇数
function filterOdd(array)
{
    var arr = array;
    var data = arr.filter(function (x)
    {
        //为true则干掉数组里的这个值，为false则保留这个值。
        return x % 2 === 0;
    });
    console.log('过滤后的数组为：'+data);

}
//利用filter去掉数组中重复的元素
//filter()接收的函数，其实可以有多个参数。上面的例子仅使用了第一个参数，表示Array的某个元素。这个函数还可以接收另外两个参数，表示元素的位置和数组本身：
function filterRepeatElement(array)
{
    var arr = array;
    var result =arr.filter(function (element,index,self)
    {
        return self.indexOf(element) === index;

    })

}

//排序算法sort的学习
function sortDefault(array)
{
    var tmpArray = array;
    var resultArray = tmpArray.sort();
    console.log(resultArray);
    //原来是[1,22,10,20]
    // 结果是 [1,10,2,22]
    //有问题
    //原因
    /*因为Array的sort()方法默认把所有元素先转换为String再排序，结果'10'排在了'2'的前面，因为字符'1'比字符'2'的ASCII码小。
    但是，sort()方法也是一个高阶函数，它可以接收一个比较函数来实现自定义的排序。也就是说我们可以自定义规则。在自定义规则之前，我们首先要理清楚：

JavaScript通常规定，对于两个元素x和y，如果认为x < y，则返回-1，如果认为x == y，则返回0，如果认为x > y，
    则返回1，这样，排序算法就不用关心具体的比较过程，而是根据比较结果直接排序。*/

}

//先搞个排序规则
function mySort()
{
    var array = [1, 20, 10, 2];
    var result = array.sort(function (x, y) {
        if (x>y)
                        return 1;
        if (x<y)
            return -1;
        return 0;

    });
    console.log(result);

}



