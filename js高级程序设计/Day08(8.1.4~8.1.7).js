//面向对象
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
		console.log(person);

		//可计算属性:在对象字面量中完成动态属性赋值
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
			console.log(newPerson);

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
		


				





