import { header } from '../components/header.js';
import '../styles/todos.css'
import { logOutUser, showTasks, userAuthorized } from '../utils/utils.js';

export const completed = () => {
    const completedHTML = `
    ${header}
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
    const logOutButton = document.querySelector('.log-out__button');
    showTasks('completed')

    logOutButton.addEventListener('click', () => {
        logOutUser();
    });
}