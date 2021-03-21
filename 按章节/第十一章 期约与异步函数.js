//期约(Promise)与异步函数(ES6)
    //setTimeout 定义一个可以在指定时间之后会被调度执行的回调函数
    //期约(Promise):对尚不存在的结果的一个替身,用于表示一个异步操作的最终完成（或失败）及其结果值
        //Promise的三状态  pedding(操作未完成),fulfilled(操作成功完成),rejected(操作失败)
            //pedding是最初的状态,pedding状态settled到fulfilled或者是rejected状态的过程是不可逆的
        
        //Promise的两个用途
            //1.抽象的表示一个异步操作,根据Promise的三状态来判断异步操作是否完成,或是成功完成,或是失败
            //2.状态切换到fulfilled,会生成一个私有的value,状态切换到rejected,会生成一个私有的reason
                //私有的value或者reason初始值都是undefined

        //Promise的执行函数:创建新Promise对象时需要传入执行器(executor)函数
            //执行函数的两个作用
                //1.初始化Promise的异步行为
                //2.控制状态的最终转换(通过两个函数参数resolve()和reject()实现)
                    //调用resolve()会将状态切换为fulfilled,
                    //调用reject()会将状态切换为rejected,同时抛出错误
                    let p1 = new Promise((resolve,reject) => resolve());
                    setTimeout(console.log,0,p1);//Promise {<fulfilled>: undefined}

                    let p2 = new Promise((resolve,reject) => reject());
                    // setTimeout(console.log,0,p2);//Promise {<rejected>: undefined} 报错

                //执行器函数是同步执行的
                //定时回调
                let p = new Promise((resolve,reject) =>{
                    setTimeout(reject,5000);//5秒后调用reject
                });
                setTimeout(console.log,0,p);//Promise {<pending>} 
                // setTimeout(console.log,6000,p);//Promise {<rejected>: undefined} 报错

        //Promise.reject()和Promise.resolve()两种静态方法 实例化相应状态下的Promise对象
            //传给Promise.resolve()的第一个参数对应着状态fulfilled状态生成的value值
            let p =Promise.resolve(9);
            setTimeout(console.log,0,p);//Promise {<fulfilled>: 9}
            //Promise.resolve()是一种幂等方法,
            let p = Promise.resolve(1);
            setTimeout(console.log,0,p===Promise.resolve(p));//true
            setTimeout(console.log,0,p===Promise.resolve(Promise.resolve(p)));//true
            //Promise.resolve()可以包装任何非Promise对象,包括错误对象
            let p = Promise.resolve(new Error('foo'));
            setTimeout(console.log,0,p);//Promise {<fulfilled>: Error: foo}

            //Promise.reject()用法基本同Promise.resolve(),
            //传给Promise.reject()的第一个参数对应着状态rejected状态生成的reason值
            //与Promise.resolve()不同的是,Promise.reject()方法不是幂等的,给他传递的Promise对象会成为返回的reason值
            setTimeout(console.log,0,Promise.reject(Promise.resolve(0)));//Promise {<rejected>: Promise}
  
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
            //finally 不管解决还是拒绝状态都会执行
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
            let p =new Promise((resolve) => setTimeout(resolve,0));
            p.then(() => console.log('onResolved hander'));
            console.log('then() returns');
            /* 
            then() returns
            onResolved hander (5s后) 
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
            p2.catch((value) => console.log(value));//bar

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
                    new Promise((resolve,reject) => setTimeout(reject(0),1000))
                ]);
                p.catch((reason) => setTimeout(console.log,0,reason));
                //3
                //没有未处理的错误

            //Promise.race()静态方法返回一个包装期约
                //Promise.race()会包装第一的setted的期约的解决值或拒绝理由并返回新期约
                let p1 = Promise.race([
                    Promise.resolve(3),
                    new Promise((resolve,reject) => setTimeout(resolve,5000))
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

    //期约进度通知实现:扩展期约
    class TrackablePromise extends Promise{
        constructor(executor) {
            const notifiyHandlers = [];

            super ((resolve,reject) => {
                return executor(resolve,reject,(status) =>{
                    notifiyHandlers.map((hander) => hander(status));
                });//相当于 Promise(executor(resolve,reject,(status) =>{notifiyHandlers.map((hander) => hander(status))})
            });
            this.notifiyHandlers = notifiyHandlers;
        }
        notifiy(notifiyHander) {
            this.notifiyHandlers.push(notifiyHander);
            return this;
        }
    }

    let p = new TrackablePromise((resolve,reject,notifiy) => {
        function countdown(x) {
            if (x > 0){
                notifiy(`${20*x}% remaining`);
                setTimeout(() => countdown(x-1),1000);
            } else {
                resolve();
            }
        }

        countdown(5);
    }); 
    p.notifiy((x) => setTimeout(console.log,0,'progress:',x));
    p.then(() =>setTimeout(console.log,0,'completed'));


//异步函数
    //关键字async和await(ES8)
    //async关键字用于声明异步函数
        //async声明的异步函数内求值的顺序是同步的
        async function foo(){
            console.log(1);
            return 3; //使用return返回值会被包装成期约对象,异步函数始终返回期约对象
        }

        foo().then(console.log);//给返回的期约添加处理程序
        console.log(2);//处理程序之后的同步代码会先于处理程序执行
        /* 1
        2
        3 */

        //在异步函数中抛出错误会返回拒绝的期约
        async function foo(){
            console.log(1);
            throw 3;
        }
        foo().catch(console.log);
        console.log(2);
        /* 1
        2
        3 */

        //但是拒绝期约的错误不会被异步函数补获
        async function bar(){
            console.log(1);
            Promise.reject(3);
        }
        bar().catch(console.log);
        console.log(2);
        /* 1
        2
        Error */

    //await:暂停异步函数代码的执行,等待期约返回
        //await 可以单独使用,也可在表达式中使用,但不能在同步函数内使用
        async function foo(){
            console.log(await Promise.resolve('foo'));
        }
        foo();//foo

        async function bar(){
            return await Promise.resolve('bar');
        }
        bar().then(console.log);//bar

        async function baz(){
            let t1 = Date.now();
            console.log('foo')
            await new Promise((resolve,reject) => setTimeout(resolve,1000));
            console.log('baz');
            console.log(Date.now() - t1);
        }
        baz();
        /* foo
        baz
        1012 */

        //await会抛出错误的同步动作,会返回拒绝的期约
        async function foo(){
            console.log(1);
            await (() => {throw 3;})()
        }

        foo().catch(console.log);
        console.log(2);
        /* 1
        2
        3 */

        //await会将拒绝期约返回
        async function foo(){
            console.log(1);
            await Promise.reject(3);
        }

        foo().catch(console.log);
        console.log(2);
        /* 1
        2
        3 */

        //await 暂停和恢复执行异步程序的效果,
            //JS程序遇到await关键字会暂停异步程序
            //即使await后面跟着一个立即可用的值,函数其余部分也会被异步求值
            async function foo(){
                console.log(2);
                console.log(await 4);
            }

            console.log(1);
            foo();
            console.log(3);
            /* 1
            2
            3
            4 */

            //await 后面是期约的情况
            async function bar(){
                console.log(2);
                console.log(await Promise.resolve(8));
                console.log(9);
            }
            async function foo(){
                console.log(4);
                console.log(await 6);
                console.log(7);
            }

            console.log(1);
            foo();
            console.log(3);
            bar();
            console.log(5);
            /* 1
            4
            3
            2
            5
            6
            7
            8
            9 */

    // 异步函数策略
        //实现非阻塞式的暂停
        async function sleep(delay){
            return new Promise((resolve) => setTimeout(resolve,delay));
        }

        async function foo(){
            time1 = Date.now();
            await sleep(1500);
            time2 = Date.now() - time1;
            console.log(time2);
        }
        foo();//1508

        //平行加速
        async function randomDelay (id){
            const delay = Math.random()*1000;
            return new Promise((resolve) => setTimeout(() => {
                console.log(`${id} finished`);
                resolve();
            },delay));
        }
            //顺序等待随机的超时
            //异步函数会依次等待超时完成,这样可以保证执行顺序
            //这种方法总执行时间会变长
            async function foo() {
                const t0 = Date.now();
                for (let i=0;i<5;i++) {
                    await randomDelay(i);
                }
                console.log(`${Date.now() - t0}ms elapsed`);
            }
            foo();
            /* 
            0 finished
            1 finished
            2 finished
            3 finished
            4 finished
            2986ms elapsed 
            */

            //可以一次性初始化所有期约,然后分别等待(await)他们的结果
            //这样不能保证执行顺序,但await按顺序收到了每个期约的值
            async function randomDelay (id){
                const delay = Math.random()*1000;
                return new Promise((resolve) => setTimeout(() => {
                    console.log(`${id} finished`);
                    resolve(id);
                },delay));
            }

            async function bar(){
                t0 = Date.now();
                const promises = Array(5).fill(null).map((_,index) => randomDelay(index));
                for (const p of promises){
                    console.log(`awaited ${await p}`);
                }
                console.log(`${Date.now() - t0}ms elapsed`);
            }
            bar();
            /* 
            1 finished
            3 finished
            0 finished
            await 0
            await 1
            2 finished
            await 2
            await 3
            4 finished
            await 4
            974ms elapsed 
            */

        //串行执行期约
        async function addTwo(x) {return x + 2;}
        async function addThree(x) {return x + 3;}
        async function addFive(x) {return x + 5;}

        async function addTen(x) {
            for (const fn of [addTwo,addThree,addFive]){
                x = await fn(x);
            }
            return x;
        }
        addTen(9).then(console.log);//19