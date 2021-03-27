//Selectors API
    //querySelector()方法接收CSS选择符参数,返回该匹配模式的第一个后代元素
        //取得<body>元素
        let body = document.querySelector("body");
        //取得ID为myDiv的元素
        let myDiv = document.querySelector("#myDiv");
        //取得类名为select的元素
        let selected = document.querySelector(".select");
        //取得类名为button的图片
        let img = document.body.querySelector("img.button");

    //querySelectAll()返回所有匹配的节点,返回NodeList实例
        //取得ID为myDiv的标签的所有em元素
        let ems = document.getElementById("myDiv").querySelectorAll("em");
        //取得所有类名为.select的元素
        let selects = document.querySelectorAll(".select");
        //取得所有p标签里的strong元素
        let strongs = document.querySelectorAll("p strong");

        //返回的nodeList对象可以进行for-of循环,items()方法或[]语法取得元素

    //元素遍历
        //遍历元素 以往的做法
        let parentElement = document.getElementById("myDiv");
        let currentChildNode = parentElement.firstChild;

        while(currentChildNode){
            if (currentChildNode.nodeType ===1){
                currentChildNode.appendChild(document.createTextNode("hello"));
            }
            if (currentChildNode === parentElement.lastChild){
                break;
            }
            currentChildNode = currentChildNode.nextSibling;
        }

        //利用Element Traversal API 简化代码
        let parentElement = document.getElementById("myDiv");
        let currentChildElement = parentElement.firstElementChild;//Element版的firstChild
    
        while (currentChildElement){
            currentChildElement.appendChild(document.createTextNode("world"));
            if (currentChildElement === parentElement.lastElementChild){//Element版的lastChild
                break;
            }
            currentChildElement = currentChildElement.nextElementSibling;//Element版的nextChild
        }

//HTML5
    //CSS类扩展
        //getElementsByClassName(类名) 返回包含类名nodeList
        let allCurrentUsernames = document.getElementsByClassName("current");
        let selected = document.getElementById("myDiv").getElementsByClassName("selected")

        //classList属性
            //以往的删除部分类名的方法
            let div = document.getElementById("someDiv");
            let targetClass = "username";
            let classNames= div.className.split(/\s+/);
            let idx = classNames.indexOf(targetClass);
            if(idx>-1){
                classNames.splice(idx,1);
            }
            div.className = classNames.join(" ");

            //HTML5新增的classLists属性简化代码
                //add(),contains(),remove(),toggle()
                let div = document.getElementById("someDiv");
                div.classList.remove("username");//删除"username"类

                div.classList.add("current");//增加current类
                div.classList.toggle("user");//切换user类
                div.classList.contains("userage")//检查类名是否含有userage,返回布尔值

                //迭代类名
                
