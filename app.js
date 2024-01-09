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
	  <button onclick='taskManager.editTask(${index})'>Edit</button>
	  <button onclick='taskManager.deleteTask(${index})'>Delete</button>
	  `;
	   taskList.appendChild(taskElement);
    
