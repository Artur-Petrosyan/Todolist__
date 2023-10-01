import { token } from './token.js';

export const createNewProject = async (projectName) => {
  try {
    const response = await fetch('https://api.todoist.com/rest/v2/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': '$(uuidgen)',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: projectName,
      }),
    });

    if (response.ok) {
      const newProject = await response.json();
      return newProject;
    }
    throw new Error('Failed to create project');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

