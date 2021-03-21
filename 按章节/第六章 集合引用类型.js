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

    //数组的对列方法(先进先出) shift()和unshift();
        //shift() 删除数组第一项并返回该项;
        //unshift() 向数组开头添加项并返回新数组长度
        let color = new Array();
        let count = color.unshift("hello","kitty");
        console.log(count);//2
        console.log(color);//[ 'hello', 'kitty' ]
        console.log(color.shift());//hello;
        console.log(color.length);//1

    //排序方法 reverse()和sort()
        //reverse() 反转数组内元素顺序(不在乎数组内元素的值);
        let arr = [1,9,5,7,3,4];
        arr.reverse();
        console.log(arr);//[ 4, 3, 7, 5, 9, 1 ]

        //sort() 不设参数的话,根据元素字符串开头字符大小比较;
        let arr1 = [1,2,13,4,5,31,'hello','aba'];
        arr1.sort();
        console.log(arr1);//[ 1, 13, 2, 31, 4, 5, 'aba', 'hello' ] 

        //sort() 可以接受比较函数作为参数,返回值为负就把该元素放在前面,为正就放在后面;
        function compare(value1,value2){
            if (value1<value2){
                return -1;//如果想降序排列,这里返回正数
            }

            else if (value1>value2){
                return 1;//如果想降序排列,这里返回负数
            }

            else {
                return 0;
            }
        };
        let arr2 = [1,12,3,4,21,2,5,49,7];
        arr2.sort(compare);
        console.log(arr2);//[1,  2,  3,  4, 5, 7, 12, 21, 49];
            //如果数组元素为数值,或Date对象,比较函数可以更简单;
            function compare1(value1,value2){
                return value1-value2; //如果想降序排列可以写成value2-value1
            }
            arr3 = [1,2,51,23,22,3,4,6];
            arr3.sort(compare1);
            console.log(arr3);
    
    // 数组操作方法 concat(),slice(),splice()
        //concat()将接受到的元素添加到数组的末尾,默认打平数组(将嵌套数组的每一项都拿出来,合并数组)
        let colors = ['red','yello','blue'];
        let colors2 =colors.concat('black',['green','pink']);
        console.log(colors2);//[ 'red', 'yello', 'blue', 'black', 'green', 'pink' ]

        //强制不打平数组的方法 Symbol.isConcatSpreadable
            let newcolors = ['green','pink'];
            let morenewcolors = {
                [Symbol.isConcatSpreadable]:true,
                length:2,
                0: "white",
                1: "gold"
            };

            newcolors[Symbol.isConcatSpreadable] = false;

            //强制不打平数组;
            let cols = colors.concat('grey',newcolors);
            /* [
                'red',
                'yello',
                'blue',
                'grey',
                [ 'green', 'pink', [Symbol(Symbol.isConcatSpreadable)]: false ]
            ] */

            //强制打平数组;
            let cols2 = colors.concat(morenewcolors);//[ 'red', 'yello', 'blue', 'white', 'gold' ]

            console.log(cols);
            console.log(cols2);

        //数组切片 slice();
        //数组splice()方法,三种作用
            //1.删除操作 splice(删除的第一个元素位置,删除元素数量);
            let arr_ = ['foo','bar','baz','qux'];
            console.log(arr_.splice(1,2));//返回删除元素 [ 'bar', 'baz' ]
            console.log(arr_);//[ 'foo', 'qux' ]

            //2.插入操作 splice(删除的第一个元素位置,0,插入元素);
            console.log(arr_.splice(1,0,'bar','baz'));//[]没有删除元素会返回空数组;
            console.log(arr_)//[ 'foo', 'bar', 'baz', 'qux' ];

            //3.替换操作 splice(删除的第一个元素位置,删除元素数量,替换元素);
            console.log(arr_.splice(1,2,'rab','zab','zack'));//返回删除元素 [ 'bar', 'baz' ];
            console.log(arr_);//[ 'foo', 'rab', 'zab', 'zack', 'qux' ]

    //数组搜索方法
        //严格相等 (indexof lastindexof includes) 
            //indexof(搜索元素,开始搜索位置(可选))从前往后搜索 返回元素位置 找不到返回-1
            //lastindexof(搜索元素,开始搜索位置(可选))从后往前搜索 返回元素位置 找不到返回-1
            //includes(搜索元素,开始搜索位置(可选))返回布尔值
                let numbers = [1,2,3,4,5,4,3,2,1];
                console.log(numbers.indexOf(4,4));//5
                console.log(numbers.lastIndexOf(4,4));//3
                console.log(numbers.includes(4,4));//true

                let person = {name:'Jack'};
                let people = [{name:'Jack'}];
                let morepeople = [person];

                console.log(people.indexOf(person));//-1 
                console.log(people.includes(person));//false
                console.log(morepeople.indexOf(person));//0
                console.log(morepeople.includes(person));//true

        //断言函数(元素,索引,数组本身) 返回真值,表示是否匹配; find和findIndex使用了断言函数
            //find() 返回第一个匹配的元素
            //findIndex() 返回第一个匹配的元素的索引
            const people_=[
                {
                    name : 'Bob',
                    age : '18'
                },
                {
                    name : 'Kitty',
                    age : '28'
                }

            ]

            console.log(people_.find((element,index,array)=>
                element.age<20
            ));//{ name: 'Bob', age: '18' } 返回第一个匹配的元素

            console.log(people_.findIndex((element,index,array)=>
                element.age<20
            ));//0 返回第一个匹配的元素的索引

            //find和findIndex接受到true值的时候(表示匹配到了)不会再继续检索
            let arr4 = [1,2,3,4];
            arr4.find((element,index,arr)=>{
                console.log(element);//1
                console.log(index);//0
                console.log(arr);//[1,2,3,4]
                return true
            })

    //数组迭代方法:5种方法,每种方法传入的函数都接受三个参数(数组元素,元素索引,数组本身),
        //这些方法都不会改变调用他们的的数组
        //这些方法都会对数组每一项运行传入的函数(本例中为箭头函数)

        //every() 如果对数组每一项,函数都返回true,那么这个方法返回true;
            let numbers_ = [1,2,3,4,5,6];
            let every_result = numbers.every((items,index,arr)=>items>3);
            console.log(every_result);//false
            console.log(numbers_)//[ 1, 2, 3, 4, 5, 6 ]不改变原数组

        //filter() 将传入的函数返回true的项组成新数组后返回 是一种筛选数组元素的方法
            let filter_result = numbers_.filter((items,index,arr)=>items>2);
            console.log(filter_result);//[ 3, 4, 5, 6 ]

        //some() 如果对数组某一项传入函数返回true,那么这个方法返回true;
            let some_result = numbers_.some((items,index,arr)=>items>3);
            console.log(some_result);//true

        //map() 对数组每一项执行某种操作并将返回的结果放入新数组
            let map_result = numbers_.map ((items,index,arr)=> items**2);
            console.log(map_result);//[ 1, 4, 9, 16, 25, 36 ]

        //forEach 没有返回值,相当于for循环;
            let forEach_result = numbers_.forEach((items,index,arr)=> items**2) ;
            console.log(forEach_result);//undefined 没有返回值

    //数组归并方法 reduce()和reduceRight()
        //两种方法都会迭代数组的所有项
        //reduce(上一个归并值,当前值,当前项的索引,数组本身);reduce从第一项遍历到最后一项
            //reduce中第一个参数和第二个参数默认为数组第一项,第二项
            let values = [1,2,3,4,5];
            let sum = values.reduce((prev,cur,index,array) => prev+cur);

            console.log(sum);//15;

        //reduceRight(上一个归并值,当前值,当前项的索引,数组本身);reduceRight从最后一项遍历到第一项,其他同reduce
            let mulRight = values.reduceRight((prev,cur,index,array) => prev*cur);
            console.log(mulRight);//120

    //定型数组;目的是提升向原生库传输数据的效率
        //ArrayBuffer 所有定型数组及视图引用的基本单位
        const buf = new ArrayBuffer(16); //在内存中分配16字节
        console.log(buf.byteLength);//16
        //ArrayBuffer 创建无法修改大小,可以使用slice()切片
        const buf1 = buf.slice(4,12);
        console.log(buf1.byteLength)//8

        //DataView 视图
            //必须在已有的ArrayBuffer上读取和写入才能创建DataView实例
            const buf_ = new ArrayBuffer(16);
            //DataView 默认使用整个ArrayBuffer;
            const fullDataView = new DataView(buf_);
            console.log(fullDataView.byteOffset);//0
            console.log(fullDataView.byteLength);//16
            console.log(fullDataView.buffer===buf_);//true

            //DataView可以接受两个可选的参数,byteOffset字节偏移量,byteLength字节长度
            const halfDataView = new DataView(buf_,0,8);
            console.log(halfDataView.byteOffset);//0
            console.log(halfDataView.byteLength);//8
            console.log(halfDataView.buffer===buf_);//true

        //<ElementType>.from()和<ElementType>.of() 创建定型数组
        const ints1 = Int16Array.from([1,2,3,4]);//<ElementType>.from()基于传入的数组创建定型数组
        const ints2 = Int32Array.of(1,2,3,4);//<ElementType>.of()基于传入的参数创建定型数组

        //合并,复制和修改定型数组
            //set()从提供的数组或定型数组中把值复制到当前定型数组中指定的索引位置;
            const container = new Int16Array(8);//创建长度为8的int16数组,不初始化数组元素,就默认为0
            container.set(Int8Array.of(1,2,3,4))//复制传入的int8数组,默认从0位置开始插入
            console.log(container);//Int16Array(8) [ 1, 2, 3, 4, 0, 0, 0, 0];

            container.set([5,6,7,8],4);//第二个参数表示插入位置
            console.log(container);//Int16Array(8) [1, 2, 3, 4, 5, 6, 7, 8];

            //subarray(开始索引,结束索引);从原始定型数组复制的值返回的值返回一个新数组
            const source = Int16Array.from([1,2,3,4,5]);
            const copy_ = source.subarray(1,3);
            console.log(copy_);//Int16Array(2) [ 2, 3 ]

            //定型数组没有原生拼接能力,只能手动造轮子
                //typedArraykind 要得到的结果定型数组类型
                //typesArray 传入的要合并的定型数组
                function typedArrayConcat(typedArraykind,...typesArray){
                    let typesArray_num = typesArray.reduce((x,y)=>(x.length||x)+y.length)//计算所有数组元素个数
                    let result_arr = new typedArraykind(typesArray_num);//创建结果定型数组
                    let currentoffset = 0;//设置初始插入位置为0;
                    typesArray.map(x=>{
                        result_arr.set(x,currentoffset);
                        currentoffset+=x.length;
                    })
                    return result_arr;

                }
                const concatArray = typedArrayConcat(
                                        Int32Array,
                                        Int16Array.of(1,2,3,4),
                                        Int32Array.of(5,6,7,8),
                                        Float64Array.of(1.2,3,5.4)

                                        )
                console.log(concatArray)//Int32Array(11) [1, 2, 3, 4, 5, 6, 7, 8, 1, 3, 5]
                console.log(concatArray instanceof Int32Array)//true

