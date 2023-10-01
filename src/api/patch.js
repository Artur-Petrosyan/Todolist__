import { token } from './token.js';

export const updateTask = async (isCompleted, id) => {
  try {
    const response = await fetch(`https://api.todoist.com/rest/v2/tasks/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        priority: isCompleted,
      }),
    });
    if (response.ok) {
      const updatedTask = await response.json();
      return updatedTask;
    }
    throw new Error('Failed to update task');
  } catch (error) {
    console.error(error);
    throw error;
  }
};