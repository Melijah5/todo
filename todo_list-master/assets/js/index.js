const taskManager = new TaskManager();
taskManager.load();
taskManager.render();
const addBtn = document.querySelector("#addTaskBtn");

const taskForm = document.querySelector("#new-task-form");

const saveButton = document.getElementById("saveTaskBtn");
const updateButton = document.getElementById("updateTaskBtn");
// const makeAsDoneButton = document.getElementById("makeAsDone");
const deleteButton = document.getElementById("deleteTaskBtn");


const validFormFieldInput = (data) => {

    const addTaskInput = document.querySelector("#inputField");
    let newData = addTaskInput.value;
    if (newData == "") {
        alert("Please add the task name")
        return;
    }

}
addBtn.addEventListener("click", validFormFieldInput);

document.getElementById('new-task-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const newTaskname = document.getElementById("inputField");
    const newTaskdescription = document.getElementById("task-description");
    const newTaskassignedTo = document.getElementById("task-assigned-to");
    const newTaskstatus = document.getElementById("task-status");
    const newTaskdueDate = document.getElementById('task-due-date');


    //validation should be here

    const name = newTaskname.value;
    const description = newTaskdescription.value;
    const assignedTo = newTaskassignedTo.value;
    const status = newTaskstatus.value;
    const dueDate = newTaskdueDate.value;

    taskManager.addTask(name, description, assignedTo, status, dueDate);
    // save
    taskManager.save();

    taskManager.render();

    // Clear the form inputs
    document.getElementById('inputField').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-assigned-to').value = '';
    document.getElementById('task-status').value = '';
    document.getElementById('task-due-date').value = '';

});


// DOM Selector
const tasksList = document.querySelector("#tasks-list")

// Event listener for the click event on the tasks list
tasksList.addEventListener('click', function (event) {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement.parentElement;
        const taskId = parseInt(parentTask.dataset.taskId);
        const makeAsDone = taskManager.getTaskById(taskId);
        makeAsDone.status = 'DONE';
        taskManager.render();
        taskManager.save();
    }
});


tasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const parentTask = event.target.parentElement.parentElement.parentElement;
        const taskId = parseInt(parentTask.dataset.taskId);
        taskManager.deleteTask(taskId);
        taskManager.save();
        taskManager.render();
    }
});