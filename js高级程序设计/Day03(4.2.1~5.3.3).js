//变量声明;var,let(ES6),const(ES6)
    //var 函数(全局)作用域,变量声明提升效果
    //var声明除非在函数内,否则一直定义在全局
    function add(num1,num2){
        var sum =num1+num2;//var声明会使变量添加到最接近的上下文,此处是函数的局部上下文;
        return sum;
    }
    console.log(add(1,2));//3
        // console.log(sum);//报错,sum未定义;

    function add(num1,num2){
        sum =num1+num2;//不声明变量会使变量添加到全局上下文;
        return sum;
    }
    add(1,2);
    console.log(sum);//3

    //var声明的提升现象;
    function print_word(){
        console.log(word);
        var word = 'hello world';
    }
    print_word()//undefinded var声明使变量提升到函数作用域或全局作用域顶部

    //let声明 块级作用域;由最近的一组{}界定;
    if (true){
        let a;
    }
        // console.log(a);//报错 a未定义

    {
        let _case=1;

    }
        // console.log(_case);//报错,let声明作用于块内;

    //var可以声明多次(变量提升的效果);let声明只可以声明一次;
    var a;
    var a;
    /* {
        let b;
        let b;//报错
    } */

    //var声明可能会导致迭代变量泄漏的问题;
    for(var i=0;i>10;i++){}
    console.log(i);// 0 变量i泄漏到循环体外部;
    for(let j=0;j>10;j++){}
    //console.log(j);//报错 j未定义;

    //const 常量声明;除了不可修改其余和let声明一致(也是块作用域);


//标识符查找:沿着作用域链从下往上查找(优先局部作用域)
    var color = 'blue';
    function get_color(){
        color='red';{
            color='green';
            return color;
        }
    }
    console.log(get_color());//green


//引用值的复制实际上是复制了对内存中对对象的引用
function Article(){
    this.title = 'hello world';
}
/* let a1 = new Article();//new一个Article类型的对象
let a2 = new Article();
a2.author='Jake';
console.log(a1.author); *///undefined; 证明a1 a2指向不同的对象

let a1=new Article();
let a2 = a1;
a2.author='Peter';
console.log(a1.author);//Peter; a1 a2 指向相同的对象;


//Date 类型
    //Date.parse()和Date.UTC();
    //Date重写了toLocaleString(toString() 和valueof()(valueof 返回日期的毫秒表示)
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


    //fromCodePoint 接受任意码点返回相应字符串(对于代理对字符,必须输入代理对的开头)
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









   







