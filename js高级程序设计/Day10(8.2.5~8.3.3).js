//面向对象
    //创建对象
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



        