import { getInputVal } from './utils/utils.js';
import './styles/styles.css'


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