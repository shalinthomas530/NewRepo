// TASK: import helper functions from utils
// TASK: import initialData


/*************************************************************************************************************************************************
 * FIX BUGS!!!
 * **********************************************************************************************************************************************/

// Function checks if local storage already has data, if not it loads initialData to localStorage
import { getTasks, createNewTask, patchTask, putTask, deleteTask } from './utils/taskFunctions.js';
import initialData from './initialData.js';
function initializeData() {
  if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify(initialData)); 
    localStorage.setItem('showSideBar', 'true');
  } else {
    console.log('Data already exists in localStorage');
  }
}

// TASK: Get elements from the DOM
const elements = {
  headerBoardName: document.getElementById('header-board-name'),
  boardsContainer: document.getElementById("boards-nav-links-div"),
  columnDivs: document.querySelectorAll('.column-div'),
  filterDiv: document.getElementById('filterDiv'),
  createNewTaskBtn: document.getElementById('add-new-task-btn'),
  editTaskModal: document.querySelector('.edit-task-modal-window'),
  modalWindow: document.getElementById('new-task-modal-window'),
  hideSideBarBtn: document.getElementById('hide-side-bar-btn'),
  showSideBarBtn: document.getElementById('show-side-bar-btn'),
  themeSwitch: document.getElementById('switch'),
  cancelEditBtn: document.getElementById('cancel-edit-btn'),
  saveTaskChangesBtn: document.getElementById('save-task-changes-btn'),
  deleteTaskBtn: document.getElementById('delete-task-btn'),
};

let activeBoard = "";

// Extracts unique board names from tasks
// TASK: FIX BUGS
function fetchAndDisplayBoardsAndTasks() {
  const tasks = getTasks();
  const boards = [...new Set(tasks.map(task => task.board).filter(Boolean))];
  displayBoards(boards);
  if (boards.length > 0) {
    const localStorageBoard = JSON.parse(localStorage.getItem("activeBoard"));
    activeBoard = localStorageBoard ||  boards[0]; 
    elements.headerBoardName.textContent = activeBoard;
    styleActiveBoard(activeBoard);
    refreshTasksUI();
  }
}

// Creates different boards in the DOM
// TASK: Fix Bugs
function displayBoards(boards) {
  const boardsContainer = elements.boardsContainer;
  boardsContainer.innerHTML = ''; // Clears the container
  boards.forEach(board => {
    const boardElement = document.createElement("button");
    boardElement.textContent = board;
    boardElement.classList.add("board-btn");
    boardElement.addEventListener('click', () => { 
      elements.headerBoardName.textContent = board;
      filterAndDisplayTasksByBoard(board);
      activeBoard = board //assigns active board
      localStorage.setItem("activeBoard", JSON.stringify(activeBoard));
      styleActiveBoard(activeBoard);
    });
    boardsContainer.appendChild(boardElement);
  });
}

// Filters tasks corresponding to the board name and displays them on the DOM.
// TASK: Fix Bugs
function filterAndDisplayTasksByBoard(boardName) {
  const tasks = getTasks(); // Fetch tasks from a simulated local storage function
  const filteredTasks = tasks.filter(task => task.board === boardName);

  // Ensure the column titles are set outside of this function or correctly initialized before this function runs

  elements.columnDivs.forEach(column => {
    const status = column.getAttribute("data-status");
    // Reset column content while preserving the column title
    column.innerHTML = `<div class="column-head-div">
                          <span class="dot" id="${status}-dot"></span>
                          <h4 class="columnHeader">${status.toUpperCase()}</h4>
                        </div>`;

    const tasksContainer = document.createElement("div");
    column.appendChild(tasksContainer);

    filteredTasks.filter(task => task.status === status).forEach(task => { 
      const taskElement = document.createElement("div");
      taskElement.classList.add("task-div");
      taskElement.textContent = task.title;
      taskElement.setAttribute('data-task-id', task.id);
      taskElement.addEventListener('click', () => openEditTaskModal(task));
      tasksContainer.appendChild(taskElement);
      // Listen for a click event on each task and open a modal
      });
    });
}


function refreshTasksUI() {
  filterAndDisplayTasksByBoard(activeBoard);
}

