'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item, index) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        })

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function () {
            delete todoData[index];
            render();
        })
    });
    let todoDataFiltered = todoData.filter(function (item) {
        return item !== null;
    });
    todoData = todoDataFiltered;
    localStorage.setItem('todo', JSON.stringify(todoData));
};

if (localStorage.getItem('todo')) {
    todoData = JSON.parse(localStorage.getItem('todo'));
    render();
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    if (headerInput.value !== '') {
        todoData.push(newTodo);
    }
    headerInput.value = '';
    render();
});

render();