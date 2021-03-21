//迭代器与生成器
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
        /* foo
        foo
        foo */

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
                console.log(arr);//[ 2, 3, 4, 5, 6 ]

                //造轮子 实现填充数组
                function * zeros(times){
                    while(times--){
                        yield 0;
                    }
                }
                console.log(Array.from(zeros(6)));//[ 0, 0, 0, 0, 0, 0 ]

        //利用生成器产生可迭代对象(yield*array)
            function* generator(){
                yield *[1,2,3]
            }
            /* 相当于 function* generator(){
                for (const i of [1,2,3]){
                    yield i
                }
            } */
            for (const i of generator()){
                console.log(i);
            }
            /* 1
            2 
            3 */

        //利用生成器实现递归算法
            //简单递归
            function * nTimes(n){
                if (n>0){
                   yield* nTimes(n-1);
                   yield n - 1;
                }   
            }
            /* yield* nTimes(n-1)相当于
            for (const i of nTimes(n-1)){
                yield i;
           }  */
            for (const i of nTimes(4)){
                console.log(i);
            }

            /* 0
            1
            2
            3 */