class NavigationBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/css/nav.css">
            <nav>
                <ul>
                    <li>
                        <a href="/index.html" class="navy">Home</a>
                    </li>
                    <li>
                        <a href="/pages/aboutus.html" class="navy">About Us</a>
                    </li>
                    <li>
                        <a href="/pages/menu.html" class="navy">Menu</a>
                    </li>
                    <li>
                        <a href="/pages/feedback.html" class="navy">Feedback</a>
                    </li>
                    <li>
                        <a href="/pages/faq.html" class="navy">FAQ</a>
                    </li>
                </ul>
            </nav>
        `
    }
}

customElements.define('nav-bar', NavigationBar)