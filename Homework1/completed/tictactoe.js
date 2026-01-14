const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';
const HUMAN_IMAGE_URL = 'https://api.dicebear.com/7.x/avataaars/svg?seed=human';
const COMPUTER_IMAGE_URL = 'https://api.dicebear.com/7.x/bottts/svg?seed=computer';

let gameStarted = false;

function assignSpace(space, owner) 
{
  const image = document.createElement('img');
  image.src = owner === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(image);

  const index = parseInt(space.dataset.index);
  takenBoxes[index] = owner;
  const indexToRemove = freeBoxes.indexOf(space);
  freeBoxes.splice(indexToRemove, 1);
  space.removeEventListener('click', changeToX);
  console.log('freeBoxes left: ' + freeBoxes.length);
}

function changeToX(event) {
  if (!gameStarted) return;
  
  assignSpace(event.currentTarget, 'x');

  if (isGameOver()) {
    displayWinner();
  } else {
    computerChooseO();
  }
}

function computerChooseMove() {
  //return Math.floor(Math.random() * freeBoxes.length);
  // First, see if we can win in the next move
  for (let i = 0; i < freeBoxes.length; i++) {
    const box = freeBoxes[i];
    const index = parseInt(box.dataset.index);
    takenBoxes[index] = 'o';
    if (getWinner() === 'o') {
      delete takenBoxes[index];
      return i;
    }
    delete takenBoxes[index];
  }

  // Next, see if the player could win on their next move, and block them.
  for (let i = 0; i < freeBoxes.length; i++) {
    const box = freeBoxes[i];
    const index = parseInt(box.dataset.index);
    takenBoxes[index] = 'x';
    if (getWinner() === 'x') {
      delete takenBoxes[index];
      return i;
    }
    delete takenBoxes[index];
  }

  // Otherwise, pick a random move.
  return Math.floor(Math.random() * freeBoxes.length);
}

function computerChooseO() {
  const allBoxes  = document.querySelectorAll('#grid div');
  const index = computerChooseMove();
  
  const freeSpace = freeBoxes[index];

  assignSpace(freeSpace, 'o');

  if (isGameOver()) {
    displayWinner();
  }
}

function isGameOver() {
  var over = freeBoxes.length === 0 || getWinner() !== null;
  //console.log('Game over: ' + over);
  return over;
}

function displayWinner() {
  const winner = getWinner();

  const resultContainer = document.querySelector('#results');
  const messageContainer = document.createElement('div');
  messageContainer.style.display = 'flex';
  messageContainer.style.alignItems = 'center';
  messageContainer.style.justifyContent = 'center';
  messageContainer.style.gap = '10px';
  
  if (winner === 'x') {
    const playerImage = document.createElement('img');
    playerImage.src = HUMAN_IMAGE_URL;
    playerImage.alt = 'Human player';
    playerImage.style.width = '50px';
    playerImage.style.height = '50px';
    messageContainer.appendChild(playerImage);
    
    const text = document.createElement('h1');
    text.textContent = 'win!';
    text.style.margin = '0';
    messageContainer.appendChild(text);
  } else if (winner === 'o') {
    const computerImage = document.createElement('img');
    computerImage.src = COMPUTER_IMAGE_URL;
    computerImage.alt = 'Computer';
    computerImage.style.width = '50px';
    computerImage.style.height = '50px';
    messageContainer.appendChild(computerImage);
    
    const text = document.createElement('h1');
    text.textContent = 'wins';
    text.style.margin = '0';
    messageContainer.appendChild(text);
  } else {
    const header = document.createElement('h1');
    header.textContent = 'Tie';
    header.style.margin = '0';
    messageContainer.appendChild(header);
  }
  
  resultContainer.appendChild(messageContainer);

  // Remove remaining event listeners
  for (const box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}

function checkBoxes(one, two, three) {
  if (takenBoxes[one] !== undefined &&
      takenBoxes[one] === takenBoxes[two] &&
      takenBoxes[two] === takenBoxes[three]) {
    return takenBoxes[one];
  }
  console.log('takenBoxes:', takenBoxes);
  return null;
}

// Returns 'x', 'o', or null for no winner yet.
function getWinner() 
{
  for (let col = 0; col < 3; col++) {
    const offset = col * 3;
    // Check rows and columns.
    let result = checkBoxes(offset, 1 + offset, 2 + offset) ||
        checkBoxes(col, 3 + col, 6 + col);
    if (result) {
      return result;
    }
  }
  
  // Check diagonals
  return checkBoxes(0, 4, 8) || checkBoxes(2, 4, 6);
}

function startGame() {
  const firstPlayer = document.querySelector('#firstPlayer').value;
  const startButton = document.querySelector('#startButton');
  
  gameStarted = true;
  startButton.disabled = true;
  
  // If computer plays first, make its move
  if (firstPlayer === 'computer') {
    computerChooseO();
  }
}

function resetGame() {
  // Clear the board
  const boxes = document.querySelectorAll('#grid div');
  boxes.forEach(box => {
    box.innerHTML = '';
  });
  
  // Clear results
  const resultContainer = document.querySelector('#results');
  resultContainer.innerHTML = '';
  
  // Reset game state
  gameStarted = false;
  freeBoxes.length = 0;
  for (const key in takenBoxes) {
    delete takenBoxes[key];
  }
  
  // Re-add event listeners and rebuild freeBoxes
  boxes.forEach(box => {
    box.addEventListener('click', changeToX);
    freeBoxes.push(box);
  });
  
  // Re-enable start button
  const startButton = document.querySelector('#startButton');
  startButton.disabled = false;
}

const freeBoxes = [];
// Map of box number -> 'x' or 'o'
const takenBoxes = {};
const boxes = document.querySelectorAll('#grid div');
for (const box of boxes) {
  box.addEventListener('click', changeToX);
  freeBoxes.push(box);
}

// Add button listeners
const startButton = document.querySelector('#startButton');
startButton.addEventListener('click', startGame);

const resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', resetGame);