//Map映射(ES6):类似于Object对象
    //使用嵌套数组初始化映射
	const m1 = new Map([
		['key1','val1'],
		['key2','val2'],
		['key3','val3'],
	])
	console.log(m1.size);//3 size属性获取映射中键值对数量
	console.log(m1.get('key1'));//val1 get方法获取键值对
	console.log(m1.has('key2'));//true has方法检查键值对
	m1.set('firstName','Jack')
	  .set('lastName','Mary');//set方法添加键值对
	console.log(m1.size);//5
	//delete() 删除键值对
	//clear() 清空键值对

	//与Object不同,Map可以使用任何数据类型作为键;(Object中引用值不能作为键)

	//顺序与迭代
		//通过entries()进行迭代
		for (let pair of m1.entries()){
			console.log(pair);
		};
		/* [ 'key1', 'val1' ]
		[ 'key2', 'val2' ]
		[ 'key3', 'val3' ]
		[ 'firstName', 'Jack' ]
		[ 'lastName', 'Mary' ]
 */
		//由于entries()是默认迭代器,可以直接将映射转为数组,
		console.log([...m1])//[[ 'key1', 'val1' ] [ 'key2', 'val2' ] [ 'key3', 'val3' ] [ 'firstName', 'Jack' ] [ 'lastName', 'Mary' ]]
	
//WeakMap()弱映射(ES6)
	//弱映射中键必须是Object或继承自Object类型
	//弱映射中键不属于正式的引用,不会阻止垃圾回收

//Set集合(ES6)
	//加强版Map
    //集合内不可有重复元素.使用"==="严格相等来检查
	const s1 = new Set(['val1','val2','val3'])//使用数组初始化集合
	//使用add()增加值,has(),get(),size(),delete(),clear()等用法与Map集合相同
	//与Map类似,可以使用任何数据类型作为值

//WeakSet弱集合(ES6)
	//弱集合指的是垃圾回收程序对待弱集合中值的方式
	//弱集合中的值不属于正式的引用,不会阻止垃圾回收
