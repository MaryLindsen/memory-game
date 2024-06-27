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
        cardElement.dataset.id = card.id; // Adicionando o ID como dataset
        
        cardElement.innerHTML = `
            <div class="front-face">${card.name}</div>
            <div class="back-face">?</div>
        `;
        cardElement.addEventListener('click', flipCard); // Adicionando evento de clique
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
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.addEventListener('click', flipCard);
    });
    shuffle(cardArray);
    setTimeout(() => {
        createBoard();
    }, 500);
}

document.getElementById('reset-button').addEventListener('click', resetGame);

// Inicialização do tabuleiro ao carregar a página
document.addEventListener('DOMContentLoaded', createBoard);
