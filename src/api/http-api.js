export const token = 'c17a5d7d5340433195fdc1a69018be9571794d62';

export const getDataFromTodoist = async (endpoint) => {
    try {
        const response = await fetch(`https://api.todoist.com/rest/v2/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        throw new Error('Failed to fetch projects');
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAllProjects = async () => {
    return getDataFromTodoist('projects')
};

export const getAllTasks = async () => {
    return getDataFromTodoist('tasks')
};


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

export const createNewTask = async (taskContent, projectId) => {
    try {
        const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                content: taskContent,
                project_id: projectId,
            }),
        });
        if (response.ok) {
            const newTask = await response.json();
            return newTask;
        }
        throw new Error('Failed to create task');
    } catch (error) {
        console.error(error);
        throw error;
    }
};