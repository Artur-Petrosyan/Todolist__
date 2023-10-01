import { token } from './token.js';

export const markTaskAsCompleted = async (taskId) => {
  try {
    const response = await fetch(`https://api.todoist.com/rest/v2/tasks/${taskId}/close`, {
      method: 'POST',
      headers: {
        'X-Request-Id': '$(uuidgen)',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to mark task as completed');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeTask = async (taskId) => {
  try {
    const response = await fetch(`https://api.todoist.com/rest/v2/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to remove task');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};