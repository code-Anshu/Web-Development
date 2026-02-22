document.addEventListener("DOMContentLoaded", loadToDo());

function loadToDo()  // Load To-Do List in browser
{
    const todos = JSON.parse(localStorage.getItem("tasks")) || [];
    // const subTodos = JSON.parse(localStorage.getItem("subTasks")) || [];
    
    // const div = document.getElementsByClassName('sub-task-input');
    // div.style.display = "none";
    const ul = document.getElementById('to-do-task');
    // const subUl = document.getElementById('sub-task-ul');
    ul.innerHTML = ""; // Clear the current list

    todos.forEach((todoItem, index) => {
        const { text , check } = todoItem;
        const todoElement = createTodoElement(text, index, check);
        ul.appendChild(todoElement);

    });
    // subTodos.forEach((subItem, index) =>{
    //     const { superText, subText, check } = subItem;
    //     console.log("Sub item =c", subText);
    //     const subTaskElement = createSubTaskElement(subText,index,check);
    //     console.log(subTaskElement);
    //     subUl.append(subTaskElement);
        
    // });
}

const addBtn = document.getElementById('addTask-btn');
// console.log("Add btn : ", addBtn);
const inputBox = document.getElementById('inputTask');
// console.log("Input Box = ", inputBox);

addBtn.addEventListener("click", ()=>{
    if(inputBox.value === "")
    {
        alert("Please enter a task!");
        return;
    }
    addTask();
    inputBox.value = "";
});

inputBox.addEventListener("keydown", (e)=>{
    if(e.key == "Enter")
    {
        if(inputBox.value === "" )
        {
            alert("Please enter a task!");
            return;
        }
        addTask();
        inputBox.value = "";
    }
})

function addTask()  // Add a task into To-Do List
{
    const ul = document.getElementById('to-do-task');
    const todoVal = inputBox.value.trim();

    const todos = JSON.parse(localStorage.getItem("tasks")) || [];
    if(todos.length == 0)
    {
        const newTask = { text: todoVal, check: false};
        todos.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(todos));
    
        const todoElement = createTodoElement(todoVal, todos.length-1, false);
        console.log("len = ", todos.length);
        ul.appendChild(todoElement);

    }
    else
    {
        todos.forEach(toDoItem => {
            const { text, check } = toDoItem;
            console.log("tods: ", text);
            if(todoVal === text)
            {
                alert("Task is already present in the list!");
                return;
            }
            const newTask = { text: todoVal, check: false};
            todos.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(todos));
        
            const todoElement = createTodoElement(todoVal, todos.length-1, false);
            console.log("len = ", todos.length);
            ul.appendChild(todoElement);
        });

    }
}

function createTodoElement(text, index, check)  // Create the element for To-Do List
{
    const li = document.createElement('li');
    // li.textContent = text;
    li.setAttribute('id', 'task');
    li.className = check ? 'true' : 'false';

    const liDiv = document.createElement("div");
    liDiv.className = 'liTextContent';
    liDiv.textContent = text;
    // Expand logic on click
    liDiv.addEventListener("click", () => {
        toggleSubTaskInput(li, index);
    });

    const divControls = document.createElement('div');
    divControls.className = 'control-btns';

    const subCheckBtn = document.createElement('button');
    subCheckBtn.className = `check-btn-${index}`;
    subCheckBtn.innerHTML= `<i class="fa-solid fa-check"></i>` || '✔️';
    subCheckBtn.style.color = '#28a745';
    subCheckBtn.addEventListener("click", ()=> toggleCompletion(index));

    const subDelBtn = document.createElement('button');
    subDelBtn.className = `del-btn-${index}`;
    subDelBtn.innerHTML = ` <i class="fa-solid fa-xmark"></i>` || '❌';
    subDelBtn.style.color = '#dc3545';
    subDelBtn.addEventListener("click", () => deleteToDo(index));

    divControls.appendChild(subCheckBtn);
    divControls.appendChild(subDelBtn);

    liDiv.appendChild(divControls);
    li.appendChild(liDiv);

    const innerDiv = document.createElement('div');
    innerDiv.className = 'sub-task-input';
    const inputDiv = document.createElement("div");
    inputDiv.className = 'inputDiv';
    inputDiv.innerHTML = `<input type="text" id="sub-task" name="sub-task" placeholder="Enter a subtask"><button id="add-subtask-btn">+</button>`;
    innerDiv.appendChild(inputDiv);

    const innerUl = document.createElement("ul");
    innerUl.setAttribute('id','sub-task-ul');
    innerDiv.appendChild(innerUl);
    li.appendChild(innerDiv);

    return li;
}

function toggleCompletion(index)
{
    const todos = JSON.parse(localStorage.getItem("tasks")) || [];
    todos[index].check = !todos[index].check; // Toggle the check status

    localStorage.setItem("tasks", JSON.stringify(todos));
    loadToDo();  // Reload the list to update the UI
}

