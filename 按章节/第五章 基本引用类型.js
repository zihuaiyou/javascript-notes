//Date 类型
    //Date.parse()和Date.UTC();
    //Date重写了toLocaleString() toString() 和valueof()(valueof 返回日期的毫秒表示)
    let somedate = new Date(Date.parse('2/17/2021'));
    console.log(somedate);
    let somedate1=new Date('2/17/2021');//可以简写
    console.log(somedate1);

    let utcdate=new Date(Date.UTC(2021,0));//第二个参数0表示1月;
    console.log(utcdate);
    let utcdate1=new Date(2021,0);//同样,Date.UTC()也可以简写,但是这样只能表示本地时区;
    console.log(utcdate1);

    console.log(somedate.toLocaleString());//toLocaleString(返回本地日期时间;
    console.log(somedate.toString());//toString(返回本地日期时间,同时包括时区;

    console.log(somedate<utcdate);// false;使用>或<就可以直接使用valueof 的返回值;


//RegExp 正则表达式; 1.通过字面量创建 2.通过RegExp构造函数创建(两个参数都是字符串)
    /*flags: g : 全局模式,匹配多次;
             i : 不区分大小写;
             u : 启用unicode匹配;
             . : . 可以匹配任何字符;
             m : 多行匹配;
             y : 粘附模式 只匹配从lastIndex开始及之后的字符串;
             */

    let pattern1 = /\[ab\]at/i  //字面量模式 匹配第一个[ab]at  \表示转义,元字符都要转义
    let pattern2 = new RegExp('\\[ab\\]at','i');//RegExp构造函数模式 效果同上,两个参数都是字符串,\\二次转义

    /* let pattern =/mom (and dad (and baby)?)?/gi
    let text = 'mom and dad and baby'
    let matches=pattern.exec(text); //exec接受要匹配的变量
    console.log(matches); */

    let text='cat, bat, sat, fat';
    let pattern = /.at/g;

    let matches = pattern.exec(text);
    console.log(matches[0]);//cat
    console.log(matches.index);//0
    console.log(pattern.lastIndex);//3 lastIndex 下一次匹配的开始位置

    matches = pattern.exec(text);//因为添加了/g,全局匹配.多次调用exec结果不同;
    console.log(matches[0]);//bat
    console.log(matches.index);//5
    console.log(pattern.lastIndex);//8

    //test()方法; 只测试是否能匹配,不需要知道匹配内容;
    let text2 = '000-00-0000'
    let pattern3 =/\d{3}-\d{2}-\d{4}/;
    if (pattern3.test(text2)){
         console.log('匹配成功!')
    }

    
//String;
    //BMP字符:16位表示唯一字符
    //代理对:两个16位码元表示字符
    //charCodeAt:查看指定位置字符编码
     let text3='abcde';
    console.log(text3.charCodeAt(2));// c编码为99
    console.log(text3.charCodeAt(3));// d编码为100

    //fromCharCode:根据字符编码返回创建字符
    console.log(String.fromCharCode(97,98,99,100,101));//abcde

    //codePointAt:根据指定码元识别码点
    let msg='abc😀de';
    console.log(msg.codePointAt(0));//97
    console.log(msg.codePointAt(1));//98
    console.log(msg.codePointAt(2));//99
    console.log(msg.codePointAt(3));//128512
    console.log(msg.codePointAt(4));//56832
    console.log(msg.codePointAt(5));//100


    //fromCodePoint 接受任意码点返回相应字符串(对于代理对字符,必须输入代理对的开头码元)
    console.log(String.fromCodePoint(97,98,99,128512,100,101));

    //字符串切片 slice substr substring
    //slice(开始位置,结束位置)结束位置不包含,负数从后往前
    let msg1='hello world';
    console.log(msg1.slice(3,7));//lo w 
    console.log(msg1.slice(3,-3));//lo wo
    console.log(msg1.slice(-3));//rld

    //substr(开始位置,切片个数);第二位参数负数返回""
    console.log(msg1.substr(3,7));//lo worl 
    console.log(msg1.substr(3,-3));//""
    console.log(msg1.substr(-3));//rld

    //substring(开始位置,结束位置)会将所有负参数转为0
    console.log(msg1.substring(3,7));//lo w
    console.log(msg1.substring(3,-3))//hel
    console.log(msg1.substring(-3));//hello world


    //字符串位置方法 indexof lastindexof
    //indexof(查找字符,开始位置)从前往后
    console.log(msg1.indexOf('o',2));//4
    //lastindexof(查找字符,开始位置)从后往前
    console.log(msg1.lastIndexOf('o',6));//4

        //字符串中查找目标字符
        let strings_ = "talk is cheap, show me the code !"
        let postion = new Array();
        let pos = strings_.indexOf('e');
        while(pos>-1){
            postion.push(pos);
            pos=strings_.indexOf('e',pos+1);
        }
        console.log(postion);

    //字符串包含方法 startsWith(); endsWith(); includes();
    let msg='foobarbaz';
    //startsWith() 从开头检查,第二个参数表示开始检查的起始点;
    console.log(msg.startsWith('foo'));//true
    console.log(msg.startsWith('bar'));//false
    console.log(msg.startsWith('foo',1));//false

    //endsWith() 从结尾开始检查,第二个参数表示字符串末尾的位置(不包含);
    console.log(msg.endsWith('baz'));//true
    console.log(msg.endsWith('foo'));//false
    console.log(msg.endsWith('bar',6));//true

    //includes() 检查整个字符串 ,第二个参数表示开始搜索的位置
    console.log(msg.includes('baz'));//true
    console.log(msg.includes('foo'));//true
    console.log(msg.includes('foo',2));//false

