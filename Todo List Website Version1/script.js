const itemForm = document.getElementById('form-input');
const taskInput = document.querySelector('#taskInput');
const addBtn = document.getElementById('addButton');
const todoList = document.getElementById('todoList');
const taskList = document.getElementById('item-list');
const taskFilter = document.getElementById('filter');
const clearBtn = document.getElementById('clear-btn');
const formBtn = itemForm.querySelector('button');

let isEditMode = false;

function displayItems() {
  const tasksFromStorage = getTaskFromStorage();
  tasksFromStorage.forEach((task) => {
    addTaskToDom(task);
  });
  checkUI();
}

function addTaskOnClick(e) {
  e.preventDefault();
  const newTask = taskInput.value;

  if (newTask === '') {
    alert('Please enter a new task');
    return;
  }

  if (isEditMode) {
    const itemToEdit = taskList.querySelector('.edit-mode');

    removeTaskFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfTaskExists(newTask)) {
      alert('That item already exists!');
      return;
    }
  }

  addTaskToDom(newTask);

  addTaskToStorage(newTask);

  checkUI();

  taskInput.value = '';
}

function addTaskToDom(item) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-magenta');
  li.appendChild(button);

  taskList.appendChild(li);
}

const createButton = (classes) => {
  const button = document.createElement('button');

  button.className = classes;
  const icon = createIcon('fa-solid fa-trash');
  button.appendChild(icon);
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement('icon');
  icon.className = classes;
  return icon;
};

function addTaskToStorage(task) {
  let taskFromStorage = getTaskFromStorage();

  taskFromStorage.push(task);

  localStorage.setItem('tasks', JSON.stringify(taskFromStorage));
}

function onClickDeleteIcon(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeTask(e.target.parentElement.parentElement);
  } else {
    setTaskToEdit(e.target);
  }
}

function checkIfTaskExists(item) {
  const itemsFromStorage = getTaskFromStorage();
  return itemsFromStorage.includes(item);
}

function setTaskToEdit(item) {
  isEditMode = true;

  taskList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = '#228B22';
  taskInput.value = item.textContent;
}

function removeTask(task) {
  task.remove();

  removeTaskFromStorage(task.textContent);

  checkUI();
}

function removeTaskFromStorage(taskText) {
  let tasksFromStorage = getTaskFromStorage();
  tasksFromStorage = tasksFromStorage.filter((i) => i !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));
}

function clearItems() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from localStorage
  localStorage.removeItem('tasks');

  checkUI();
}

function filterTasks(e) {
  const items = taskList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function getTaskFromStorage() {
  let taskFromStorage;
  if (localStorage.getItem('tasks') === null) {
    taskFromStorage = [];
  } else {
    taskFromStorage = JSON.parse(localStorage.getItem('tasks'));
  }
  return taskFromStorage;
}

function checkUI() {
  // taskInput.value = '';

  const items = taskList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.visibility = 'hidden';
    taskFilter.classList.remove('visible');
    taskFilter.classList.add('hidden');
  } else {
    clearBtn.style.visibility = 'visible';
    taskFilter.classList.remove('hidden');
    taskFilter.classList.add('visible');
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Task';
  formBtn.style.backgroundColor = '#57bf86';

  isEditMode = false;
}

addBtn.addEventListener('click', addTaskOnClick);
taskList.addEventListener('click', onClickDeleteIcon);
clearBtn.addEventListener('click', clearItems);
taskFilter.addEventListener('input', filterTasks);
document.addEventListener('DOMContentLoaded', displayItems);
