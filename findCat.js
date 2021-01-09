const NUM_CATS = 3;
const CAT_LOCATIONS = [["06", "16", "26"], ["24", "34", "44"], ["10", "11", "12"]];
const IMGS = [
    "img/1.png",
    "img/2.png",
    "img/3.png",
    "img/4.png",
    "img/5.png",
    "img/6.png",
    "img/7.png",
    "img/8.png",
    "img/9.png",
    "img/10.png"
];

function click(tag, guess) {
    for (let i = 0; i < NUM_CATS; i++) {
        const index = CAT_LOCATIONS[i].indexOf(guess);
        if (index >= 0) {
            return tag.setAttribute("class", "hit");
        }
    }
    return tag.setAttribute("class", "miss");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


const TDS = document.querySelectorAll("td");

for (const td of TDS) {
    td.onclick = function () {
        console.log(click(td, td.id));
        if (td.classList.contains("hit")) {
            let catIndex = getRandomInt(IMGS.length - 1);
            td.style.backgroundImage = 'url(' + IMGS[catIndex] + ')';
            IMGS.splice(catIndex, 1);
        } else {
            td.style.backgroundColor = '#8e381e';
        }
    }
}
