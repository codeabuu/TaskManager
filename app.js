class Task {
  constructor(name, description, duedate, status = false) {
    this.name = name;
    this.description = description;
    this.duedate = duedate;
    this.status = status;
  }
class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  addtask(task) {
    this.tasks.push(task);
    this.saveTasks();
  }
  editTask(index, updated) {
    this.tasks[index] = updated;
    this.saveTasks();
  }
  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }
  toggleStatus(index) {
    this.task[index].status = !this.tasks[index].status;
    this.saveTasks();
  }
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.renderTasks();
  }
  renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    this.tasks.forEach((task, index) => {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task');
      taskElement.innerHTML = `
          <strong>${task.name}</strong> - ${task.decription} -Due: ${task.duedate}
	  <input type ='checkbox'> ${task.status ? 'checked' : ''} onchange='taskManager.toggleStatus(${index})'>
	  <button onclick='taskManager.editTaskForm(${index})'>Edit</button>
	  <button onclick='taskManager.deleteTask(${index})'>Delete</button>
	  `;
	   taskList.appendChild(taskElement);
    });
  }
  editTaskForm(index) {
    const task = this.tasks[index];
    const taskName = prompt('Edit Task Name: ', task.name);
    const taskDesc = prompt('Edit Task Description: ', task.description);
    const duedate = prompt('Edit Due Date: ', task.duedate);

    if (taskName && taskDesc && duedate) {
      const updated = new Task(taskName, taskDesc, duedate, task.status);
      this.editTask(index, updated);
    }
  }
const taskManager = new TaskManager();

document.getElementId('addTaskBtn').addEventListener('click', () => {
  const taskName = document.getElementById('taskName').value;
  const taskDesc = document.getElementById('taskDesc').value;
  const duedate = document.geteElementById('duedate').value;
  
  if (taskName && duedate) {
    const newTask = new Task(taskName, taskDesc, duedate);
    taskManager.addtask(newTask);
  } else {
      alert('Task name and due date are required.');
  }
});

window.addEventListener('load', () => {
    taskManager.renderTasks();
});
    
