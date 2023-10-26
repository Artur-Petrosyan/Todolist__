import '../styles/styles.css'
import { navigateTo } from '../router/router.js';
import { performAuthRequest } from '../api/http-api.js';


const login = () => {
  const loginHTML = ` 
  <h1 class="form__legend">LOGIN</h1>
  <form name="loginForm" id="form" class="form" method='post'>
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


  const button = document.querySelector('.form__button');
  const signUpBtn = document.querySelector('.form__button-signup')

  signUpBtn.addEventListener('click', (e) => {
    e.preventDefault()
    navigateTo('/signup')

  })






  button.addEventListener('click', async (e) => {
    e.preventDefault();
    const form = document.getElementById('form')

    const formData = new FormData(form)
    const password = formData.get('password')
    const name = formData.get('name')

    const data = await performAuthRequest(name, password,'login')
    const access = data.access
    if (access) {
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