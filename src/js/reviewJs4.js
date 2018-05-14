//JavaScript中的Date、正则表达式、Json、浏览器对象
//JavaScript中，使用Data来表示日期对象，既然是日期对象我们就可以获取具体的时间、月份、分钟等等，下面是基本的使用
var now = new Date();
var fullYear = now.getFullYear();//2018,年份
var month = now.getMonth();// 月份是从0开始，4表示5月份
var data = now.getDate();// 几号
var day = now.getDay();//星期
var hours = now.getHours();//24小时制
var minutes = now.getMinutes();//分钟
var seconds = now.getSeconds();//秒
var time = now.getTime(); //以number形式的时间戳
console.log('Date的Api：' + fullYear + ';;' + month + ';;' + data + ";;" + day + ";;" + hours + ";;" + minutes + ";;" + seconds);
//Date的Api：2018;;4;;14;;1;;15;;0;;46 很是尴尬，都是一些数值

//正则表达式
//和java类似

//json，常用
//首先，json这个数据格式，对象和数组是最常用的两种类型。其中，对象表示为键值对、数据由逗号分隔；花括号为保存json对象、方括号保存json数组

//JSON字符串,本质是一个字符串，里面都要双引号了
var jsonString = '{"a":"mmp","b":"cao"}';
//JavaScript对象，注意，键名也是可以使用引号包裹的,下面两种写法都是一个JavaScript对象
var javaScriptObject = {a:'Hello', b: 'World'}
var javaScriptObject2 = {'a': 'Hello', 'b': 'World'};

//将JavaScript对象转换成json,使用JSON.stringfy这个函数
var s = JSON.stringify(javaScriptObject);
console.log('将JavaScript对象转换成字符串：' + s);
//这个函数的重载方法很屌，可以过滤一些条件
//譬如 ,这个对象，我只想要name和skill对象
var person = {
    name: '狗剩',
    age: 16,
    "sex": 'female',
    skills: ['moi', 'dd', 'ss']
};
//第二个参数即为刷选条件
var filterS = JSON.stringify(person, ["name", "skills"]);
//将对象转换成json字符串 ，且刷选条件为：{"name":"狗剩","skills":["moi","dd","ss"]}
console.log('将对象转换成json字符串 ，且刷选条件为：' + filterS);

//碉堡的是第二个参数还支持传入一个函数，比如
//我现在有这样一个对象，我想把它转为json字符串，但是我只想要里面所有标签的value属性值，全部大写
var person2 = {
    name: '狗剩',
    age: 16,
    love: 'cook',
    "sex": 'female',
    skills: ['moi', 'dd', 'ss']
};
//我曹，就直接这么转了？？MMP，看不懂了
var convertS = JSON.stringify(person2, convert);
console.log("将对象转换成json字符串，且传入了一个过滤函数：" + convertS);
//{"name":"狗剩","age":16,"love":"COOK","sex":"FEMALE","skills":["MOI","DD","SS"]}

function convert(key, value) {
    if (typeof value==='string')
    {
        return value.toUpperCase();
    }

    return value;

}

//解析Json,mmp 调用parse即可解析，我日！！

var jsonString = '{"a":"mmp","b":"cao"}';

var jsonConvertJavaScript = JSON.parse(jsonString);
//然后根据形成的对象，相应的调取
console.log("解析后的结果为： name:" + jsonConvertJavaScript.a);


//浏览器对象
//1.window window对象不仅充当全局作用域，而且表示浏览器窗口。window对象有innerWidth和innerHeight属性，
// 可以获取浏览器窗口的内部宽度和高度。内部宽高是指除去菜单栏、工具栏、边框等占位元素后，用于显示网页的净宽高
//其中，使用navigator的一些API可以获取相应的信息

console.log("浏览器名称：" + navigator.appName);
console.log("浏览器语言：" + navigator.language);
console.log("操作系统：" + navigator.platform);
console.log("浏览器设定的User-Agent：" + navigator.userAgent);
//2.screen 对象 ，屏幕的宽高
//screen对象表示屏幕的信息，常用的属性有：
//
// screen.width：屏幕宽度，以像素为单位:、screen.height：屏幕高度，以像素为单位；
console.log("Screen 宽度：" + screen.width + "高度：" + screen.height);









