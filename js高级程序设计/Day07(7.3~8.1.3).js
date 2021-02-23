//生成器(ES6)
    //yield关键字
        //生成器对象作为迭代对象
        function * nTimes(n) {
            while(n--){//后缀递减操作符总是在语句运算后再执行递减
                yield;//yield 让生成器停止或开始执行
            }
        }
        for (let _ of nTimes(3)){
            console.log('foo');
        }
            //利用生成器实现范围和填充数组
                //造轮子 实现range函数
                function* range(start,end){
                    while(end>start){
                        yield start++;
                    }
                }
                const arr = new Array()
                for (const i of range(2,7)){
                    arr.push(i);
                } 
                console.log(arr);

                //造轮子 实现填充数组
                function * zeros(times){
                    while(times--){
                        yield 0;
                    }
                }
                console.log(Array.from(zeros(6)));

        //利用生成器产生可迭代对象(yield*array)
            function* generator(){
                yield*[1,2,3]
            }
            for (const i of generator()){
                console.log(i);
            }

        //利用生成器实现递归算法
            //简单递归
            function * nTimes(n){
                if (n>0){
                   yield* nTimes(n-1); 
                   yield n-1;
                }   
            }
            for (const i of nTimes(4)){
                console.log(i);
            }


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




            