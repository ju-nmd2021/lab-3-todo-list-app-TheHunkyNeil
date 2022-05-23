let userList = JSON.parse(localStorage.getItem("userList")) || []; // Get users, read data from local storage, or create a list if not available
//JSON stands for Java Script Object Notation
//JSON is a text format for storing and transmitting data. let them convert to json objects
//localStorage objects store data with no expiration date.
// Data is not deleted when the browser is closed and can be used for future sessions.
let taskList = JSON.parse(localStorage.getItem("taskList")) || []; // Get task, read data from local storage
let chooseUserId = localStorage.getItem("chooseUserId") || ""; // selected user id
console.log(taskList); //print taskList

createUserList();
createTaskList(); // Generate task list

// Add user
let addUserBtn = document.getElementById("addUserBtn"); //The document object model is used, by ID. button in html
addUserBtn.onclick = function () {
  //Use the onclick event to happen when the user clicks on the element.
  let userName = document.getElementById("userName").value; //.value means to get or return the value of the text field
  if (!userName || !userName.trim()) {
    //Use ! to invert, as long as there is a true to pass.
    //trim() is a built-in string function in JavaScript for trimming strings.
    alert("Please write name"); //alert is to display an alert box
    return;
  }
  let data = {
    //Generally, data is stored in the form of objects. First, declare the objects that need to be stored.
    id: Date.now().toString(), //.toString converts numbers to strings
    name: userName,
  };
  userList.push(data); //.push is to add a new item to the array
  localStorage.setItem("userList", JSON.stringify(userList)); //Sets the value of the specified local storage item, converting the object to a string
  // localStorage.clear();//This can clear the cache of the web page---------------------------------
  location.reload(); //Reload the current document
};

// add task
let addTaskBtn = document.getElementById("addTaskBtn"); //The document object model is used, by ID. button in html
addTaskBtn.onclick = function () {
  //Use the onclick event to happen when the user clicks on the element.
  let taskName = document.getElementById("taskName").value; //.value means to get or return the value of the text field
  console.log(chooseUserId); //print out chooseUserId
  if (!chooseUserId) {
    //use! reversed
    alert("Please choose user first"); //alert is to display an alert box
    return;
  }
  if (!taskName || !taskName.trim()) {
    //Use ! to invert, as long as there is a true to pass
    //trim() is a built-in string function in JavaScript for trimming strings.
    alert("Please write task"); //alert is to display an alert box
    return;
  }

  let data = {
    //Generally, data is stored in the form of objects. First declare the objects that need to be stored.
    userId: chooseUserId,
    userName: userList.filter((item) => item.id == chooseUserId)[0].name, //.filter is to create a new array and then filter. Arrow function is used, item.id == chooseUserId is required
    //The property of .name above returns the name of a function declaration
    name: taskName,
  };

  taskList.push(data); //.push is to add data to the array
  localStorage.setItem("taskList", JSON.stringify(taskList)); //Sets the value of the specified local storage item, converting the object to a string
  location.reload(); //Reload the current document
};

// Generate user list function
function createUserList() {
  let o = document.getElementsByClassName("userList")[0]; //Get an array (collection) of userList 0 is the first
  let div = document.createElement("div"); //Use createElement to create a div
  o.innerHTML = ""; //Delete the content in userList
  for (let i = 0; i < userList.length; i++) {
    //` is used to define template literals, any type of expression can be inserted in template literals, they can be multi-line.
    div.innerHTML += `<p class="userItem">
    ${userList[i].name}
    <button class="chooseUser">✔</button>
    </p>`;
    //This is to create a user through p
    //Use this ${} to insert a variable or expression, i is the i of for, and the property of .name is the name of the function declaration returned
    // and use ✔ to create the list on the spot
  }
  o.appendChild(div); //Append div to o, method appends a node (element) as the last child of the element
}

// 生成任务列表函数
function createTaskList() {
  let o = document.getElementsByClassName("taskList")[0]; //Get an array (collection) of taskList 0 is the first
  let div = document.createElement("div"); //Use createElement to create a div
  o.innerHTML = ""; //Delete the contents of taskList
  for (let i = 0; i < taskList.length; i++) {
    div.innerHTML += `<div class="taskItem">
    <span class="chooseTask">${taskList[i].name}(${taskList[i].userName})</span>
    <button class="deleteTask">✘</button>
    <button class="finishTask">✔</button>
  </div>`;
    //This is to create a task through a div
    //Use this ${} to insert variables or expressions, i is the i of for, the property of .name is the name that returns a function declaration, and .userName returns the username part of the link
    // and use ✔ to create the list on the spot
  }
  o.appendChild(div); //Append div to o, method appends a node (element) as the last child of the element
}

let userItemList = document.getElementsByClassName("userItem"); //This is the user's
let taskItemList = document.getElementsByClassName("taskItem"); //this is the task
let finishTaskList = document.getElementsByClassName("finishTask"); //This is the completion of the task
let deleteTaskList = document.getElementsByClassName("deleteTask"); //This is the deletion of the task

// Judging whether it is completed
for (let i = 0, len = taskItemList.length; i < len; i++) {
  if (taskList[i].finish) {
    //If there is no .finish, it will directly judge the completion, this is true to continue execution
    taskItemList[i]
      .getElementsByClassName("chooseTask")[0] //Call the chooseTask of the span in the div in the taskItemList
      .classList.add("finish"); //Use taskItemList.classList, and then use add to add "finish", which means drawing a slash, which will be executed in css
  }
}

// Done button event
for (let i = 0, len = finishTaskList.length; i < len; i++) {
  finishTaskList[i].onclick = function () {
    //It is executed through the finishTaskList above
    taskList[i].finish = true; //if true
    localStorage.setItem("taskList", JSON.stringify(taskList)); //restore locally
    location.reload(); //并且重新加载
  };
  //.onclick mode: object.onclick = function(){};
}

// delete button event
for (let i = 0, len = deleteTaskList.length; i < len; i++) {
  deleteTaskList[i].onclick = function () {
    //Create a function to delete tasks
    taskList.splice(i, 1);
    //Use the built-in methods of the JavaScript Array object. Change the contents of the array by removing existing elements or replacing existing elements with new ones.
    //The first is the index, the second is how many elements to remove
    localStorage.setItem("taskList", JSON.stringify(taskList)); //local store and convert
    location.reload();
  };
}
// get users
for (let i = 0; i < userItemList.length; i++) {
  if (userList[i].id == chooseUserId) {
    //requires id == chooseUserId
    userItemList[i].getElementsByClassName("chooseUser")[0].style.display =
      "inline-block"; // Then do style, display to make it become, allow setting width and height on element, will respect top and bottom margin/padding
  }
}
for (let j = 0; j < taskItemList.length; j++) {
  if (taskList[j].userId == chooseUserId) {
    //requires id == chooseUserId
    taskItemList[j].style.backgroundColor = "skyblue"; //Then execute, the background color will change
  } else {
    taskItemList[j].style.backgroundColor = ""; //  otherwise the background color does not change
  }
}
