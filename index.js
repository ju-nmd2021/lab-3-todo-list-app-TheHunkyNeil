let userList = JSON.parse(localStorage.getItem("userList")) || [];
// Get users, read data from local storage, or create a list if not available
//JSON stands for Java Script Object Notation
//JSON is a text format for storing and transmitting data. let them convert to json objects
//localStorage objects store data with no expiration date.
// Data is not deleted when the browser is closed and can be used for future sessions.
//获取用户，从本地存储读取数据，如果没有就或者创建一个list
//JSON代表Java Script Object Notation
//JSON是一种用于存储和传输数据的文本格式。让它们转换为json对象
//localStorage 对象存储没有过期日期的数据。
//关闭浏览器时数据不会被删除，可用于未来的会话。

let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
// Get task, read data from local storage
// 获取任务，从本地存储读取数据
let chooseUserId = localStorage.getItem("chooseUserId") || "";
// selected user id
// 选中的用户id
console.log(taskList);
//print taskList
//输出taskList

createUserList(); // creat user list
createTaskList(); // creat task list

// Add user
let addUserBtn = document.getElementById("addUserBtn");
//The document object model is used, by ID. button in html
//使用了document object model，通过ID。是html里面的按钮
addUserBtn.onclick = function () {
  //Use the onclick event to happen when the user clicks on the element.
  //使用onclick的事件在用户单击元素时发生。
  let userName = document.getElementById("userName").value;
  //.value means to get or return the value of the text field
  //.value的意思就是获取或者说返回文本字段的值
  if (!userName || !userName.trim()) {
    //Use ! to invert, as long as there is a true to pass.
    //trim() is a built-in string function in JavaScript for trimming strings.
    //使用!去反转，只要有一个true就能通过。
    //trim() 是 JavaScript 中内置的字符串函数，用于修剪字符串。
    alert("Please write name");
    //alert is to display an alert box
    //alert是显示警告框
    return;
  }
  let data = {
    //Generally, data is stored in the form of objects. First, declare the objects that need to be stored.
    //一般是以对象的形式存数据，先声明一下需要存的对象。

    id: Date.now().toString(),
    //.toString converts numbers to strings
    //.toString将数字转换为字符串
    name: userName,
  };
  userList.push(data);
  //.push is to add a new item to the array
  //.push是向数组中添加一个新项目
  localStorage.setItem("userList", JSON.stringify(userList));
  //Sets the value of the specified local storage item, converting the object to a string
  //设置指定本地存储项的值，将对象转换为字符串
  // localStorage.clear();//This can clear the cache of the web page---------------------------------
  location.reload();
  //Reload the current document
  //重新加载当前文档
};

// add task
let addTaskBtn = document.getElementById("addTaskBtn");
//The document object model is used, by ID. button in html
//使用了document object model，通过ID。是html里面的按钮
addTaskBtn.onclick = function () {
  //Use the onclick event to happen when the user clicks on the element.
  //使用onclick的事件在用户单击元素时发生。
  let taskName = document.getElementById("taskName").value;
  //.value means to get or return the value of the text field
  //.value的意思就是获取或者说返回文本字段的值
  console.log(chooseUserId);
  //print out chooseUserId
  //打印出来chooseUserId
  if (!chooseUserId) {
    //use! reversed
    //使用！反转了
    alert("Please choose user first");
    //alert is to display an alert box
    //alert是显示警告框
    return;
  }
  if (!taskName || !taskName.trim()) {
    //Use ! to invert, as long as there is a true to pass
    //trim() is a built-in string function in JavaScript for trimming strings.
    //使用!去反转，只要有一个true就能通过
    //trim() 是 JavaScript 中内置的字符串函数，用于修剪字符串。

    alert("Please write task");
    //alert is to display an alert box
    //alert是显示警告框

    return;
  }

  let data = {
    //Generally, data is stored in the form of objects. First declare the objects that need to be stored.
    //一般是以对象的形式存数据，先声明一下需要存的对象
    userId: chooseUserId,
    userName: userList.filter((item) => item.id == chooseUserId)[0].name,
    //.filter is to create a new array and then filter. Arrow function is used, item.id == chooseUserId is required
    //The property of .name above returns the name of a function declaration
    //.filter是创建一个新数组, 然后去过滤。使用了箭头函数，需要item.id == chooseUserId
    //上面.name的属性是返回一个函数声明的名称
    name: taskName,
  };

  taskList.push(data);
  //.push is to add data to the array
  //.push是向数组中添加data
  localStorage.setItem("taskList", JSON.stringify(taskList));
  //Sets the value of the specified local storage item, converting the object to a string
  //设置指定本地存储项的值，将对象转换为字符串
  location.reload();
  //Reload the current document
  //重新加载当前文档
};

// Generate user list function
function createUserList() {
  let o = document.getElementsByClassName("userList")[0];
  //Get an array (collection) of userList 0 is the first
  //获取userList的数组（集合）0是第一个
  let div = document.createElement("div");
  //Use createElement to create a div
  //使用createElement，去创造一个div
  o.innerHTML = "";
  //Delete the content in userList
  //删除userList里面的内容
  for (let i = 0; i < userList.length; i++) {
    //` is used to define template literals, any type of expression can be inserted in template literals, they can be multi-line.
    //`用于定义模板文字,可以在模板文字中插入任何类型的表达式,它们可以是多行的。
    div.innerHTML += `<p class="userItem">
    ${userList[i].name}
    <button class="chooseUser">✔</button>
    </p>`;
    //This is to create a user through p
    //Use this ${} to insert a variable or expression, i is the i of for, and the property of .name is the name of the function declaration returned
    // and use ✔ to create the list on the spot
    //这是通过p来创建user的
    //使用这个${}插入变量或表达式，i就是for的那个i，.name的属性是返回一个函数声明的名称
    //并且是使用✔来现场创建列表的
  }
  o.appendChild(div);
  //Append div to o, method appends a node (element) as the last child of the element
  //将div附添加到o，方法附加一个节点（元素）作为元素的最后一个子元素
}

