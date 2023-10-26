import { Section } from '../components/Section.js';
import { navigateTo } from '../router/router.js';
import '../styles/todos.css'

import { logOutUser, showTasks } from '../utils/utils.js';


export const active = () => {

    const app = document.getElementById('app');
    app.innerHTML = Section();
    const navList = document.querySelectorAll('li')
    navList.forEach((item) => {
        item.addEventListener('click', () => navigateTo(`/${item.innerText}`))
    })
    const logOutButton = document.querySelector('.log-out__button');

    showTasks('active');

    logOutButton.addEventListener('click', () => {
        logOutUser();
    });

}