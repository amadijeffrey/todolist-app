const ul = document.querySelector("ul")
const button = document.querySelector("button")
let isNewtodo = false; 


fetch("/api/todos").then((response) => {
    return response.json()
}).then((data) => { console.log(data) })

button.addEventListener("click", () => {
    createTodo()

})



function addTodos(todos) {

    todos.forEach(todo => {
        addTodo(todo)
    });
}

function addTodo(todo) {
    if(todo.completed){
        const newtodo = "<li class='completed'>" + todo.name + "<span>X</span</li>"
    }else{
        const newtodo = "<li class='>" + todo.name + "<span>X</span</li>"

    }
    
    ul.insertAdjacentHTML("beforeend", newtodo)
}

function createTodo() {
    const userInput = document.querySelector("input").value
    const data = { name: userInput }

    fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(data),

    }).then(response => {
        return response.json()

    })
        .then((newTodo) => {
            //  newTodo ? JSON.parse(newTodo):{} 
            console.log(newTodo)

        })

}
 async function fetchTodosfromApi(){
    await fetch("/api/todos")
    return response.json()
 }
 async function addTodotoPage(){
     await fetchTodosfromApi()
     addTodos(todos)
 }