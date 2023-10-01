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
  
  export const createTaskHTML = (task) => {
    const newTask = `
      <div id="${task.id}" class="singleTask">
        <input class='completed' name='checkbox' type='checkbox' ${task.priority === 2 ? 'checked' : ''}>
        <p>${task.content}</p>
        <p class="delete" data-task-id="${task.id}">X</p>
      </div>
    `;
    return newTask;
  };
  
  export const checkBoxesList = async (taskContainer) => {
    const handleComplitedCheckboxClick = async (isCompleted, taskId) => {
      await updateTask(isCompleted, taskId);
    };
    const inputCheckBoxes = document.querySelectorAll('.completed');
    inputCheckBoxes.forEach((checkbox) => {
      const taskId = checkbox.parentNode.id;
  
      checkbox.addEventListener('click', (e) => {
        const isCompleted = Number(e.target.checked) + 1;
        const taskIsCompleted = document.getElementById(taskId);
        handleComplitedCheckboxClick(isCompleted, taskId);
        if (window.location.pathname !== '/all.html') {
          taskContainer.removeChild(taskIsCompleted);
        }
      });
    });
  };
  
  const handleDeleteButtonClick = async (taskId, taskContainer) => {
    await removeTask(taskId);
    const taskToRemove = document.getElementById(taskId);
    taskContainer.removeChild(taskToRemove);
  };