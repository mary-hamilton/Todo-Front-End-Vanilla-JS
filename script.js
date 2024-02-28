let dummyTodos = [
    {text: "The first todo goes here"},
    {text: "The second todo goes here"},
    {text: "The third todo goes here"},
    {text: "And the fourth goes here"}
]

function makeTodo(todoData) {
    let todo = document.createElement("li")
    todo.classList.add("todo")
    let dragHandle = document.createElement("img")
    dragHandle.classList.add("drag-handle")
    dragHandle.setAttribute("src", "images/drag-handle-svgrepo-com.svg")
    todo.appendChild(dragHandle)
    let todoText = document.createElement("div")
    todoText.classList.add("todo-text")
    todo.appendChild(todoText)
    let checkbox = document.createElement("input")
    checkbox.classList.add("todo-checkbox")
    checkbox.setAttribute("id", "checked")
    checkbox.setAttribute("type", "checkbox")
    todoText.appendChild(checkbox)
    let textContent = document.createElement("p")
    textContent.classList.add("text-content")
    textContent.textContent = todoData.text
    todoText.appendChild(textContent)
    return todo
}

function renderTodos(todoList) {
    let listContainer = document.getElementById("todo-list")
    for (let todoData of todoList) {
        let todoEl = makeTodo(todoData);
        listContainer.appendChild(todoEl)
    }
}

renderTodos(dummyTodos)