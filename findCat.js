const model = {
    catsNum: 9,
    boardSize: 4,
    catLocations: [],
    catsFound: 0,
    catImageName: 0,
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
        for (let i = 1; i <= this.catsNum; i++) {
            do {
                location = Math.floor(Math.random() * (this.boardSize * this.boardSize) + 1);
            } while (this.catLocations.indexOf(String(location)) !== -1);
            this.catLocations.push(String(location));
        }
        console.log(this.catLocations);
    },
};

const view = {

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
        console.log(`Котиков: ${model.catsFound} из ${model.catsNum}`);
    },
    displayResult: function () {
        if (model.catsFound === model.catsNum && controller.guesses <= controller.maxGuesses()) {
            console.log("Победа!");
        } else {
            console.log("Упс... Тебя обыграли!");
        }
    },
};

const controller = {
    guesses: 0,
    maxGuesses: function () {
        return Math.ceil(model.catsNum * 3.5);
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

        for (let i = 0; i < model.catsNum; i++) {
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
        return model.catsFound === model.catsNum || this.guesses === this.maxGuesses();
    },
    startGame: function () {
        const startButton = document.querySelector("button");
        startButton.onclick = function () {
            model.createBoard();
            model.arrangeAllCats();
            view.changeImageOnClick();
        }
    }
};

controller.startGame();