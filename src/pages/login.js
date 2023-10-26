import '../styles/styles.css'
import { navigateTo } from '../router/router.js';
import { performAuthRequest } from '../api/http-api.js';
import { Form, FormLogin } from '../components/Forms';


const login = () => {



  const app = document.getElementById('app')

  app.innerHTML = FormLogin('LOGIN', { login: 'Login', signup: "Sign Up" })


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

    const data = await performAuthRequest(name, password, 'login')
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