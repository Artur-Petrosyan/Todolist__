import { getAllTasks } from './api/get.js';
import './styles/todos.css'
import {
  addDeleteButtonEventListeners,
  checkBoxesList,
  createTaskHTML,
  getFilteredTasks,
  logOutUser,
  showLoader,
  userAuthorized,
} from './utils/utils.js';

const loader = document.querySelector('.loader-container');
const taskContainer = document.querySelector('.tasks');
const logOutButton = document.querySelector('.log-out__button');
const authorized = userAuthorized();