const toDoList = document.getElementById("todo-list");
//체크 취소 또는 생성
function checkDone(event) {
  if (event.target.tagName === "LI") {
    const newToDoArray = toDoArray.map((item) => {
      if (item.id === parseInt(event.target.id)) {
        if (item.checked) {
          item.checked = false;
        } else {
          item.checked = true;
        }
      }
      return item;
    });
    saveLocalStorage(newToDoArray);

    // 1. 다 지운다.
    toDoList.innerHTML = "";

    // 2. render -> todos -> localStorage -> getItem -> string -> parse -> array
    const todoListString = getLocalStorage();
    const todoList = JSON.parse(todoListString);
    render(todoList);
  }
}
toDoList.addEventListener("click", checkDone);

const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");

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
    checked: false,
  };
  toDoArray.push(newTodoObj);
  paintToDoHTML(newTodoObj);
  saveLocalStorage(toDoArray);
}

function getLocalStorage() {
  const savedToDos = localStorage.getItem(TODOS_KEY);
  return savedToDos;
}
function saveLocalStorage(newArr) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(newArr));
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
  console.log(newTodo);
  li.classList.add("list-box");
  if (newTodo.checked) {
    li.classList.add("done");
  } else {
    li.classList.remove("done");
  }
  console.log(li.classList);

  toDoList.appendChild(li);

  paintToDoCSS(li, span, button);
}
// 1. 전부 지우고 다시 다그린다.
// 2. 기존에 있는거 그대로 두고 누른놈만 바꾼다.
function paintToDoCSS(li, span, button) {
  // li.className = "list-box";
  span.className = "list-text";
  button.className = "list-delete";
}
function deleteToDo(event) {
  const li = event.target.parentElement.parentElement;
  li.remove();
  toDoArray = toDoArray.filter((toDo) => toDo.id !== parseInt(li.id));
  saveLocalStorage(toDoArray);
}

//처음이면
toDoForm.addEventListener("submit", handleToDoSubmit);
//추가이면
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDoArray = parsedToDos;
  render(toDoArray);
}

function render(todos) {
  todos.forEach(paintToDoHTML);
}
