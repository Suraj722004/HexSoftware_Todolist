// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add Task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    saveTask(taskText);
    taskInput.value = '';
  }
});

// Add task to the list
function addTask(taskText, completed = false) {
  const li = document.createElement('li');
  li.className = `task ${completed ? 'completed' : ''}`;
  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    </div>
  `;

  // Complete task event
  li.querySelector('.complete-btn').addEventListener('click', () => {
    li.classList.toggle('completed');
    updateTaskStatus(taskText, li.classList.contains('completed'));
  });

  // Delete task event
  li.querySelector('.delete-btn').addEventListener('click', () => {
    taskList.removeChild(li);
    deleteTask(taskText);
  });

  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText) {
  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from localStorage
function deleteTask(taskText) {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task status in localStorage
function updateTaskStatus(taskText, completed) {
  const tasks = getTasks();
  const task = tasks.find(task => task.text === taskText);
  if (task) task.completed = completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Load tasks on page load
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => addTask(task.text, task.completed));
}
