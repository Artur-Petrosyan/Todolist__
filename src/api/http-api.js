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
    return makeRequest(url, "GET")
}

export const getAllProjects = async () => {
    return getDataFromTodoist('projects')
};

export const getAllTasks = async () => {
    return getDataFromTodoist('tasks')
};

export const markTaskAsCompleted = async (taskId) => {
    const url = `https://api.todoist.com/rest/v2/tasks/${taskId}/close`
    return makeRequest(url, "POST", { 'X-Request-Id': `${uuidgen()}` })
};

const fetchCreate = async (endpoint, body = null) => {
    const url = `https://api.todoist.com/rest/v2/${endpoint}`;
    return makeRequest(url, 'POST', { 'Content-Type': 'application/json' }, body);
}

export const createNewProject = async (projectName) => {
    const body = { name: projectName }
    return fetchCreate('projects', headers, body)
};

export const createNewTask = async (taskContent, projectId) => {
    const body = {
        content: taskContent,
        project_id: projectId,
    }
    return fetchCreate('tasks', body)
};

export const removeTask = async (taskId) => {
    const url = `https://api.todoist.com/rest/v2/tasks/${taskId}`;
    await makeRequest(url, 'DELETE');
};

export const updateTask = async (isCompleted, id) => {
    const url = `https://api.todoist.com/rest/v2/tasks/${id}`;
    const body = { priority: isCompleted };
    return makeRequest(url, 'POST', { 'Content-Type': 'application/json', }, body);
};




export const performAuthRequest = async (name, password, endpoint) => {
    const url = `http://localhost:3000/${endpoint}`;
    const body = JSON.stringify({
        name, password
    })
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body
    })
    const data = await response.json()
    return data
}

