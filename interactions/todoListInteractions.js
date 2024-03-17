import {toggleTodoParent} from "../APIclient.js";
import {updateUI} from "../ui/uiUtils.js";

export function handleTodoDrag(event) {
    const todoToDragId = event.target.closest(".todo").id;
    event.dataTransfer.setData("text/plain", todoToDragId);
}

export function handleTodoDrop(event) {
    // Do not need to handle none values of parent_id in
    // here I think because that will be handled in
    // a separate function for dropping todos outside
    // to*do list
    const draggedId = event.dataTransfer.getData("text/plain");
    const droppedId = event.target.closest(".todo").id
    if (draggedId !== droppedId ) {
        // Make api call updating value of child task's parent ID in the database
        toggleTodoParent(draggedId, droppedId)
            .then(responseData => {
                updateUI();
            })
            .catch(error => console.log(error))
        // Update the UI by fetching all todos
        event.preventDefault();
    }
}