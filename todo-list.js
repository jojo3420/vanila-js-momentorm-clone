
const todoForm  = document.querySelector(".js-toDolistForm") ,
    todoInput = todoForm.querySelector("input[name='toDo']") ,
    toDoListElement = document.querySelector(".js-toDoList"); // ul element
const CN_TODOLIST = "toDoList";

let toDoList = new Array();


function clearInput(element){
    element.value = '';
}

function toDoSubmitHandler(event){
    event.preventDefault();
    paintingToDo(todoInput.value);
    clearInput(todoInput);
}

function removePaintingToDo(li){
    console.debug("li : ", li);
    //li.remove();  // me - 본인 스스로 자결하는 방법
    toDoListElement.removeChild(li);  //nicalas - 부모에서 자식을 지우는 방법
}

function changeToDoList(li){
    let newToDoList =  toDoList.filter(function(toDo){
        console.debug(`toDo.id type : ${typeof toDo.id}, li.id type: ${typeof li.id}`);
        return toDo.id !== parseInt(li.id);
    });
    toDoList = newToDoList;
}

function btnDelHandler(event){
    const btn = event.target;
    const li = btn.parentElement;
    removePaintingToDo(li);
    changeToDoList(li);
    saveLocalStorage();
}

function paintingToDo(toDoText){

    console.debug(`toDoText : ${toDoText}`);
    const li = document.createElement("li");
    const id = toDoList.length + 1;
    li.setAttribute("id", id);
    const span = document.createElement("span");
    span.textContent = toDoText;
    const btnDel =  document.createElement("button");
    btnDel.innerText = "X";
    btnDel.addEventListener("click", btnDelHandler);
    li.appendChild(span);
    li.appendChild(btnDel);
    toDoListElement.appendChild(li);
    const toDoObj =  {
        id : id,
        text :  toDoText
    };
    toDoList.push(toDoObj);
    saveLocalStorage();
}


function saveLocalStorage(){
    localStorage.setItem(CN_TODOLIST, JSON.stringify(toDoList));
}

function loadTodoList(){
    const toDoList = JSON.parse(localStorage.getItem(CN_TODOLIST));
    console.debug("todoList : ", toDoList);
    if(toDoList !== null){
        toDoList.forEach(function(toDo){
            console.debug("toDo:", toDo);
            paintingToDo(toDo.text);
        });

    }
}

function init(){
    loadTodoList();
    todoForm.addEventListener("submit", toDoSubmitHandler);

}

init();
