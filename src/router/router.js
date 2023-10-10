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
                loginPage()
                break;
            case "#/all":
                allPage();
                break;
            case "#/completed":
                complitedPage();
                break;
            case "#/active":
                activePage();
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


export default router;