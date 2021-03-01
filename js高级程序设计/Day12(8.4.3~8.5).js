//面向对象
    //类
        //静态类方法:在类上定义静态方法,用于执行不特定于实例的操作,也不要求存在类的实例;
        class Person{
            constructor() {
                // 添加到this的所有内容都会存在于不同实例上
                this.locate = () => console.log('instance',this);
            }
            
            //定义在类的原型对象上
            locate() {
                console.log('prototype',this);
            }

            // 定义在类本身上
            static locate(){
                console.log('class',this);
            }
        }

        let p = new Person();

        p.locate();//instance Person { locate: [Function (anonymous)] 
        Person.prototype.locate();//prototype {}
        Person.locate();//class [class Person]


        // 静态类方法作实例工厂
        class Person2{
            constructor(age){
                this.age_ = age;
            }

            sayAge(){
                console.log(this.age_);
            }

            static create(){
                return new Person2(Math.floor(Math.random()*100));
            }
        }
        console.log(Person2.create());//Person2 { age_: 10 }


        //类不支持在原型或类上添加成员数据,但在类定义外部可以手动添加
            class Person1{
                sayName(){
                    console.log(`${Person1.greeting} ${this.name}`);
                }
            }

            //在类上定义数据成员
            Person1.greeting = 'My name is';
            //在原型上定义数据成员
            Person1.prototype.name = 'Jack';

            let p1 = new Person1();
            p1.sayName();//My name is Jack

        //迭代器与生成器
            //类定义语法支持在原型和类本身上定义生成器方法
            class Person3{
                //在原型上定义生成器方法
                *createNameIterator(){
                    yield 'Jack';
                    yield 'Bob';
                    yield 'Tom';
                }
                //在类上定义生成器方法
                static *createJobIterator(){
                    yield 'fucker';
                    yield 'bitch' ;
                    yield 'noob' ;
                }

            }
            let jobIter = Person3.createJobIterator();
            console.log(jobIter.next().value);//fucker
            console.log(jobIter.next().value);//bitch
            console.log(jobIter.next().value);//noob

            let p2 = new Person3();
            let NameIter = p2.createNameIterator();
            console.log(NameIter.next().value);//Jack
            console.log(NameIter.next().value);//Bob
            console.log(NameIter.next().value);//Tom

            // 可以添加默认迭代器,将类实例变成可迭代对象
                class Person4{
                    constructor(){
                        this.name_ = ['Peter','Tom','John'];
                    }

                    *[Symbol.iterator](){
                        yield *this.name_.entries();
                    }
                }

                let p3 = new Person4();
                for (let [idx,name] of p3) { //for of 循环调用默认迭代器
                    console.log(name);
                }

                /* Peter
                Tom
                John */
    
        //类的继承
            //类的继承使用extend 关键字
            class Vehicle{
                identifyPrototype(id) {
                    console.log(id,this);
                }
                static identifyClass(id) {
                    console.log(id,this);
                }
            };
            class Bus extends Vehicle {};
            let a = new Bus();
            console.log(a instanceof Bus);//true
            console.log(a instanceof Vehicle);//true

            let b = new Bus();
            let v = new Vehicle();
            b.identifyPrototype('bus');//bus Bus {}
            v.identifyPrototype('vehicle');//vehicle Vehicle {}
            Bus.identifyClass('bus');//bus [class Bus extends Vehicle]
            Vehicle.identifyClass('vehicle');//vehicle [class Vehicle]

            //子类可以使用super引用原型,仅限于类构造函数,静态方法,实例方法内部
                // super()调用父类构造函数,并将返回的实例赋值给this
                //类构造函数内部使用super()
                class Vehicle1 {
                    constructor(){
                        this.hasEngine = true;
                    }
                }
                class Bus1 extends Vehicle1{
                    constructor(){
                        super();
                        console.log(this instanceof Vehicle1);//true
                        console.log(this);//Bus1 { hasEngine: true }
                    }
                }
                new Bus1();

                //在静态方法中使用super()
                class Vehicle2 {
                    static identify(){
                        console.log('Vehicle');
                    }
                }
                class Bus2 extends Vehicle2{
                    static identify() {
                        super.identify();
                    }
                }
                Bus2.identify();//Vehicle

                //super 可以给父类的构造函数传参
                class Vehicle3 {
                    constructor(name){
                        this.name_ = name;
                    }
                }
                class Bus3 extends Vehicle3{
                    constructor(name){
                        super(name);
                    }
                }
                console.log(new Bus3('BMW'));//Bus3 { name_: 'BMW' }
            
            // 抽象基类 :可供其他类继承,但本身不会被实例化 (new.target)
                class Vehicle4 {
                    constructor (){
                        console.log(new.target);
                        if (new.target === Vehicle4){
                            throw new Error ('fuck you');
                        }
                    }
                }
                class Bus4 extends Vehicle4 {}
                new Bus4();//[class Bus4 extends Vehicle4]
                // new Vehicle4();//[class Vehicle4] 报错

                //通过对抽象基类构造函数进行检查,可以要求子类必须定义某个方法
                    class Vehicle5{
                        constructor () {
                            if (new.target === Vehicle5) {
                                throw new Error ('idiot');
                            }
                            if (!this.foo) {
                                throw new Error('bitch');
                            }
                            console.log('success')
                        }
                    }

                    class Van extends Vehicle5{};
                    class Bus5 extends Vehicle5{
                        foo() {};
                    }
                    new Bus5();//success
                    // new Van();//报错

                // 继承内置类型

                //多类继承(将不同类的行为集中到一个类里,自己造轮子)
                    //定义可嵌套函数
                    class Vehicle6{};
                    let FooMixin = (Superclass) =>class extends Superclass{
                        foo () {
                            console.log('foo')
                        }
                    }
                    let BarMixin = (Superclass) =>class extends Superclass{
                        bar () {
                            console.log('bar')
                        }
                    }
                    let BazMixin = (Superclass) =>class extends Superclass{
                        baz () {
                            console.log('baz')
                        }
                    }

                    function mix (BaseClass,...Mixins) {
                        return Mixins.reduce((accumulator,current)=> current(accumulator),BaseClass)
                    }//reduce 数组归并方法

                    class Bus6 extends mix (Vehicle6,FooMixin,BarMixin,BazMixin) {}
                    let b1 = new Bus6();
                    b1.foo();//foo
                    b1.bar();//bar
                    b1.baz();//baz

                
                    
                




                

        