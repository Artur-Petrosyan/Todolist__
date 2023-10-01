const user = {
    name: 'Artur',
    password: '1234',
  };

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

  export const getFilteredTasks = (allTasks, type) => {
    if (type === 'completed') {
      return allTasks.filter((item) => item.priority === 2);
    }
    if (type === 'active') {
      return allTasks.filter((item) => item.priority === 1);
    }
  
    return allTasks;
  };
  