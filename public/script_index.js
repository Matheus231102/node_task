const addButton = document.getElementById('add_button')
const removeButton = document.getElementById('remove_button')

addButton.addEventListener('click', () => {    
    const taskInput = document.getElementById('taskInput')  
    const newTask = { task_name: taskInput.value }

    if (newTask.task_name === '') { return }

    fetch('http://localhost:9999/task_post', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
            'Content-Type': 'application/json'
        }}) 
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log(error)
        })    
})

document.getElementById('remove_button').addEventListener('click', function() {
    fetch('/tasks_delete', {
        method: 'DELETE'
    })
    .then(() => {
        location.reload()
    })
    .catch((error) => {
        console.log(error)
    })
})

function delete_task(task_value) {
    fetch('/task_delete', {
        method: 'POST',
        body: JSON.stringify({ "task_value": task_value }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        location.reload()
        console.log(task_value)
    })
    .catch((err) => {
        console.log(err)
    })
}

function edit_task(taskOldValue, taskNewValue) {

    fetch('/task_edit', {
        method: 'POST',
        body: JSON.stringify({
            "taskOldValue": taskOldValue,
            "taskNewValue": taskNewValue
    }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        location.reload()
        console.log(task_value)
    })
    .catch((err) => {
        console.log(err)
    })
}

