"use strict"

const CONFIG = {
    navFadeThreshold: 400,
}

const elements = {
    // has to be a function because `nav-bar` uses a shadow dom initialized late in the page lifecycle
    nav: () => document.querySelector('nav-bar').shadowRoot.querySelector('nav'),
}

function updateNavVisibility() {
    const nav = elements.nav();
    if (nav) {
        nav.style.opacity = window.scrollY >= CONFIG.navFadeThreshold ? '1' : '0';
    }
}

function init() {
    const nav = elements.nav();
    if (nav) {
        nav.style.opacity = '0';
    }

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
} else {
    init();
}
