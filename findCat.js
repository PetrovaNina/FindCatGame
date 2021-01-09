const MODEL = {
    numCats: 3,
    catLocations: [["06", "16", "26"], ["24", "34", "44"], ["10", "11", "12"]],
    excludedCatImages: [],
    clickOnCell: function (tag, cellId) {
        for (let i = 0; i < this.numCats; i++) {
            const index = this.catLocations[i].indexOf(cellId);
            if (index >= 0) {
                return tag.setAttribute("class", "hit");
            }
        }
        return tag.setAttribute("class", "miss");
    },
    getRandomImage: function () {
        // choosing random name of images from 1.png to 10.png
        const randNum = Math.floor(Math.random() * 9 + 1);
        if (this.excludedCatImages.indexOf(randNum) === -1) {
            this.excludedCatImages.push(randNum);
            return `url(img/${randNum}.png)`;
        }
        return null;
    },
    changeImageOnClick: function () {
        const self = this;
        const tds = document.querySelectorAll("td");
        for (const td of tds) {
            td.onclick = function () {
                self.clickOnCell(td, td.id);
                if (td.classList.contains("hit")) {
                    td.style.backgroundImage = self.getRandomImage();
                } else {
                    td.style.backgroundColor = '#8e381e';
                }
            }
        }
    }
};

MODEL.changeImageOnClick();