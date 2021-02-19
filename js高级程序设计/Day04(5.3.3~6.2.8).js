//String
    //字符串包含方法 startsWith(); endsWith(); includes();
        let msg='foobarbaz';
        //startsWith() 从开头检查,第二个参数表示开始检查的起始点;
        console.log(msg.startsWith('foo'));//true
        console.log(msg.startsWith('bar'));//false
        console.log(msg.startsWith('foo',1));//false

        //endsWith() 从结尾开始检查,第二个参数表示字符串末尾的位置(不包含);
        console.log(msg.endsWith('baz'));//true
        console.log(msg.endsWith('foo'));//false
        console.log(msg.endsWith('bar',6));//true

        //includes() 检查整个字符串 ,第二个参数表示开始搜索的位置
        console.log(msg.includes('baz'));//true
        console.log(msg.includes('foo'));//true
        console.log(msg.includes('foo',2));//false

    //trim() 删除前后空格,不改变原始结果,
        //trimLeft() 从左边开始
        //trimRight() 从右边开始
        let text = ' hello world   '
        let str = text.trim()
        let str1 = text.trimLeft()
        let str2 = text.trimRight()
        console.log(str.length);//11  Number String Boolean类型的原始值可以包装成对象,并使用调用属性方法
        console.log(str1.length)//14
        console.log(str2.length)//12

    //字符串解构 ...
        message='hello world';
        console.log([...message]);

    //大小写; toUpperCase()和toLowerCase()

    //字符串模式匹配
        //match方法 (同exec()方法)
        let text1 = 'cat , bat , sat , fat';
        let pattern = /.at/;
        let matches = text1.match(pattern)//同 pattern.exec(text1)
        console.log(matches[0]);//cat
        console.log(matches.index);//0
        console.log(pattern.lastIndex);//0

        //search方法 返回匹配字符串的位置索引
        console.log(text1.search(/at/));

        //replace(匹配字符,替换字符) 如果第一个参数为字符串就只能匹配第一个字符
        console.log(text1.replace("at","and"));//cand,bat,sat,fat 
        console.log(text1.replace(/.at/g,'and'));//第一个参数为正则表达式(加上全局标记)就可以匹配全部字符串
        //replace()第二个参数可以是函数,这个函数接受三个参数,(匹配字符,匹配项开始位置,整个字符串)
        function htmlEscape(text){
            return text.replace(/[<>&"]/g,function(match,pos,orginalText){
                switch(match){
                    case "<":
                        return "&lt;";
                    case ">":
                        return "&gt;";
                    case "&":
                        return "&amp;";
                    case "\"":
                        return "&quot;";
                }
            });
        }
        console.log(htmlEscape("<p class=\"greeting\">Hello world!</p>"));

        //split(分隔符);
            //分隔符可以是字符串,也可是正则表达式
        let text2 = 'red , blue , yello , green';
        console.log(text2.split(','));//[ 'red ', ' blue ', ' yello ', ' green' ]
        console.log(text2.split(/[^e]+/));//正则表达式中,^表示开始匹配的位置,但是放在[]内表示取反;


//Global对象
    //url编码方法
    //encodeURI和 encodeURIComponent
    let uri='https://blog.csdn.net/weixin_44061131/  article/details/104946763';
    console.log(encodeURI(uri));//encodeURI不会编码 : / ? # 等特殊字符
    //https://blog.csdn.net/weixin_44061131/%20%20article/details/104946763

    console.log(encodeURIComponent(uri));//encodeURIComponent编码所有非标准字符
    //https%3A%2F%2Fblog.csdn.net%2Fweixin_44061131%2F%20%20article%2Fdetails%2F104946763

    //decodeURI和decodeURIComponent
    let _uri = "https%3A%2F%2Fblog.csdn.net%2Fweixin_44061131%2F%20%20article%2Fdetails%2F104946763";

    console.log(decodeURI(_uri));//decodeURI只能解码encodeURI编码过字符
    //https%3A%2F%2Fblog.csdn.net%2Fweixin_44061131%2F  article%2Fdetails%2F104946763

    console.log(decodeURIComponent(_uri));//decodeURIComponent 解码所有特殊值
    //https://blog.csdn.net/weixin_44061131/  article/details/104946763


//Math对象
	//Math.random() 生成0~1随机数;
	//从数组中随机选择的实现方法
	function selectFrom(lowValue,upperValue){
		let choices = upperValue-lowValue+1;
		return Math.floor(Math.random()*choices + lowValue) 
	}
	let color_arr = ['red','blue','yellow','orange','black','white'];
	let color_random = color_arr[selectFrom(0,color_arr.length - 1)] ;
	console.log(color_random);


