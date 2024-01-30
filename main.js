let input = document.querySelector(".input");
let submit =document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty arr
let arrayOfTasks=[];

if(localStorage.getItem("tasks")){
  arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

//Add Task 
submit.onclick = function(){
  if (input.value !== ""){
    addTaskToArray(input.value);
    input.value="";
  }
}

tasksDiv.addEventListener("click",(e)=>{
if (e.target.classList.contains("del")){
  deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

  e.target.parentElement.remove();
}
if(e.target.classList.contains("task")){
  toggleStatusTaskWith(e.target.getAttribute("data-id"))
  e.target.classList.toggle("done");
}
} )
// add 


function addTaskToArray(taskText){
  const task ={
    id: Date.now(),
    title:taskText,
    completed:false,
  }
  //Push Task To Arry of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  addDateToLocalStorageFrom(arrayOfTasks);
}




function addElementsToPageFrom(arrayOfTasks){
  tasksDiv.innerHTML="";

  arrayOfTasks.forEach((task) => {
   let div=document.createElement("div");
  //  Chek If Task is Done
  div.className="task";

  if(task.completed){
    div.className="task done";
  }
   div.setAttribute("data-id", task.id);
   div.appendChild(document.createTextNode(task.title));
  //  Create Delete Button
   let span= document.createElement("span");
   span.className="del";
   span.appendChild(document.createTextNode("Delete"));
  // append Button
   div.appendChild(span);
   tasksDiv.appendChild(div);
  });
} 


function addDateToLocalStorageFrom(arrayOfTasks){
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
};


function getDataFromLocalStorage(){
  let data =localStorage.getItem("tasks");
  if (data) {
    let tasks =JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}


function deleteTaskWith(taskId){
  // for(let i=0;i<arrayOfTasks.length;i++){
  //   console.log(`${arrayOfTasks[i].id}===${taskId}`);
  // }

  arrayOfTasks=arrayOfTasks.filter((task)=> task.id !=taskId);
  addDateToLocalStorageFrom(arrayOfTasks);
}


function toggleStatusTaskWith(taskId){
   for(let i=0;i<arrayOfTasks.length;i++){
    if(arrayOfTasks[i].id== taskId){
      arrayOfTasks[i].completed==false
       ? (arrayOfTasks[i].completed=true )
        :(arrayOfTasks[i].completed=false) 
       }
  }
  addDateToLocalStorageFrom(arrayOfTasks);
}