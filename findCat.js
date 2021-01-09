let numCats =  3;
let catLocations = [ ["06", "16", "26"], ["24", "34", "44"], ["10", "11", "12"] ];
let imgs = [
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

function click (tag, guess) {
    for (let i = 0; i < numCats; i++) {
        let index = catLocations[i].indexOf(guess);
        if (index >= 0) {
            return tag.setAttribute("class", "hit");
        }
    }
    return tag.setAttribute("class", "miss");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


let tds = document.querySelectorAll("td");

for (let td of tds) {
    td.onclick = function () {
        console.log(click(td, td.id));
        if (td.classList.contains("hit")) {
            let catIndex = getRandomInt(imgs.length - 1);
            td.style.backgroundImage = 'url(' + imgs[catIndex] + ')';
            imgs.splice(catIndex, 1);
        } else {
            td.style.backgroundColor = '#8e381e';
        }
    }
}
