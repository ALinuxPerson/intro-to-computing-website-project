"use strict"
const coords = [14.328167733369083, 120.93795763559015]
var map = L.map('map').setView(coords, 17)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

var marker = L.marker(coords).addTo(map)

var logoIcon = L.icon({
    iconUrl: '/images/ui-bb-marker.png',
    iconSize: [80, 80],
    iconAnchor: [40, 80],
})

L.marker(coords, {icon: logoIcon}).addTo(map)

document.querySelector('.year').innerHTML = new Date().getFullYear()

let isModalOpen = false

function toggleModal() {
    isModalOpen = !isModalOpen
    if (isModalOpen) {
        document.querySelector('.map-modal').setAttribute('id', 'open')
    } else {
        document.querySelector('.map-modal').setAttribute('id', 'close')
    }
}

document.querySelector('nav').setAttribute('style', 'opacity: 0')

function getScroll() {
    console.log(window.scrollY)
    if (window.scrollY >= 400) {
        document.querySelector('nav').setAttribute('style', 'opacity: 1')
    } else {
        document.querySelector('nav').setAttribute('style', 'opacity: 0')
    }
}