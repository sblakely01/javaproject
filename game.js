const hand = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;
let humanChoice = 0;
let round = 0;
let humanScoreUI; // global reference needed for game loop
let computerScoreUI; // global reference needed for game loop
let humanChoiceUI; // global reference needed for game loop
let computerChoiceUI; // global reference needed for game loop
let roundIndicatorUI; // global reference needed for game loop
let roundStatusText; // global reference needed for game loop
let gameStatusText; // global reference needed for game loop

document.addEventListener('DOMContentLoaded', () => { // check that dom is loaded before setting element references to prevent null errors
    const rockButton = document.getElementById("rockButton");
    const paperButton = document.getElementById("paperButton");
    const scissorButton = document.getElementById("scissorButton");
    const resetButton = document.getElementById("resetButton");
    if (!humanChoiceUI) {
        humanChoiceUI = document.getElementById("humanChoice");
    };
    if (!roundIndicatorUI) {
        roundIndicatorUI = document.getElementById("roundCounter");
    };
    if (!computerChoiceUI) {
        computerChoiceUI = document.getElementById("computerChoice");
    };
    if (!humanScoreUI) {
        humanScoreUI = document.getElementById("yourScore");
    }
    if (!computerScoreUI) {
        computerScoreUI = document.getElementById("computerScore");
    };
    if (!roundStatusText) {
        roundStatusText = document.getElementById("roundStatusText");
    }
    if (!gameStatusText) {
        gameStatusText = document.getElementById("gameStatusText");
    }
    if (rockButton) {
        rockButton.addEventListener("click", () => {
            setEmojiChoice(humanChoiceUI, 0, "human"); 
        }, false);
    }
    if (paperButton) {
        paperButton.addEventListener("click", () => {
            setEmojiChoice(humanChoiceUI, 1, "human");
        }, false);
    }
    if (scissorButton) {
        scissorButton.addEventListener("click", () => {
            setEmojiChoice(humanChoiceUI, 2, "human");
        }, false);
    }
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            resetGame();
        }, false);
    }
});

const getComputerChoice = () => {
    let randomNumber = Math.floor(Math.random() * hand.length);
    return randomNumber; // will return either 0, 1 or 2
}

const setEmojiChoice = (element, choice, chooser) => { // sets emojis for both human and computer choices
    if (round < 3) {
        if (choice === 0) {
            element.textContent = '🪨';
        } else if (choice === 1) {
            element.textContent = '📄';
        } else {
            element.textContent = '✂️';
        }
        if (chooser === "human") { // if function is processing a human choice, it triggers the start or continuation of the game loop
            humanChoice = choice;
            playGame();
        }
    }
}

const resetGame = () => { // resets all game variables so user can play again without refreshing browser
    round = 0;
    humanScore = 0;
    humanScoreUI.innerText = 0;
    computerScore = 0;
    computerScoreUI.innerText = 0;
    humanChoiceUI.innerText = '';
    computerChoiceUI.innerText = '';
    roundIndicatorUI.textContent = `Round 0 of 3`;
    roundStatusText.textContent = '';
    gameStatusText.textContent = '';
    return;
}

const playRound = (humanChoice, computerChoice) => { // choices are compared as integers instead of strings
    setEmojiChoice(computerChoiceUI, computerChoice, "computer");
    if (computerChoice - humanChoice === 1 || (humanChoice === 2 && computerChoice === 0)) {
        computerScore++;
        computerScoreUI.textContent = computerScore;
        roundStatusText.textContent = `You lose! Your ${hand[humanChoice]} doesn't beat ${hand[computerChoice]}`;
    } else if (humanChoice - computerChoice === 1 || (computerChoice === 2 && humanChoice === 0)) {
        humanScore++;
        humanScoreUI.textContent = humanScore;
        roundStatusText.textContent = `You win! Your ${hand[humanChoice]} beats ${hand[computerChoice]}`;
    } else if (humanChoice === computerChoice) {
        roundStatusText.textContent = `It's a tie! You both chose ${hand[humanChoice]}!`;
    }
    return;
}

const playGame = () => {
    roundIndicatorUI.textContent = `Round ${round + 1} of 3`;
    playRound(humanChoice, getComputerChoice());
    if (round === 2) {
        if (humanScore > computerScore) {
            gameStatusText.textContent = "You win the game!";
        } else if (humanScore < computerScore) {
            gameStatusText.textContent =  "You lose the game!";
        } else {
            gameStatusText.textContent = "You tied for this game!";
        }
    } 
    round++; 
}

