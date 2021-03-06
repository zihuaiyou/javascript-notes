//扩展参数与收集参数(ES6)
    //扩展操作符(...) 类似于python中的*args,实质上是一个解包的过程
    //扩展参数
    let value = [1,2,3,4];

    function getSum (){
        let sum = 0;
        for (let i=0;i<arguments.length;++i){
            sum+=arguments[i];
        }
        return sum;
    }

    console.log(getSum(...value));//10
    console.log(getSum(-1,...value,3));//12

    function countArguments(){
        console.log(arguments.length);
    }
    countArguments(...value,...[1,2,3]);//7

    //收集参数
        //可用扩展操作符将参数组合为一个数组
        function getSum1 (...values){
            return values.reduce((x,y)=>x+y,0);
        }
        console.log(getSum1(1,2,3));//6
        //收集参数只能作为最后的一个参数
        function getSum2(firstValue,...values){
            console.log(values);
        };
        getSum2();//[]
        getSum2(1);//[]
        getSum2(1,2,3);//[2,3]
        //箭头函数也支持收集参数的定义方式
        let getSum3 = (...values)=>{
            return values.reduce((x,y)=>x+y,0);
        };
        console.log(getSum3(1,2,3));//6

//函数声明提升
    //函数声明会在代码执行之前被读取并添加到执行上下文
    //函数表达式不能提升
    console.log(sum(10,10));//20
    function sum(){
        return arguments[0]+arguments[1];
    }

    /* console.log(sum1(10,10));//
    let sum1 = function (){
        return arguments[0]+arguments[1];
    }; 报错*/

//函数作为参数传递
    function callSomeFunction(someFunc,someArg){
        return someFunc(someArg);
    }
    function add10(num){
        return num + 10;
    }
    let result1 = callSomeFunction(add10,10);
    console.log(result1);//20

    //函数返回函数
    function createComparsionFunc (propertyName){
        return function(object1,object2){
            let value1 = object1[propertyName];
            let value2 = object2[propertyName];

            if (value1<value2) {
                return -1;
            } else if (value1>value2){
                return 1;
            } else {
                return 0;
            }
        };
    }
    let data = [
        {name : 'Jake',age:34},
        {name:'Bob',age:45}
    ];
    data.sort(createComparsionFunc('name'));
    console.log(data[0].name);//Bob
    data.sort(createComparsionFunc('age'));
    console.log(data[0].age)//34

//函数内部对象
    //arguments
        //arguments.callee 指向arguments对象所在函数的指针
        function factorial(num){ //阶乘函数
            if (num<=1){
                return 1;
            }else{
                return num*arguments.callee(num-1);
            }
        }
        console.log(factorial(5));//120

    //this 
        //标准函数中,this值引用的是把函数当成方法调用的上下文对象
        //在全局上下文调用时,this指向window(浏览器中)
        global.color = 'red';
        let o = {
            color:'blue'
        };
        function sayColor (){
            console.log(this.color);
        }
        sayColor();//red node.js中全局对象是global而非window
        o.sayColor = sayColor;
        o.sayColor();//blue

        //箭头函数中 this引用的是定义箭头函数的上下文
        global.age = 25;
        let p = {
            age:30
        };
        let sayAge = ()=>console.log(this.age);
        sayAge();//25
        p.sayAge = sayAge;
        p.sayAge();//25
    //caller属性 引用调用当前函数的函数
        function outer(){
            inner();
        }
        function inner(){
            console.log(inner.caller);
        }
        outer()//[Function: outer]

    //new.target 用来检测函数是否使用new关键字调用
        //ES中函数始终可以作为构造函数去实例化一个新对象
        //普通函数调用,new.target 的值是undefined
        //new 关键字调用,new.target引用被调用的构造函数
        function King(){
            if(!new.target){
                throw '123';
            }
            console.log('sucess');
        }
        new King();//sucess
        // King();//123 报错

//函数属性和方法
    //每个函数都有length和prototype属性
        //length 函数命名参数数量
    //函数都有两个方法 apply()和call()
        //这两个方法都会以指定的this值调用函数 
        //apply(this,数组或arguments对象)
        //call(this,num1,num2...)与apply()作用类似,不过参数得逐个传入
        function sum1(num1,num2){
            return num1+num2;
        }
        function callSum1(num1,num2){
            return sum1.apply(this,arguments);
        }
        console.log(callSum1(10,20));//30
        function callSum2(num1,num2){
            return sum1.apply(this,[num1,num2]);
        }
        console.log(callSum2(10,20));//30

        //call(),apply()特点,可以将任意对象设置为任意函数的作用域
        global.name = 'Tom';
        let m = {
            name:'Neal'
        };
        function sayName1(){
            console.log(this.name);
        }
        sayName1();//Tom
        sayName1.call(global);//Tom  浏览器中全局对象是window
        sayName1.call(m);//Neal 作用域切换到m

        //ES5方法 bind()
            //bind方法创建新的函数实例,this值会被绑定到传给bind的对象
            global.name = 'Black';
            let x = {
                name:'John'
            };
            function sayName2(){
                console.log(this.name);
            }
            let objectSayName = sayName2.bind(x);
            objectSayName();//John
        
//尾调用优化问题
    //适用于嵌套函数,外部函数的返回值是内部函数的返回值
    //能够重用栈帧
    //使用条件
        //1.严格模式下使用
        //2.外部函数的返回值是对尾调用函数的调用
        //3.尾调用函数返回后不需要执行额外的逻辑
        //4.尾调用函数不是引用外部函数作用域中自由变量的闭包

        //尾调用优化递归实例
        "use strict"
        function fib(n){
            return fibImp(0,1,n);
        }
        function fibImp(a,b,n){
            if (n===0){
                return a;
            }
            return fibImp(b,a+b,n-1);
        }
        console.log(fib(1000));//4.346655768693743e+208


    


