import { AllSection } from '../components/Section';
import { navigateTo } from '../router/router';

import { getAllProjects, getAllTasks, createNewProject, createNewTask } from '../api/http-api.js';
import {
    addDeleteButtonEventListeners,
    checkBoxesList, createTaskHTML,
    logOutUser,
    showLoader,
    userAuthorized,
} from '../utils/utils.js';

import '../styles/todos.css'


export const all = () => {

    const app = document.getElementById('app')
    app.innerHTML = AllSection()


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
                todoInput.addEventListener('keypress', async (e) => {
                    if (todoInput.value && todoProject) {
                        if (e.key === "Enter") {
                            await createNewTask(todoInput.value, todoProject.id);
                            todoInput.value = '';
                            showTasks();
                        }
                    }

                })
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

