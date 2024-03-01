let dummyTodos = [
    {title: "The first todo goes here", id: 1},
    {title: "The second todo goes here", id: 2, parentId: 1},
    {title: "The third todo goes here", id: 3, parentId: 1},
    {title: "And the fourth goes here", id: 4},
    {title: "AND the fifth goes here", id: 5, parentId: 4},
    {title: "Sneaky extra lad", id: 6},
    {title: "Who's this now!", id: 7, parentId: 4}
]

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
        let childId = event.dataTransfer.getData("text/plain")
        let parentId = todoEl.id
        if (childId !== parentId) {
            let childData = dummyTodos.find((e) => e.id === parseInt(childId))
            childData.parentId = parentId
            renderTodos(dummyTodos)
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
    let listContainer = document.getElementById("main-todo-list")

    // Empty before rerendering
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    // Storing subtodos in a list of lists until all primary todos have been appended to the document
    let subtodoLists = [];
    
    for (let todoData of todoDataList) {
        let todoEl = makeTodo(todoData);
        if (todoData.parentId) {
            // Get our subtodo list for this task if we already have one
            let subtodoListEntry = subtodoLists.find(e => e.parentId === todoData.parentId)
            if (!subtodoListEntry) {
                let subtodoList = document.createElement("ul");
                subtodoList.classList.add("todo-list", "subtodo-list")
                subtodoList.setAttribute("id", `${todoData.parentId}-subtodo-list`)
                subtodoList.appendChild(todoEl)
                subtodoLists.push({parentId: todoData.parentId, list: subtodoList})
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
        let parentTodo = document.getElementById(subtodoListEntry.parentId)
        parentTodo.appendChild(subtodoListEntry.list)
    }
}

renderTodos(dummyTodos)