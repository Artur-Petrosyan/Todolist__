import { createNewProject, createNewTask } from './api/post.js';
import { getAllProjects, getAllTasks } from './api/get.js';

import './styles/todos.css'

import {
  addDeleteButtonEventListeners,
  checkBoxesList, createTaskHTML,
  logOutUser, showLoader,
  userAuthorized,
} from './utils/utils.js';

const authorized = userAuthorized();

const taskContainer = document.querySelector('.tasks');
const todoInput = document.querySelector('.todo-container__input');
const createProjectButton = document.querySelector('.todo-container__newProject');
const addTodoButton = document.querySelector('.todo-container__button');
const loader = document.querySelector('.loader-container');
const logOutButton = document.querySelector('.log-out__button');

const getTasks = async () => {
  const allTasks = await getAllTasks();
  return allTasks;
};

const showTasks = async () => {
  const allTasks = await getTasks();
  const taskHTML = allTasks.map((task) => createTaskHTML(task)).join('');
  taskContainer.innerHTML = taskHTML;
  addDeleteButtonEventListeners(taskContainer);
  checkBoxesList(taskContainer);
  return allTasks;
};

const initilizeApp = async () => {
  showLoader(loader);
  if (authorized) {
    createProjectButton.addEventListener('click', () => {
      createNewProject('Todo Project');
    });
    const projects = await getAllProjects();
    const todoProject = projects.find((project) => project.name === 'Todo Project');
    if (todoProject) {
      addTodoButton.addEventListener('click', async () => {
        if (todoInput.value && todoProject) {
          await createNewTask(todoInput.value, todoProject.id);
          todoInput.value = '';
          showTasks();
        }
      });
    } else {
      console.error('Todo Project not found.');
    }
  } else {
    logOutUser();
  }
};

logOutButton.addEventListener('click', () => {
  logOutUser();
});
showTasks();

initilizeApp();