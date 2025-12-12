class NavigationBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const basePath = window.location.pathname.includes('/pages/') ? '..' : '.';
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${basePath}/css/nav.css">
            <nav>
                <ul>
                    <li>
                        <a href="${basePath}/index.html" class="navy">Home</a>
                    </li>
                    <li>
                        <a href="${basePath}/pages/aboutus.html" class="navy">About Us</a>
                    </li>
                    <li>
                        <a href="${basePath}/pages/menu.html" class="navy">Menu</a>
                    </li>
                    <li>
                        <a href="${basePath}/pages/feedback.html" class="navy">Feedback</a>
                    </li>
                    <li>
                        <a href="${basePath}/pages/faq.html" class="navy">FAQ</a>
                    </li>
                </ul>
            </nav>
        `
    }
}

customElements.define('nav-bar', NavigationBar)