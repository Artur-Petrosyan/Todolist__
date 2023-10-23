import { getInputVal } from '../utils/utils.js';
import '../styles/styles.css'
import { navigateTo } from '../router/router.js';


const login = () => {
  const loginHTML = ` 
  <h1 class="form__legend">LOGIN</h1>
  <form name="loginForm" id="form" class="form">
      <input type="text" id="name" name='name' placeholder="User Name" class="form__input-name">
      <input type="password" id="password" name="password" placeholder="Password" class="form__input-password">
   <div class='form__buttons'>
   <button type="submit" class="form__button">Login</button>
   <button type="submit" class="form__button-signup">Sign Up</button>
   </div>
  </form>
      `


  const app = document.getElementById('app')

  app.innerHTML = loginHTML


  const form = document.querySelector('.form');
  const button = document.querySelector('.form__button');
  const signUpBtn = document.querySelector('.form__button-signup')

  signUpBtn.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.assign('#/signUp')

  })

  button.addEventListener('click', (e) => {
    e.preventDefault();

    const user = getInputVal();

    if (user === 'authorized') {
      localStorage.setItem('authorized', true);
      navigateTo('/all')
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