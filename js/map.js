"use strict"

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
    navFadeThreshold: 400,
}

const elements = {
    year: document.querySelector('.year'),
    mapModal: document.querySelector('.map-modal'),

    // has to be a function because `nav-bar` uses a shadow dom initialized late in the page lifecycle
    nav: () => document.querySelector('nav-bar').shadowRoot.querySelector('nav'),
}

function initializeMap() {
    const map = L.map('map').setView(CONFIG.coords, CONFIG.mapZoom);

    L.tileLayer(CONFIG.tileLayer.url, {
        maxZoom: CONFIG.tileLayer.maxZoom,
        attribution: CONFIG.tileLayer.attribution,
    }).addTo(map);

    const logoIcon = L.icon({
        iconUrl: CONFIG.logoIcon.url,
        iconSize: CONFIG.logoIcon.size,
        iconAnchor: CONFIG.logoIcon.anchor,
    })

    L.marker(CONFIG.coords, {icon: logoIcon}).addTo(map);
    return map;
}

const modal = {
    isOpen: false,

    toggle() {
        this.isOpen = !this.isOpen;
        elements.mapModal.setAttribute('id', this.isOpen ? 'open' : 'close');
    }
}

function updateNavVisibility() {
    elements.nav().style.opacity = window.scrollY >= CONFIG.navFadeThreshold ? '1' : '0';
}

function init() {
    elements.year.textContent = String(new Date().getFullYear());
    elements.nav().style.opacity = '0';

    initializeMap();

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(updateNavVisibility, 10)
    })
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
}

window.toggleModal = () => modal.toggle();
