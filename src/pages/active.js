import { getAllTasks } from '../api/get.js';
import '../styles/todos.css'

import {
    addDeleteButtonEventListeners,
    checkBoxesList,
    createTaskHTML,
    getFilteredTasks,
    hideLoader,
    logOutUser,
    showLoader,
    userAuthorized,
} from '../utils/utils.js';


export const active = () => {
    const activeHTML = `     
    <div class='nav'>
    <div class="nav__all-tasks nav__block">
        <a href="./all.html">All Tasks</a>
    </div>
    <div class="nav__active nav__block">
        <a href="./complited.html">Completed</a>
    </div>
    <div class="nav__complited nav__block">
        <a href="./active.html">Active</a>
    </div>

</div>
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
    app.innerHTML = activeHTML
    const loader = document.querySelector('.loader-container');
    const taskContainer = document.querySelector('.tasks');
    const logOutButton = document.querySelector('.log-out__button');
    const authorized = userAuthorized();

    const showTasks = async () => {
        if (authorized) {
            showLoader(loader);
            const allTasks = await getAllTasks();
            const completedTasks = getFilteredTasks(allTasks, 'active');

            let taskHTML = '';

            completedTasks.forEach((task) => {
                taskHTML += createTaskHTML(task);
            });

            taskContainer.innerHTML = taskHTML;
            checkBoxesList(taskContainer);
            addDeleteButtonEventListeners(taskContainer);
            hideLoader(loader);
        } else {
            logOutUser();
        }
    };

    logOutButton.addEventListener('click', () => {
        logOutUser();
    });

    showTasks();
}