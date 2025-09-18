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
function showPage(pageId) {
const pages = document.querySelectorAll('.page');
pages.forEach(page => {
page.classList.remove('active');
});
document.getElementById(pageId).classList.add('active');
}

function showMainMenu() {
stopTimer();
showPage('mainMenu');
}

function showDifficultySelect() {
showPage('difficultySelect');
}

function setDifficulty(level) {
currentDifficulty = level;
let settings;


if (level === 'easy') {
    settings = EASY_SETTINGS;
} else if (level === 'normal') {
    settings = NORMAL_SETTINGS;
} else if (level === 'hard') {
    settings = HARD_SETTINGS;
}

maxAttempts = settings.maxAttempts;
codeLength = settings.codeLength;
gameColors = settings.colors;


}

function generateSecretCode() {
secretCode = [];
for (let i = 0; i < codeLength; i++) {
const randomIndex = Math.floor(Math.random() * gameColors.length);
secretCode.push(gameColors[randomIndex]);
}
console.log('Secret code:', secretCode);
}

function setupGameBoard() {
attemptsContainer.innerHTML = '';
colorPaletteEl.innerHTML = '';


// Create attempt rows
for (let i = 0; i < maxAttempts; i++) {
    const row = document.createElement('div');
    row.className = 'attempt-row';
    row.id = `attempt-${i}`;
    
    // Create pegs for guesses
    for (let j = 0; j < codeLength; j++) {
        const peg = document.createElement('div');
        peg.className = 'peg';
        peg.dataset.position = j;
        peg.dataset.row = i;
        peg.addEventListener('click', handlePegClick);
        row.appendChild(peg);
    }
    
    // Create feedback section
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    
    for (let k = 0; k < codeLength; k++) {
        const feedbackPeg = document.createElement('div');
        feedbackPeg.className = 'feedback-peg';
        feedback.appendChild(feedbackPeg);
    }
    
    row.appendChild(feedback);
    attemptsContainer.appendChild(row);
}

document.getElementById('attempt-0').classList.add('current-attempt');

// Create color palette
gameColors.forEach(color => {
    const colorOption = document.createElement('div');
    colorOption.className = `color-option ${color}`;
    colorOption.dataset.color = color;
    colorOption.addEventListener('click', handleColorClick);
    colorPaletteEl.appendChild(colorOption);
});

selectedColors = new Array(codeLength).fill('');
currentAttempt = 0;


}

function handleColorClick(event) {
const color = event.target.dataset.color;
selectColor(color);
}

function selectColor(color) {
const currentRow = document.getElementById(`attempt-${currentAttempt}`);
const pegs = currentRow.querySelectorAll('.peg');


for (let i = 0; i < pegs.length; i++) {
    if (selectedColors[i] === '') {
        selectedColors[i] = color;
        pegs[i].className = `peg ${color}`;
        break;
    }
}

updateSubmitButton();


}

function handlePegClick(event) {
const position = parseInt(event.target.dataset.position);
const row = parseInt(event.target.dataset.row);
clearPegPosition(row, position);
}

function clearPegPosition(attemptIndex, position) {
if (attemptIndex !== currentAttempt) return;


selectedColors[position] = '';
const currentRow = document.getElementById(`attempt-${currentAttempt}`);
const peg = currentRow.querySelectorAll('.peg')[position];
peg.className = 'peg';

updateSubmitButton();


}

function updateSubmitButton() {
const allFilled = selectedColors.every(color => color !== '');
submitButton.disabled = !allFilled;
}

function submitAttempt() {
const guess = [...selectedColors];
const feedback = generateFeedback(guess);


const currentRow = document.getElementById(`attempt-${currentAttempt}`);
const feedbackPegs = currentRow.querySelectorAll('.feedback-peg');

let feedbackIndex = 0;

// Show black pegs
for (let i = 0; i < feedback.black; i++) {
    feedbackPegs[feedbackIndex].classList.add('black');
    feedbackIndex++;
}

// Show white pegs
for (let i = 0; i < feedback.white; i++) {
    feedbackPegs[feedbackIndex].classList.add('white');
    feedbackIndex++;
}

if (feedback.black === codeLength) {
    endGame(true);
    return;
}

currentRow.classList.remove('current-attempt');
currentAttempt++;

if (currentAttempt >= maxAttempts) {
    endGame(false);
    return;
}

document.getElementById(`attempt-${currentAttempt}`).classList.add('current-attempt');
selectedColors = new Array(codeLength).fill('');
updateSubmitButton();


}

function generateFeedback(guess) {
const secretCopy = [...secretCode];
const guessCopy = [...guess];
let black = 0;
let white = 0;


// Count black pegs
for (let i = codeLength - 1; i >= 0; i--) {
    if (guessCopy[i] === secretCopy[i]) {
        black++;
        secretCopy.splice(i, 1);
        guessCopy.splice(i, 1);
    }
}

// Count white pegs
for (let color of guessCopy) {
    const index = secretCopy.indexOf(color);
    if (index !== -1) {
        white++;
        secretCopy.splice(index, 1);
    }
}

return { black, white };


}

function startTimer() {
gameStartTime = Date.now();
timerInterval = setInterval(() => {
if (!gameActive) return;


    const elapsed = Date.now() - gameStartTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    timerEl.textContent = `TIMER: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}, 1000);


}

function stopTimer() {
if (timerInterval) {
clearInterval(timerInterval);
timerInterval = null;
}
gameActive = false;
}

function startGame(difficulty) {
setDifficulty(difficulty);
generateSecretCode();
setupGameBoard();
gameActive = true;
startTimer();
showPage('gameBoard');
}

function endGame(won) {
stopTimer();


if (won) {
    resultMessage.innerHTML = `
        <div class="win-message">
            Well Done !!!<br>
            YOU WON !!!<br>
            <small>Solved in ${currentAttempt + 1} attempts</small>
        </div>
    `;
} else {
    resultMessage.innerHTML = `
        <div class="lose-message">
            Awww ...<br>
            YOU LOST !!!<br>
            <small>The code was: ${secretCode.join(', ')}</small>
        </div>
    `;
}

showPage('gameResult');


}

function handleStartGame(event) {
const difficulty = event.target.dataset.difficulty;
startGame(difficulty);
}
