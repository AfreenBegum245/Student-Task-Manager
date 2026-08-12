let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    // Update statistics
    let totalTasks = document.getElementById("totalTasks");
    let completedTasks = document.getElementById("completedTasks");
    let pendingTasks = document.getElementById("pendingTasks");

    totalTasks.textContent = tasks.length;

    let completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    completedTasks.textContent = completed;
    pendingTasks.textContent = tasks.length - completed;

    // Display tasks
    tasks.forEach(function(task, index) {

        let listItem = document.createElement("li");

        let taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;

        if (task.completed) {
            taskSpan.style.textDecoration = "line-through";
            taskSpan.style.color = "gray";
        }

        // Complete button
        let completeButton = document.createElement("button");
        completeButton.textContent = "✓";

        completeButton.onclick = function() {
            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks();
        };

        // Edit button
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.onclick = function() {

            let newTask = prompt(
                "Edit your task:",
                task.text
            );

            if (newTask !== null && newTask.trim() !== "") {

                tasks[index].text = newTask.trim();

                saveTasks();
                displayTasks();
            }
        };

        // Delete button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function() {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        };

        listItem.appendChild(taskSpan);
        listItem.appendChild(completeButton);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

// Add task
function addTask() {

    let taskInput = document.getElementById("taskInput");

    let taskText = taskInput.value.trim();

    if (taskText === "") {

        alert("Please enter a task!");

        return;
    }

    let newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
}

// Clear all tasks
function clearAllTasks() {

    if (tasks.length === 0) {

        alert("There are no tasks to clear.");

        return;
    }

    let confirmClear = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (confirmClear) {

        tasks = [];

        saveTasks();
        displayTasks();
    }
}

// Load saved tasks
displayTasks();