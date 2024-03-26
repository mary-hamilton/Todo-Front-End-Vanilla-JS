import {fetchAllTodos} from "./APIclient.js";
import {makeTodoList} from "./ui/todoList.js";
import {makeHeader} from "./ui/header.js";
import {handleSignupSubmit, handleLoginSubmit, handleLogoutClick} from "./interactions/authInteractions.js";
import {
    handleTodoCheckboxClick,
    handleTodoClick,
    handleTodoDrag,
    handleTodoDrop
} from "./interactions/todoListInteractions.js";
import {updateUI} from "./ui/uiUtils.js";
import {isUserLoggedIn} from "./auth.js";

updateUI();


// Auth event listeners

const header = document.getElementById("header");
header.addEventListener("submit", (event) => {

    if (event.target.id === 'signup-form') {
        handleSignupSubmit(event)
    }
    if (event.target.id === 'login-form') {
        handleLoginSubmit(event)
    }
})

header.addEventListener("click", (event) => {
    if (event.target.id === "logout-button") {
        handleLogoutClick()
    }
})

// To*do List event listeners

const todoListContainer = document.getElementById("main");

todoListContainer.addEventListener("dragstart", (event) => {
    handleTodoDrag(event);
})

todoListContainer.addEventListener("dragenter", (event) => {
    event.preventDefault()
    // Add some styling code here
})

todoListContainer.addEventListener("dragover", (event) => {
    event.preventDefault()
})

todoListContainer.addEventListener("drop", (event) => {
    handleTodoDrop(event)
})

todoListContainer.addEventListener("click", (event) => {
    
    if (event.target.matches("input[type='checkbox']")) {
        handleTodoCheckboxClick(event);
        return;
    }
    
    handleTodoClick(event);
})

