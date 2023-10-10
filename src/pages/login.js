import { getInputVal } from '../utils/utils.js';
import '../styles/styles.css'


const login = () => {
  const loginHTML = ` 
  <div class="container">
  <h1 class="form__legend">LOGIN</h1>
  <form name="loginForm" id="form" class="form">
      <input type="text" id="name" name='name' placeholder="User Name" class="form__input-name">
      <input type="password" id="password" name="password" placeholder="Password" class="form__input-password">
      <button type="submit" class="form__button">Login</button>
      <button type="submit" class="form__button-signup">
          <a type="submit" href="https://todoist.com/auth/login">Sign up</a>
      </button>
  </form>
</div>
      `
  const app = document.getElementById('app')

  app.innerHTML = loginHTML


  const form = document.querySelector('.form');
  const button = document.querySelector('.form__button');

  if (window.location.pathname === '/') {
    localStorage.removeItem('token');
  }

  button.addEventListener('click', (e) => {
    e.preventDefault();

    const user = getInputVal();

    if (user === 'authorized') {
      localStorage.setItem('authorized', true);
      window.location.assign('/all.html');
    } else {
      const spanError = document.querySelector('.form__error-span');

      if (!spanError) {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'form__error-span';
        errorSpan.textContent = 'Incorrect login or password';
        form.insertAdjacentElement('afterbegin', errorSpan);
      }
    }
  });
}

export default login;