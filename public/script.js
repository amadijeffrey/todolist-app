const ul = document.querySelector('ul')
const button = document.querySelector('button')
const input = document.querySelector('input')
let isNewtodo = false
const Todos = {
}

onPageload()

button.addEventListener('click', () => {
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
    if (!todo.completed) {
      createTodoDetail(todo)
    }
  })
  window.localStorage.data = JSON.stringify(Todos)
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
  const userInput = document.querySelector("input['text']").value
  const expiryTime = document.querySelector("input['number']").value
  const data = { name: userInput, expiryTime }
  if (userInput !== '' && expiryTime !== '') {
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
      document.querySelector("input['text']").value = " "
      document.querySelector("input['number']").value = " "
      checkNewTodo()
      createTodoDetail(newTodo)
      window.localStorage["data"] = JSON.stringify(Todos)
      remindMeLater(newTodo)
    })

  }
}


function removeTodo(span) {
  const id = span.parentElement.dataset.id;
  deleteTodoFromLocalStorage(id)
  const url = `api/todos/${id}`
  fetch(url, {
    method: 'DELETE',
  }).then(response => {
    return response.json()

  }).then((removedtodo) => {
    span.parentElement.classList.add('animated')
    setTimeout(function () {
      span.parentElement.remove()
    }, 2000)
  })
}
function updateTodo(todo) {
  const id = todo.dataset.id;
  const url = `api/todos/${id}`;
  const isCompleted = !todo.dataset.completed

  window.fetch(url, {
    method: 'PUT',
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
    deleteTodoFromLocalStorage(updatedTodo._id)
  })
}

function deleteTodoFromLocalStorage(id) {
  const data = JSON.parse(localStorage.getItem('data'))
  delete data[id]

  localStorage.setItem('data', JSON.stringify(data))
  delete Todos[id]
}

async function onPageload () {
  await addTodostoPage()
}
async function addTodostoPage () {
  const todos = await fetchTodosfromApi()
  addTodos(todos)
}
async function fetchTodosfromApi () {
  try {
    const response = await window.fetch('/api/todos')
    if (!response.ok) {
      throw Error(response.status)
    }
    return response.json()
  } catch (error) {
    return { message: error.message }
  }
}

function checkNewTodo () {
  if (isNewtodo) {
    const span = document.querySelectorAll('span')
    span.forEach(spann => {
      spann.addEventListener('click', function (e) {
        removeTodo(this)
        e.stopPropagation()
      })
    })
    const liArray = document.querySelectorAll('li')

    liArray.forEach(li => {
      li.addEventListener('click', function () {
        updateTodo(this)
      })
    })
  }
}
function remindMeLater (todo) {
  setInterval(function () {
    const returnedTodo = JSON.parse(window.localStorage.data)
    const presentTime = new Date().getTime()
    for (const todoId of Object.keys(returnedTodo)) {
      if (presentTime >= returnedTodo[todoId].createdTime + returnedTodo[todoId].expiryTime * 60 * 1000) {
        window.alert(`You have a pending task: ${returnedTodo[todoId].name}`)
      }
    }
  }, todo.expiryTime * 60 * 1000)
}

function createTodoDetail(todo) {
  Todos[todo._id] = {
    createdTime: Date.parse(todo.created_date),
    name: todo.name,
    expiryTime: todo.expiryTime
  }
}
