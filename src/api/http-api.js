export const token = 'c17a5d7d5340433195fdc1a69018be9571794d62';

const makeRequest = async (url, method, headers = {}, body = null) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers,
            },
            body: body && JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Failed to ${method === 'DELETE' ? 'remove' : 'update'} ${url}`);
        }

        if (method === 'DELETE') {
            return;
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getDataFromTodoist = async (endpoint) => {
const url = `https://api.todoist.com/rest/v2/${endpoint}`
return makeRequest(url,"GET")
}

export const getAllProjects = async () => {
    return getDataFromTodoist('projects')
};

export const getAllTasks = async () => {
    return getDataFromTodoist('tasks')
};

export const markTaskAsCompleted = async (taskId) => {
        const url = `https://api.todoist.com/rest/v2/tasks/${taskId}/close`
        
        
};



export const removeTask = async (taskId) => {
    const url = `https://api.todoist.com/rest/v2/tasks/${taskId}`;
    await makeRequest(url, 'DELETE');
};


export const updateTask = async (isCompleted, id) => {
    const url = `https://api.todoist.com/rest/v2/tasks/${id}`;
    const headers = {
        'Content-Type': 'application/json',
    };
    const body = { priority: isCompleted };
    return makeRequest(url, 'POST', headers, body);
};

const fetchCreate = async (endpoint, body = null) => {
    try {
        const response = await fetch(`https://api.todoist.com/rest/v2/${endpoint}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: body && JSON.stringify(body),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        throw new Error(`Failed to create ${endpoint === 'tasks' ? 'task' : 'project'}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const createNewProject = async (projectName) => {
    const headers = {
        'Content-Type': 'application/json',
    }
    const body = {
        name: projectName
    }
    return fetchCreate('projects', headers, body)

};

export const createNewTask = async (taskContent, projectId) => {
    const body = {
        content: taskContent,
        project_id: projectId,
    }
    return fetchCreate('tasks', body)

};