//期约(Promise)与异步函数(ES6)
    //Promise(期约)    
        //Promise对象的实例方法
            //Promise.prototype.then():为期约实例添加处理对象的主要方法
            //then()最多接受两个可选参数,onResolved和onRejected,分别会在期约进入resolve和reject状态时执行
            //传给then()的任何非函数对象都会被忽略
                function onResolved(id){
                    setTimeout(console.log,0,id,'resolved');
                }
                function onRejected(id){
                    setTimeout(console.log,0,id,'rejected');
                }
                let p1 = new Promise((resolve,reject) => setTimeout(resolve,3000));
                let p2 = new Promise((resolve,reject) => setTimeout(reject,3000));

                p1.then(() => onResolved('p1'),
                        () => onRejected('p1'));//p1 resolved
                p2.then(() => onResolved('p2'),
                        () => onRejected('p2'));//p2 rejected

            //Promise.prototype.then()返回一个新的Promise实例
                let p1 = Promise.resolve('foo');
                let p2 = p1.then()//如果then()不传处理程序,则调用Promise.resolve()包装上一个期约的解决之后的值
                setTimeout(console.log,0,p2);//Promise {<fulfilled>: "foo"}

                //如果没有显式的返回语句,Promise.resolve()会包装默认返回值undefined
                //下面表达式结果都一样
                let p3 = p1.then(() => undefined);
                let p4 = p1.then(() => {});
                let p5 = p1.then(() => Promise.resolve());
                setTimeout(console.log,0,p3);
                setTimeout(console.log,0,p4);
                setTimeout(console.log,0,p5);
                //Promise {<fulfilled>: undefined}
                //Promise {<fulfilled>: undefined}
                //Promise {<fulfilled>: undefined}

                //如果有显式的返回值,Promise.resolve会包装这个值
                //下面表达式结果都一样
                let p1 = Promise.resolve('foo');
                let p6 = p1.then(() => 'bar');
                let p7 = p1.then(() => Promise.resolve('bar'));
                setTimeout(console.log,0,p6);//Promise {<fulfilled>: "bar"}
                setTimeout(console.log,0,p7);//Promise {<fulfilled>: "bar"}

            //Promise.prototype.catch() 用于给期约添加拒绝处理程序,
                //相当于Promise.prototype.then(null,rejected)
                let p = Promise.reject();
                let onRejected = function (e){
                    setTimeout (console.log,0,'rejected');
                };
                //这两种添加拒绝处理程序的效果是一样的
                p.then(null,onRejected);//rejected
                p.catch(onRejected);//rejected
            
            //Promise.prototype.finally 用于给期约添加onFinally处理程序
                //onFinally处理程序不知道期约的状态,所以该方法主要用于清理代码
                let p1 = Promise.resolve();
                let p2 = Promise.reject();
                let onFinally = function(){
                    setTimeout(console.log,0,'Finally');
                };
                p1.finally(onFinally);//Finally
                p2.finally(onFinally);//Finally

                //Promise.prototype.finally也会返回一个新的期约实例
                    //不同于then()或catch()方法返回的实例,finally()返回的实例表现为父期约的传递
                        let p1 = Promise.resolve('foo');
                        //下面表达式结果一致
                        let p2 = p1.finally();
                        let p3 = p1.finally(() => undefined);
                        let p4 = p1.finally(() => 'bar');
                        setTimeout(console.log,0,p2);//Promise { 'foo' }
                        setTimeout(console.log,0,p3);//Promise { 'foo' }
                        setTimeout(console.log,0,p4);//Promise { 'foo' }

                    //如果返回的是一个待定期约,或者是onFinally处理程序抛出错误,则会返回相应的期约
                        let p5 = p1.finally(() => new Promise(() => {}));
                        let p6 = p1.finally(() => Promise.reject());

                        setTimeout(console.log,0,p5);//Promise { <pending> }
                        setTimeout(console.log,0,p6);//Promise { <rejected> undefined }
            
            //非重入期约方法
                //当期约进入settled状态时,与该状态相关的处理程序(then等)不会立即执行,
                //处理程序之后的同步代码一定在处理程序之前完成
                let p =Promise.resolve();
                p.then(() => console.log('onResolved hander'));
                console.log('then() returns');
                /* then() returns
                onResolved hander  //同步代码一定在处理程序之前完成
                */

            //给期约添加的处理程序会按照添加顺序依次执行
                let p1 = Promise.resolve();
                let p2 = Promise.reject();

                p1.then(() => setTimeout(console.log,0,1));
                p1.then(() => setTimeout(console.log,0,2));

                p2.catch(() => setTimeout(console.log,0,3));
                p2.catch(() => setTimeout(console.log,0,4));
                /* 1
                2
                3
                4 */

            //传递解决值或拒绝理由
                //执行函数传递:解决值或理由作为resolve或reject的第一个参数传递给处理程序,作为处理程序的唯一参数
                let p1 = new Promise((resolve,reject) => resolve('foo'));
                p1.then((value) => console.log(value));//foo

                let p2 = new Promise((resolve,reject) => reject('bar'));
                p2.then((value) => console.log(value));//bar

                //Promise.resolve和Promise.reject静态方法被调用时就会接收解决值和拒绝理由
                let p1 = Promise.resolve('foo');
                p1.then((value) => console.log(value));//foo

                let p2 = Promise.reject('bar');
                p2.then((value) => console.log(value));//bar

            //拒绝期约与拒绝错误处理
                //拒绝期约类似于throw
                let p1 = new Promise((resolve,reject) => reject(Error('foo')));
                let p2 = new Promise((resolve,reject) => {throw Error('foo');});
                let p3 = Promise.resolve().then(() => {throw Error('foo');});
                let p4 = Promise.reject(Error('foo'));

                setTimeout(console.log,0,p1)
                setTimeout(console.log,0,p2)
                setTimeout(console.log,0,p3)
                setTimeout(console.log,0,p4)
                //结果都一样
                /* Promise {<rejected>: Error: foo
                Promise {<rejected>: Error: foo
                Promise {<rejected>: Error: foo
                Promise {<rejected>: Error: foo */

                //期约中的错误是异步抛出的,所以不会阻止后面的同步操作
                    //同步错误
                    throw Error('foo');//Error: foo
                    console.log('bar');//这一行不会执行
                    //异步错误
                    Promise.reject(Error('foo'));
                    console.log('bar');//这一行会执行,并且先执行
                    /* bar
                    Error: foo */

                //异步错误只能通过异步的onRejected处理程序补获
                    //onRejected处理程序的任务主要是补获异步错误之后返回一个解决的期约

                    //同步错误处理
                        console.log('begin synchronous execuion');
                        try {
                            throw Error('foo');
                        } catch(e) {
                            console.log('catch error',e);
                        }
                        console.log('continue synchronous execution');
                        //begin synchronous execuion
                        //catch error Error: foo
                        //报错
                        //continue synchronous execution

                    //异步错误处理
                        new Promise((resolve,reject) =>{ //执行器函数是同步执行的
                            console.log('begin synchronous execuion');
                            reject(Error('bar'));
                        }).catch((e) =>{
                            console.log('catch error',e);
                        }).then(() => {
                            console.log('continue synchronous execution');
                        });
                        /* begin synchronous execuion
                        catch error Error: bar
                        报错
                        continue synchronous execution
                        */

        //期约连锁与期约合成:多个期约组合
            //期约连锁:将多个期约逐个串联(每个期约实例方法如then(),catch(),finally(),都会返回一个新的期约对象)
                //示例代码
                let p = new Promise((resolve,reject) => {
                    console.log('first');
                    resolve();
                });
                p.then(() => console.log('second'))
                 .then(() => console.log('third'))
                 .then(() => console.log('fourth'));
                 /* first
                second
                third
                fourth */

                //串行化异步任务
                    function delayedResolve(str) { //用于生成期约的工厂函数
                        return new Promise((resolve,reject) =>{
                            console.log(str);
                            setTimeout(resolve,1000);
                        });
                    }
                    delayedResolve('first')
                    .then(() => delayedResolve('second'))
                    .then(() => delayedResolve('third'))
                    .then(() => delayedResolve('fourth'));
                    /* first(1秒后)
                    second(2秒后)
                    third(3秒后)
                    fourth(4秒后) */

                //同时使用 then(),catch(),finally()
                    let p = new Promise((resolve,reject) => {
                        console.log('initial promise rejects');
                        reject()
                    });
                    p.catch(() => console.log('reject hander'))
                     .then(() => console.log('resolve hander'))
                     .finally(() => console.log('finally hander'));
                     /* initial promise rejects
                     reject hander
                     resolve hander
                     finally hander */
            
            //Promise.all()和Promise.race() 将多个期约实例合成一个期约的静态方法
                //Promise.all()静态方法接受一个可迭代对象,返回一个新的Promise对象
                //合成的期约只会在每个包含的期约都解决之后再解决,
                //如果有一个包含的期约待定,则合成的期约也会待定
                    let p = Promise.all([
                        Promise.resolve(),
                        new Promise((resolve,reject) => setTimeout(resolve,1000))
                    ]);
                    setTimeout(console.log,0,p);//Promise { <pending> }

                    p.then(() => setTimeout(console.log,0,'all() resolved!'));//all() resolved!

                //如果有一个包含的期约拒绝,则合成的期约也会拒绝
                    let p2 = Promise.all([
                        Promise.resolve(),
                        Promise.reject(),
                        Promise.resolve()
                    ]);
                    setTimeout(console.log,0,p2);//Promise { <rejected> undefined }

                //如果有期约拒绝,则第一个拒绝的期约会将自己的理由作为合成期约的拒绝理由
                    let p = Promise.all([
                        Promise.reject(3),
                        new Promise((resolve,reject) => setTimeout(reject,1000))
                    ]);
                    p.catch((reason) => setTimeout(console.log,0,reason));
                    //3
                    //没有未处理的错误

                //Promise.race()静态方法返回一个包装期约
                    //Promise.race()会包装第一的setted的期约的解决值或拒绝理由并返回新期约
                    let p1 = Promise.race([
                        Promise.resolve(3),
                        new Promise((resolve,reject) => setTimeout(resolve,1000))
                    ]);
                    setTimeout(console.log,0,p1);//Promise {<fulfilled>: 3}

                    let p2 = Promise.race([
                        Promise.reject(4),
                        new Promise((resolve,reject) => setTimeout(resolve,1000))
                    ]);
                    setTimeout(console.log,0,p2);//Promise { <rejected> 4 }

            //串行期约合成:基于后续期约的返回值来串联期约
                function addTwo(x){return x + 2}
                function addThree(x){return x + 3}
                function addFive(x){return x + 5}

                function addTen(x){
                    return [addTwo,addThree,addFive]
                    .reduce((promise,fn) => promise.then(fn),Promise.resolve(x));
                }

                addTen(8).then(console.log);//18
                //通用合成函数:将任意多个函数作为处理程序合成一个连续传值的期约连锁
                function compose(...fns){
                    return (x) => fns.reduce((promise,fn) => promise.then(fn),Promise.resolve(x))
                }
                let addTen = compose(addTwo,addThree,addFive);
                addTen(8).then(console.log);//18

                            
                
