// MVC (Model): Task Management using localStorage
function getTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    return tasks;
}

tasks = []
function addTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskIndex) {
    const tasks = getTasks();
    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// MVC (Controller): Handles interaction between Model and View
function handleAddTask() {
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;

    if (taskName && dueDate) {
        const task = { name: taskName, dueDate: dueDate };
        addTask(task);
        renderTasks();
        document.getElementById('taskName').value = '';
        document.getElementById('dueDate').value = '';
    }
}

function handleDeleteTask(taskIndex) {
    deleteTask(taskIndex);
    renderTasks();
}

// MVC (View): Handles displaying tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = getTasks();
    tasks.forEach(function(task, index) {
        const li = document.createElement('li');
        li.classList.add('flex', 'justify-between', 'items-center', 'bg-white', 'p-4', 'rounded', 'shadow-sm','border', 'border-red-300');

        li.innerHTML = `
            <div>
                <span class="font-semibold">${task.name} </span>
            </div>
            <div class="flex gap-20 items-center">
                <span class="text-gray-500 text-lg">Due on: ${task.dueDate}</span>
                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" style="background-color:#ff6900;" onclick="handleDeleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}


document.getElementById('addTask').addEventListener('click', handleAddTask);


renderTasks();