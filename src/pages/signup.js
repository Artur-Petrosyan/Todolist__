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
    const passwordInput = document.querySelector('.form__input-name')
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
    })
    passwordInput.addEventListener('change', (e) => {
       userNewAccount = {
            ...userNewAccount, password: e.target.value
        }
    })


    signUpBuutton.addEventListener('click', async (e) => {
        e.preventDefault()
        console.log(userNewAccount);
    })


}


export default signUp;