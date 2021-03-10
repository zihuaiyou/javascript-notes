//期约
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

        //在异步函数中抛出错误抛出错误会返回拒绝的期约
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
            await new Promise((resolve,reject) => setTimeout(resolve,1000));
            console.log('baz');
        }
        baz();//baz 1秒后

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
            /* 
            1
            2
            3
            4
            5
            8
            9
            6
            7 
            */

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
        foo();

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


