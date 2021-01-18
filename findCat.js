const model = {
    boardSize: 3,
    catLocations: [],
    catsFound: 0,
    catImageName: 0,
    getCatsNum: function () {
        return this.boardSize * 2;
    },
    makeElement: function (tagName, tagId) {
        const element = document.createElement(tagName);
        if (tagId) {
            element.id = tagId;
        }
        return element;
    },
    createBoard: function () {
        const table = document.querySelector("table");
        table.innerHTML = '';
        let id = 0;
        for (let i = 1; i <= this.boardSize; i++) {
            const raw = this.makeElement('tr');
            for (let j = 1; j <= this.boardSize; j++) {
                id++;
                const cell = this.makeElement('td', id);
                raw.appendChild(cell);
            }
            table.appendChild(raw);
        }
        table.style.backgroundColor = "chocolate";
    },
    getCatImage: function () {
        if (this.catImageName === 10) {
            this.catImageName = 0;
        }
        do {
            this.catImageName++
        } while (this.catImageName > 10);
        return `url(img/${this.catImageName}.png)`;
    },
    arrangeAllCats: function () {
        this.catLocations = [];
        let location;
        for (let i = 1; i <= this.getCatsNum(); i++) {
            do {
                location = Math.floor(Math.random() * (this.boardSize * this.boardSize) + 1);
            } while (this.catLocations.indexOf(String(location)) !== -1);
            this.catLocations.push(String(location));
        }
        console.log(this.catLocations);
    },
};

const view = {
    removeRules: function () {
        const rules = document.querySelector(".rules");
        rules.remove();
    },

    changeImageOnClick: function () {
        const tds = document.querySelectorAll("td");
        for (const td of tds) {
            td.onclick = function () {
                controller.openCell(td);
            }
        }
    },

    // Now the messages are printing in console.
    // Next step they will be displayed in main page.
    displayGuesses: function () {
        console.log(`Попытки: ${controller.guesses} из ${controller.maxGuesses()}`);
    },
    displayFoundCats: function () {
        console.log(`Котиков: ${model.catsFound} из ${model.getCatsNum()}`);
    },
    displayResult: function () {
        if (model.catsFound === model.getCatsNum() && controller.guesses <= controller.maxGuesses()) {
            console.log("Победа!");
            controller.level++;
            model.boardSize++;
        } else {
            console.log("Упс... Тебя обыграли!");
        }
    },
    // displayLevel: function () {
    //     console.log("Уровень " + controller.level)
    // }
};

const controller = {
    guesses: 0,
    level: 1,
    maxGuesses: function () {
        return Math.ceil((model.boardSize * model.boardSize) / 1.2);
    },
    processGuess: function () {
        do {
            this.guesses++;
        } while (this.guesses > this.maxGuesses());
    },
    openCell: function (tag) {

        if (tag.classList.contains("hit") || tag.classList.contains("miss") || this.isGameOver()) {
            return;
        }
        this.processGuess();
        view.displayGuesses();

        for (let i = 0; i < model.getCatsNum(); i++) {
            if (model.catLocations[i] === tag.id) {
                tag.setAttribute("class", "hit");
                tag.style.backgroundImage = model.getCatImage();
                model.catsFound++;
                view.displayFoundCats();
            }
            if (!tag.classList.contains("hit")) {
                tag.setAttribute("class", "miss");
            }
        }
        if (this.isGameOver()) {
            view.displayResult();
        }
    },
    isGameOver: function () {
        return model.catsFound === model.getCatsNum() || this.guesses === this.maxGuesses();
    },
    resetGame: function () {
        model.catsFound = 0;
        this.guesses = 0;
    },
    startGame: function () {
        const self = this;
        const startButton = document.querySelector("button");
        startButton.onclick = function () {
            self.resetGame();
            view.removeRules();
            model.createBoard();
            model.arrangeAllCats();
            view.changeImageOnClick();
        }
    }
};

controller.startGame();