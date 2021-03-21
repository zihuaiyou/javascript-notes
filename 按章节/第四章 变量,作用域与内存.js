//变量分为原始值和引用值
	//原始值不能有属性
	//只有引用值才能动态添加属性
	//引用值的复制值实际上是一个指针,两个变量指向同一个对象
//typeof 检测原始值类型
//instanceof 检测引用值(对象)类型
let name1='Kitty';//原始值
let name2=new String('Peter');//引用值
name1.age=21;
name2.age=22;
console.log(name1.age);//undefined
console.log(name2.age);//22
console.log(typeof name1);//string
console.log(typeof name2);//object

let obj1=new Object();
obj2=obj1;
obj1.name='Bob';
console.log(obj2.name);//Bob 对其中一个对象的修改会影响另一个对象

console.log(obj1 instanceof Object);//true; 对于引用值,检查Object一定返回true;

//变量声明;var,let(ES6),const(ES6)
    //var 函数(全局)作用域,变量声明提升效果
    //var声明除非在函数内,否则一直定义在全局
    function add(num1,num2){
        var sum =num1+num2;//var声明会使变量添加到最接近的上下文,此处是函数的局部上下文;
        return sum;
    }
    console.log(add(1,2));//3
        // console.log(sum);//报错,sum未定义;

    function add(num1,num2){
        sum =num1+num2;//不声明变量会使变量添加到全局上下文;
        return sum;
    }
    add(1,2);
    console.log(sum);//3

    //var声明的提升现象;
    function print_word(){
        console.log(word);
        var word = 'hello world';
    }
    print_word()//undefinded var声明使变量提升到函数作用域或全局作用域顶部

    //let声明 块级作用域;由最近的一组{}界定;
    if (true){
        let a;
    }
        // console.log(a);//报错 a未定义

    {
        let _case=1;

    }
        // console.log(_case);//报错,let声明作用于块内;

    //var可以声明多次(变量提升的效果);let声明只可以声明一次;
    var a;
    var a;
    /* {
        let b;
        let b;//报错
    } */

    //var声明可能会导致迭代变量泄漏的问题;
    for(var i=0;i>10;i++){}
    console.log(i);// 0 变量i泄漏到循环体外部;
    for(let j=0;j>10;j++){}
    //console.log(j);//报错 j未定义;

    //const 常量声明;除了不可修改其余和let声明一致(也是块作用域);


//标识符查找:沿着作用域链从前往后查找(优先局部作用域)
    var color = 'blue';
    function get_color(){
        color='red';{
            color='green';
            return color;
        }
    }
    console.log(get_color());//green


//引用值的复制实际上是复制了对内存中对对象的引用
function Article(){
    this.title = 'hello world';
}
/* let a1 = new Article();//new一个Article类型的对象
let a2 = new Article();
a2.author='Jake';
console.log(a1.author); *///undefined; 证明a1 a2指向不同的对象

let a1=new Article();
let a2 = a1;
a2.author='Peter';
console.log(a1.author);//Peter; a1 a2 指向相同的对象;