"use strict";
const todoInput = document.getElementById('todo_input');
const todoForm = document.getElementById('todo_form');
const todoList = document.getElementById('todo_list');
const doneList = document.getElementById('done_list');
let todos = [];
let dones = [];
const renderTasks = () => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    dones.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTasks();
};
const completeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    dones.push(todo);
    renderTasks();
};
const deleteTodo = (todo) => {
    dones = dones.filter((t) => t.id !== todo.id);
    renderTasks();
};
const createTodoElement = (todo, isDone) => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;
    const button = document.createElement('button');
    button.classList.add('render-container__item-button');
    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = 'rgb(230, 230, 250)';
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor = 'rgb(135, 206, 235)';
    }
    button.addEventListener('click', () => {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            completeTodo(todo);
        }
    });
    li.appendChild(button);
    return li;
};
todoForm.addEventListener('submit', (event) => {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
renderTasks();
