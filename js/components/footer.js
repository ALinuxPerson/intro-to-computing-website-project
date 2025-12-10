class FooterSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
        this.loadLeaflet().then(() => {
            this.initMap();
        });
        this.initYear();
        this.initModal();
        this.initPrivacyModal();
    }

    loadLeaflet() {
        return new Promise((resolve, reject) => {
            if (typeof L !== 'undefined') {
                resolve()
                return;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
            link.crossOrigin = '';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
            script.crossOrigin = '';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    initYear() {
        const yearSpan = this.shadowRoot.querySelector('.year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    initModal() {
        const modal = this.shadowRoot.querySelector('.map-modal');
        const openBtn = this.shadowRoot.querySelector('.map-btn');
        const closeBtn = this.shadowRoot.querySelector('.close-modal');

        const toggleModal = () => {
            const isOpen = modal.getAttribute('id') === 'open';
            modal.setAttribute('id', isOpen ? 'close' : 'open');
        };

        if (openBtn) openBtn.addEventListener('click', toggleModal);
        if (closeBtn) closeBtn.addEventListener('click', toggleModal);
    }

    initPrivacyModal() {
        const modal = this.shadowRoot.querySelector('.privacy-modal');
        const openBtn = this.shadowRoot.querySelector('.privacy-btn');
        const closeBtn = this.shadowRoot.querySelector('.close-privacy-modal');

        const toggleModal = () => {
            const isOpen = modal.getAttribute('id') === 'privacy-open';
            modal.setAttribute('id', isOpen ? 'privacy-close' : 'privacy-open');
        };

        if (openBtn) openBtn.addEventListener('click', toggleModal);
        if (closeBtn) closeBtn.addEventListener('click', toggleModal);
    }

    initMap() {
        const mapContainer = this.shadowRoot.getElementById('map');
        if (!mapContainer) return;

        const CONFIG = {
            coords: [14.328167733369083, 120.93795763559015],
            mapZoom: 17,
            tileLayer: {
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            },
            logoIcon: {
                url: '/images/ui/ui-bb-marker.png',
                size: [80, 80],
                anchor: [40, 80],
            },
        };

        const map = L.map(mapContainer).setView(CONFIG.coords, CONFIG.mapZoom);

        L.tileLayer(CONFIG.tileLayer.url, {
            maxZoom: CONFIG.tileLayer.maxZoom,
            attribution: CONFIG.tileLayer.attribution,
        }).addTo(map);

        const logoIcon = L.icon({
            iconUrl: CONFIG.logoIcon.url,
            iconSize: CONFIG.logoIcon.size,
            iconAnchor: CONFIG.logoIcon.anchor,
        });

        L.marker(CONFIG.coords, {icon: logoIcon}).addTo(map);

        // fix for map rendering in hidden modal/shadow dom
        // we need to invalidate size when modal opens
        const openBtn = this.shadowRoot.querySelector('.map-btn');
        if (openBtn) {
            openBtn.addEventListener('click', () => {
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            });
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/css/styles.css">
            <link rel="stylesheet" href="/css/privacy.css">
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
            
            <section class="info-section">
                <div class="info-box">
                    <h2>Contact Us</h2>
                    <p><strong>Facebook:</strong> Bigger Brew Dasmariñas</p>
                    <p><strong>Tiktok:</strong> Biggerbrewdasma</p>
                    <p><strong>Phone Number:</strong> 09458879235</p>
                </div>

                <div class="info-box" id="infoo">
                    <h2>Visit Us At</h2>
                    <p>Lot 1 Tirona, St Cor Mangubat<br>St Dasmariñas, Cavite</p>
                    <p class="visit">Visit us today!</p>
                    <button class="map-btn">View map</button>
                </div>
            </section>
            
            <div class="map-modal" id="close">
                <div id="map"></div>
                <button class="close-modal">Close map</button>
            </div>
            
            <div class="privacy-modal" id="privacy-close">
                <div class="privacy-content">
                    <h2>Privacy Policy</h2>
                    <p>This Privacy Policy applies to the collection and use of feedback submitted through the comments and suggestions form on the Bigger Brew Cafe website.</p>

                    <h3>1. Data Collection Scope</h3>
                    <p>We value your privacy. The feedback form on this website is designed to collect non-personal comments and suggestions only.</p>
                    <p>We do not ask for, nor do we require, any Personal Identifiable Information (PII) such as names, email addresses, phone numbers, or physical addresses in the comment submission process.</p>

                    <h3>2. Type of Data Collected</h3>
                    <p>The only data we collect via the feedback form is Non-Personal Feedback Data, which includes:</p>
                    <ul>
                        <li>The content of the comments, suggestions, or reviews submitted by the user.</li>
                        <li>The timestamp of the submission.</li>
                    </ul>
                    <p>Since the submission is anonymous and does not require personal identifiers, this data is not considered personally identifiable information.</p>

                    <h3>3. How We Use the Data</h3>
                    <p>The Non-Personal Feedback Data is collected exclusively for internal use. The purpose of collecting this information is to:</p>
                    <ul>
                        <li>Analyze and improve the quality of our services and products at Bigger Brew Cafe.</li>
                        <li>Address operational issues or concerns raised by our customers.</li>
                        <li>Develop new menu items and enhance the customer experience.</li>
                    </ul>

                    <h3>4. Data Storage and Security</h3>
                    <p>The feedback data is stored securely. We take reasonable measures to protect the integrity and security of the information we collect.</p>
                    <p>We retain the feedback data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>

                    <h3>5. Data Sharing and Disclosure</h3>
                    <p>We do not share, sell, rent, or trade the Non-Personal Feedback Data collected through this website with any external third parties for marketing or other commercial purposes.</p>
                    <p>Data may only be disclosed if required by law, such as in response to a court order or subpoena.</p>

                    <h3>6. Policy Updates</h3>
                    <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>

                    <h3>7. Contact Information</h3>
                    <p>If you have any questions or concerns regarding this Privacy Policy or your feedback, please contact us directly at the cafe.</p>

                    <button class="close-privacy-modal">Close</button>
                </div>
            </div>
            
            <div class="rights">
                <p>© Bigger Brew Dasmariñas <span class="year"></span> - All rights reserved. | <button class="privacy-btn">Privacy Policy</button></p>
            </div>
            
            <div style="display: none;">
                <p>Contributors to this website: <br>
                    HTML: Sean & Ivan
                    CSS: Shogo, Razmir, & Jaylen
                    JS: Arwin & Michael
                </p>
            </div>
        `;
    }
}

customElements.define('footer-section', FooterSection);
