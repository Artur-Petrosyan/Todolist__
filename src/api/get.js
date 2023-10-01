import { token } from './token.js';

export const getAllProjects = async () => {
  try {
    const response = await fetch('https://api.todoist.com/rest/v2/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const projects = await response.json();
      return projects;
    }
    throw new Error('Failed to fetch projects');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllTasks = async () => {
  try {
    const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const tasks = await response.json();
      return tasks;
    }
    throw new Error('Failed to fetch tasks');
  } catch (error) {
    console.error(error);
    throw error;
  }
};