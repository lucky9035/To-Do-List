let highPriorityTasks = [];
let lowPriorityTasks = [];
let today = new Date();


document.getElementById('addButton').addEventListener('click', function () {
    let taskInput = document.getElementById('taskInput');
    let deadlineInput = document.getElementById('deadlineInput');

    let newTask = {
        description: taskInput.value,
        deadline: deadlineInput.value,
        done: false,
    };

    let taskDeadline = new Date(deadlineInput.value);

    if (taskDeadline.getTime() <= today.getTime()) {
        highPriorityTasks.push(newTask);
    } else {
        lowPriorityTasks.push(newTask);
    }

    displayTasks();

    taskInput.value = '';
    deadlineInput.value = '';
});


function displayTasks() {
    let highPriorityContainer = document.getElementById('highPriorityContainer');
    let lowPriorityContainer = document.getElementById('lowPriorityContainer');
    highPriorityContainer.innerHTML = '';
    lowPriorityContainer.innerHTML = '';

    let today = new Date();

    highPriorityTasks.forEach(function (task, index) {
        let taskItem = createTaskElement(task, index, 'high-priority');
        highPriorityContainer.appendChild(taskItem);
    });

    lowPriorityTasks.forEach(function (task, index) {
        let taskItem = createTaskElement(task, index, 'low-priority');
        lowPriorityContainer.appendChild(taskItem);
    });
}

function createTaskElement(task, index, priorityClass) {
    let taskItem = document.createElement('div');
    taskItem.className = 'todo-item';
    taskItem.classList.add(priorityClass);

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;

    checkbox.addEventListener('change', function () {
        task.done = this.checked;
        displayTasks();
    });

    let label = document.createElement('label');
    label.textContent = task.description + ' (Deadline: ' + task.deadline + ')';
    if (task.done) {
        label.style.textDecoration = 'line-through';
    }

    let deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('data-index', index);
    deleteButton.addEventListener('click', function () {
        if (priorityClass === 'high-priority') {
            highPriorityTasks.splice(index, 1);
        } else {
            lowPriorityTasks.splice(index, 1);
        }
        displayTasks();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(deleteButton);

    return taskItem;
}