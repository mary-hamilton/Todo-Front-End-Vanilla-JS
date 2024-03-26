import {makeHeader} from "./header.js";
import {fetchAllTodos, fetchSingleTodoPlusChildren} from "../APIclient.js";
import {makeTodoList} from "./todoList.js";
import {isUserLoggedIn} from "../auth.js";
import {makeTodo} from "./todo.js";


export function renderTodoList(container, todos, isSublist = true) {
    
    const idPrefix = container.id;
    const todoList = makeTodoList(idPrefix, todos, isSublist);
    
    container.append(todoList);
}

export function renderMainContent() {

    const loggedIn = isUserLoggedIn()
    const mainContent = document.getElementById("main");
    mainContent.innerHTML = "";

    if (!loggedIn) {
        mainContent.textContent = "No Todos To Show"
    } else {
       fetchAllTodos()
            .then(todoList => {
                renderTodoList(mainContent, todoList, false);
            })
            .catch(error => console.log(error))
    }
}

export function renderParentAndSubTodos(todoEl) {

    const todoElID = todoEl.id;

    fetchSingleTodoPlusChildren(todoElID)
        .then(todoData => {
            const updatedTodoEl = makeTodo(todoData);
            todoEl.replaceWith(updatedTodoEl);
            if (todoData.children) {
                renderTodoList(updatedTodoEl, todoData.children)
            }
        })
}

export function removeSubTodos(todoEl) {
    
    const existingSubtodoList = todoEl.querySelector(".subtodo-list");
    
    if (existingSubtodoList) {
        todoEl.removeChild(existingSubtodoList);
    }
}

export function toggleRenderSubTodos(todoEl) {

    const existingSubtodoList = todoEl.querySelector(".subtodo-list");

    removeSubTodos(todoEl);

    if (!existingSubtodoList) {
        renderParentAndSubTodos(todoEl);
    }
}

export function updateUI() {
    makeHeader();
    renderMainContent()
}