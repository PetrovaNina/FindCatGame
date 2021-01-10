const MODEL = {
    numCats: 3,
    cats: [{locations: ["06", "16", "26"], hits: ["", "", ""]},
        {locations: ["24", "34", "44"], hits: ["", "", ""]},
        {locations: ["10", "11", "12"], hits: ["", "", ""]}],
    catFound: 0,
    catBoxLength: 3,
    imageName: 0,
    clickOnCell: function (tag) {
        if (tag.classList.contains("hit") || tag.classList.contains("miss")) {
            return;
        }
        for (let i = 0; i < this.numCats; i++) {
            const cat = this.cats[i];
            const index = cat.locations.indexOf(tag.id);
            if (index >= 0) {
                cat.hits[index] = "hit"
                tag.style.backgroundImage = this.getImage();
                tag.setAttribute("class", "hit");
                if (this.isFound(cat)) {
                    this.catFound++;
                }
                console.log(this.isFound(cat))
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
            }
        }
    },

    isFound: function (cat) {
        for (let i = 0; i < this.catBoxLength; i++) {
            if (cat.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },
};

MODEL.changeImageOnClick();