//创建Object实例的两种方法
	//Object 构造函数
	let person = new Object();
	person.name = 'Peter';
	person.age = '27';

	//对象字面量表示法(,分隔)
	let person1 = {
		name : 'James',
		age : '29'
	}


//数组 Array 有序序列,并且可以存储任意对象;
	//创建数组的两种方法 new Array() 和 []
	let a = new Array(3);//创建length为3的数组;
	let b = [1,2,3]

	//ES6新增方法 from(),of()
		//from() 将类数组结构转化为数组实例
		console.log(Array.from('hello'));	//[ 'h', 'e', 'l', 'l', 'o' ]
		//Array.from()还接受第二个可选的映射函数参数;
		const a1=[1,2,3,4];
		const a2=Array.from(a1,x=>x**2);
		console.log(a2);//[ 1, 4, 9, 16 ]
		//Array.from()还接受第三个参数,指定映射函数参数的值;
		const a3=Array.from(a1,function(x) {return x**this.exponent},{exponent:2});
		console.log(a3);//[ 1, 4, 9, 16 ]

		//Array.of 将一组参数转为数组
		console.log(Array.of(1,2,3,4))//[1,2,3,4]

	//数组空位 用逗号表示空位元素
	const options=[,,,,,];
	console.log(options.length);//5
		//ES6规范将空位当成存在的元素,值为undefined;
		for(const option of options ){
			console.log(option === undefined);//都是 true
		}
		//实践中应避免使用数组空位,用undefined代替;

	//数组的length属性可以修改,修改变大就添加undefined,改小就删除末尾元素;
	let arr= [1,2,3,4];
	arr.length = 5;
	console.log(arr);//[ 1, 2, 3, 4, <1 empty item> ]
	console.log(arr[4]);//undefined
	arr.length=2;
	console.log(arr);//[1,2]

	//迭代器方法
		//keys()返回索引,values()返回数组元素,entries()返回所有
		//这些方法都返回迭代器,可用Array.from()方法转化为数组
	const a_ = ['foo','bar','baz','qux'];
	const aKeys = Array.from(a_.keys());
	const aValues = Array.from(a_.values());
	const aEntries = Array.from(a_.entries());

	console.log(aKeys);//[0,1,2,3]
	console.log(aValues);//[ 'foo', 'bar', 'baz', 'qux' ]
	console.log(aEntries);//[ [ 0, 'foo' ], [ 1, 'bar' ], [ 2, 'baz' ], [ 3, 'qux' ] ]

	//ES6新增方法 填充数组方法fill() 复制copyWithin()
		//fill(填充元素,开始填充位置(可选,包含),结束位置(可选,不包含))
		const zeros = [0,0,0,0,0,0];
		console.log(zeros.fill(6))//[ 6, 6, 6, 6, 6, 6 ]
		zeros.fill(0)//重置
		console.log(zeros.fill(6,3,-1));//[ 0, 0, 0, 6, 6, 0 ]
		//copyWithin(插入复制位置,复制开始位置,复制结束位置(不包含))
		//只有一位参数时,copyWithin(插入复制位置,),默认从零开始复制
		let ints,
			reset=()=>ints = [1,2,3,4,5,6,7,8,9];
		reset();
		console.log(ints.copyWithin(5));//[1, 2, 3, 4, 5, 1, 2, 3, 4];
		reset();
		console.log(ints.copyWithin(6,2,5));

		let male = {
			toString(){
				return 'hello';
			},
			toLocaleString(){
				return 'world';
			}
		}

		let female = { //对象字面量表示法
			toString(){
				return 'fine';
			},
			toLocaleString(){
				return 'thank';
			}
		}
		let people=[male,female];
		/* alert(people);//hello,fine 默认调用toString()方法
		alert(people.toString());//hello,fine
		alert(people.toLocaleString());//world,thank */
		
		//join(分隔符);用指定分隔符分隔字符串 
		let arr1 = ['a','b','c','d'];
		console.log(arr1.join("|"));//a|b|c|d

	// 数组的栈方法(后进先出),push和pop
		//push()将元素插到数组末尾,返回数组新长度 
		let arr2 = new Array();
		count = arr2.push('a','b');
		console.log(count);//2
		console.log(arr2);//[ 'a', 'b' ]

		//pop() 删除数组最后一项并将其返回
		let arr3 = [1,2,3,'b'];
		console.log(arr3.pop());//b pop











    


    