const ul = document.querySelector("ul")
const button = document.querySelector("button")
const input = document.querySelector('input')
let isNewtodo = false;


onPageload()

button.addEventListener("click", () => {
    createTodo()
})
input.addEventListener('keypress', (e)=>{
   if(e.which ===13){
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
        newtodo = `<li  data-id=${todo._id} data-completed=${todo.completed} >  ${todo.name}<i class="fas fa-check"></i><span>X</span</li>`
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
        console.log(newTodo.created_date)
        let local = moment.utc(newTodo.created_date).getTime();
        console.log(local)
        // setTimeout(isTodoCompleted(),4*60*1000,local,newTodo)
        checkNewTodo()
     
    
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
 const id = todo.dataset.id;
 const url = `api/todos/${id}`;
 isCompleted = !(eval(todo.dataset.completed))
  
 fetch(url, {
    method: "PUT",
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({completed : isCompleted}),
}).then(response => {
    return response.json()

}).then((updatedTodo) => {
  todo.classList.toggle('completed')
  let i = todo.children[0]
  i.classList.toggle("visible")
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

function checkNewTodo(){
    if (isNewtodo) {
        let span = document.querySelectorAll('span')
        span.forEach(spann => {
            spann.addEventListener('click', function(e){
                removeTodo(this)
                e.stopPropagation()
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

function isTodoCompleted(todo){
    const oldTime = new Date(time.getTime()+ 4*60*1000).toLocaleTimeString()
    const presentTime = new Date().toLocaleTimeString();
  if(oldTime==presentTime && !(todo.completed)){
      alert(`You have a pending task: ${todo.name}`)
    }
}
