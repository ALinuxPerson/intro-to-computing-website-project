let evenPages = document.querySelectorAll('.even .page')
let oddPages = document.querySelectorAll('.odd .page')
let buttons = document.querySelectorAll('.slide > button')

buttons[0].setAttribute('style', 'visibility: hidden')

const MQL = window.matchMedia("(width <= 900px)")

if (!MQL.matches) {
    let oddIndex = 0
    let evenIndex = evenPages.length - 1
    let maxIndex = oddPages.length - 1

    function forward() {
        oddIndex += 1
        evenPages[evenIndex].setAttribute('style', 'transform: rotateY(90deg);')
        evenIndex -= 1

        setTimeout(() => {
            oddPages[oddIndex].setAttribute('style', 'transform: rotateY(0deg);')
        }, 200)

        if (oddIndex === maxIndex) {
            buttons[1].setAttribute('style', 'visibility: hidden')
        } else {
            buttons[0].setAttribute('style', 'visibility: visbile')
        }
    }

    function goBack() {
        evenIndex += 1
        oddPages[oddIndex].setAttribute('style', 'transform: rotateY(90deg);')
        oddIndex -= 1
        setTimeout(() => {
            evenPages[evenIndex].setAttribute('style', 'transform: rotateY(0deg);')
        }, 200)

        if (evenIndex === maxIndex) {
            buttons[0].setAttribute('style', 'visibility: hidden')
        } else {
            buttons[1].setAttribute('style', 'visibility: visible')
        }
    }
} else {
    let pages = document.querySelectorAll('.menu > .page')
    let menus = document.querySelectorAll('.menu')
    let pages_index = []
    let pages_array = []

    for (let page of pages) pages_index.push(page.getAttribute('id'))

    pages_index.sort()

    for (let index of pages_index) pages_array.push(document.getElementById(index))

    for (let pages of pages_array) pages.setAttribute('style', 'opacity: 0')

    for (let menu of menus) menu.removeAttribute('class')

    let maxIndex = pages_array.length - 1
    let index = 1
    pages_array[index].setAttribute('style', 'opacity: 1')

    function forward() {
        pages_array[index].setAttribute('style', 'opacity: 0')
        index += 1
        pages_array[index].setAttribute('style', 'opacity: 1')
        console.log(index)

        if (index === maxIndex) {
            buttons[1].setAttribute('style', 'visibility: hidden')
        } else {
            buttons[0].setAttribute('style', 'visibility: visbile')
        }
    }

    function goBack() {
        pages_array[index].setAttribute('style', 'opacity: 0')
        index -= 1
        pages_array[index].setAttribute('style', 'opacity: 1')
        console.log(index)

        if (index === 1) {
            buttons[0].setAttribute('style', 'visibility: hidden')
        } else {
            buttons[1].setAttribute('style', 'visibility: visible')
        }
    }
}

