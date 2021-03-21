//代理与反射(ES6)
    //代理:目标对象的抽象
        //Proxy构造函数创建代理 接受两个参数(目标对象,处理程序对象)
        //创建空代理
        const target={
            id:'target'
        };
        const hander = {};
        const proxy = new Proxy(target,hander);
        //id属性访问同一个值
        console.log(target.id);//target
        console.log(proxy.id);//target
        //给目标属性和代理属性赋值会反映在同一个对象上
        //因为两个对象访问的是同一个值
        target.id='foo';
        console.log(target.id);//foo
        console.log(proxy.id);//foo
        proxy.id = 'bar';
        console.log(target.id);//bar
        console.log(proxy.id);//bar
        //严格相等区分代理和目标
        console.log(proxy===target);//false

    //定义捕获器(trap)
        //捕获器:基本操作拦截器;
            //代理可以在将操作传播到目标对象之前先调用捕获器,从而拦截并修改相应的行为
            //定义get()捕获器 代理对象进行get()操作时就会触发get()捕获器
            const target1 = {
                foo:'bar'
            };
            const hander1 = {
                get(){
                    return 'hander override';
                }
            };
            const proxy1 = new Proxy(target1,hander1);
            //只有在代理对象上执行get()操作才会触发捕获器,在目标对象上执行相应操作会不会触发捕获器
            console.log(proxy1.foo);//hander override
            console.log(target1.foo);//bar
            console.log(proxy1['foo']);//hander override
            console.log(target1['foo']);//bar
            console.log(Object.create(proxy1)['foo']);//hander override
            console.log(Object.create(target1)['foo']);//bar

            //捕获器参数 以get()捕获器为例
            //get()捕获器获取三个参数,(目标对象,要查询属性,代理对象)
            const target2 = {
                foo:'bar'
            };
            const hander2 = {
                get(trapTarget,property,receiver){
                    console.log(trapTarget===target2);//true
                    console.log(property);//foo
                    console.log(receiver===proxy2);//true
                }
            };
            const proxy2 = new Proxy(target2,hander2);
            proxy2.foo;

            //反射API
            //处理程序对象中所有可以补获的方法都有对应的Reflect API方法
            //Reflect方法与需要拦截的捕获器方法同名,也具有与补获的方法相同的行为
            const target3 = {
                foo:'bar'
            };
            const hander3 = {
                get(){
                    return Reflect.get(...arguments);
                }
            };
            const proxy3 = new Proxy(target3,hander3);
            console.log(proxy3.foo);//bar
            //Reflect 简写
            const target4 = {
                foo:'bar'
            };
            const hander4 = {
                get:Reflect.get
            };
            const proxy4 = new Proxy(target4,hander3);
            console.log(proxy4.foo);//bar

            //实现一个属性被访问时,会对返回值进行修饰
            const target5 = {
                foo:'bar',
                baz:'qux',
            };
            const hander5 = {
                get(trapTarget,property,receiver){
                    let decoration=''
                    if (property==='foo'){
                        decoration='!!!'
                    }
                    return Reflect.get(...arguments)+decoration
                }
            };
            const proxy5=new Proxy(target5,hander5);
            console.log(proxy5.foo);//bar!!!
            console.log(target5.foo)//bar
    
    //捕获器不变式:防止捕获器出现反常行为
    const target6 = {};
    Object.defineProperty(target6,'foo',{
        configurable:false,
        writable:false,
        value:'bar'
    });
    const hander6 = {
        get(){
            return 'qux';
        }
    };
    const proxy6 = new Proxy(target6,hander6);
    // console.log(proxy6.foo);//报错

    //撤销代理:撤销代理对象与目标对象的关联(revocable方法)
        //撤销函数 revoke()是不可逆的
        // const target7 = {
        //     foo:'bar'
        // };
        // const hander7 = {
        //     get(){
        //         return 'intercepted'
        //     }   
        // };
        // const {proxy7,revoke} = Proxy.revocable(target7,hander7)
        // console.log(proxy7.foo);//intercepted
        // revoke();
        // console.log(proxy7.foo); //报错
    
    //代理另一个代理
    const target8 = {
        foo:'bar'
    };
    const firstProxy = new Proxy(target8,{
        get(){
            console.log('firstProxy');
            return Reflect.get(...arguments);
        }
    });
    const secondProxy = new Proxy(firstProxy,{
        get(){
            console.log('secondProxy');
            return Reflect.get(...arguments);
        }
    })
    console.log(secondProxy.foo)
    /* secondProxy
    firstProxy
    bar */

    //代理可以补获13种基本操作
        //get() 获取属性
        //set() 设置属性值
        //has() 查询属性 在in操作符中被调用
        //defineProperty() 定义属性类型 在Object.defineProperty()中被调用
        //getOwnPropertyDescriptor() 
        //deleteProperty()
        //ownKeys()
        //getPrototypeOf()
        //setPrototypeOf()
        //isExtensible()
        //preventExtensible()
        //apply()
        //construct()
    
    //代理模式
        //跟踪属性访问 综合get() has() set()操作
        const user = {
            name:'Joker'
        };
        const proxy = new Proxy(user,{
            get(target,property,receiver){
                console.log(`Getting ${property}`);
                return Reflect.get(...arguments);
            },
            set (target,property,value,receiver){
                console.log(`Setting ${property}=${value}`);
                return Reflect.set(...arguments);
            },
        });
        proxy.name;//Getting name
        proxy.name='jake';//Setting name=Jake

        //隐藏属性
        const hiddenProperties = ['foo','bar'];
        const targetObjet = {
            foo:1,
            bar:2,
            baz:3,
        };
        const proxy2 = new Proxy(targetObjet,{
            get(target,property){
                if (hiddenProperties.includes(property)){
                    return undefined;
                }else{
                    return Reflect.get(...arguments);
                }
            },
            has(target,property){
                if (hiddenProperties.includes(property)){
                    return false;
                }else{
                    return Reflect.has(...arguments)
                };
            },
        })
        console.log(proxy2.foo);//undefined
        console.log(proxy2.bar);//undefined
        console.log(proxy2.baz);//3

        //属性验证
        const target = {
            value_ : 0
        };
        const proxy3 = new Proxy (target,{
            set(target,property,value){
                if (typeof value !== 'number'){
                    return false
                } else {
                    return Reflect.set(...arguments)
                }
            },
        })
        proxy3.value_ = 18;
        console.log(proxy3.value_);//18
        proxy3.value_ = '18';
        console.log(proxy3.value_);//18

        //函数与构造函数参数验证
        function median(...nums){
            return nums.sort()[Math.floor(nums.length/2)];
        };
        const proxy4 = new Proxy(median,{
            apply(target,thisArg,argumentsList){
                for (const arg of argumentsList){
                    if (typeof arg !== 'number'){
                        throw 'noob';
                    }
                }
                return Reflect.apply(...arguments)
            }
        });

        console.log(proxy4(1,3,4,2));//3
        // console.log(proxy4(1,3,'4',2));//报错

        //将集合绑定到一个事件分派程序,每次插入新实例都会发送消息
        const userList = [];
        function emit (value){
            console.log(value)
        }
        const proxy5 = new Proxy(userList,{
            set(target,property,value,receiver){
                const result = Reflect.set(...arguments);
                if (result){
                    emit(Reflect.get(target,property,receiver))
                }
                return result;
            }
        });
        proxy5.push('John');//John
        proxy5.push('Jake');//Jake