function deleteToDo(index)
{
    const todos = JSON.parse(localStorage.getItem("tasks")) || [];
    todos.splice(index, 1);  // Remove the todo item

    localStorage.setItem('tasks', JSON.stringify(todos));
    loadToDo();  // Reload the list
}

const delAllBtn = document.getElementById('delAll-btn');
delAllBtn.addEventListener("click", ()=>{

    // const todos = JSON.parse(localStorage.getItem("tasks")) || [];
    // const subTodos = JSON.parse(localStorage.getItem("subTasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([])); // Set an empty array
    localStorage.setItem("subTasks", JSON.stringify([])); // Set an empty array
    loadToDo(); // Clear the UI after deletion
});

/* Operation for inner list */

function toggleSubTaskInput(li, index) // Create a sub task list 
{
    const inputBox = li.querySelector('.sub-task-input');
    inputBox.style.display = inputBox.style.display === 'none' ? 'block' : 'none';
}

const subInput = document.getElementById("sub-task");
console.log("Input Box val = ", subInput);

const subTaskBtn = document.getElementById("add-subtask-btn");
subTaskBtn.addEventListener("click",()=>{
    if(subInput.value === " ")
    {
        alert("Please enter a sub task");
        return;
    }
    addSubTask();
    subInput.value = " ";
});

subInput.addEventListener("keydown",(e)=>{
    if(e.key === "Enter")
    {
        if(subInput.value === " ")
        {
            alert("Please enter a sub task");
            return;
        }
        addSubTask();
        subInput.value = " ";
    }
});

function addSubTask()
{
    const subDivUl = document.getElementById("sub-task-ul");
    // console.log("Sub div = ", subDivUl);

    const subTaskValue = subInput.value.trim();
    // console.log("Sub task value = ", subTaskValue);

    const todos = JSON.parse(localStorage.getItem("tasks")) || [];
    // console.log("Todos = ", todos);

    todos.forEach((superTask)=>{
        const { text, check } = superTask;
        console.log("Text = ", text);
        
        const subTodos = JSON.parse(localStorage.getItem("subTasks")) || [];
        console.log("Sub todos = ", subTodos);
        if(subTodos.length == 0)
        {
            const newSubTask = {superText: text, subText: subTaskValue, check: false };
            subTodos.push(newSubTask);
    
            localStorage.setItem("subTasks", JSON.stringify(subTodos));
            const subTaskElement = createSubTaskElement(subTaskValue, subTodos.length-1, false);
            console.log("Sub todo length = ",subTodos.length);
            subDivUl.appendChild(subTaskElement);
        }
        else
        {
            subTodos.forEach((subItem)=>{
                const {superText, subText, check } = subItem;
                console.log(" Sub item = ", subText);
    
                if(subTaskValue === subText)
                {
                    alert("Task is already present in the sub list");
                    return;
                }
                const newSubTask = {superText: text, subText: subTaskValue, check: false };
                subTodos.push(newSubTask);
        
                localStorage.setItem("subTasks", JSON.stringify(subTodos));
                const subTaskElement = createSubTaskElement(subTaskValue, subTodos.length-1, false);
                console.log("Sub todo length = ",subTodos.length);
                subDivUl.appendChild(subTaskElement);
            });
        }


    });
}

function createSubTaskElement(subText, index, check)
{
    const li = document.createElement("li");
    li.textContent = subText;
    li.setAttribute('id', 'subTask');
    li.className = check ? 'true' : 'false';

    const subDivControls = document.createElement("div");
    subDivControls.className = 'sub-control-btns';

    const subCheckBtn = document.createElement('button');
    subCheckBtn.className = `check-btn-${index}`;
    subCheckBtn.innerHTML= `<i class="fa-solid fa-check"></i>` || '✔️';
    subCheckBtn.style.color = '#28a745';
    subCheckBtn.addEventListener("click", ()=> subToggleCompletion(index));

    const subDelBtn = document.createElement('button');
    subDelBtn.className = `del-btn-${index}`;
    subDelBtn.innerHTML = ` <i class="fa-solid fa-xmark"></i>` || '❌';
    subDelBtn.style.color = '#dc3545';
    subDelBtn.addEventListener("click", () => subDeleteToDo(index));

    subDivControls.appendChild(subCheckBtn);
    subDivControls.appendChild(subDelBtn);

    li.appendChild(subDivControls);

    return li;
}

function subToggleCompletion(index)
{
    const subTodos = JSON.parse(localStorage.getItem("subTasks")) || [];
    subTodos[index].check = !subTodos[index].check; // Toggle the check status

    localStorage.setItem("subTasks", JSON.stringify(subTodos));
    loadToDo();  // Reload the list to update the UI
}

function subDeleteToDo(index)
{
    const subTodos = JSON.parse(localStorage.getItem("subTasks")) || [];
    subTodos.splice(index, 1);  // Remove the todo item

    localStorage.setItem('subTasks', JSON.stringify(subTodos));
    loadToDo();  // Reload the list
}