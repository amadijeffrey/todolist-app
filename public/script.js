const ul = document.querySelector("ul")
const button = document.querySelector("button")
const input = document.querySelector('input')
let isNewtodo = false;
const Todos = {}


onPageload()

button.addEventListener("click", () => {
    createTodo()
})
input.addEventListener('keypress', (e) => {
    if (e.which === 13) {
        createTodo()
    }
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
        newtodo = `<li class='completed' data-completed=${todo.completed} data-id=${todo._id}> ${todo.name} <i class="fas fa-check visible"></i><span>X</span</li>`
    } else {
        newtodo = `<li data-id=${todo._id} data-completed=${todo.completed} >  ${todo.name}<i class="fas fa-check"></i><span>X</span</li>`
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
        checkNewTodo()
        createTodoDetail(newTodo)
        console.log(Todos)
        if(!window.localStorage.getItem("data")){
            window.localStorage["data"] = JSON.stringify(Todos)
        }
        // setTimeout(isTodoCompleted,2*60*1000,newTodo)
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
        span.parentElement.classList.toggle('animated')
        span.parentElement.classList.toggle('fadeOut')

    })
}
function updateTodo(todo) {
    const id = todo.dataset.id;
    const url = `api/todos/${id}`;
    isCompleted = !(eval(todo.dataset.completed))

    fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: isCompleted }),
    }).then(response => {
        return response.json()

    }).then((updatedTodo) => {
        todo.classList.toggle('completed')
        let i = todo.children[0]
        i.classList.toggle("visible")
        window.localStorage[updatedTodo._id][status] = JSON.stringify(updatedTodo.completed)
    })
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

function checkNewTodo() {
    if (isNewtodo) {
        let span = document.querySelectorAll('span')
        span.forEach(spann => {
            spann.addEventListener('click', function (e) {
                removeTodo(this)
                e.stopPropagation()
            })
        })
        let liArray = document.querySelectorAll('li')

        liArray.forEach(li => {
            li.addEventListener('click', function () {
                updateTodo(this)
            })
        })
    }
}

// setInterval(function(){
//     const returnedTodo = JSON.parse(window.localStorage['data'])
//         const presentTime = new Date().getTime();
//     for (const todo of Object.keys(returnedTodo)){
//         if( returnedTodo[todo][status] == true){
//             return returnedTodo[todo]
//         }
//     }
// }, 1* 60* 1000)
// -+  const oldTime = Date.parse(todo.created_date) + 2 * 60 * 1000
//     if (presentTime >= oldTime && !todo.completed) {

//     }



function createTodoDetail(todo) {
    Todos[todo._id] =  {
        createdTime: Date.parse(todo.created_date),
        status: todo.completed,
        
    }
}
