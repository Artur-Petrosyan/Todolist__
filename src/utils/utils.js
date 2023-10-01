export const getInputVal = () => {
    const inputName = document.querySelector('.form__input-name');
    const inputPassword = document.querySelector('.form__input-password');
  
    const namePassword = {
      name: inputName.value,
      password: inputPassword.value,
    };
    const { name, password } = namePassword;
  
    if (user) {
      if (name === user.name && password === user.password) {
        return 'authorized';
      }
      inputName.value = '';
      inputPassword.value = '';
      return 'Incorrect login or password';
    }
  };