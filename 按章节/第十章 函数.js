//函数 :函数也是对象,是Function类型的实例
    //箭头函数(ES6):任何可以使用函数表达式的地方都可以使用箭头函数
    let ints=[1,2,3];
    console.log(ints.map(function(i){return i+1;}));//[ 2, 3, 4 ]
    console.log(ints.map((i)=>{return i+1}));//[ 2, 3, 4 ]
    //只有一个参数可以不用加(),多个参数或者没有参数必须加();
        let double = (x)=>{return 2*x;};
        let double1 = x=>{return 2*x;}; 
    //箭头函数如果不使用{},=>后面就只能有一行代码,并且省略{}会隐式返回相应的值
        let multiply = (a,b) => a*b;
        console.log(multiply(2,1));
        //let multiply1 = (a,b) => return a*b;//报错

    //箭头函数缺陷
        //不能使用arguments,super,new.target
        //不能用作构造函数
        //没有prototype属性
    
//函数参数:
    //arguments参数(类数组对象)能获取所有函数参数
        //argumens[0] 第一个参数
        //arguments.length 参数数量
        //修改arguments对象的值同时也会反映到函数参数上
        function doAdd(num1,num2){
            arguments[1] = 10;
            console.log(arguments[0]+ num2);
        }
        doAdd(15,20);//25 num2被修改为10
        //对于没有传入的函数参数,其值为undefined,arguments对象无法修改
        
        //箭头函数的参数无法使用arguments对象访问

    //默认参数 
        //ES5写法 检查参数变量类型是不是undefined
        function chooseFruit(name){
             name = (typeof name === 'undefined')?'apple':name;
            return `I like eat ${name}`;
        }
        console.log(chooseFruit());//I like eat apple
        console.log(chooseFruit('banana'));//I like eat banana

        //ES6写法
        function chooseFruit1(name = 'apple'){
            return `I like eat ${name}`;
        }
        console.log(chooseFruit1());//I like eat apple
        console.log(chooseFruit1('banana'));//I like eat banana

        //使用默认参数时,arguments对象的值只反映传给函数的参数
        function chooseFruit2 (name = 'pineapple'){
            name = 'banana';
            return `I like eat ${arguments[0]}`;
        }
        console.log(chooseFruit2());//I like eat undefined
        console.log(chooseFruit2('apple'));//I like eat apple

        //默认参数也可使用调用函数返回值
        let arr = [1,2,3,4] ;
        let init = 0;
        function getNumerals(){
            return arr[init++];
        }
        function ball(num=getNumerals()){
            return `The number of the ball is ${num}`;
        }
        console.log(ball());//The number of the ball is 1
        console.log(ball(5));//The number of the ball is 5
        console.log(ball());//The number of the ball is 2
        console.log(ball());//The number of the ball is 3

    //扩展参数与收集参数(ES6)
        //扩展操作符(...) 类似于python中的*args,实质上是一个解包的过程
        //扩展参数
        let value = [1,2,3,4];
        
        //数组求和
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

        console.log(sum1(10,10));//报错
        let sum1 = function (){
            return arguments[0]+arguments[1];
        }; 

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
                    return num*arguments.callee (num-1);
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
            King();//123 报错

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

    //闭包: 引用了另一个函数作用域中变量的函数
    function createComparsionFunc (propertyName){
        return function(object1,object2){//内部匿名函数的作用域链会包含外部函数的活动对象
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
    let compare = createComparsionFunc('name');
    let result = compare({name:'Jake'},{name:'Paul'});
    console.log(result);//-1
    
    //闭包中的this
        global.identity = 'this window';
        let object = {
            identity:'My object',
            getIdentity(){
                return function(){
                    return this.identity
                }
            }
        };
        console.log(object.getIdentity()());//this window  这里this指向了全局属性

        //因为内部函数无法直接访问外部函数的arguments和this值,这时this就会指向全局window
            //可以把外部函数的this值保存到内部函数可以访问的变量中
            let object1 = {
                identity:'My object',
                getIdentity(){
                    let that = this;
                    return function(){
                        return that.identity
                    }
                }
            };
            console.log(object1.getIdentity()());//My object

//私有变量:定义在函数或块中的变量,函数外部无法访问其中的变量
    //特权方法:能够访问私有变量的方法,两种创建方法
        //1.在构造函数中实现
            function Person(name){
                this.getName = function(){ //特权方法
                    return name;
                };

                this.setName = function(value){ //特权方法
                    name = value;
                };
            }
            let person1 = new Person('Jake');
            let person2 = new Person('Jake');
            console.log(person1.getName());//Jake
            console.log(person2.getName());//Jake
            person1.setName('Bob');
            console.log(person1.getName());//Bob
            console.log(person2.getName());//Jake
            //这种方法变量无法在实例实例中共享,每个实例拥有自己的私有变量

        //2.创建静态私有变量,特权方法定义在原型上
            ( //放在()里是让函数被解析为函数表达式,后面的()让其立即运行
                function(){
                //定义私有变量
                let name = '';
                //定义构造函数
                Person = function(value){//Person前不加关键字,Person变量创建在全局作用域
                    name = value;
                };
                //特权方法定义在原型上
                Person.prototype.getName = function(){//getName,setName定义在全局上,会在实例间共享变量
                    return name;
                };

                Person.prototype.setName = function(value){
                    name = value;
                };
                }
            )();
            let person3 = new Person('Peter');
            let person4 = new Person('Peter');
            console.log(person3.getName());//Peter
            console.log(person4.getName());//Peter
            person3.setName('Bob');
            console.log(person3.getName());//Bob
            console.log(person4.getName());//Bob
            //这种方法变量会在实例间共享,某个实例修改静态变量都会影响其他实例
            //定义在原型上的方法在实例间共享