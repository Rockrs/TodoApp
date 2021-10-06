//Selectors
const todoInput = document.querySelector('.input');
const todoButton = document.querySelector('.btn');
const todoUl = document.querySelector('.ul-list');
const todoSelect = document.querySelector('.select')

//Event Listeners
todoButton.addEventListener('click', addTaskFromInputTag);
todoUl.addEventListener('click', deleteCheckTask);
todoSelect.addEventListener('click', getTaskfromBackendAndDisplay);

//functions

//Add task to the UI and backend
function addTaskFromInputTag(event){
    event.preventDefault();
    taskToAdd = todoInput.value;

    //Find if Task to add is already present in backend
    fetchPost('/search_task', taskToAdd).then(response=>{
        return response.json()
    }).then(data =>{
        // If Task to add is a new task then add to backend and display in UI

        if (data['message'] !== 'Task Already Present'){
            //Adding Task in UI
            addTaskUI( todoInput, todoUl);

            //Add task to backend
            fetchPost("add_task", taskToAdd).then(response=>{
                return response.status;
            }).then(status=>{
                console.log(status);
            });
        }else{
            alert("Task Is already Present in Your to-do List")
        }
    }).catch(error=>{
        console.log(error);
    })
}

//Fetch Task from Backend and add in UI
function getTaskfromBackendAndDisplay(event){
    todoUl.innerHTML = '';

    if (event.target.value === 'pending'){
        fetchGet('get_pending_task').then(tasks=>{
            tasks['data'].forEach(element => {
                addTaskUI(todoInput, todoUl, element)
            });
        });
    }else if(event.target.value === 'completed'){
        fetchGet('get_completed_task').then(tasks=>{
            tasks['data'].forEach(element => {
                addTaskUI(todoInput, todoUl, element)
            });
        });
    }else{
        fetchGet('get_pending_task').then(tasks=>{
            tasks['data'].forEach(element => {
                addTaskUI(todoInput, todoUl, element)
            });
        });
        fetchGet('get_completed_task').then(tasks=>{
            tasks['data'].forEach(element => {
                addTaskUI(todoInput, todoUl, element)
            });
        });
    }
}


//Delete-Check Task
function deleteCheckTask(event){
    const parent = event.target.parentElement;

    //Delete
    if (event.target.classList[0] === 'trash-btn'){
        
        //Delete animation
        parent.classList.toggle("fall");
        parent.addEventListener('transitionend', function(){
            parent.remove();
        })

        //Delete Task from Backend
        fetchPost('delete_task', parent.firstChild.innerText).then(response=>{
            return response.status;
        }).then(status=>{
            console.log(status);
        });
    }

    //Check Mark
    if(event.target.classList[0] === 'complete-btn'){
        parent.classList.toggle('completed-div');

        //Add to Completed List
        fetchPost('complete_task', parent.firstChild.innerText).then(response=>{
            return response.status;
        }).then(status=>{
            console.log(status);
        });
    }
}