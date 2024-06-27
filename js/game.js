const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'card1',
    'card2',
    'card3',
    'card4',
    'card5',
    'card6',
    'card7',
];

let firstCard = null;
let secondCard = null;
let canFlip = true;
let matchedCards = 0;
let timerInterval = null;
let currentTime = 0;

// Função para criar elementos HTML
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Função para reiniciar o jogo
const resetGame = () => {
    currentTime = 0;
    timer.innerHTML = currentTime;
    spanPlayer.innerHTML = localStorage.getItem('player');
    grid.innerHTML = ''; // Limpa o tabuleiro
    firstCard = null;
    secondCard = null;
    canFlip = true;
    matchedCards = 0;
    loadGame(); // Carrega o jogo novamente
    startTimer(); // Inicia o timer novamente
}

// Função para verificar o fim do jogo
const checkEndGame = () => {
    if (matchedCards === 14) {
        clearInterval(timerInterval);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
        resetGame(); // Chamada para reiniciar o jogo automaticamente
    }
}

// Função para verificar as cartas viradas
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.classList.add('disabled-card');
        secondCard.classList.add('disabled-card');
        firstCard = null;
        secondCard = null;
        matchedCards += 2;
        checkEndGame();
    } else {
        canFlip = false;
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = null;
            secondCard = null;
            canFlip = true;
        }, 1000);
    }
}

// Função para revelar uma carta
const revealCard = ({ target }) => {
    if (!canFlip || target.parentNode === firstCard || target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (!firstCard) {
        firstCard = target.parentNode;
        firstCard.classList.add('reveal-card');
    } else if (!secondCard) {
        secondCard = target.parentNode;
        secondCard.classList.add('reveal-card');
        checkCards();
    }
}

// Função para criar uma carta
const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

// Função para carregar o jogo
const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

// Função para iniciar o timer
const startTimer = () => {
    timerInterval = setInterval(() => {
        currentTime++;
        timer.innerHTML = currentTime;
    }, 1000);
}

// Evento onload para iniciar o jogo quando a página é carregada
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    loadGame();
    startTimer();
}
