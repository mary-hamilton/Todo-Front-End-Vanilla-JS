import {makeTodo} from "./todo.js";

export function makeTodoList(idPrefix, todoDataList, isSublist) {

    let todoList = document.createElement("ul");
    todoList.id = `${idPrefix}-todo-list`;
    todoList.classList.add("todo-list");
    
    if (isSublist) {
        todoList.classList.add("subtodo-list");
    }

    // Empty before rerendering
    todoList.innerHTML = "";

    for (let todoData of todoDataList) {
        const todoEl = makeTodo(todoData);
        todoList.append(todoEl);
    }

    return todoList;
}
