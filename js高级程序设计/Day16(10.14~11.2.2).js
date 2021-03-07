//函数
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

 
//期约(Promise)与异步函数(ES6)
    //setTimeout 定义一个可以在指定时间之后会被调度执行的回调函数
    //期约(Promise):对尚不存在的结果的一个替身
        //Promise的三状态  pedding(操作未完成),fulfilled(操作成功完成),rejected(操作失败)
            //pedding是最初的状态,pedding状态settled到fulfilled或者是rejected状态的过程是不可逆的
        
        //Promise的两个用途
            //1.抽象的表示一个异步操作,根据Promise的三状态来判断异步操作是否完成,或是成功完成,或是失败
            //2.状态切换到fulfilled,会生成一个私有的value,状态切换到rejected,会生成一个私有的reason
                //私有的value或者reason初始值都是undefined

        //Promise的执行函数:创建新Promise对象时需要传入执行器(executor)函数
            //执行函数的两个作用
                //1.初始化Promise的异步行为
                //2.控制状态的最终转换(通过两个函数参数resolve()和reject()实现)
                    //调用resolve()会将状态切换为fulfilled,
                    //调用reject()会将状态切换为rejected,同时抛出错误
                    let p1 = new Promise((resolve,reject) => resolve());
                    setTimeout(console.log,0,p1);//Promise {<fulfilled>: undefined}

                    let p2 = new Promise((resolve,reject) => reject());
                    // setTimeout(console.log,0,p2);//Promise {<rejected>: undefined} 报错

                //执行器函数是同步执行的
                //定时回调
                let p = new Promise((resolve,reject) =>{
                    setTimeout(reject,5000);//5秒后调用reject
                });
                setTimeout(console.log,0,p);//Promise {<pending>} 
                // setTimeout(console.log,6000,p);//Promise {<rejected>: undefined} 报错

        //Promise.reject()和Promise.resolve()两种静态方法 实例化相应状态下的Promise对象
            //传给Promise.resolve()的第一个参数对应着状态fulfilled状态生成的value值
            let p =Promise.resolve(9);
            setTimeout(console.log,0,p);//Promise {<fulfilled>: 9}
            //Promise.resolve()是一种幂等方法,
            let p = Promise.resolve(1);
            setTimeout(console.log,0,p===Promise.resolve(p));//true
            setTimeout(console.log,0,p===Promise.resolve(Promise.resolve(p)));//true
            //Promise.resolve()可以包装任何非Promise对象,包括错误对象
            let p = Promise.resolve(new Error('foo'));
            setTimeout(console.log,0,p);//Promise {<fulfilled>: Error: foo}

            //Promise.reject()用法基本同Promise.resolve(),
            //传给Promise.reject()的第一个参数对应着状态rejected状态生成的reason值
            //与Promise.resolve()不同的是,Promise.reject()方法不是幂等的,给他传递的Promise对象会成为返回的reason值
            setTimeout(console.log,0,Promise.reject(Promise.resolve(0)));//Promise {<rejected>: Promise}
        
        










