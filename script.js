import { fetchAllTodos } from "./httpClient.js";


let dummyTodos = [
    {title: "The first todo goes here", id: 1},
    {title: "The second todo goes here", id: 2, parent_id: 1},
    {title: "The third todo goes here", id: 3, parent_id: 1},
    {title: "And the fourth goes here", id: 4},
    {title: "AND the fifth goes here", id: 5, parent_id: 4},
    {title: "Sneaky extra lad", id: 6},
    {title: "Who's this now!", id: 7, parent_id: 4}
]

let realTodos = []

function getAllTodos() {
    fetchAllTodos().then(todos => {
        if (todos) {
            realTodos = todos;
            renderTodos(realTodos)
        }
    })
    
}

function makeTodoMainContent() {
    let mainContent = document.createElement("div")
    mainContent.classList.add("todo-main-content")
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
    checkbox.setAttribute("id", `${todoId}-checkbox`)
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

function setDropTargetable(todoEl) {
    todoEl.addEventListener("dragenter", (event) => {
        event.preventDefault()
        // Add some styling code here
    })
    todoEl.addEventListener("dragover", (event) => {
        event.preventDefault()
    })
    todoEl.addEventListener("drop", (event) => {
        let child_id = event.dataTransfer.getData("text/plain")
        let parent_id = todoEl.id
        if (child_id !== parent_id) {
            let childData = dummyTodos.find((e) => e.id === parseInt(child_id))
            childData.parent_id = parent_id
            getAllTodos()
            event.preventDefault()
        }
    })
}

function makeTodo(todoData) {
    
    let { id, title } = todoData
    
    let todoEl = document.createElement("li")
    todoEl.classList.add("todo")
    todoEl.setAttribute("id", id)

    let mainContent = makeTodoMainContent()
    setDraggable(mainContent, id)
    todoEl.appendChild(mainContent)
    let dragHandle = makeDragHandle()
    let textAndCheckboxContainer = makeTextAndCheckboxContainer()
    mainContent.append(dragHandle, textAndCheckboxContainer)
    let checkbox = makeCheckbox(id)
    let textContent = makeTextContent(title)
    textAndCheckboxContainer.append(checkbox, textContent)
    
    return todoEl
}

function renderTodos(todoDataList) {
    
    // TODO add some logic in here to handle what happens when todoDataList is empty
    
    let listContainer = document.getElementById("main-todo-list")

    // Empty before rerendering
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    // Storing subtodos in a list of lists until all primary todos have been appended to the document
    let subtodoLists = [];
    
    for (let todoData of todoDataList) {
        let todoEl = makeTodo(todoData);
        if (todoData.parent_id) {
            // Get our subtodo list for this task if we already have one
            let subtodoListEntry = subtodoLists.find(e => e.parent_id === todoData.parent_id)
            if (!subtodoListEntry) {
                let subtodoList = document.createElement("ul");
                subtodoList.classList.add("todo-list", "subtodo-list")
                subtodoList.setAttribute("id", `${todoData.parent_id}-subtodo-list`)
                subtodoList.appendChild(todoEl)
                subtodoLists.push({parent_id: todoData.parent_id, list: subtodoList})
            } else {
                subtodoListEntry.list.appendChild(todoEl)
            }
            continue;
        }
        // Setting droptarget here so only top-level tasks are valid dropzones
        setDropTargetable(todoEl)
        listContainer.appendChild(todoEl)
    }
    // Adding the subtodos
    for (let subtodoListEntry of subtodoLists) {
        let parentTodo = document.getElementById(subtodoListEntry.parent_id)
        parentTodo.appendChild(subtodoListEntry.list)
    }
}

getAllTodos()