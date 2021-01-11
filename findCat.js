const MODEL = {
    catBoxNum: 3,
    catBoxLength: 3,
    cats: [{locations: ["06", "16", "26"], hits: ["", "", ""]},
        {locations: ["24", "34", "44"], hits: ["", "", ""]},
        {locations: ["10", "11", "12"], hits: ["", "", ""]}],
    catBoxFound: 0,
    openCell: function (tag) {

        if (tag.classList.contains("hit") || tag.classList.contains("miss") || this.isGameOver()) {
            return;
        }
        CONTROLLER.processGuess();
        VIEW.displayGuesses();

        for (let i = 0; i < this.catBoxNum; i++) {
            const cat = this.cats[i];
            const index = cat.locations.indexOf(tag.id);
            if (index >= 0) {
                cat.hits[index] = "hit"
                tag.style.backgroundImage = VIEW.getImage();
                tag.setAttribute("class", "hit");
                if (this.isBoxFound(cat)) {
                    this.catBoxFound++;
                    VIEW.displayBoxes();
                }
                this.isGameOver();
                return;
            }
        }
        tag.setAttribute("class", "miss");
        if (this.isGameOver()) {
            VIEW.displayResult();
        }
    },
    isBoxFound: function (cat) {
        for (let i = 0; i < this.catBoxLength; i++) {
            if (cat.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },
    isGameOver: function () {
        return this.catBoxFound === this.catBoxNum || CONTROLLER.guesses === CONTROLLER.maxGuesses();
    },
};

const VIEW = {

    imageName: 0,
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
        const tds = document.querySelectorAll("td");
        for (const td of tds) {
            td.onclick = function () {
                MODEL.openCell(td);
            }
        }
    },

    // Now the messages are printing in console.
    // Next step they will be displayed in main page.
    displayGuesses: function () {
        console.log(`Попытки: ${CONTROLLER.guesses} из ${CONTROLLER.maxGuesses()}`);
    },
    displayBoxes: function () {
        console.log(`Коробки: ${MODEL.catBoxFound} из ${MODEL.catBoxNum}`);
    },
    displayResult: function () {
        if (MODEL.catBoxFound === MODEL.catBoxNum && CONTROLLER.guesses <= CONTROLLER.maxGuesses()) {
            console.log("Победа!");
        }
        console.log("Упс... Тебя обыграли!");
    },
};

const CONTROLLER = {
    guesses: 0,
    maxGuesses: function () {
        return Math.ceil((MODEL.catBoxNum * MODEL.catBoxLength) * 1.5);
    },
    processGuess: function () {
        do {
            this.guesses++;
        } while (this.guesses > this.maxGuesses());
    },
};

VIEW.changeImageOnClick();