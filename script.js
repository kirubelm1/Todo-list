const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === '') {
    alert("You must write something!")
  } else {
    const newListItem = document.createElement("li");
    newListItem.innerHTML = inputBox.value;
    listContainer.appendChild(newListItem);
    const removeButton = document.createElement("span");
    removeButton.innerHTML = "\u00d7";
    newListItem.appendChild(removeButton);
  }
  inputBox.value = "";
  saveTodoList();
}

function saveTodoList() {
  const todoList = [];
  for (const item of listContainer.children) {
    todoList.push(item.textContent); 
  }
  localStorage.setItem("todos", JSON.stringify(todoList));
}

function loadTodoList() {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    const todoList = JSON.parse(storedTodos);
    for (const todo of todoList) {
      const newListItem = document.createElement("li");
      newListItem.innerHTML = todo;
      const removeButton = document.createElement("span");
      removeButton.innerHTML = "\u00d7";
      newListItem.appendChild(removeButton);
      listContainer.appendChild(newListItem);
    }
  }
}

window.onload = loadTodoList;

listContainer.addEventListener("click", function(event) {
  const { target } = event;
  if (target.tagName === "LI") {
    target.classList.toggle("checked");
  }
  if (target.tagName === "SPAN") {
    target.parentElement.remove();
    saveTodoList(); 
  }
});


