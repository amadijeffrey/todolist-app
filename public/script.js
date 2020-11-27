const ul = document.querySelector("ul")
const button = document.querySelector("button")


    fetch("/api/todos").then((response)=>{
        return response.json()
    }).then((data)=>{console.log(data)})

button.addEventListener("click", ()=>{
    createTodo()
    
})



    function addTodos(todos){
    
        todos.forEach(todo => {
            addTodo(todo)
        });
    }

    function addTodo(todo){
        const newtodo = "<li>" + todo.name + "</li>"
        ul.insertAdjacentHTML("beforeend", newtodo)
    }

    function createTodo(){
        const userInput = document.querySelector("input").value
        const data = {name: userInput}
        
    fetch("/api/todos", {
        method:"POST",
        body: JSON.stringify(data),
        // headers:{
        //     "Content-type":"application/json; charset=UTF-8"
        // }
    }).then(response=> {
        return response.json()
         
    })
    .then((newTodo)=>{
        //  newTodo ? JSON.parse(newTodo):{} 
        console.log(newTodo)

    })
  
    }