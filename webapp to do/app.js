//selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-Button');
const todoList=document.querySelector('.todo-List');
const filterOption=document.querySelector(".filter-todo")

var item_text=document.createElement('DIV');
item_text.classList.add('item-text');

var editInput=document.createElement('input');
editInput.classList.add('edit-input');
editInput.classList.add('hide');
editInput.name='edit-input';
editInput.type='text';
editInput.value-'todo';


var edit_input_btn=document.createElement('BUTTON');
edit_input_btn.textContent="Edit";
edit_input_btn.classList.add("action-btn");

edit_input_btn.classList.add('edit-btn');

edit_input_btn.classList.add('hide');
edit_input_btn.type='button';


 var action_btn=document.createElement("div");
 action_btn.classList.add("aciton-btn");




  var edit_btn=document.createElement('button');
edit_btn.classList.add("action-btn")

edit_btn.classList.add("edit-btn");
edit_btn.textContent=("edit"); 
//edit todos




//event listeners
document.addEventListener("DOMContentLoaded",getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click",delteCheck);
filterOption.addEventListener("click", filterTodo);
edit_btn.addEventListener('click',function(){
    editInput.classList.remove('hide')
    item_text.classList.add('hide');
    edit_input_btn.classList.remove("hide");
    edit_input_btn.addEventListener('click',function(){
        item_text.textContent=editInput.value;
        editInput.classList.add('hide');
        item_text.classList.remove('hide');
        edit_input_btn.classList.add('hide');
    });
});
 action_btn.append(edit_input_btn);
 action_btn.append(edit_btn); 


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
//append edit button 
edit_input_btn.innerHTML='<i class ="fas fa-edit"></i>'
;

todoDiv.appendChild(editInput);
todoDiv.appendChild(action_btn);
todoDiv.appendChild(item_text);
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