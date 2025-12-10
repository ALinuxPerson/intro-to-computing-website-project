const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const bookScene = document.querySelector(".book-scene");

const papers = document.querySelectorAll(".paper");
const maxLocation = papers.length + 1; // +1 for the final back cover view

let currentLocation = 1;

function openBook() {
    bookScene.classList.remove("close-state");

    if(currentLocation < maxLocation) {
        const currentPaper = papers[currentLocation - 1];
        if (currentPaper) {
            currentPaper.classList.add("flipped");
            currentPaper.style.zIndex = String(currentLocation);
        }
        currentLocation++;
    }

    updateButtons();
}

function closeBook() {
    if(currentLocation > 1) {
        currentLocation--;
        const currentPaper = papers[currentLocation - 1];
        if (currentPaper) {
            currentPaper.classList.remove("flipped");
            setTimeout(() => {
                currentPaper.style.zIndex = String(papers.length - currentLocation + 1);
            }, 300);
        }
    }

    if (currentLocation === 1) {
        bookScene.classList.add("close-state");
    }

    updateButtons();
}

function updateButtons() {
    prevBtn.disabled = currentLocation === 1;
    nextBtn.disabled = currentLocation === maxLocation;
}

function init() {
    papers.forEach((paper, index) => {
        paper.style.zIndex = String(papers.length - index);
    });

    bookScene.classList.add("close-state");
    updateButtons();
}

prevBtn.addEventListener("click", closeBook);
nextBtn.addEventListener("click", openBook);

init();