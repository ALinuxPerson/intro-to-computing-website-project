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
                        <button><a href="/index.html" class="navy">Home</a></button>
                    </li>
                    <li>
                        <button><a href="/pages/aboutus.html" class="navy">About Us</a></button>
                    </li>
                    <li>
                        <button><a href="/pages/interactive-menu.html" class="navy">Menu</a></button>
                    </li>
                    <li>
                        <button><a href="/pages/feedback.html" class="navy">Feedback</a></button>
                    </li>
                    <li>
                        <button><a href="/pages/FAQ.html" class="navy">FAQ</a></button>
                    </li>
                </ul>
            </nav>
        `
    }
}

customElements.define('nav-bar', NavigationBar)