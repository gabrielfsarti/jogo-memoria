const cardImages = [
    '🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍊', '🍍'
  ];
  
  let cards = [...cardImages, ...cardImages]; // duplicar as imagens para pares
  cards = shuffle(cards); // embaralha as cartas
  
  let flippedCards = [];
  let matchedPairs = 0;
  
  const gameBoard = document.getElementById('game-board');
  
  function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.textContent = ''; // conteúdo vazio antes da carta ser virada
    card.addEventListener('click', flipCard); // add o event listener para virar a carta
    return card;
  }
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function flipCard() {
    if (flippedCards.length === 2) return; // so duas cartas viradas ao mesmo tempo
  
    const card = this;
    card.classList.add('flip'); // vai virar a carta
    card.textContent = card.dataset.value; // vai exibir o valor da carta
    flippedCards.push(card); // vai add a carta virada no array de cartas viradas
  
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000); // vai verificar se as cartas viradas são um par depois de 1s
    }
  }
  
  function checkMatch() {
    const [card1, card2] = flippedCards;
  
    if (card1.dataset.value === card2.dataset.value) {
      card1.classList.add('matched'); // marca as cartas como combinadas
      card2.classList.add('matched');
      matchedPairs++;
    } else {
      card1.classList.remove('flip'); 
      card2.classList.remove('flip');
      card1.textContent = ''; 
      card2.textContent = '';
    }
  
    flippedCards = []; // aqui vai resetar o array de cartas viradas
  
    if (matchedPairs === cardImages.length) {
      setTimeout(() => {
        alert('Você ganhou!');
      }, 500); // fim (vitoria)
    }
  }
  
  function startGame() {
    cards.forEach(value => {
      const card = createCard(value); // cria as cartas no dom
      gameBoard.appendChild(card); // add as cartas no tabuleiro
    });
  }
  
  startGame(); // comeca o jogo
  