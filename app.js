class Task {
    constructor(name, description, dueDate, status = false) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
    }

    editTask(index, updatedTask) {
        this.tasks[index] = updatedTask;
        this.saveTasks();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
    }

    toggleStatus(index) {
        this.tasks[index].status = !this.tasks[index].status;
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
                <strong>${task.name}</strong> - ${task.description} - Due: ${task.dueDate}
                <input type="checkbox" ${task.status ? 'checked' : ''} onchange="taskManager.toggleStatus(${index})">
                <button onclick="taskManager.editTaskForm(${index})">Edit</button>
                <button onclick="taskManager.deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(taskElement);
        });
    }

    editTaskForm(index) {
        const task = this.tasks[index];
        const taskName = prompt('Edit Task Name:', task.name);
        const taskDescription = prompt('Edit Task Description:', task.description);
        const dueDate = prompt('Edit Due Date:', task.dueDate);

        if (taskName && taskDescription && dueDate) {
            const updatedTask = new Task(taskName, taskDescription, dueDate, task.status);
            this.editTask(index, updatedTask);
        }
    }
}

const taskManager = new TaskManager();

document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;

    if (taskName && dueDate) {
        const newTask = new Task(taskName, taskDescription, dueDate);
        taskManager.addTask(newTask);
    } else {
        alert('Task name and due date are required.');
    }
});

window.addEventListener('load', () => {
    taskManager.renderTasks();
});
