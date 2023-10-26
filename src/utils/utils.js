import { getAllTasks, removeTask, updateTask } from '../api/http-api.js';

export const getFilteredTasks = (allTasks, type) => {
    if (type === 'completed') {
        return allTasks.filter((item) => item.priority === 2);
    }
    if (type === 'active') {
        return allTasks.filter((item) => item.priority === 1);
    }

    return allTasks;
};

export const createTaskHTML = (task) => {
    const newTask = `
      <div id="${task.id}" class="singleTask">
        <input class='completed' name='checkbox' type='checkbox' ${task.priority === 2 ? 'checked' : ''}>
        <p>${task.content}</p>
        <p class="delete" data-task-id="${task.id}">X</p>
      </div>
    `;
    return newTask;
};

export const checkBoxesList = async (taskContainer) => {
    const handleComplitedCheckboxClick = async (isCompleted, taskId) => {
        await updateTask(isCompleted, taskId);
    };
    const inputCheckBoxes = document.querySelectorAll('.completed');
    inputCheckBoxes.forEach((checkbox) => {
        const taskId = checkbox.parentNode.id;

        checkbox.addEventListener('click', (e) => {
            const isCompleted = Number(e.target.checked) + 1;
            const taskIsCompleted = document.getElementById(taskId);
            handleComplitedCheckboxClick(isCompleted, taskId);
            if (window.location.hash !== '#/all') {
                taskContainer.removeChild(taskIsCompleted);
            }
        });
    });
};

const handleDeleteButtonClick = async (taskId, taskContainer) => {
    await removeTask(taskId);
    const taskToRemove = document.getElementById(taskId);
    taskContainer.removeChild(taskToRemove);
};

export const addDeleteButtonEventListeners = (taskContainer) => {
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((button) => {
        const taskId = button.getAttribute('data-task-id');
        button.addEventListener('click', () => {
            handleDeleteButtonClick(taskId, taskContainer);
        });
    });
};

export const logOutUser = () => {
    localStorage.removeItem('authorized');
    window.location.assign('/');
};
export const userAuthorized = () => Boolean(localStorage.getItem('authorized'));

export const showLoader = (loader) => loader.classList.add('loader-container__display');


export const showTasks = async (type) => {
    const loader = document.querySelector('.loader-container');
    const taskContainer = document.querySelector('.tasks');

    const authorized = userAuthorized()
    if (authorized) {
        showLoader(loader);
        const allTasks = await getAllTasks();
        const completedTasks = getFilteredTasks(allTasks, type);

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


export const hideLoader = (loader) => loader.classList.remove('loader-container__display');

