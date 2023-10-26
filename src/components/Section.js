import { header } from "./header"

export const Section = () => {
    const HTML = `
    ${header}
<div class="tasks">
<div class="loader-container">
    <div class="loader"></div>
</div>
</div>
<div class="log-out">
<button type="submit" class="log-out__button">Log out</button>
</div>
`
    return HTML
}


export const AllSection = () => {
    const HTML = `${header}
    <div class="todo-container">
    <input type="text" class="todo-container__input">
    <button class="todo-container__button">Add Todo</button>
    <button type="button" class="todo-container__newProject">Create a new project</button>
    </div>
    
    <div class="tasks">
    <div class="loader-container">
        <div class="loader"></div>
    </div>
    </div>
    <div class="log-out">
    <button type="submit" class="log-out__button">Log out</button>
    </div>`

    return HTML
}
