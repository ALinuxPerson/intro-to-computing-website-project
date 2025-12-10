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
            
            <div class="rights">
                <p>© Bigger Brew Dasmariñas <span class="year"></span> - All rights reserved. </p>
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