// 生成任务列表函数
function createTaskList() {
  let o = document.getElementsByClassName("taskList")[0];
  //Get an array (collection) of taskList 0 is the first
  //获取taskList的数组（集合）0是第一个
  let div = document.createElement("div");
  //Use createElement to create a div
  //使用createElement，去创造一个div
  o.innerHTML = "";
  //Delete the contents of taskList
  //删除taskList里面的内柔

  for (let i = 0; i < taskList.length; i++) {
    div.innerHTML += `<div class="taskItem">
    <span class="chooseTask">${taskList[i].name}(${taskList[i].userName})</span>
    <button class="deleteTask">✘</button>
    <button class="finishTask">✔</button>
  </div>`;
    //This is to create a task through a div
    //Use this ${} to insert variables or expressions, i is the i of for, the property of .name is the name that returns a function declaration, and .userName returns the username part of the link
    // and use ✔ to create the list on the spot
    //这是通过div来创建task的
    //使用这个${}插入变量或表达式，i就是for的那个i，.name的属性是返回一个函数声明的名称，.userName返回链接的用户名部分
    //并且是使用✔来现场创建列表的
  }
  o.appendChild(div);
  //Append div to o, method appends a node (element) as the last child of the element
  //将div附添加到o，方法附加一个节点（元素）作为元素的最后一个子元素
}

let userItemList = document.getElementsByClassName("userItem"); //This is the user's
let taskItemList = document.getElementsByClassName("taskItem"); //this is the task
let finishTaskList = document.getElementsByClassName("finishTask"); //This is the completion of the task
let deleteTaskList = document.getElementsByClassName("deleteTask"); //This is the deletion of the task

// Judging whether it is completed
for (let i = 0, len = taskItemList.length; i < len; i++) {
  if (taskList[i].finish) {
    //If there is no .finish, it will directly judge the completion, this is true to continue execution
    //如果没有.finish的话就会直接判断完成，这个里面为true继续执行
    taskItemList[i]
      .getElementsByClassName("chooseTask")[0]
      //Call the chooseTask of the span in the div in the taskItemList
      //调用taskItemList里面的div里span的chooseTask
      .classList.add("finish");
    //Use taskItemList.classList, and then use add to add "finish", which means drawing a slash, which will be executed in css
    //使用taskItemList.classList，然后再使用add去添加"finish"，就代表画斜杠了，会在css中执行
  }
}

// Done button event
for (let i = 0, len = finishTaskList.length; i < len; i++) {
  finishTaskList[i].onclick = function () {
    //It is executed through the finishTaskList above
    //就是通过上面的finishTaskList来执行的
    taskList[i].finish = true; //if true
    localStorage.setItem("taskList", JSON.stringify(taskList)); //restore locally//重新储存在本地中
    location.reload(); //并且重新加载
  };
  //.onclick mode: object.onclick = function(){};
  //.onclick的模式：object.onclick = function(){};
}

// delete button event
for (let i = 0, len = deleteTaskList.length; i < len; i++) {
  deleteTaskList[i].onclick = function () {
    //Create a function to delete tasks
    //创建删除任务的function
    taskList.splice(i, 1);
    //Use the built-in methods of the JavaScript Array object. Change the contents of the array by removing existing elements or replacing existing elements with new ones.
    //The first is the index, the second is how many elements to remove
    //使用 JavaScript Array 对象的内置方法。通过删除现有元素或用新元素替换现有元素来更改数组的内容。
    //第一个是索引，第二是删除多少元素
    localStorage.setItem("taskList", JSON.stringify(taskList));
    //local store and convert
    //本地储存并且转化
    location.reload();
  };
}
// get users
for (let i = 0; i < userItemList.length; i++) {
  if (userList[i].id == chooseUserId) {
    //requires id == chooseUserId
    //需要id == chooseUserId
    userItemList[i].getElementsByClassName("chooseUser")[0].style.display =
      "inline-block";
    // Then do style, display to make it become, allow setting width and height on element, will respect top and bottom margin/padding
    //然后执行style，display去让它变成，允许在元素上设置宽度和高度，会尊重顶部和底部边距/填充
  }
}
for (let j = 0; j < taskItemList.length; j++) {
  if (taskList[j].userId == chooseUserId) {
    //requires id == chooseUserId
    taskItemList[j].style.backgroundColor = "skyblue";
    //Then execute, the background color will change
    //然后执行，背景颜色会改变
  } else {
    taskItemList[j].style.backgroundColor = "";
    //  otherwise the background color does not change
    //否则背景颜色不变
  }
}
// click user event
for (let i = 0, len = userItemList.length; i < len; i++) {
  userItemList[i].onclick = function () {
    //.onclick function
    for (let j = 0; j < userItemList.length; j++) {
      userItemList[j].getElementsByClassName("chooseUser")[0].style.display =
        "none"; //Set .style.display to none//设置.style.display为none
    }
    userItemList[i].getElementsByClassName("chooseUser")[0].style.display =
      "inline-block"; //Set .style.display to inline-block//设置.style.display为inline-block
    chooseUserId = userList[i].id;
    localStorage.setItem("chooseUserId", chooseUserId);
    for (let j = 0; j < taskItemList.length; j++) {
      if (taskList[j].userId == chooseUserId) {
        taskItemList[j].style.backgroundColor = "skyblue"; //Then execute, the background color will change
      } else {
        taskItemList[j].style.backgroundColor = ""; //otherwise the background color does not change
      }
    }
  };
}
