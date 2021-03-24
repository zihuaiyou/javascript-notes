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
        
        // 定位元素 getElementById()和getElementsByTagName()
            //getElementById()获取元素的ID,如果有元素ID相同，则返回第一个ID
            <div id="myDiv">123</div>
            let div = document.getElementById("myDiv");
            //getElementsByTagName()获取元素的标签名,返回一个类数组对象HTMLCollection,
                /* <img src="" alt="">
                <img src="https://www.mzitu.com/" alt="" name = "myImage">
                <img src="" alt=""> */
                let image = document.getElementsByTagName("img");
                console.log(image.length);//3
                console.log(image[1].src);//https://www.mzitu.com/
                
                //namedItem()通过标签的name属性取得某一项的引用
                    let myImage = image.namedItem("myImage");
                    let myImage1 = image["myImage"];
                // 取得文档中的所有元素
                    let allElements = document.getElementsByTagName("*");

                //getElementByName 返回具有给定name属性的所有元素
                    //常用于单选按钮
                    //也返回类数组对象HTMLCollection

        //文档写入
            //write和writeln
            //write()写入文本，writeln()会在字符串末尾加上"\n"
    
    // Element类型表示html元素
        //nodeName同tagName属性 获取元素的标签名
        //HTML中标签名都是大写的 XML中标签名和源代码大小写一致
   
        // 取得属性 getAttribute(),removeAttritube()
            // getAttribute()多用于获取自定义属性
            //DOM编程多使用对象属性
        // 设置属性 setAttribute(属性名,属性值),
            //DOM对象上添加对象属性不会自动变成元素属性
            div.myColor = "red";
            alert(div.getAttribute("myColor"));//null
        
        // 创建元素 document.creatElement()
            let div = document.createElement("div");
            div.className = "goodDiv";
            div.id = 'myId';
            //将创建的元素添加到文档树中浏览器才会渲染出来
                document.body.appendChild(div);

        //元素后代
            //element.getElementsByTagName() 搜索范围仅限于元素内

        // Text类型 节点包含的文本
            //appendData(text),向节点末尾添加文本text
            //deleteData(offset,count),从位置offset开始删除count个字符
            //insertData(offset,text), 从位置offset插入text
            //replaceData(offset,count,text)用text替换从offset到offset+count的文本
            //spiltText(offset,count)在位置offset将文本节点拆分为两个
            //substringData(offset,count)提取从offset到offset+count的文本
            
            //创建文本节点
                //单个文本节点
                let div = document.createElement("div");
                div.className = "goodDiv";
                div.id = 'myId';
                let textNode = document.createTextNode("<strong>我是文本节点</strong>");
                div.appendChild(textNode);
                document.body.appendChild(div);

                //多个文本节点 文本节点之间文本不会有空格
                let element = document.createElement("h1");
                element.id = "myH1";
                let textNode1 = document.createTextNode("我是标题");
                element.appendChild(textNode1);
                let anotherChild = document.createTextNode('我也是标题');
                element.appendChild(anotherChild);
                document.body.appendChild(element); 

            //合并文本节点
                //normalize() 将多个文本节点合并成一个文本节点

            //拆分文本节点
                let newNode = element.firstChild.splitText(4);
                alert(element.firstChild.nodeValue);
                alert(newNode.nodeValue);

        //Comment类型
            //DOM中的注释为comment类型

        //DocumentFragment 类型
            //创建文档片段一次性插入所有li标签
            let fragment = document.createDocumentFragment();
            let ul = document.createElement("ul");
            ul.id = "myList";
            for (let i=1;i<4;++i){
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(`Item ${i}`));
                fragment.appendChild(li);
            }
            ul.appendChild(fragment);
            document.body.appendChild(ul);
    
    //DOM编程
        //动态脚本
            //动态加载外部JS文件
            function loadScript(url){
                let script = document.createElement("script");
                script.src = url;
                document.body.appendChild(script);
            }
            loadScript("file.js");

            //嵌入源代码
                let script = document.createElement("script");
                script.appendChild(document.createTextNode("function sayHi(){alert('hello world');}"));
                document.body.appendChild(script);
                sayHi();
                //通用嵌入源代码的方法(适用于所有浏览器)
                    function loadStringScript(code){
                        var script = document.createElement("script");
                        script.type = "text/javascript";
                        try{
                            script.appendChild(document.createTextNode(code));
                        } catch(ex){
                            script.text = code;//为了兼容IE浏览器
                        }
                        document.body.appendChild(script);
                        sayHello();
                    };
                    
                    loadStringScript("function sayHello(){alert('hello');}");

        //动态样式
            //通用动态嵌入样式的方式
            function loadStyleString(css){
                var style = document.createElement("style");
                style.type ="text/css";
                try {
                    style.appendChild(document.createTextNode(css))
                } catch(ex){
                    style.styleSheet.cssText = css; //为了兼容IE浏览器
                }
                document.head.appendChild(style);
            }
            loadStyleString("body{background-color:red}");

        //DOM创建表格
            //创建表格
            let table = document.createElement("table");
            table.border = 1;
            table.width = "100%";

            //创建表体
            let tbody = document.createElement("tbody");
            table.appendChild(tbody);
            
            // 创建第一行
            tbody.insertRow(0);
            tbody.rows[0].insertCell(0);
            tbody.rows[0].cells[0].appendChild(document.createTextNode("cell1_1"));
            tbody.rows[0].insertCell(1);
            tbody.rows[0].cells[1].appendChild(document.createTextNode("cell1_2"));

            // 创建第二行
            tbody.insertRow(1);
            tbody.rows[1].insertCell(0);
            tbody.rows[1].cells[0].appendChild(document.createTextNode("cell2_1"));
            tbody.rows[1].insertCell(1);
            tbody.rows[1].cells[1].appendChild(document.createTextNode("cell2_2"));
            
            document.body.appendChild(table);

        


