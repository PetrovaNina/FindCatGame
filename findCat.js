const MODEL = {
    numCats: 3,
    catLocations: [["06", "16", "26"], ["24", "34", "44"], ["10", "11", "12"]],
    catImages: [
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
    ],
    clickOnCell: function (tag, cellId) {
        for (let i = 0; i < this.numCats; i++) {
            const index = this.catLocations[i].indexOf(cellId);
            if (index >= 0) {
                return tag.setAttribute("class", "hit");
            }
        }
        return tag.setAttribute("class", "miss");
    },
    changeImageOnClick: function () {
        const self = this;
        const tds = document.querySelectorAll("td");
        for (const td of tds) {
            td.onclick = function () {
                self.clickOnCell(td, td.id);
                if (td.classList.contains("hit")) {
                    const catIndex = Math.floor(Math.random() * self.catImages.length - 1);
                    td.style.backgroundImage = 'url(' + self.catImages[catIndex] + ')';
                    self.catImages.splice(catIndex, 1);
                } else {
                    td.style.backgroundColor = '#8e381e';
                }
            }
        }
    }
};

MODEL.changeImageOnClick();