// Styles the active board by adding an active class
// TASK: Fix Bugs
function styleActiveBoard(boardName) {
  document.querySelectorAll('.board-btn').foreach(btn => { 
    if(btn.textContent === boardName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active'); 
    }
  });
}


function addTaskToUI(task) {
  const column = document.querySelector('.column-div[data-status="${task.status}"]'); 
  if (!column) {
    console.error(`Column not found for status: ${task.status}`);
    return;
  }

  let tasksContainer = column.querySelector('.tasks-container');
  if (!tasksContainer) {
    tasksContainer = document.createElement('div');
    tasksContainer.className = 'tasks-container';
    column.appendChild(tasksContainer);
  }

  const taskElement = document.createElement('div');
  taskElement.className = 'task-div';
  taskElement.textContent = task.title; // Modify as needed
  taskElement.setAttribute('data-task-id', task.id);
  taskElement.addEventListener('click', () => openEditTaskModal(task));
  
  tasksContainer.appendChild(); 
}



function setupEventListeners() {
  // Cancel editing task event listener
  elements.cancelEditBtn.addEventListener('click', () => toggleModal(false, elements.editTaskModal));
  elements.createNewTaskBtn.addEventListener('click', () => {
    toggleModal(true, elements.modalWindow);
  });
  // Cancel adding new task event listener;
  elements.modalWindow.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = {
      title: document.getElementById('title-input').Value,
      description: document.getElementById('desc-input').value,
      status: document.getElementById('select-status').value,
      board: activeBoard
    };
    const newTask = createNewTask(task);
    if (newTask) {
      addTaskToUI(newTask);
      toggleModal(false, elements.modalWindow);
      refreshTasksUI();
    }
  });
  // Clicking outside the modal to close it
  // Show sidebar event listener
  elements.hideSideBarBtn.addEventListener('click', () => toggleSidebar(false));
  elements.showSideBarBtn.addEventListener('click', () => toggleSidebar(true));
  elements.themeSwitch.addEventListener('change', toggleTheme);
  elements.saveTaskChangesBtn.addEventListener('click', () => {
    const taskId = elements.editTaskModal.querySelector('.task-div').getAttribute('data-task-id');
    saveTaskChanges(taskId);
  });// Theme switch event listener
  elements.deleteTaskBtn.addEventListener('click', () => {
    const taskId = elements.editTaskModal.querySelector('.task-div').getAttribute('data-task-id');
    deleteTask(taskId);
    toggleModal(false, elements.editTaskModal);
    refreshTasksUI();
  });// Show Add New Task Modal event listener // Add new task form submission event listener
}
function openEditTaskModal(task) {
  elements.editTaskModal.querySelector('#edit-task-title-input').value = task.title;
  elements.editTaskModal.querySelector('#edit-task-desc-input').value = task.description;
  elements.editTaskModal.querySelector('#edit-select-status').value = task.status;
  toggleModal(true, elements.editTaskModal);
}

function saveTaskChanges(taskId) {
  const updatedTask = {
    title: elements.editTaskModal.querySelector('#edit-task-title-input').value,
    description: elements.editTaskModal.querySelector('#edit-task-desc-input').value,
    status: elements.editTaskModal.querySelector('#edit-select-status').value,
    board: activeBoard
  };
  putTask(taskId, updatedTask);
  toggleModal(false, elements.editTaskModal);
  refreshTasksUI();
}

// Toggles tasks modal
// Task: Fix bugs
function toggleModal(show, modal) {
  modal.style.display = show ? 'block' : 'none'; 
}/*************************************************************************************************************************************************
 * COMPLETE FUNCTION CODE
 * **********************************************************************************************************************************************/
  //Assign user input to the task object
function toggleSidebar(show) {
  const sidebar = document.getElementById('side-bar-div');
  sidebar.style.display = show ? 'block' : 'none';
}

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  localStorage.setItem('light-theme', document.body.classList.contains('light-theme') ? 'enabled' : 'disabled');
 
}

  // Get new user inputs
  

  // Create an object with the updated task details


  // Update task using a hlper functoin
 

  // Close the modal and refresh the UI to reflect the changes

/*************************************************************************************************************************************************/
// init is called after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeData();
  setupEventListeners();
  fetchAndDisplayBoardsAndTasks();
});