const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const goal = document.querySelector("#goal");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginFormat(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGoal(username);
}
function paintGoal(username) {
  goal.innerText = `${username}님의 하루 목표`;
  goal.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginFormat);
} else {
  paintGoal(savedUsername);
}
