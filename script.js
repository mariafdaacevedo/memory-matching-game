const images = [
    'img1.png', 'img1.png',
    'img2.png', 'img2.png',
    'img3.png', 'img3.png',
    'img4.png', 'img4.png',
    'img5.png', 'img5.png',
    'img6.png', 'img6.png',
    'img7.png', 'img7.png',
    'img8.png', 'img8.png'
];

let board = document.querySelector('.board');
let startButton = document.getElementById('start-button');
let completed = document.getElementById('completed');
let remaining = document.getElementById('remaining');

let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    board.innerHTML = '';
    shuffle(images);
    images.forEach(image => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        let img = document.createElement('img');
        img.src = image;
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    let [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
        matchedPairs++;
        completed.textContent = matchedPairs;
        remaining.textContent = 8 - matchedPairs;

        flippedCards = [];
        if (matchedPairs === 8) {
            alert('¡Felicidades, has ganado!');
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

startButton.addEventListener('click', () => {
    matchedPairs = 0;
    completed.textContent = matchedPairs;
    remaining.textContent = 8;
    createBoard();
});