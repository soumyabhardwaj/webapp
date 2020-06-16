//selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-Button');
const todoList=document.querySelector('.todo-List');
const filterOption=document.querySelector(".filter-todo")


//event listeners
document.addEventListener("DOMContentLoaded",getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click",delteCheck);
filterOption.addEventListener("click", filterTodo);


//functions

function addTodo(event){
//prevent form from submitting
   event.preventDefault();
// to do div
     const todoDiv = document.createElement('div');
     todoDiv.classList.add('todo');

//create list
const newtodo=document.createElement('li');
newtodo.innerText=todoInput.value;
newtodo.classList.add('todo-item');
todoDiv.appendChild(newtodo);
//add to do to local storage
saveLocalTodos(todoInput.value);

//complete or check button
const Completebutton = document.createElement("button");
Completebutton.innerHTML='<i class="fas fa-check"> </i>';
Completebutton.classList.add('complete-btn');
todoDiv.appendChild(Completebutton);


// delete button
const TrashButton = document.createElement('button');
TrashButton.innerHTML='<i class="fas fa-trash"> </i>';
TrashButton.classList.add('trash-btn');
todoDiv.appendChild(TrashButton);

//append to list
todoList.appendChild(todoDiv);
// clear the value
todoInput.value=" ";



}

function delteCheck(e){
const item=e.target;
//delete to edo 
if(item.classList[0]==='trash-btn'){
    const todo=item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend",function(){
        todo.remove();
        
    })
}
if (item.classList[0]==="complete-btn"){
    const todo=item.parentElement;
    todo.classList.toggle("completed");
  } 
}



function filterTodo(e){

    const todos=todoList.childNodes;
    console.log(todos);
    
    todos.forEach(function(todo){
     switch(e.target.value){
        case "all":
        todo.style.display='flex';
           break;

        case "completed":
            if(todo.classList.contains("completed")){
                 todo.style.display='flex';
            } 
            else{
                   todo.style.display='none';
            }

            break;

            case "pending":
            if(!todo.classList.contains("completed")){
                 todo.style.display='flex';
            } 
            else{
                   todo.style.display='none';
            }
            
            break;
 
    }

});
}


function saveLocalTodos(todo){
    //to check if i already have some todos 
    let todos;
    if(localStorage.getItem('todos')===null ){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    //console.log("hello")
     //to check if i already have some todos 
     let todos;
     if(localStorage.getItem('todos')===null ){
         todos=[];
     }
     else{
         todos=JSON.parse(localStorage.getItem('todos'));
     }
     todos.forEach(function(todo){
         // to do div
     const todoDiv = document.createElement('div');
     todoDiv.classList.add('todo');

//create list
const newtodo=document.createElement('li');
newtodo.innerText=todo;
newtodo.classList.add('todo-item');
todoDiv.appendChild(newtodo);


//complete or check button
const Completebutton = document.createElement("button");
Completebutton.innerHTML='<i class="fas fa-check"> </i>';
Completebutton.classList.add('complete-btn');
todoDiv.appendChild(Completebutton);


// delete button
const TrashButton = document.createElement('button');
TrashButton.innerHTML='<i class="fas fa-trash"> </i>';
TrashButton.classList.add('trash-btn');
todoDiv.appendChild(TrashButton);
//append to list
todoList.appendChild(todoDiv);

     })

}
function removeLocalTodos(todo){
    //check if i have anything

    let todos;
    if(localStorage.getItem('todos')===null ){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}
