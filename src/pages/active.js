import { header } from '../components/header.js';
import { navigateTo } from '../router/router.js';
import '../styles/todos.css'

import { logOutUser, showTasks } from '../utils/utils.js';


export const active = () => {


    const activeHTML = `     
${header}
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
    const app = document.getElementById('app');
    app.innerHTML = activeHTML;
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