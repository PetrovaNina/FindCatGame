const MODEL = {
    numCats: 3,
    catLocations: [["06", "16", "26", "36", "46", "56"], ["24", "34", "44"], ["10", "11", "12"]],
    imageName: 0,
    clickOnCell: function (tag) {
        if (tag.classList.contains("hit") || tag.classList.contains("miss")) {
            return;
        }
        for (let i = 0; i < this.numCats; i++) {
            const index = this.catLocations[i].indexOf(tag.id);
            if (index >= 0) {
                tag.style.backgroundImage = this.getImage();
                tag.setAttribute("class", "hit");
                return;
            }
        }
        tag.setAttribute("class", "miss");
    },

    getImage: function () {
        if (this.imageName === 10) {
            this.imageName = 0;
        }
        do {
            this.imageName++
        } while (this.imageName > 10);
        return `url(img/${this.imageName}.png)`;
    },

    changeImageOnClick: function () {
        const self = this;
        const tds = document.querySelectorAll("td");
        for (const td of tds) {
            td.onclick = function () {
                self.clickOnCell(td);
                console.log(self.imageName)
            }
        }
    }
};

MODEL.changeImageOnClick();