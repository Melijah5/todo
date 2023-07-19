const createTaskHtml = (id, name, description, assignedTo, status, dueDate) => {
  return `
    <li class="list-group-item" data-task-id="${id}">
      <div class="card">
        <div class="task">
          <h5>Task Name: ${name}</h5>
          <p>Task Description: ${description}</p>
          <p>Assigned to: ${assignedTo}</p>
          <p>Status: ${status}</p>
          <p>Due date: ${dueDate}</p>

          ${`${status}` === "DONE" ?
      ` <button class="btn btn-sm btn-success done-button" disabled id="makeAsDone" >Mark As Done</button>` :
      ` <button class="btn btn-sm btn-success done-button" id="makeAsDone" >Mark As Done</button>`
    }
          <button class="btn btn-sm btn-danger delete-button">Delete</button>
        </div>
      <div>
    </li>
    `;
};

class TaskManager {
  constructor(currentId = 1) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, assignedTo, status, dueDate) {

    //Push a new task into tasks array
    this.tasks.push({
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      status: status,
      dueDate: dueDate

    });

  }


  // Method to delete a task
  deleteTask(taskId) {
    //this.tasks = this.tasks.filter((task) => task.id !== taskId);
    let result = window.confirm("Do you want to delete this task?")
    // Create an empty array to store the new tasks
    const newTasks = [];

    if (result) {

      // Loop over the tasks
      for (let i = 0; i < this.tasks.length; i++) {
        // Get the current task
        const task = this.tasks[i];
        if (task.id !== taskId) {
          // Push the task into the newTasks array
          newTasks.push(task);
        }

      }

      // Set this.tasks to the newTasks array
      this.tasks = newTasks;
      this.render();
      this.save();
    }
  }



  //calling render
  render() {
    let tasksHtmlList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      let currentTask = this.tasks[i];

      let taskHtml = createTaskHtml(
        currentTask.id,
        currentTask.name,
        currentTask.description,
        currentTask.assignedTo,
        currentTask.status,
        currentTask.dueDate
      );

      tasksHtmlList.push(taskHtml);

    }
    let tasksHtml = tasksHtmlList.join('\n');

    document.getElementById('tasks-list').innerHTML = tasksHtml;
  }

  getTaskById(taskId) {

    let foundTask;
    this.tasks.forEach((getTask) => {
      const task = getTask;
      if (task.id === taskId) {
        foundTask = task;
      }
    });
    return foundTask;

  }

  // Method to save tasks to localStorage
  save() {
    // Convert tasks array to JSON string
    const tasksJson = JSON.stringify(this.tasks);
    // Store the JSON string in localStorage
    localStorage.setItem('tasks', tasksJson);

    // Convert currentId to string
    const currentIdString = String(this.currentId);
    // Store currentId in localStorage
    localStorage.setItem('currentId', currentIdString);
  }

  // Method to load tasks from localStorage
  load() {
    // Check if tasks are stored in localStorage
    if (localStorage.getItem('tasks')) {
      // Get the JSON string of tasks from localStorage
      const tasksJson = localStorage.getItem('tasks');
      // Convert the JSON string to an array and store it in this.tasks
      this.tasks = JSON.parse(tasksJson);
    }

    // Check if currentId is stored in localStorage
    if (localStorage.getItem('currentId')) {
      // Get the currentId from localStorage
      const currentIdString = localStorage.getItem('currentId');
      // Convert the currentId to a number and store it in this.currentId
      this.currentId = Number(currentIdString);
    }
  }


}

