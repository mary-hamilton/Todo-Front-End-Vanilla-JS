import {toggleTodoCheck, toggleTodoParent} from "../APIclient.js";
import {removeSubTodos, renderParentAndSubTodos, toggleRenderSubTodos} from "../ui/uiUtils.js";

// function handleTodoInteraction(event, interactionFunc) {
//     const todoEl = event.target.closest(".todo");
//     interactionFunc(event, todoEl);
// }

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
    // if (event.target.matches("input[type='checkbox']")) {
    //     return;
    // }

    const clickedTodo = event.target.closest(".todo");

    toggleRenderSubTodos(clickedTodo);
}

export function handleTodoCheckboxClick(event) {
    // Do not propagate
    event.stopPropagation();
    
    // Get to*do element
    const todoEl = event.target.closest(".todo");
    
    checkTodo(todoEl);
    
}

function checkTodo(todoEl) {

    const todoId = todoEl.id;
    
    // Update UI
    todoEl.classList.toggle("checked");

    let checked = todoEl.classList.contains("checked");
    
    todoEl.querySelector("input[type='checkbox']").checked = checked;

    // API call to update value in DB
    toggleTodoCheck(todoId, checked)
        .then(r => {
            // Fetch updated data and update UI if we need to cascade down
            if (checked) {
                renderParentAndSubTodos(todoEl);
            }
            
        })

    // Cascade up the DOM *if* we are unchecking a to*do
    if (!checked) {
        const grandparentElement = todoEl.parentElement.parentElement;
        const isTodo = grandparentElement.classList.contains("todo");
        
        if (isTodo && grandparentElement.classList.contains("checked")) {
            checkTodo(grandparentElement);
        }
    }

}