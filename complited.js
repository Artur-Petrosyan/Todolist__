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