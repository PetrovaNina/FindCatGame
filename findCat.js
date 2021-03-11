const model = {
    boardSize: 3,
    catLocations: [],
    catsFound: 0,
    catImageName: 0,
    getCatsNum: function() {
        return this.boardSize * 2;
    },
    getCatImage: function() {
        if (this.catImageName === 10) {
            this.catImageName = 0;
        }
        do {
            this.catImageName++
        } while (this.catImageName > 10);
        return `url(img/${this.catImageName}.png)`;
    },
    arrangeAllCats: function() {
        this.catLocations = [];
        let location;
        for (let i = 1; i <= this.getCatsNum(); i++) {
            do {
                location = Math.floor(Math.random() * (this.boardSize * this.boardSize) + 1);
            } while (this.catLocations.indexOf(String(location)) !== -1);
            this.catLocations.push(String(location));
        }
    },
};

const view = {
    makeElement: function(tagName, tagId, tagClass, text) {
        const element = document.createElement(tagName);
        if (tagId) {
            element.id = tagId;
        }
        if (tagClass) {
            element.classList.add(tagClass);
        }
        if (text) {
            element.textContent = text;
        }
        return element;
    },
    createBoard: function() {
        const table = document.querySelector("table");
        table.innerHTML = '';
        let id = 0;
        for (let i = 1; i <= model.boardSize; i++) {
            const raw = this.makeElement("tr");
            for (let j = 1; j <= model.boardSize; j++) {
                id++;
                const cell = this.makeElement("td", id, "gameboard-cell");
                raw.appendChild(cell);
            }
            table.appendChild(raw);
        }
    },
    removeRules: function() {
        const rules = document.querySelector(".rules");
        if (rules === null) {
            return;
        }
        rules.remove();
    },
    removeStats: function() {
        const stats = document.querySelector(".game-statistics");
        if (stats.innerHTML !== null) {
            stats.innerHTML = "";
        }
    },
    changeImageOnClick: function() {
        const tds = document.querySelectorAll("td");
        for (const td of tds) {
            td.onclick = function() {
                controller.openCell(td);
            }
        }
    },
    getHeadingForStats: function() {
        return view.makeElement("h2", "statHeading", "", "Твои успехи");
    },
    getLevelElement: function() {
        return view.makeElement("p", "", "", `Уровень: ${controller.level}`);
    },
    getGuessesElement: function() {
        return view.makeElement("p", "", "", `Попытки: ${controller.guesses} из ${controller.maxGuesses()}`);
    },
    getFoundCatsElement: function() {
        return view.makeElement("p", "", "", `Котиков: ${model.catsFound} из ${model.getCatsNum()}`);
    },
    getGameResultElement: function() {
        let string;
        let elementClass;
        if (model.catsFound === model.getCatsNum() && controller.guesses <= controller.maxGuesses()) {
            string = "Победа!";
            elementClass = "win";
        } else {
            string = "Упс... Тебя обыграли!";
            elementClass = "lose";
        }
        return view.makeElement("p", "userResult", elementClass, string);
    },
    getContinueButton: function() {
        let buttonName;
        const result = document.getElementById("userResult");
        if (result.classList.contains("win")) {
            buttonName = "Играть дальше";
        } else {
            buttonName = "Взять реванш";
        }
        return view.makeElement("button", "continue-button", "", buttonName);
    },
    displayStats: function() {
        const stats = document.querySelector(".game-statistics");

        stats.append(
            this.getHeadingForStats(),
            this.getLevelElement(),
            this.getGuessesElement(),
            this.getFoundCatsElement()
        );
        if (controller.isGameOver()) {
            stats.appendChild(this.getGameResultElement());
            stats.appendChild(this.getContinueButton());
            controller.playGame();
        }
    },
};

const controller = {
    guesses: 0,
    level: 1,
    maxGuesses: function() {
        return Math.ceil((model.boardSize * model.boardSize) / 1.2);
    },
    processGuess: function() {
        do {
            this.guesses++;
        } while (this.guesses > this.maxGuesses());
    },
    openCell: function(tag) {

        if (tag.classList.contains("hit") || tag.classList.contains("miss") || this.isGameOver()) {
            return;
        }
        this.processGuess();

        for (let i = 0; i < model.getCatsNum(); i++) {
            if (model.catLocations[i] === tag.id) {
                tag.setAttribute("class", "gameboard-cell hit");
                tag.style.backgroundImage = model.getCatImage();
                model.catsFound++;
            }
            if (!tag.classList.contains("hit")) {
                tag.setAttribute("class", "gameboard-cell miss");
            }

            view.removeStats();
            view.displayStats();
        }
    },
    isGameOver: function() {
        return model.catsFound === model.getCatsNum() || this.guesses === this.maxGuesses();
    },
    resetGame: function() {
        model.catsFound = 0;
        this.guesses = 0;
    },
    playGame: function() {
        const self = this;
        const startButton = document.querySelector("button");

        startButton.onclick = function() {
            self.resetGame();
            view.removeRules();
            const result = document.getElementById("userResult");
            if (result !== null) {
                if (result.classList.contains("win")) {
                    controller.level++;
                    model.boardSize++;
                }
            }
            view.removeStats();
            view.createBoard();
            view.displayStats();
            model.arrangeAllCats();
            view.changeImageOnClick();

            document.querySelector(".game-container").style.display = "flex";
        }
    },
};

controller.playGame();