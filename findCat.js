const MODEL = {
    numCats: 3,
    catLocations: [["06", "16", "26"], ["24", "34", "44"], ["10", "11", "12"]],
    excludedCatImages: [],
    clickOnCell: function (tag) {
        if (tag.classList.contains("hit") || tag.classList.contains("miss")) {
            return;
        }
        for (let i = 0; i < this.numCats; i++) {
            const index = this.catLocations[i].indexOf(tag.id);
            if (index >= 0) {
                tag.style.backgroundImage = this.getRandomImage();
                tag.setAttribute("class", "hit");
                return;
            }
        }
        tag.setAttribute("class", "miss");
    },

    getRandomImage: function () {
        if (this.excludedCatImages.length === 10) {
            this.excludedCatImages = [];
        }
        // choosing random name of images from 1.png to 10.png
        let randNum
        do {
            randNum = Math.floor(Math.random() * 9.4 + 1);
        } while (this.excludedCatImages.indexOf(randNum) !== -1);

        this.excludedCatImages.push(randNum);
        return `url(img/${randNum}.png)`;
    },

    changeImageOnClick: function () {
        const self = this;
        const tds = document.querySelectorAll("td");
        for (const td of tds) {
            td.onclick = function () {
                self.clickOnCell(td);
                console.log(self.excludedCatImages)
            }
        }
    }
};

MODEL.changeImageOnClick();