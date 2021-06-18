const ul = document.querySelector("ul")
const button = document.querySelector("button")
let isNewtodo = false;


onPageload()

button.addEventListener("click", () => {
    createTodo()

})

function addTodos(todos) {
    todos.forEach(todo => {
        addTodo(todo)
    });
    checkNewTodo()

}

function addTodo(todo) {
    
    let newtodo;
    if (todo.completed) {
        newtodo = `<li class='completed' data-completed=${todo.completed} data-id=${todo._id}> ${todo.name} <i class="fa-solid fa-check"></i><span>X</span</li>`
    } else {
        newtodo = `<li  data-id=${todo._id} data-completed=${todo.completed} >  ${todo.name}<i class="fa-solid fa-check"></i> <span>X</span</li>`
    }
    ul.insertAdjacentHTML("beforeend", newtodo)
    isNewtodo = true
}

function createTodo() {
    const userInput = document.querySelector("input").value
    const data = { name: userInput }

    fetch("/api/todos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json()

    }).then((newTodo) => {
        addTodo(newTodo)
        document.querySelector("input").value = " "
    })

}

function removeTodo(span) {
 const id = span.parentElement.dataset.id;
 const url = `api/todos/${id}`
    fetch(url, {
        method: 'DELETE',
    }).then(response => {
        return response.json()

    }).then((removedtodo) => {
       ul.removeChild(span.parentElement)
    }) 
}
function updateTodo(todo){
 const id = todo.dataset.id
 let isCompleted = todo.dataset.completed
 console.log(isCompleted)
}

async function onPageload() {
    await addTodostoPage()
   
}
async function addTodostoPage() {
    const todos = await fetchTodosfromApi()
    addTodos(todos)
}
async function fetchTodosfromApi() {
    const response = await fetch("/api/todos")
    return response.json()

}

function checkNewTodo(){
    if (isNewtodo) {
        let span = document.querySelectorAll('span')
        span.forEach(spann => {
            spann.addEventListener('click', function(){
                removeTodo(this)
            })
        })
        let liArray = document.querySelectorAll('li')
        
        liArray.forEach(li =>{
            li.addEventListener('click', function(){
                updateTodo(this)
            })
        })
    }
}

