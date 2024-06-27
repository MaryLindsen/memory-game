// scripts.js

// Cartas do jogo (pode ser substituído por imagens se preferir)
const cardArray = [
    { name: '🍎', id: 1 },
    { name: '🍎', id: 1 },
    { name: '🍌', id: 2 },
    { name: '🍌', id: 2 },
    { name: '🍇', id: 3 },
    { name: '🍇', id: 3 },
    { name: '🍓', id: 4 },
    { name: '🍓', id: 4 },
    { name: '🍉', id: 5 },
    { name: '🍉', id: 5 },
    { name: '🍋', id: 6 },
    { name: '🍋', id: 6 }
];

let firstCard, secondCard;
let lockBoard = false;
let hasFlippedCard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cardArray);
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    cardArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.name = card.name;
        
        cardElement.innerHTML = `
            <div class="front-face">${card.name}</div>
            <div class="back-face">?</div>
        `;
        board.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    createBoard();
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => card.addEventListener('click', flipCard));
}

document.getElementById('reset-button').addEventListener('click', resetGame);

// Inicializa o jogo
resetGame();

/*
JavaScript Functions and Concepts for Memory Game
    Card Array: An array of card objects with pairs of icons.
    Shuffle Function: A function to shuffle the cards using the Fisher-Yates algorithm.
    Create Board: A function to create the game board and distribute the shuffled cards.
    Flip Card: A function that handles the logic of flipping cards.
    Check For Match: Checks if the two flipped cards are a matching pair.
    Disable Cards: Removes the click events from the matched cards.
    Unflip Cards: Flips the cards back over if they do not match.
    Reset Board: Resets the board state.
    Reset Game: Resets the game and recreates the board.
*/
