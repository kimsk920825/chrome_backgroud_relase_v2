const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "to-do";
const savedToDos = localStorage.getItem(TODOS_KEY);
let toDoArray = [];

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDoArray.push(newTodoObj);
  paintToDoHTML(newTodoObj);
  saveLocalStorage();
}
function saveLocalStorage() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDoArray));
}

function paintToDoHTML(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  const button = document.createElement("button");
  const emoticon = '<i class="far fa-trash-alt"></i>';
  button.innerHTML = emoticon;
  button.addEventListener("click", deleteToDo);
  span.innerText = newTodo.text;
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
  paintToDoCSS(li, span, button);
}

function paintToDoCSS(li, span, button) {
  li.className = "list-box";
  span.className = "list-text";
  button.className = "list-delete";
}
function deleteToDo(event) {
  const li = event.target.parentElement.parentElement;
  li.remove();
  toDoArray = toDoArray.filter((toDo) => toDo.id !== parseInt(li.id));
  saveLocalStorage();
}
function checkDone(ev) {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("done");
  }
}

//처음이면
toDoForm.addEventListener("submit", handleToDoSubmit);
//추가이면
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  console.log(parsedToDos);
  toDoArray = parsedToDos;
  parsedToDos.forEach(paintToDoHTML);
}
//취소면
toDoList.addEventListener("click", checkDone);
