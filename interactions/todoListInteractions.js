import {toggleTodoParent} from "../APIclient.js";
import {removeSubTodos, renderSubTodos, toggleRenderSubTodos} from "../ui/uiUtils.js";

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
                renderSubTodos(droppedOnTodo);
            })
            .catch(error => console.log(error))

    }
}

export function handleTodoClick(event) {

    const clickedTodo = event.target.closest(".todo");

    toggleRenderSubTodos(clickedTodo);
}