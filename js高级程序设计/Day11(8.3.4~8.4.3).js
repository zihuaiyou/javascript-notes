//面向对象
    //继承
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

    //寄生式组合继承 **
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

            

            


            



