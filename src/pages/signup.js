import { performAuthRequest } from "../api/http-api";
import { navigateTo } from "../router/router";

const signUp = () => {

    const signUpHTML = `
<h1 class="form__legend">SIGN UP</h1>
<form name="signUp" id="form" class="form">
    <input type="text" id="name" name='name' placeholder="User Name" class="form__input-name">
    <input type="password" id="password" name="password" placeholder="Password" class="form__input-password">
 <div class='form__buttons'>
 <button type="submit" class="form__button">SIGN UP</button>
 <button type="submit" class="form__button-login">
 Login
 </button>
 </div>
</form>
`

    const app = document.getElementById('app')

    app.innerHTML = signUpHTML;

    const loginButton = document.querySelector('.form__button-login')
    const signUpBuutton = document.querySelector('.form__button')
    const nameInput = document.querySelector('.form__input-name')
    const passwordInput = document.querySelector('.form__input-password')


    loginButton.addEventListener('click', (e) => {
        e.preventDefault()
        window.history.back()
    })




    signUpBuutton.addEventListener('click', async (e) => {
        e.preventDefault()
        const form = document.getElementById('form')
        const formData = new FormData(form)
        const name = formData.get('name')
        const password = formData.get('password')


        name.length < 4 ? nameInput.classList.add('name-error') : nameInput.classList.remove('name-error')
        password.length < 8 ? passwordInput.classList.add('name-error') : passwordInput.classList.remove('name-error')
     
        
        if (name.length > 4 && password.length > 7) {
            const response = await performAuthRequest(name, password, 'register')
            if (response.exists) {
                const spanError = document.querySelector('.form__error-span');
                if (!spanError) {
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'form__error-span';
                    errorSpan.textContent = 'This username already exists';
                    form.insertAdjacentElement('afterbegin', errorSpan);
                }
            } else {
                localStorage.setItem('authorized', true)
                navigateTo('/all')
                const errorSpan = document.querySelector('.form__error-span')
                if (errorSpan) {
                    return form.removeChild(errorSpan)

                }
            }
        }
    })
}


export default signUp;