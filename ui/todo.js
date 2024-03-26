function makeTodoMainContent() {
    let mainContent = document.createElement("div")
    mainContent.classList.add("todo-main-content");
    mainContent.draggable = true;
    return mainContent
}

function makeDragHandle() {
    let dragHandle = document.createElement("img")
    dragHandle.classList.add("drag-handle")
    dragHandle.setAttribute("src", "images/drag-handle-svgrepo-com.svg")
    // Prevent draghandle being draggable independent of parent element
    dragHandle.setAttribute("draggable", "false")
    return dragHandle
}

function makeCheckbox(todoId) {
    let checkbox = document.createElement("input")
    checkbox.classList.add("todo-checkbox")
    // TODO add check to checked checkbox
    checkbox.id = `${todoId}-checkbox`
    checkbox.setAttribute("type", "checkbox")
    return checkbox
}

function makeTextAndCheckboxContainer() {
    let textAndCheckboxContainer = document.createElement("div")
    textAndCheckboxContainer.classList.add("todo-text")
    return textAndCheckboxContainer
}

function makeTextContent(title) {
    let textContent = document.createElement("p")
    textContent.classList.add("text-content")
    textContent.textContent = title
    return textContent
}

function setDraggable(mainContent, id) {
    mainContent.setAttribute("draggable", "true")
    mainContent.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", id)
    })
}

export function makeTodo(todoData) {
    
    const { id, title, checked } = todoData;
    const todoId = id;
    
    let todoEl = document.createElement("li");
    todoEl.classList.add("todo");
    todoEl.id = todoId;

    // Applying checked styles
    if (checked) {
        todoEl.classList.add("checked");
    }

    let mainContent = makeTodoMainContent()
    todoEl.appendChild(mainContent)
    let dragHandle = makeDragHandle()
    let textAndCheckboxContainer = makeTextAndCheckboxContainer()
    mainContent.append(dragHandle, textAndCheckboxContainer)
    let checkbox = makeCheckbox(todoId)
    let textContent = makeTextContent(title)
    textAndCheckboxContainer.append(checkbox, textContent)

    return todoEl
}

