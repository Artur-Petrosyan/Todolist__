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

