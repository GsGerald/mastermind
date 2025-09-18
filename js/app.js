/*-------------------------------- Constants --------------------------------*/
const EASY_SETTINGS = {
maxAttempts: 12,
codeLength: 4,
colors: ['red', 'blue', 'green', 'yellow']
};

const NORMAL_SETTINGS = {
maxAttempts: 10,
codeLength: 4,
colors: ['red', 'blue', 'green', 'yellow', 'orange', 'purple']
};

const HARD_SETTINGS = {
maxAttempts: 8,
codeLength: 5,
colors: ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan']
};


/*-------------------------------- Variables --------------------------------*/
let currentDifficulty = 'normal';
let maxAttempts = 10;
let codeLength = 4;
let gameColors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
let secretCode = [];
let currentAttempt = 0;
let selectedColors = [];
let gameStartTime = null;
let timerInterval = null;
let gameActive = false;


/*------------------------ Cached Element References ------------------------*/
const mainMenuEl = document.getElementById('mainMenu');
const difficultySelectEl = document.getElementById('difficultySelect');
const gameBoardEl = document.getElementById('gameBoard');
const gameResultEl = document.getElementById('gameResult');

const startBtn = document.getElementById('startBtn');
const chooseLevelBtn = document.getElementById('chooseLevelBtn');
const easyBtn = document.getElementById('easyBtn');
const normalBtn = document.getElementById('normalBtn');
const hardBtn = document.getElementById('hardBtn');
const backToMainBtn = document.getElementById('backToMainBtn');

const timerEl = document.getElementById('timer');
const attemptsContainer = document.getElementById('attempts-container');
const colorPaletteEl = document.getElementById('colorPalette');
const submitButton = document.getElementById('submitButton');
const quitGameBtn = document.getElementById('quitGameBtn');

const resultMessage = document.getElementById('resultMessage');
const playAgainBtn = document.getElementById('playAgainBtn');
const changeDifficultyBtn = document.getElementById('changeDifficultyBtn');


/*----------------------------- Event Listeners -----------------------------*/
startBtn.addEventListener('click', showDifficultySelect);
chooseLevelBtn.addEventListener('click', showDifficultySelect);

easyBtn.addEventListener('click', () => startGame('easy'));
normalBtn.addEventListener('click', () => startGame('normal'));
hardBtn.addEventListener('click', () => startGame('hard'));
backToMainBtn.addEventListener('click', showMainMenu);

submitButton.addEventListener('click', submitAttempt);
quitGameBtn.addEventListener('click', showMainMenu);

playAgainBtn.addEventListener('click', showMainMenu);
changeDifficultyBtn.addEventListener('click', showDifficultySelect);


/*-------------------------------- Functions --------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    const showPage = (pageId) => {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'))
        const target = document.getElementById(pageId);
        if (target) target.classList.add('active');
    };
})
const menuButtons = document.querySelectorAll(".menu-button");
 
menuButtons.forEach(button => {
    button.addEventListener("click", () => {
        const action = button.getAttribute("data-action");
        if (action === "start") {
            console.log("Game started!");
        } else if (action === "settings") {
            console.log("Opening settings...")
        }    
    });
});
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });
}
document.querySelectorAll(".menu-button").forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        if (action === "start") {
            showPage("difficultySelect");
        } else if (action === "settings") {
            alert("Setting page coming soon!");
        }
    });
});

document.querySelectorAll(".difficulty-button").forEach(button => {
    button.addEventListener("click", ()=> {
        const difficulty = button.dataset.difficulty;
        console.log("Selected difficulty:", difficulty);

        alert('Starting game on ${difficulty.toupperCase()} model');
    });
});

document.querySelector(".back-button").addEventListener("click", () => {
    showPage("mainMenu");
});