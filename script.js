const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];       
let filter = "all";  

function renderTasks() {
  taskList.innerHTML = ""; 

  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;  
    if (filter === "active" && task.completed) return;  

    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.addEventListener("click", () => {
      task.completed = !task.completed; 
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete Task";
    delBtn.classList.add("deleteBtn");
    delBtn.addEventListener("click", () => {
        li.classList.add("fade-out");   
        setTimeout(() => {             
            tasks.splice(index, 1);       
            renderTasks();              
         }, 400); 
    });

    li.appendChild(circle);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
  }


function addTask() {
  const text = taskInput.value.trim();
  if (text === "") 
  {
    alert("⚠️ Please enter a task before adding!");
    return;
  }

  tasks.push({ text: text, completed: false }); 
  taskInput.value = "";
  renderTasks();
}

function setFilter(value) {
  filter = value;
  renderTasks();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

renderTasks();