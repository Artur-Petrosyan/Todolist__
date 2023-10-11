import { active } from "../pages/active";
import { all } from "../pages/all";
import { completed } from "../pages/completed";
import login from "../pages/login";

const router = {
    routes: {
        '/': '/',
        '/all': '/all',
        '/active': '/active',
        '/completed': '/completed'
    },
    navigate(path) {
        window.location.hash = path;
    },
    handleRoute() {
        const path = window.location.hash || '/';

        switch (path) {
            case "/":
                login()
                break;
            case "#/all":
                all();
                break;
            case "#/completed":
                completed();
                break;
            case "#/active":
                active();
                break;
            default:
                app.innerHTML = '<h1>Page Not Found</h1>';
        }
    },
    start() {
        window.addEventListener('load', () => {
            router.handleRoute();
        });

        window.addEventListener('hashchange', () => {
            router.handleRoute();
        });
    }
}

export const navigateTo = (route) => {
    router.navigate(router.routes[route])
}



export default router;