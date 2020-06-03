//selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-Button');
const todoList=document.querySelector('.todo-List');
const filterOption=document.querySelector('.filter-todo')





//event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click",delteCheck);
filterOption.addEventListener('click ', filterTodo);


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
            if(todo.classList.contains("pending")){
                 todo.style.display='flex';
            } 
            else{
                   todo.style.display='none';
            }
            
            break;
 
    }

});
}