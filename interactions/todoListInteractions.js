import {toggleTodoCheck, toggleTodoParent} from "../APIclient.js";
import {removeSubTodos, renderParentAndSubTodos, toggleRenderSubTodos} from "../ui/uiUtils.js";

export function handleTodoDrag(event) {
    const todoToDragId = event.target.closest(".todo").id;
    event.dataTransfer.setData("text/plain", todoToDragId);
}

export function handleTodoDrop(event) {
    
    event.preventDefault();
    
    const draggedId = event.dataTransfer.getData("text/plain");
    const droppedOnTodo = event.target.closest(".todo");
    const droppedOnId = droppedOnTodo.id;
    
    if (draggedId !== droppedOnId) {
        // remove dragged to*do from the UI
        const draggedTodo = document.getElementById(draggedId)
        draggedTodo.parentNode.removeChild(draggedTodo);
        // Make api call updating value of child task's parent ID in the database
        toggleTodoParent(draggedId, droppedOnId)
            .then(r => {
                removeSubTodos(droppedOnTodo);
                renderParentAndSubTodos(droppedOnTodo);
            })
            .catch(error => console.log(error))

    }
}

export function handleTodoClick(event) {

    // Stop this event being triggered if the checkbox is clicked
    if (event.target.matches("input[type='checkbox']")) {
        return;
    }

    const clickedTodo = event.target.closest(".todo");

    toggleRenderSubTodos(clickedTodo);
}

export function handleTodoCheckboxClick(event) {
    // Do not propagate
    event.stopPropagation();
    
    // Get to*do element
    const todoEl = event.target.closest(".todo");
    const todoId = todoEl.id;
    
    // Get current checked value
    let checked = false;
    if (todoEl.classList.contains("checked")) {
        checked = true;
    }
    
    // API call to update value
    toggleTodoCheck(todoId, checked)
        .then(r => {
            // Fetch updated data and update UI
            renderParentAndSubTodos(todoEl);
        })
    
}