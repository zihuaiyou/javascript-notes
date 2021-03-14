//BOM
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

//DOM (文档对象模型)
    //node类型
        //nodeType属性表示节点的类型,由定义在node类型上的12个数值常量表示
        if (someNode.nodeType == 1){ //检查了节点是不是元素
            value = someNode.nodeName; //显示元素的标签名
        }

        //节点关系
            //每个节点都有一个childNodes属性,其中包含一个NodeList实例(类数组对象)
            let firstChild = someNode.childNodes[0];
            let count = someNode.childNodes.length;
            //每个节点都有一个parentNodes属性,指向父元素

            //previousSibling和nextSibling可以在childNodes列表节点间导航
            if (someNode.nextSibling === null){ //列表中最后一个节点的nextSibling属性是null
                alert("Last node in the parent's childNodes list." )
            } else if (someNode.previousSibling === null){//列表中第一个节点的previousSibling属性是null
                alert("First node in the parent's childNodes list.")
            }

            //firstChild和lastChild分别指向childNodes中的第一个和最后一个节点
                //someNode.firstchild的值等于someNode.childNodes[0]
                //someNode.lastChild的值等于someNode.childNodes[someNode.childNodes.length-1]
            
            //hasChildNodes() 检查节点是否具有一个或多个子节点 返回布尔值

        //操纵节点
            //appendChild()返回新添加的节点,用于在childNodes列表末尾添加节点,
            let returnedNode = someNode.appendChild(newNode);
            alert(returnedNode == newNode);//true
            alert(someNode.lastNode == newNode);//true

            //添加新节点会更新相关的关系指针,添加已有的节点会更新其位置
                //这里假设someNode有多个子节点
                let returnedNode = someNode.appendChild(someNode.firstChild);
                alert(returnedNode == someNode.firstChild);//false
                alert(returnedNode == someNode.lastChild);//true

            //insertBefore(要插入节点,参照节点)方法,将节点插入指定位置并返回该节点
                //如果参照节点是null,则效果和appendChild相同
                returnedNode = someNode.insertBefore(newNode,null);
                alert(returnedNode == someNode.lastChild);//true
                
                //作为新的第一个子节点插入
                returnedNode = someNode.insertBefore(newNode,someNode.firstChild);
                alert(returnedNode == someNode.firstChild);//true
                alert(returnedNode == newNode);//true

                //插入最后一个子节点前面
                returnedNode = someNode.insertBefore(newNode,someNode.lastChild);
                alert(returnedNode == someNode.childNodes[someNode.childNodes.length-2]);
                alert(returnedNode == newNode);

            //replaceChild(要插入节点,要替换节点),返回要替换的节点
                //替换第一个节点
                returnedNode = someNode.replaceChild(newNode,someNode.firstChild);

            //removeChild(要删除节点),返回要删除的节点

            //cloneChild();接受一个布尔值,
                //传入true则进行深复制:复制调用其的节点及整个子DOM树
                //传入false则进行浅复制:只复制调用其的节点

    //Document类型  文档节点,是HTMLDocument的实例
        //document.documentElement 始终指向<html>元素
        let html = document.documentElement;
        alert(html == document.childNodes[0]);//true
        alert(html == document.firstChild);//true
        //document.body 指向<body>元素

        //<!doctype>document类型另外一种可能的子节点
            //document.doctype 指向<!doctype>

        //document的表示文档信息的其他属性
            //title
            //URL 取得完整的url
            //domain 取得域名
            //refer 包含链接到当前页面的页面的url,如果当前页面没有来源,则返回空字符串
                
            //这些属性中只有domain可以修改,但是不能给domain设置不包含的值,
                //同时这种修改也是不可逆的

                //假如页面来自 www.baidu.com
                document.domain = 'baidu.com'; //成功
                document.domain = 'sogo.com'; //失败


            
    

