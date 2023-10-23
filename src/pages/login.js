import '../styles/styles.css'
import { navigateTo } from '../router/router.js';
import { getUsers } from '../api/http-api.js';


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


  const form = document.querySelector('.form');
  const button = document.querySelector('.form__button');
  const signUpBtn = document.querySelector('.form__button-signup')

  signUpBtn.addEventListener('click', (e) => {
    e.preventDefault()
    navigateTo('/signup')

  })


  const inputName = document.querySelector('.form__input-name');
  const inputPassword = document.querySelector('.form__input-password');



  let namePassword = {
    name: '',
    password: ''
  };

  inputName.addEventListener('change', (e) => {
    return namePassword = {
      ...namePassword, name: e.target.value
    }
  })
  inputPassword.addEventListener('change', (e) => {
    return namePassword = {
      ...namePassword, password: e.target.value
    }
  })

  button.addEventListener('click', async (e) => {
    e.preventDefault();


    const { name, password } = namePassword;
    const data = await getUsers(name, password)
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