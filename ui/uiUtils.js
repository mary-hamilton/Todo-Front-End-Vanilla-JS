import {makeHeader} from "./header.js";
import {fetchAllTodos, fetchSingleTodoPlusChildren} from "../APIclient.js";
import {makeTodoList} from "./todoList.js";
import {isUserLoggedIn} from "../auth.js";


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

export function renderSubTodos(todoEl) {

    const todoElID = todoEl.id;

    fetchSingleTodoPlusChildren(todoElID)
        .then(todoData => {
            if (todoData.children) {
                renderTodoList(todoEl, todoData.children)
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
        renderSubTodos(todoEl);
    }
}

export function updateUI() {
    makeHeader();
    renderMainContent()
}