//trim() 删除前后空格,不改变原始结果,
    //trimLeft() 从左边开始
    //trimRight() 从右边开始
    let text = ' hello world   '
    let str = text.trim()
    let str1 = text.trimLeft()
    let str2 = text.trimRight()
    console.log(str.length);//11  Number String Boolean类型的原始值可以包装成对象,并使用调用属性方法
    console.log(str1.length)//14
    console.log(str2.length)//12

//字符串解构 ...
    message='hello world';
    console.log([...message]);

//大小写; toUpperCase()和toLowerCase()

//字符串模式匹配
    //match方法 (同exec()方法)
    let text1 = 'cat , bat , sat , fat';
    let pattern = /.at/;
    let matches = text1.match(pattern)//同 pattern.exec(text1)
    console.log(matches[0]);//cat
    console.log(matches.index);//0
    console.log(pattern.lastIndex);//0

    //search方法 返回匹配字符串的位置索引
    console.log(text1.search(/at/));

    //replace(匹配字符,替换字符) 如果第一个参数为字符串就只能匹配第一个字符
    console.log(text1.replace("at","and"));//cand,bat,sat,fat 
    console.log(text1.replace(/.at/g,'and'));//第一个参数为正则表达式(加上全局标记)就可以匹配全部字符串
    //replace()第二个参数可以是函数,这个函数接受三个参数,(匹配字符,匹配项开始位置,整个字符串)
    function htmlEscape(text){
        return text.replace(/[<>&"]/g,function(match,pos,orginalText){
            switch(match){
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case "&":
                    return "&amp;";
                case "\"":
                    return "&quot;";
            }
        });
    }
    console.log(htmlEscape("<p class=\"greeting\">Hello world!</p>"));

    //split(分隔符);
        //分隔符可以是字符串,也可是正则表达式
    let text2 = 'red , blue , yello , green';
    console.log(text2.split(','));//[ 'red ', ' blue ', ' yello ', ' green' ]
    console.log(text2.split(/[^e]+/));//正则表达式中,^表示开始匹配的位置,但是放在[]内表示取反;


//Global对象
//url编码方法
//encodeURI和 encodeURIComponent
let uri='https://blog.csdn.net/weixin_44061131/  article/details/104946763';
console.log(encodeURI(uri));//encodeURI不会编码 : / ? # 等特殊字符
//https://blog.csdn.net/weixin_44061131/%20%20article/details/104946763

console.log(encodeURIComponent(uri));//encodeURIComponent编码所有非标准字符
//https%3A%2F%2Fblog.csdn.net%2Fweixin_44061131%2F%20%20article%2Fdetails%2F104946763

//decodeURI和decodeURIComponent
let _uri = "https%3A%2F%2Fblog.csdn.net%2Fweixin_44061131%2F%20%20article%2Fdetails%2F104946763";

console.log(decodeURI(_uri));//decodeURI只能解码encodeURI编码过字符
//https%3A%2F%2Fblog.csdn.net%2Fweixin_44061131%2F  article%2Fdetails%2F104946763

console.log(decodeURIComponent(_uri));//decodeURIComponent 解码所有特殊值
//https://blog.csdn.net/weixin_44061131/  article/details/104946763


//Math对象
//Math.random() 生成0~1随机数;
//从数组中随机选择的实现方法
function selectFrom(lowValue,upperValue){
    let choices = upperValue-lowValue+1;
    return Math.floor(Math.random()*choices + lowValue) 
}
let color_arr = ['red','blue','yellow','orange','black','white'];
let color_random = color_arr[selectFrom(0,color_arr.length - 1)] ;
console.log(color_random);