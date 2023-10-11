import '../styles/todos.css'

import { getAllProjects, getAllTasks, createNewProject, createNewTask } from '../api/http-api.js';

import {
    addDeleteButtonEventListeners, checkBoxesList,
    createTaskHTML, logOutUser, showLoader, userAuthorized,
} from '../utils/utils.js';
import { header } from '../components/header.js';
import { navigateTo } from '../router/router';

export const all = () => {
    const allHTML = `
${header}
<div class="todo-container">
<input type="text" class="todo-container__input">
<button class="todo-container__button">Add Todo</button>
<button type="button" class="todo-container__newProject">Create a new project</button>
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
    app.innerHTML = allHTML


    const taskContainer = document.querySelector('.tasks');
    const todoInput = document.querySelector('.todo-container__input');
    const createProjectButton = document.querySelector('.todo-container__newProject');
    const addTodoButton = document.querySelector('.todo-container__button');
    const loader = document.querySelector('.loader-container');
    const logOutButton = document.querySelector('.log-out__button');
    const navList = document.querySelectorAll('li')

    navList.forEach((item) => {
        item.addEventListener('click', () => navigateTo(`/${item.innerText}`))
    })
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
        if (userAuthorized()) {
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
}

