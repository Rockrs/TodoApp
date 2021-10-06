const addTaskUI = function(todoInput, todoUL, value){
        //Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo-div");
        
        //LI 
        const newTodo = document.createElement('li');
        newTodo.classList.add("todo-item");
        if (value == undefined){
                newTodo.innerText = todoInput.value;
        }else{
                newTodo.innerText = value;
        }
        todoDiv.appendChild(newTodo);
        
        //Clear Input Box
        todoInput.value = "";

        //Check Mark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class ="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoUl.appendChild(todoDiv);
}