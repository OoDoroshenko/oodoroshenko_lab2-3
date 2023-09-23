const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete",
};

const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");
let toDoArr = [];
let numb = 1;
// Check if there is data in local storage

if (localStorage.getItem("todoList")) {
  toDoArr = JSON.parse(localStorage.getItem("todoList"));
  render();
  numb = Number(JSON.parse(localStorage.getItem("id")));
}

function newTodo() {
  let text = window.prompt("enter todo");
  let todo = { id: numb++, text, checked: false };
  toDoArr.push(todo);
  render();
  saveData();

  localStorage.setItem("id", `${numb}`);
}

// Render all todo from todoArr
function render() {
  list.innerHTML = toDoArr.map((todo) => renderTodo(todo)).join("");
  itemCountSpan.innerHTML = toDoArr.length;
  uncheckedCountSpan.innerHTML = toDoArr.filter((todo) => !todo.checked).length;
}

function renderTodo(todo) {
  return `<li id="${todo.id}">
 <input type="checkbox" ${todo.checked ? "checked" : ""}/>
 <span>${todo.text} ID:${todo.id}</span>
 <button onClick="deleteToDo(this)">delete</button>
 </li>`;
}

function deleteToDo(delButt) {
  const todoEl = delButt.closest("li");
  const todoIndex = toDoArr.findIndex((el) => el.id == todoEl.id);
  toDoArr.splice(todoIndex, 1);
  render();
  countUnchecked();
  saveData();
}

function countUnchecked() {
  const uncheckCount = toDoArr.reduce(
    (acc, todo) => (acc += todo.checked ? 0 : 1),
    0
  );
  uncheckedCountSpan.textContent = `${uncheckCount}`;
}

// Handling click on checkbox
list.addEventListener("click", function (e) {
  if (e.target.localName !== "input") return;
  const todoEl = e.target.closest("li");
  const todoIndex = toDoArr.findIndex((el) => el.id === Number(todoEl.id));

  toDoArr[todoIndex].checked = !toDoArr[todoIndex].checked;

  saveData();
  countUnchecked();
});

// Load data in local storage before window close
function saveData() {
  localStorage.setItem("todoList", JSON.stringify(toDoArr));
}
