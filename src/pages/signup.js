import { createUser } from "../api/http-api";
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
    let userNewAccount = {
        name: '',
        password: ''
    }

    loginButton.addEventListener('click', (e) => {
        e.preventDefault()
        window.history.back()
    })

    nameInput.addEventListener('change', (e) => {
        userNewAccount = {
            ...userNewAccount, name: e.target.value
        }
        return userNewAccount
    })
    passwordInput.addEventListener('change', (e) => {
        userNewAccount = {
            ...userNewAccount, password: e.target.value
        }
        return userNewAccount
    })


    signUpBuutton.addEventListener('click', async (e) => {
        e.preventDefault()
        const { name, password } = userNewAccount
        if (name.length < 4) {
            nameInput.classList.add('name-error')
        } else {
            nameInput.classList.remove('name-error')
        }
        if (password.length < 8) {
            passwordInput.classList.add('name-error')
        } else {
            passwordInput.classList.remove('name-error')
        }
        if (name.length > 4 && password.length > 7) {
            const response = await createUser(name, password)
            if (response.exists === true) {
                const spanError = document.querySelector('.form__error-span');
                if (!spanError) {
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'form__error-span';
                    errorSpan.textContent = 'This username already exists';
                    form.insertAdjacentElement('afterbegin', errorSpan);
                }
            }
        }
    })


}


export default signUp;