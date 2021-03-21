//BOM
    //window对象:被复用为ES的Global对象
        //var声明的所有全局变量和函数都会成为window对象的属性方法
        var age = 14;
        var sayAge = () => alert(this.age);
        alert (window.age);//14
        sayAge();//14
        window.sayAge();//14

        //let或const声明不会把变量添加给全局变量
        let age = 18;
        const sayAge = () => console.log(this.age);
        alert(window.age);//undefined
        sayAge();//undefined
        window.sayAge();//报错

        //窗口关系
            //window对象的属性,top parent self
            //top对象指向最外层的窗口,
            //parent指向当前窗口的父窗口,
            //self 始终指向window

        //窗口位置
            //moveTo()和moveBy()
            //moveTo 接受要移动的新位置的绝对坐标
            window.moveTo(0,0);//把窗口移动到左上角

            //moveBy 接收相对当前位置在两个方向上移动的像素数
            window.moveBy(0,100);//把窗口向下移动100像素

        //窗口大小
            //outerWidth outerHeight 返回浏览器窗口自身的大小
            //innerWidth innerHeight 返回浏览器窗口中页面视口的大小
            let pageWidth = window.innerWidth,
                pageHeight = window.innerHeight;
            if (typeof pageWidth != 'number' ) {
                //检查页面是否处于标准模式
                if (document.compatMode == "CSS1Compat"){
                    pageWidth = document.documentElement.clientWidth;
                    pageHeight = document.documentElement.clientHeight;
                } else {
                    pageWidth = document.body.clientWidth;
                    pageHeight = document.body.clientHeight;
                }
            }

            //resizeTo()和resizeBy()调整窗口大小
                //resizeTo()接受新的宽度和高度值
                //resizeBy()接受宽度和高度各要缩放(增加)多少

                //缩放到100x100
                window.resizeTo(100,100);

                //缩放到200x150;
                window.resizeBy(100,50);

        //视口位置
            //scroll() scrollTo() scrollBy() 方法滚动页面

            //相对浏览器视口向下滚动100像素
            window.scrollBy(0,100);

            //滚动到页面左上角
            window.scrollTo(0,0);

            //这几个方法也接受一个字典,behavior属性告诉浏览器是否平滑滚动
            window.scrollTo({
                left:100,
                top:100,
                behavior:'smooth'
            });

        //导航与打开新窗口
            //window.open(url,目标窗口,特性字符串,布尔值) 打开窗口

                //等同于<a href = "https://www.mzitu.com/" target = "topFrame"/>
                    //窗口名为topFrame的窗口会打开url,没有就打开新窗口将其命名为topFrame
                    window.open("https://www.mzitu.com/","topFrame");
                
                // 打开一个可缩放的新窗口,大小为400x400像素,位于离屏幕左边及顶边各10像素的位置
                window.open("https://www.mzitu.com/",
                            "topFrame",
                            "height=400,width=400,top=10,left=10,resizable=yes");

            //window.close() 关闭由window.open()创建的弹出窗口
            //window对象的opener属性指向打开他的窗口
                let someWin = window.open("https://www.mzitu.com/",
                "topFrame",
                "height=400,width=400,top=10,left=10,resizable=no");
                alert(someWin.opener===window);//true

            //检测弹窗是否被屏蔽
                let blocked = false;
                try {
                    let someWin = window.open("https://www.mzitu.com/","_blank");
                    if (someWin == null){
                        blocked = true;
                    }
                }
                catch(e){
                    blocked = true;
                }
                if (blocked){
                    alert ("弹窗被屏蔽了!!!")
                }
        
        //定时器
            //setTimeout 指定时间后执行相应代码
                //调用setTimeout会返回一个超时id,用于取消任务
                let timeoutId = setTimeout(() => alert("hello world"),1000);
                clearTimeout(timeoutId) //clearTimeout(id) 取消超时任务

                //setInterval 隔一段时间循环执行某个任务
                //用法与setTimeout一致,取消任务使用clearInterval(id);
                    let num = 0;
                    let max = 10;
                    let intervalId = null;
                    
                    function incrementNumber(){
                        num++;
                        if (num == max){
                            clearInterval(intervalId);
                            alert('done');
                        }
                    }

                    intervalId = setInterval(incrementNumber,500);

                    //用setTimeout实现同样的效果(推荐使用setTimeout)
                    let num = 0;
                    let max = 10;
                    
                    function incrementNumber(){
                        num++;
                        if (num < max){
                            //如果条件不满足就会再设置一个定时器
                            setTimeout(incrementNumber,500);
                        } else {
                            alert('done');
                        }
                    }
                    setTimeout(incrementNumber,500);

        //对话框
            //confirm 可以根据返回值判断用户单击了哪一个按钮
            if (confirm("hello world")){
                alert ("hello");
            } else {
                alert ("world");
            }

            //prompt(要显示给用户的文本,文本框默认值)
                //用户点击了ok,prompt()返回文本框中的值,用户点击了cancel,prompt返回null;
                let result = prompt("What is your name ? ","");
                if (result !== null){
                    alert ("Welcome, "+ result);
                }

    //location对象:提供了当前窗口加载文档的信息
        //location对象既是window的属性,也是document的属性

        //查询字符串 location.search返回url从?到末尾的所有内容
        let getQueryStringArgs = function (){
            let qs = (location.search.length>0?location.search.substr(1):"");
            let args = {};
            for (let item of qs.split('&').map(kv => kv.split("="))){
                let name = decodeURIComponent(item[0]);
                let value = decodeURIComponent(item[1]);
                if (name.length){
                    args[name] = value;
                }
            }
            return args
        };

        //URLSearchParams 检查和修改查询字符串
            //该实例上有 set(),get(),delete()方法
            let qs = "?tn=80035161_1_dg&ab=cd";
            let searchParams = new URLSearchParams(qs);
            alert(searchParams.toString());
            console.log(searchParams.has("ab"));//true
            console.log(searchParams.get("ab"));//cd
            searchParams.set("page","3");
            alert(searchParams.toString());

            //URLSearchParams实例也可作为迭代对象
            let qs = "?tn=80035161_1_dg&ab=cd";
            let searchParams = new URLSearchParams(qs);
            for (param of searchParams){
                console.log(param);
            } 
            /* [ 'tn', '80035161_1_dg' ]
            [ 'ab', 'cd' ] */

    //location对象
        //操作地址:修改浏览器地址
            //location.assign(url)
            //window.location
            //location.herf
            //location.replace(url):用户不能返回前一页
            //location.reload() 重新加载,可能从缓存加载 一般作为最后一行代码
                //location.reload(true) 重新加载 从服务器加载
    
    //navigator对象
        //检测插件(IE10或更低版本无效)
        let hasPlugin = function(name){
            name = name.toLowerCase();
            for (let plugin of window.navigator.plugins){
                if (plugin.name.toLowerCase().indexOf>-1){
                    return true;
                } else {
                    return false;
                }
            }
        }
        alert(hasPlugin("Flash"));

    //history对象
        history.go(1);//前进一页 相当于浏览器前进按钮
        history.go(-1);//后退一页 相当于浏览器后退按钮

        history.back();//相当于history.go(-1);
        history.forward();//相当于history.back(-1);

        history.length//表示历史记录有多少个条目
            //history.length 值为1表示是该页面是用户窗口的第一个页面 

//客户端检测
    //能力检测:检测浏览器是否具有某种特性,不需要知道浏览器信息
        //例如IE5之前没有document.getElementById(),但有document.all()
        function getElement(id){
            if (document.getElementById){
                return document.getElementById(id);
            } else if (document.all) {
                return document.all[id];
            } else {
                throw new Error("No way to retrieve element");
            }
        }

    //检测浏览器是否支持Netscape式的插件
        let hasNSPlugins = !!(navigator.plugins && navigator.plugins.length);

    //检查浏览器是否具有DOM Level 1能力
        let hasDOM1 = !!(document.getElementById && document.createElement 
            && document.getElementsByTagName);

//检测用户代理user-agent (不靠谱)
 