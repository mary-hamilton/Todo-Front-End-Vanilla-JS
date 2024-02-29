let dummyTodos = [
    {title: "The first todo goes here", id: 1},
    {title: "Sneaky extra lad", id: 6},
    {title: "The second todo goes here", id: 2, parentId: 1},
    {title: "The third todo goes here", id: 3, parentId: 1},
    {title: "And the fourth goes here", id: 4},
    {title: "AND the fifth goes here", id: 5, parentId: 4},
    {title: "Who's this now!", id: 7, parentId: 4}
]

function makeTodo(todoData) {
    let todo = document.createElement("li")
    todo.classList.add("todo")
    todo.setAttribute("id", todoData.id)
    let mainContent = document.createElement("div")
    mainContent.classList.add("todo-main-content")
    todo.appendChild(mainContent)
    let dragHandle = document.createElement("img")
    dragHandle.classList.add("drag-handle")
    dragHandle.setAttribute("src", "images/drag-handle-svgrepo-com.svg")
    mainContent.appendChild(dragHandle)
    let todoText = document.createElement("div")
    todoText.classList.add("todo-text")
    mainContent.appendChild(todoText)
    let checkbox = document.createElement("input")
    checkbox.classList.add("todo-checkbox")
    // TODO add check to checked checkbox
    checkbox.setAttribute("id", "checked")
    checkbox.setAttribute("type", "checkbox")
    todoText.appendChild(checkbox)
    let textContent = document.createElement("p")
    textContent.classList.add("text-content")
    textContent.textContent = todoData.title
    todoText.appendChild(textContent)
    return todo
}

function renderTodos(todoList) {
    let listContainer = document.getElementById("main-todo-list")
    // Storing subtodos in a list until all primary todos have been appended to the document
    let subtodoLists = [];
    for (let todoData of todoList) {
        let todoEl = makeTodo(todoData);
        if (todoData.parentId) {
            // Get our subtodo list for this task if we already have one
            let subtodoListEntry = subtodoLists.filter(e => e.parentId === todoData.parentId)[0]
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
        listContainer.appendChild(todoEl)
    }
    // Adding the subtodos
    for (let subtodoListEntry of subtodoLists) {
        let parentTodo = document.getElementById(subtodoListEntry.parentId)
        parentTodo.appendChild(subtodoListEntry.list)
    }
}

renderTodos(dummyTodos)