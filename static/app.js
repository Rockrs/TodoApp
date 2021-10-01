const removeAllChildNodes = parent=> {
    if (parent === null){
        return;
    }

    children  = parent.childNodes;
    children.forEach(child=>{
        removeAllChildNodes(child);
    });

    parent.remove();
}

const clearOutputWindow = ()=>{
    const collection = document.querySelector('.display-result-div').childNodes;
    if (collection.length>0){
        collection.forEach(item=>{
            removeAllChildNodes(item);
        });
    }
}

// Fetch list of Pending Tasks
const list = document.getElementById('task-pending-btn').addEventListener('click', (event)=>{
    clearOutputWindow();
    document.getElementById('task-delete-btn').disabled = false;  

    const ul = document.createElement('ul');
    fetch(`${window.origin}/get-pending-task`,{
        method : 'GET',        
    }).then(response=>
        response.json()
    ).then(data=>{
        const tasks = data['data'];
        tasks.forEach(element => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');

            checkbox.setAttribute('type', 'checkbox')
            checkbox.setAttribute('class', 'task-checkbox')
            li.innerHTML = element;

            li.appendChild(checkbox);
            ul.appendChild(li);
        });

        document.querySelector('.display-result-div').appendChild(ul);  
    }).catch(error=>{
        alert(error);
    });
});

// Add tasks to my todo list
const add = document.getElementById('task-add-btn').addEventListener('click', (event)=>{
    clearOutputWindow();
    document.getElementById('task-delete-btn').disabled = true;

    input = document.createElement('input');
    input.setAttribute('placeholder', 'Add Task Desc');
    
    document.querySelector('.display-result-div').appendChild(input);
    input.addEventListener('change', (event)=>{
        fetch(`${window.origin}/add_task`, {
            method : "POST",
            credentials : 'include',
            body : JSON.stringify(event.target.value),
            cache : 'no-cache',
            headers : new Headers({
                'content-type' : 'application/json'
            })
        }).then(response => response.status).then(status =>{
            alert("Task Added Successfully");
        }).catch(error=>{
            alert(error);
        });
    });
    });

// Delete Tasks
const del = document.getElementById('task-delete-btn').addEventListener('click', (event)=>{
    const allTasks = Array.from(document.querySelectorAll('.display-result-div > ul > li'));
    const taskTODelete = allTasks.filter((task)=>{
        if (task.children[0].checked === true){
            return true;
        }
    }).reduce((previousValue, currentValue)=>{
        return previousValue.concat(currentValue.innerText);
    }, [])
    
    fetch(`${window.origin}/delete_task`, {
        method : 'POST',
        credentials : 'include',
        cache : 'no-cache',
        body : JSON.stringify(taskTODelete),
        headers : new Headers({
          'content-type' : 'application/json' 
        })
    }).then(response => response.status).then(status => {
        alert(`Task Deletion Successfull with ${status}`);
        document.getElementById('task-pending-btn').click();
    }).catch(error=>{
        console.log(error);
    })
})