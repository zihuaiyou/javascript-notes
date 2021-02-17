//前缀操作符的副作用,自减/增操作会直接改变变量的值
/* let age = 12;
let anotherAge = --age + 2;
console.log(age);
console.log(anotherAge); */

//后缀递增/减操作会在语句运算结束后运行
/* let num1 = 2;
let num2 = 20;
let num3 = num1-- + num2;
let num4 = num1 + num2;
console.log(num3);
console.log(num4); */

//按位非~:将原数值取反后减一 (理解二补数编码原理)
//按位与&;按位或 |;按位异或 ^;
//符号位:二进制数第32位,0表示正数,1表示负数
/* let num = 10;
let num1 = ~num;
console.log(num1); */

//左移<<(空出数补零),有符号右移(空出数补符号位数字)>>,无符号右移(空位补零)>>>,
/* let num1 = 12,
  num4 = -12;
let num2 = num1 << 5;
let num3 = num2 >> 5;
let num5 = num4 >>> 5;
console.log(num2);
console.log(num1.toString(2));
console.log(num2.toString(2));
console.log(num3);
console.log(num3.toString(2));
console.log(num5);
console.log(num5.toString(2));
console.log(num4.toString(2)); */

//逻辑非: !;
//!!:可以返回变量真正的布尔值;
//逻辑非一定返回布尔值,但逻辑与,逻辑或则不一定;
/* console.log(!"false");
console.log(!!"false");
console.log(!0, !4);
console.log(!undefined, !null); */

//逻辑与:&&;
//短路特性;
/* // let a=true;
// console.log(a&&undeclaredVar);//报错,因为a是true,逻辑与操作符会继续求值未声明变量undeclaredVar
let b = false;
console.log(b && undeclaredVar); //不报错,b为false,直接发生短路,不会求值未声明变量undeclaredVar */

//逻辑或;||
//短路特性与逻辑与类似但结果相反;

//取余操作符 %
//指数操作符 **= (ES7新特性);
/* let num = 2;
num = num **= 2;
console.log(num); */

//加法操作符
//数值和字符串相加时要格外注意
/* let num1 = 5,
  num2 = 10;
console.log("the sum of 5 and 10 is " + num1 + num2); //结果是'the sum of 5 and 10 is 510';因为每次加法分别运算;
console.log("the sum of 5 and 10 is " + (num1 + num2)); //结果是'the sum of 5 and 10 is 15';加()优先运算; */

//关系操作符
/* console.log("23" < "3"); //true 字符串比较首字母编码大小
console.log("23" < 3); //false 两个变量中有一个为数值型,则都转换为数值型去比较
console.log("a" > "3"); //true
console.log("a" > 3); //false 这里'a'转换为NaN,任何涉及NaN的比较都返回false; */

//相等操作符
//强制类型转换 '=='和'!='
//不强制类型转换'==='和'!=='
//注意:undefined==null;NaN!=NaN;
/* console.log(undefined == null); //true
console.log(NaN == NaN); //false
console.log(5 == "5"); //true
console.log(5 === "5"); //false */

//条件操作符 ?
/* let num1 = 1,
  num2 = 2;
let max = num1 > num2 ? num1 : num2; //true 返回num1,false返回num2
console.log(max); */

//for循环;while循环
/* let count = 5;
for (let i = 0; i < count; i++) {
  //这里i++循环执行后才会执行
  console.log(i);
}

let j = 0;
while (j < count) {
  console.log(j);
  j++;
} */

//break与continue
//break 语句直接跳出循环,continue语句退出循环后从头开始重新进入循环
/* let num = 0;
for (i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    break;
  }
  num++;
}
console.log(num); //4

for (let i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    continue;
  }
  num++;
}
console.log(num); //8 */

//break和continue嵌套循环(结合标签语句)
/* let num = 0;

outermost: for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      break outermost;
    }
    num++;
  }
}
console.log(num); */

/* let num = 0;

outermost: for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      continue outermost; //这里continue outermost表示继续执行outermost循环,从55直接跳到60;
    }
    num++;
  }
}
console.log(num); //95

let num1 = 0;

outermost: for (let i = 0; i < 10; i++) {
  innermost: for (let j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      continue innermost; //继续内循环
    }
    num1++;
  }
}
console.log(num1); //99 */

//switch语句
	//任何条件都没满足时,会执行default;
	//break 直接跳出循环
/* let i = 1000;
switch (i) {
  case 25:
    console.log("25");
    break;
  case 35:
    console.log("35");
    break;
  default:
    console.log("other");
}

let num = 25;
switch (false) {
  case num < 0:
    console.log("Less than 0");
    break;
  case num >= 0 && num <= 10:
    console.log('Between 0 and 10');
    break;
  default:
    console.log("More than 10");
} */


//function
	//return之后的语句不会执行
	//return 不带返回值会提前终止函数执行 并返回undefined
/* function sum(num1,num2){
	return num1+num2;
	console.log('这段代码不会执行')
}
const result=sum(1,2);
console.log(result);

function somefunc(a){
	return;
	console.log('这段代码不会执行')
}
const a=somefunc('hello');
console.log(a);//返回undefined */


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








