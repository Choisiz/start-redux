import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addTodo = (text) => {
  //추가 action
  return {
    type: ADD_TODO,
    text,
  };
};

const btnTodo = (id) => {
  //삭제 action
  return {
    type: DELETE_TODO,
    id,
  };
};

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text)); //추가
};

const dispatchBtnTodo = (e) => {
  //지우기
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(btnTodo(id));
};

const reducer = (state = [], action) => {
  //redux
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);
      dafault: return state;
  }
};

const store = createStore(reducer);

const paintToDos = () => {
  //li추가 및 삭제
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((todo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DELETE";
    btn.addEventListener("click", dispatchBtnTodo);
    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  //제출 이벤트
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  dispatchAddTodo(todo);
};

form.addEventListener("submit", onSubmit);
