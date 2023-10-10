

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

export const completed = () => {
    const completedHTML = `
<div class="tasks">
<div class="loader-container">
    <div class="loader"></div>
</div>
</div>
<div class="log-out">
<button type="submit" class="log-out__button">Log out</button>
</div>
`
    const app = document.getElementById('app')
    app.innerHTML = completedHTML

    const loader = document.querySelector('.loader-container');
    const taskContainer = document.querySelector('.tasks');
    const logOutButton = document.querySelector('.log-out__button');
    const authorized = userAuthorized();

    const showTasks = async () => {
        if (authorized) {
            showLoader(loader);
            const allTasks = await getAllTasks();
            const completedTasks = getFilteredTasks(allTasks, 'completed');

            let taskHTML = '';

            completedTasks.forEach((task) => {
                taskHTML += createTaskHTML(task);
            });

            taskContainer.innerHTML = taskHTML;

            addDeleteButtonEventListeners(taskContainer);
            checkBoxesList(taskContainer);
        } else {
            logOutUser();
        }
    };

    logOutButton.addEventListener('click', () => {
        logOutUser();
    });
    showTasks();
}