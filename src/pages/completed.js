import { Section } from '../components/Section.js';
import { logOutUser, showTasks } from '../utils/utils.js';
import { navigateTo } from '../router/router.js';

import '../styles/todos.css'

export const completed = () => {

    const app = document.getElementById('app')
    app.innerHTML = Section()
    const logOutButton = document.querySelector('.log-out__button');
    const navList = document.querySelectorAll('li')
    navList.forEach((item) => {
        item.addEventListener('click', () => navigateTo(`/${item.innerText}`))
    })
    showTasks('completed')

    logOutButton.addEventListener('click', () => {
        logOutUser();
    });
}