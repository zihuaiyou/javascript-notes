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
	const s1 = new Set(['val1','val2','val3'])//使用数组初始化集合
	//使用add()增加值,has(),get(),size(),delete(),clear()等用法与Map集合相同
	//与Map类似,可以使用任何数据类型作为值

//WeakSet弱集合(ES6)
	//弱集合指的是垃圾回收程序对待弱集合中值的方式
	//弱集合中的值不属于正式的引用,不会阻止垃圾回收

//迭代器与生成器(ES6)