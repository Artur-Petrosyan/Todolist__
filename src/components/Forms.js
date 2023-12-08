export const FormLogin = (h1, children) => {
    const { login, signup } = children
    const formHTML = ` 
    <h1 class="form__legend">${h1}</h1>
    <form name="loginForm" id="form" class="form" method='post'>
        <input type="text" id="name" name='name' placeholder="User Name" class="form__input-name">
        <input type="password" id="password" name="password" placeholder="Password" class="form__input-password">
     <div class='form__buttons'>
     <button type="submit" class="form__button">${login}</button>
     <button type="submit" class="form__button-signup">${signup}</button>
     </div>
    </form>
        `
    return formHTML
}

export const FormSignup = (h1, children) => {
    const { login, signup } = children

    const formHTML = `
<h1 class="form__legend">${h1}</h1>
<form name="signUp" id="form" class="form">
    <input type="text" id="name" name='name' placeholder="User Name" class="form__input-name">
    <input type="password" id="password" name="password" placeholder="Password" class="form__input-password">
 <div class='form__buttons'>
 <button type="submit" class="form__button">${signup}</button>
 <button type="submit" class="form__button-login">
 ${login}
 </button>
 </div>
</form>
`
    return formHTML
}