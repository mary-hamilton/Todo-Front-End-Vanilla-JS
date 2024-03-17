import {makeTodo} from "./todo.js";

export function makeTodoList(idPrefix, todoDataList, isSublist) {

    // TODO add some logic in here to handle what happens when todoDataList is empty

    let todoList = document.createElement("ul");
    todoList.id = `${idPrefix}-todo-list`;
    todoList.classList.add("todo-list");
    if (isSublist) {
        todoList.classList.add("subtodo-list");
    }

    // Empty before rerendering
    todoList.innerHTML = "";

    // Storing subtodos in a list of lists until all primary todos have been appended to the list
    // let subtodoLists = [];

    for (let todoData of todoDataList) {
        const todoEl = makeTodo(todoData);
        todoList.append(todoEl);
    }
    // Adding the subtodos
    // for (let subtodoListEntry of subtodoLists) {
    //     let parentTodo = document.getElementById(subtodoListEntry.parent_id)
    //     if (parentTodo) {
    //         parentTodo.appendChild(subtodoListEntry.list)
    //     }
    // }

    return todoList;
}