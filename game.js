const hand = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

const getComputerChoice = () => {
    let randomNumber = Math.floor(Math.random() * hand.length);
    return randomNumber;
}

const getHumanChoice = () => {
    let humanChoice = prompt("Enter either rock, paper, or scissors", "rock");
    if (humanChoice === null) {
        console.log("I didn't get that, try again?");
    } else if (humanChoice.toLowerCase() === "") {
        console.log("Just give it a try! Enter a choice.")
    } else if (humanChoice.toLowerCase() === "rock") {
        return 0;
    } else if (humanChoice.toLowerCase() === "paper") {
        return 1;
    } else if (humanChoice.toLowerCase() === "scissors") {
        return 2;
    } else {
        console.log("That isn't a valid choice.")
    }
    getHumanChoice();
    return;
}

//console.log(getComputerChoice);
const playRound = (humanChoice, computerChoice) => {
    if (computerChoice - humanChoice === 1 || (humanChoice === 2 && computerChoice === 0)) {
        computerScore++;
        console.log(`You lose! ${hand[humanChoice]} doesn't beats ${hand[computerChoice]}`);
    } else if (humanChoice - computerChoice === 1 || (computerChoice === 2 && humanChoice === 0)) {
        humanScore++;
        console.log(`You win! ${hand[humanChoice]} beats ${hand[computerChoice]}`);
    } else if (humanChoice === computerChoice) {
        console.log(`It's a tie!`);
    }
    return;
}

const playGame = () => {
    for (i = 0; i < 3; i++) {
        playRound(getHumanChoice(), getComputerChoice());
    }
    if (humanScore > computerScore) {
        console.log("You win the game!");
    } else if (humanScore < computerScore) {
        console.log("You lose the game!");
    } else {
        console.log("You tied!");
    }
}

playGame();
