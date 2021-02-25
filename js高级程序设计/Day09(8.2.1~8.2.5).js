//面向对象
    //创建对象
        //工厂模式:缺点 不能确定新创建的对象是什么类型
        function createPerson(name,age){
            let o = new Object();
            o.name=name;
            o.age=age;
            o.sayHi=function(){
                console.log('Hi~');
            };
            return o;
        };
        let person = createPerson('Jack',15);
        console.log(person);//{ name: 'Jack', age: 15, sayHi: [Function (anonymous)] }
        person.sayHi()//Hi~

        //构造函数模式 能够确保实例化的对象是特定类型
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
                //in 检查实例和原型是否拥有属性xx
                function Person3(){};
                Person3.prototype.name = 'nina';
                Person3.prototype.age = 16;
                Person3.sayHi=function(){
                    console.log('Hi~');
                }
                let person6 = new Person2();
                let person7 = new Person2();
                person6.name = 'beauty'
                console.log(person6.name);//beauty 实例属性
                console.log(person7.name);//nina 原型属性
                console.log(person6.hasOwnProperty('name'));//true name属性在实例上
                console.log('name' in person6);//true
                console.log(person7.hasOwnProperty('name'));//false name属性在原型上
                console.log('name' in person7);//true

                //检查属性是否在原型上
                function hasPrototypeProperty(object,name){
                    return !object.hasOwnProperty(name)&&(name in object);
                }
                console.log(hasPrototypeProperty(person7,'name'));//true

                



            



        




