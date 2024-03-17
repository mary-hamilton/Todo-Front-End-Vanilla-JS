import {makeHeader} from "./header.js";
import {fetchAllTodos} from "../APIclient.js";
import {makeTodoList} from "./todoList.js";
import {isUserLoggedIn} from "../auth.js";


export function showMainContent() {

    const loggedIn = isUserLoggedIn()
    const mainContent = document.getElementById("main");
    mainContent.innerHTML = "";

    if (!loggedIn) {
        mainContent.textContent = "No Todos To Show"
    } else {
        fetchAllTodos()
            .then(todoList => {
                showAllTodos("main", mainContent, todoList)
            })
            .catch(error => console.log(error))
    }
}


export function showAllTodos(idPrefix, container, todos) {
    const todoList = makeTodoList(idPrefix, todos, false);
    container.append(todoList);
}



export function updateUI() {

    makeHeader();
    showMainContent()
}