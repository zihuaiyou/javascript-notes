//面向对象
    //对象:一组属性的无序集合
    //属性类型
        //数据属性:(4个特性)
        //[[Configurable]] 表示属性是否可以delete删除,默认true
        //[[Enumerable]]   表示属性是否可以通过for-in循环返回,默认true
        //[[Writable]] 表示属性是否可以修改,默认true
        //[[Value]] 包含属性实际的值,默认undefined

        //修改属性的默认特性 使用Object.defineProperty(要添加属性的对象,属性的名称,{4个特性})
            //只要调用了Object.defineProperty() ,Configurable,Enumerable,Writable的值如果不指定,就默认为false
            let person={};
            Object.defineProperty(person,'name',{
                writable:false,
                value:'Bob'
            })
            console.log(person.name);//Bob
            person.name = 'Jack';
            delete person.name;//删除无效 Configurable的值未指定,默认为false 即不可删除
            console.log(person.name);//Bob 修改无效
    
            //访问器属性:设置一个属性值会导致一些其他变化发生 (4个特性)
            //[[Configurable]] 表示属性是否可以delete删除,默认true
            //[[Enumerable]]   表示属性是否可以通过for-in循环返回,默认true
            //[[Get]] 获取函数,读取属性时调用,默认为undefined
            //[[Set]] 设置函数,写入属性时调用,默认为undefined
    
            //同样,修改属性的默认特性 使用Object.defineProperty(要添加属性的对象,属性的名称,{4个特性})
    
            let Book = {
                year_:2012,
                edition:1,
            }
            Object.defineProperty(Book,'year',{
                get(){
                    return this.year_;
                },
                set(newValue){
                    if (newValue > 2012){
                        this.year_ = newValue;
                        this.edition+=newValue-2012;
                    }
    
                }
            })
            console.log(Book.year);//2012
            Book.year= 2021;
            console.log(Book.edition);//10  
    
            //定义多个属性 Object.defineProperities()
            let eBook={};
            Object.defineProperties(eBook,{
                year_:{ //数据属性 保存数据的位置
                    writable:true,
                    value:2012
                },
                edition:{
                    writable:true,
                    value:1
                },
                year:{ //访问属性 不包含数据值
                    get:function(){
                        return this.year_;
                    },
                    set:function(newValue){
                        if (newValue>2012){
                            this.year_ = newValue;
                            this.edition += newValue-2012;
                        }
                    }
                }
    
            })
            /* console.log(eBook.edition);//1
            eBook.year = 2021;
            console.log(eBook.edition);//10 */
    
            //获取属性的特性 Object.getOwnPropertyDescriptor()
            let descriptor = Object.getOwnPropertyDescriptor(eBook,'year_');
            console.log(descriptor.value);//2012
            console.log(descriptor.configurable);//false
            console.log(typeof descriptor.get)//undefined
            let descriptor1 = Object.getOwnPropertyDescriptor(eBook,'year');
            console.log(descriptor1.value);//undefined
            console.log(descriptor1.enumerable);//false
            console.log(typeof descriptor1.get);//function
    
            //Object.getOwnPropertyDescriptors (ES2017)
            console.log(Object.getOwnPropertyDescriptors(eBook));
            /* {
                year_: {
                  value: 2012,
                  writable: true,
                  enumerable: false,
                  configurable: false
                },
                edition: { value: 1, writable: true, enumerable: false, configurable: false },
                year: {
                  get: [Function: get],
                  set: [Function: set],
                  enumerable: false,
                  configurable: false
                }
              } */

    //合并对象 Object.assign(目标对象,源对象)(ES6)
		//简单复制
		//Object.assign()会修改目标对象,也会返回修改后的值
		let dest,src,result;
		dest = {};
		src = {id:'src'};
		result = Object.assign(dest,src);
		console.log(src);//{id:'src'}
		console.log(dest);//{id:'src'}
		console.log(result);//{id:'src'}
		console.log(src===dest);//false
		console.log(dest===result);//true

		//多个源对象
		let dest1={},result1;
		result1 = Object.assign(dest1,{a:'foo'},{b:'bar'});
		console.log(result1);//{ a: 'foo', b: 'bar' }

		//获取函数与设置函数
		let dest2,src2;
		dest2 = {
			set a(val){
				console.log(`Invoked dest setter with param ${val}`);
			}
		};
		src2 = {
			get a(){
				console.log('Invoked src getter');
				return 'foo';
			}
		}
		Object.assign(dest2,src2);//调用源对象的get方法,再调用目标对象的set方法
		console.log(dest2);
		/* Invoked src getter
		Invoked dest setter with param foo
		{ a: [Setter] } */

		//多个源对象若有相同属性(属性名相同),则复制最后一个属性给目标对象
		let dest3,src3,result3;
		dest3 = {id:'dest'};
		result3 = Object.assign(dest3,{id:'src1',a:'foo'},{id:'src2',b:'bar'});
		console.log(result3);//{ id: 'src2', a: 'foo', b: 'bar' }
		//覆盖的过程
		let dest4 = {
			set id(x){
				console.log(x);
			}
		}
		Object.assign(dest4,{id:'first'},{id:'second'},{id:'third'})
		/* first
		second
		third */
	
	//Object.is()(ES6)  和===类似
	console.log(Object.is('2',2));//false

	console.log(Object.is(NaN,NaN));//true
	console.log(NaN===NaN)//false

		//检查超过两个值,使用递归
		function func(x,...rest){
			return Object.is(x,rest[0]) &&
			(rest.length < 2 ||func(...rest));
		}
		console.log(func(NaN,NaN,NaN))//true

	//增强的对象语法(ES6)
		//属性值简写 属性名和变量名相同可以简写
		let name = 'Jack';
		let person = {
			name
		};
		console.log(person);//{ name: 'Jack' }

		//可计算属性:将变量的值作为属性
        //在对象字面量中完成动态属性赋值

		const nameKey='name';
		const ageKey='age';
		const jobKey='job';

		let people = {
			[nameKey]:'Bob',
			[ageKey]:'18',
			[jobKey]:'killer'
		}
		console.log(people);//{ name: 'Bob', age: '18', job: 'killer' }
			//可计算属性可以是复杂的表达式
			const nameKey1='name';
			const ageKey1='age';
			const jobKey1='job';
			let uniqueToken = 0;
			function getUniqueKey(key){
				return `${key}_${uniqueToken++}`
			}
			let newPerson={
				[getUniqueKey(nameKey1)]:'Jason',
				[getUniqueKey(ageKey1)]:'19',
				[getUniqueKey(jobKey1)]:'fucker',

			}
			console.log(newPerson);//{ name_0: 'Jason', age_1: '19', job_2: 'fucker' }

			//简写方法名
				//ES6之前定义方法
				let person2 = {
					sayName:function(name){
						console.log(`My name is ${name}`);
					}
				}
				person2.sayName('Kobe');//My name is Kobe
				//简写方法名
				let person3 = {
					sayName(name){
						console.log(`My name is ${name}`);
					}
				}
				person3.sayName('ONeal');//My name is ONeal
				//简写方法名与可计算属性相互兼容
				const methodKey = 'sayName';
				let person4 = {
					[methodKey](name){
						console.log(`My name is ${name}`);
					}
				}
				person4.sayName('Curry');//My name is Curry

	//对象解构(ES6)
		//使用嵌套数据实现一个或多个赋值操作
		let person5= {
			name : 'Obama',
			age:45,

		};
		let {name:personName,age:personAge} = person5;//使用对象解构
		console.log(personName);//Obama
		console.log(personAge);//45

		//嵌套结构
		let person6 = {
			name : 'Trump',
			age:72,
			job:{
				title:'President'
			}
		};
		let personCopy={};
		({
			name:personCopy.name,
			age:personCopy.age,
			job:personCopy.job,
		}=person6)//如果是给事先声明的变量赋值,表达式必须放在一组()中;
		personCopy.job.title ='clown';
			//因为personCopy复制的是对象的引用,所以修改personCopy的属性也会影响person6;
		console.log(person6);//{ name: 'Trump', age: 72, job: { title: 'clown' } }
		console.log(personCopy);// { name: 'Trump', age: 72, job: { title: 'clown' } }

    //创建对象
        //工厂模式:缺点 不能确定新创建的对象是什么类型
        function createPerson(name,age){
            let o = new Object();
            o.name=name;
            o.age=age;
            o.sayHi=() => {
                console.log('Hi~');
            };
            return o;
        };
        let person = createPerson('Jack',15);
        console.log(person);//{ name: 'Jack', age: 15, sayHi: [Function (anonymous)] }
        person.sayHi()//Hi~

        //构造函数模式 能够确保实例化的对象是特定类型
            //构造函数中this指向新对象
        function Person(name,age){
            this.name=name;
            this.age=age;
            this.sayHi=function(){
                console.log('Hi~');
            };
        }
        let person1 = new Person('Bob',19);
        let person2 = new Person('bitch',18);
        console.log(person2.sayHi===person1.sayHi)//false 构造函数模式定义的方法会在每个实例上都定义一遍;
        console.log(person1);//Person { name: 'Bob', age: 19, sayHi: [Function (anonymous)] }
        console.log(person1 instanceof Object);//true
        console.log(person1 instanceof Person);//true

        //原型模式(prototype):函数的prototype属性是原型对象 原型上面定义的属性方法可以被对象实例共享
        function Person2(){};
        Person2.prototype.name = 'nina';
        Person2.prototype.age = 16;
        Person2.sayHi=function(){
            console.log('Hi~');
        }
        let person3 = new Person2();
        let person4 = new Person2();
        console.log(person3.sayHi===person4.sayHi);//true
            //所有原型对象都有constructor属性,指回与之关联的构造函数
            //构造函数,原型对象,实例是三个完全不同的对象
            console.log(person3!==Person2);//true
            console.log(person3!==Person2.prototype);//true
            console.log(Person2.prototype!==Person2);//true
            //实例通过__proto__链接到原型对象
            //构造函数通过prototype属性链接到原型对象
            //实例与构造函数没有直接关系,与原型对象有直接联系
            console.log(person3.__proto__===Person2.prototype)//true
            console.log(person3.__proto__.constructor===Person2)//true

            //同一个构造函数创建的两个实例共享同一个原型对象
            console.log(person3.__proto__===person4.__proto__)//true
            console.log(person3.__proto__===Person2.prototype)//true

            //instanceof 检查实例的原型链中是否包含指定构造函数的原型
            console.log(person3 instanceof Person2);//true
            console.log(person3 instanceof Object);//true
            console.log(Person2.prototype instanceof Object);//true

            //isPrototypeOf 检查实例的原型对象
            console.log(Person2.prototype.isPrototypeOf(person4));//true

            //Object.getPrototypeOf 返回传入对象的原型对象
            console.log(Object.getPrototypeOf(person3)===Person2.prototype);//true

            //Object.setPrototypeOf 向实例的私有特性[[Prototype]]写入一个新值,修改对象的原型
            let app = {
                year:2021
            };
            let person5={
                name:'Jason'
            }
            Object.setPrototypeOf(person5,app);
            console.log(Object.getPrototypeOf(person5)===app);//true
            //Object.creat(原型) 创建新对象并指定原型

            //检查属性在实例上还是原型上
                //原型属性不能通过实例重写,只能覆盖
                //hasOwnProperty() 检查属性是否在实例上
                //in 检查实例或原型是否拥有属性xx
                function Person3(){};
                Person3.prototype.name = 'nina';
                Person3.prototype.age = 16;
                Person3.sayHi=function(){
                    console.log('Hi~');
                }
                let person6 = new Person3();
                let person7 = new Person3();
                person6.name = 'beauty'
                console.log(person6.name);//beauty 实例属性
                console.log(person7.name);//nina 原型属性
                console.log(person6.hasOwnProperty('name'));//true person6实例拥有自己的私有name属性
                console.log('name' in person6);//true
                console.log(person7.hasOwnProperty('name'));//false person7实例没有自己的私有name属性
                console.log('name' in person7);//true

                //检查属性是否在原型上
                function hasPrototypeProperty(object,name){
                    return !object.hasOwnProperty(name)&&(name in object);
                }
                console.log(hasPrototypeProperty(person7,'name'));//true
     
        //对象迭代 
            //Object.values() 返回对象值的数组
            //Object.entries()返回键值对的数组
            const o = {
                foo:'bar',
                baz:1,
                qux:{}
            };
            console.log(Object.values(o));//[ 'bar', 1, {} ] 
            console.log(Object.entries(o));//[ [ 'foo', 'bar' ], [ 'baz', 1 ], [ 'qux', {} ] ]

            //原生对象类型
                //所有原生引用类型的构造函数(Object,Array,String)都在原型上定义了实例方法

    //继承 继承主要是通过原型链实现的
        //例子
        function SuperType(){
            this.property =true; 
            this.sayHello = () => console.log('hello');
        };
        SuperType.prototype.getSuperValue=function(){
            return this.property;
        };
        function SubType(){
            this.subproperty = false;
        };
        SubType.prototype = new SuperType();//SubType的原型继承了SuperType
        SubType.prototype.getSubValue = function(){
            return this.subproperty;
        };

        let instance = new SubType();
        instance.sayHello();//hello
        console.log(instance.getSuperValue());//true
        console.log(instance.property)//true
        console.log(instance.subproperty)//false

        //确定原型与实例的继承关系 instanceof 和 isPrototypeOf()
        console.log(instance instanceof Object);//true 默认所有引用类型都继承自Object
        console.log(instance instanceof SubType);//true
        console.log(instance instanceof SuperType);//true

        console.log(Object.prototype.isPrototypeOf(instance));//true
        console.log(SuperType.prototype.isPrototypeOf(instance));//true
        console.log(SubType.prototype.isPrototypeOf(instance));//true

        //引用值共享问题 某个实例修改属性后,会引起其他实例属性也随之变化
        function SuperType1(){
            this.colors = ['red','black'];
        };
        function SubType1(){};
        SubType1.prototype = new SuperType1();
        let instance1 = new SubType1();
        let instance2 = new SubType1();
        instance1.colors.push('green');
        console.log(instance1.colors);//[ 'red', 'black', 'green' ]
        console.log(instance2.colors);//[ 'red', 'black', 'green' ]

        //盗用构造函数 在子类的构造函数中调用父类的构造函数(用call()或apply()调用);
            //可以解决引用值共享问题
            function SuperType2(){
                this.colors=['red','black'];
            };
            function SubType2(){
                SuperType2.call(this);
            };
            let instance3 = new SubType2();
            let instance4 = new SubType2();
            instance3.colors.push('green');
            console.log(instance3.colors);//[ 'red', 'black', 'green' ]
            console.log(instance4.colors);//[ 'red', 'black' ] instance3的修改不会影响instance4

            //可以实现在子类构造函数中向父类构造函数传参
            function SuperType3(name){
                this.name=name;
            };
            function SubType3(){
                //继承SuperType并传参
                SuperType3.call(this,'Jack');

                //新增实例的属性
                this.age=18;
            }
            let instance5 = new SubType3();
            console.log(instance5.name);//Jack
            console.log(instance5.age);//18

            //盗用构造函数的主要问题,子类无法访问父类原型上定义的方法,
            
        //组合式继承 综合了原型链和盗用构造函数
            //盗用构造函数继承实例属性,原型链继承父类属性和方法
        function SuperType4(name){
            this.name=name;
            this.colors=['red','blue'];
        }
        SuperType4.prototype.sayName=function(){
            console.log(this.name);//定义父类上的方法
        }

        function SubType4(name,age){
            SuperType4.call(this,name);//盗用构造函数继承实例属性
            this.age=age;//定义子类上的属性
        }
        SubType4.prototype = new SuperType4()//原型链继承父类方法
        SubType4.prototype.sayAge=function(){//定义子类方法
            console.log(this.age);
        }

        let instance6 = new SubType4('Newton','30');
        instance6.colors.push('black');
        console.log(instance6.colors);//[ 'red', 'blue', 'black' ]
        instance6.sayName();//Newton
        instance6.sayAge();//30

        let instance7 = new SubType4('Peter','22');
        console.log(instance7.colors);//[ 'red', 'blue' ]
        instance6.sayName();//Newton
        instance6.sayAge();//30

    //原型式继承 在原对象基础上创建新对象
    //Object.creat(原型对象,定义额外属性)
    let person = {
        name:'Jack',
        friends:['Bob','Siri'],
    }
    let anotherPerson = Object.create(person,{
        name: {
            value:'Tom',
        }
    });
    console.log(anotherPerson.name);//Tom

    //寄生式继承
    function createAnother(original){
        let clone = Object(original);
        clone.sayHi=function(){
            console.log('Hi~')
        }
        return clone
    }
    let anotherPerson2 = createAnother(person);
    anotherPerson2.sayHi();//Hi~

    //寄生式组合继承 (最常用)
        //通过盗用构造函数继承父类属性,通过寄生式继承父类原型,不调用父类构造函数给子类原型赋值
        //此方法效率高,
        function inheritPrototype(SubType,SuperType){
            let prototype = Object(SuperType.prototype);//创建新对象,继承父类原型
            prototype.constructor = SubType //让新对象的原型的constructor指回构造函数
            SubType.prototype = prototype//将新对象赋值给子类原型
        }

        function SuperType(name){
            this.name=name;
            this.colors = ['red','blue'];
        }
        SuperType.prototype.sayName = function(){
            console.log(this.name);
        }
        function SubType(name,age){
            SuperType.call(this,name);//通过盗用构造函数继承父类属性
            this.age = age;
        }
        inheritPrototype(SubType,SuperType);//通过寄生式继承父类原型
        SubType.prototype.sayAge = function(){
            console.log(this.age);
        }

        let instance1 = new SubType('Jack',18);
        let instance2 = new SubType('Jack',18);
        instance1.sayName();//Jack
        instance1.sayAge();//18
        instance1.colors.push('green');
        console.log(instance1.colors);//[ 'red', 'blue', 'green' ]
        console.log(instance2.colors);//[ 'red', 'blue']
        console.log(SubType.prototype.constructor===SubType);//true

    // 类 (ES6)
        //定义类的两个方法
        //类声明
        class Person{};
        //类表达式
        const Person1 = class{};

        //函数声明可以提升,类定义不可以
        //函数受函数作用域限制,类受块作用域限制
            {
                function func(){};
                class SomeClass{};
            }
            // console.log(func);//[Function: func]
            // console.log(SomeClass);//报错

        //类的名称 类的名称首字母大写
            let Person2 = class PersonName{
                identify() {
                    console.log(Person2.name,PersonName.name);
                }
            }
            let p = new Person2();
            p.identify();//PersonName PersonName
            console.log(Person2.name);//PersonName
            
            //不可以在类表达式作用域外部访问类名
            // console.log(PersonName);//报错

        //类构造函数 constructor 使用new 创建类的新实例时,会调用这个函数
            class Animal{};

            class Person3{
                constructor() {
                    console.log('person ctor');
                }
            }
            class Vegetable{
                constructor(){
                    this.color = 'red';
                }
            }

            let a = new Animal();
            let b = new Person3();//person ctor
            let c = new Vegetable();
            console.log(c.color);//red

        // 类可以在任何地方定义
        let classList = [
            class{
                constructor(id){
                    this.id_=id;
                    console.log(`instance ${this.id_}`);
                }
            }
        ];

        function createInstance (classDefinition,id){
            return new classDefinition(id);
        }
        let foo = createInstance(classList[0],3211);//instance 3211

        //类的实例化
        class Man {
            constructor(){
                this.name = new String('Jack');
                this.sayName = ()=>{console.log(this.name)};
                this.nickName = ['bitch','noob'];
            }
        }
        let p1 = new Man();
        let p2 = new Man();
        p1.sayName();//[String: 'Jack']
        p2.sayName();//[String: 'Jack']
        console.log(p1.name===p2.name);//false
        console.log(p1.sayName===p2.sayName);//false
        console.log(p1.nickName===p2.nickName);//false
        p1.name = p1.nickName[0];
        p2.name = p2.nickName[1];
        p1.sayName();//bitch
        p2.sayName();//noob

        //原型方法
            //为了在实例间共享方法,在类块中定义的方法作为原型方法
            class Female{
                constructor(){
                    this.locate = ()=>{console.log('instance')};
                    }
                    locate(){
                        console.log('prototype');
                    }
                }

            let p3 =new Female();
            p3.locate();//instance
            Female.prototype.locate();//prototype

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