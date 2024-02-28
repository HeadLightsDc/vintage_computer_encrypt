/*-------------------------------Definición de elementos HTML--------------------------------*/
let isOnButton = document.getElementById('power_button'); //Se necesita invertir el valor de isOnButton para mejor legibilidad.
let isOnButtonMobile = document.getElementById('power_button_mobile');
let displayMainWindow = document.querySelector('.main_container__main_window');
let displaySecondaryWindow = document.querySelector('.main_container__secondary_window');
let displayAlertNotAllowed = document.querySelector('.main_container__secondary_window__alert');
let displayGameWindow = document.querySelector('.main_container__game_window');
let textArea = document.getElementById('main_container__secondary_window__input_text');
let containerButtonsSecondaryWindow = document.querySelector('.main_container__secondary_window__buttons_container');
let secondButton = containerButtonsSecondaryWindow.children[1]; //Cambiar nombre de variable?
let backToMenuButton = containerButtonsSecondaryWindow.children[0];

/*-------------------------------------------------------------------------------------------*/

/*--------------------------------Encendido Macintosh/iPhone---------------------------------*/
function turnOnOffDevice(isOn){
    if (isOn){
        displayMainWindow.style.visibility = 'visible';
        showMainWindow(); //Vuelve a la pantalla de inicio
    } else {
        displayMainWindow.style.visibility = 'hidden';
        showMainWindow(); //Vuelve a la pantalla de inicio
    }
}

isOnButton.addEventListener('click', function() {
    turnOnOffDevice(!(isOnButton.checked));
    isOnButtonMobile.checked = !(isOnButton.checked);
    resetSecondaryWindow();
  });
  
isOnButtonMobile.addEventListener('click', function() {
    turnOnOffDevice(isOnButtonMobile.checked);
    isOnButton.checked = !(isOnButtonMobile.checked);
    resetSecondaryWindow;
  });
/*-------------------------------------------------------------------------------------------*/

/*----------------------------------Audio Encendido/Loop-------------------------------------*/
let audioOnComputer = document.createElement('audio');
audioOnComputer.src = './rsc/sound/power_on_sound.wav';

let audioLoopComputer = document.createElement('audio');
audioLoopComputer.src = './rsc/sound/loop_computer_sound.wav';
audioLoopComputer.loop = true;
/*-------------------------------------------------------------------------------------------*/

/*------------------------------Display Inicio/Secundaria/Juego--------------------------------*/
let isEncrypt = false;

function showMainWindow(){
    displayMainWindow.style.display = 'flex';
    displaySecondaryWindow.style.display = 'none';
    displayAlertNotAllowed.style.display = 'none';
    displayGameWindow.style.display = 'none';
}

function showSecondaryWindow(bool){ 
    isEncrypt = bool;
    displayMainWindow.style.display = 'none';
    displaySecondaryWindow.style.display = 'flex';

    if (bool){
        secondButton.textContent = 'Encrypt';
        textArea.placeholder = 'Enter text to encrypt...';
    } else {
        secondButton.textContent = 'Decrypt';
        textArea.placeholder = 'Enter text to decrypt...';
    }
}

function resetSecondaryWindow(){
    btnCopy.remove();
    textArea.value = '';
    habiliteAlgorithm();
}

function showGameWindow(){
    displaySecondaryWindow.style.display = 'none';
    displayGameWindow.style.display = 'flex';
    document.addEventListener('keydown', handleKeyPress);
}

backToMenuButton.addEventListener('click', () =>{
    showMainWindow();
    resetSecondaryWindow();
});

/*-------------------------------------------------------------------------------------------*/

/*-----------------------------------Validacion de texto-------------------------------------*/
textArea.addEventListener('keyup', isValidText);

function isValidText() {
    let text = textArea.value;
    let isValid = /^[a-z\s]+$/.test(text); //Expresion Regular

    if (!isValid && textArea.value) {
        displayAlertNotAllowed.style.display = 'flex';
        secondButton.disabled = true;
        secondButton.classList.add('hover-activo');
        textArea.disabled = true;
        setTimeout(() => {
            displayAlertNotAllowed.style.display = 'none';
            habiliteAlgorithm();
        }, 3000);
        textArea.value = text.replace(/[^a-z\s]/g, '');
    }
}

function habiliteAlgorithm() {
    secondButton.disabled = false;
    secondButton.classList.remove('hover-activo');
    textArea.disabled = false;
}
/*-------------------------------------------------------------------------------------------*/

/*---------------------------------Encriptado/Desencriptado----------------------------------*/
const encryptCode = new Map([
    ['e','enter'],
    ['i','imes'],
    ['a','ai'],
    ['o','ober'],
    ['u','ufat'],
]);

function encrypt(text) {
    return text.replace(/[eioua]/g, match => encryptCode.get(match));
}

const decryptCode = new Map([
    ['enter', 'e'],
    ['imes', 'i'],
    ['ai', 'a'],
    ['ober', 'o'],
    ['ufat', 'u'],
]);

function decrypt(encryptedText) {
    return encryptedText.replace(/enter|imes|ai|ober|ufat/g, match => decryptCode.get(match));
}

function encryptOrDecrypt(){
    let result = '';

    if (textArea.value){

        if (isEncrypt){
            result = encrypt(textArea.value);
            textArea.placeholder = 'Text copied to clipboard! \n\nIf you want to continue encrypting: Enter text to encrypt...';
        } else {
            // Easter egg
            if (textArea.value === 'blockade') {
                showGameWindow();
                return
            }
            result = decrypt(textArea.value);
            textArea.placeholder = 'Text copied to the clipboard! \n\nIf you want to continue decrypting: Enter text to decrypt...';
        }
        containerButtonsSecondaryWindow.insertBefore(btnCopy, secondButton);
        secondButton.disabled = true;
        secondButton.classList.add('hover-activo');
        textArea.value = result;
        textArea.disabled = true;
    } else {
        textArea.placeholder = 'You must enter text to continue...';
    }
}
/*-----------------------------------------------------------------------------------------------*/

/*---------------------------------------Boton de Copiado----------------------------------------*/
let btnCopy = document.createElement('button');
btnCopy.textContent = 'Copy';
btnCopy.addEventListener('click', copyTextArea);


function copyTextArea(){
    navigator.clipboard.writeText(textArea.value);
    textArea.value = '';
    textArea.blur();
    btnCopy.remove();
    habiliteAlgorithm();
}
/*-----------------------------------------------------------------------------------------------*/

/*---------------------------------------Pantalla de Juego---------------------------------------*/
//Definicion de elementos HTML
const gameBorder = document.querySelector('.main_container__game_window__border');
const score = document.getElementById('game_score');
const highScoreText = document.getElementById('game_high_score');

// Variables de juego
let gridSizeColumns = 35;
let gridSizeRows = 24;
let snake = [{x: Math.floor(gridSizeColumns/2), y:Math.floor(gridSizeRows/2)}]; //position
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let isGameStarted = false;

// Dibujo de game map, snake, food y actualizacion de score
function draw(){
    gameBorder.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

function drawSnake(){
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        gameBorder.appendChild(snakeElement);
    });
}

// Creacion de elementos de juego
function createGameElement(tag, className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Setea el posicionamiento de snake, food
function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function drawFood(){
    const foodElement= createGameElement('div', 'food');
    setPosition(foodElement, food);
    gameBorder.appendChild(foodElement);
}

function generateFood(){
    const x = Math.floor(Math.random() * gridSizeColumns) + 1;
    const y = Math.floor(Math.random() * gridSizeRows) + 1;
    return {x, y};
}

function moveSnake() {
    const headSnake = {...snake[0]};
    switch (direction) {
        case 'up':
            headSnake.y--;
            break;
        case 'down':
            headSnake.y++;
            break;
        case 'right':
            headSnake.x++;
            break;
        case 'left':
            headSnake.x--;
            break;
    }
    snake.unshift(headSnake); //Ilusion de movimiento agregando un cuadro 

    if (headSnake.x === food.x && headSnake.y === food.y){
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            moveSnake();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }
}

function startGame(){
    isGameStarted = true;
    gameInterval = setInterval(() => {
        moveSnake();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}

// Keypress event listener
function handleKeyPress(event) {
    console.log(event);
    if (
        (!isGameStarted && event.code === 'Space') || 
        (!isGameStarted && event.code === ' ')
    ) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
}

function increaseSpeed() {
    //   console.log(gameSpeedDelay);
    if (gameSpeedDelay > 150) {
      gameSpeedDelay -= 5;
    } else if (gameSpeedDelay > 100) {
      gameSpeedDelay -= 3;
    } else if (gameSpeedDelay > 50) {
      gameSpeedDelay -= 2;
    } else if (gameSpeedDelay > 25) {
      gameSpeedDelay -= 1;
    }
  }

  function checkCollision() {
    const headSnake = snake[0];
  
    if (headSnake.x < 1 || headSnake.x > gridSizeColumns || headSnake.y < 1 || headSnake.y > gridSizeRows) {
      resetGame();
    }
  
    for (let i = 1; i < snake.length; i++) {
      if (headSnake.x === snake[i].x && headSnake.y === snake[i].y) {
        resetGame();
      }
    }
  }

  function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{x: Math.floor(gridSizeColumns/2), y:Math.floor(gridSizeRows/2)}];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore();
  }
  
  function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');
  }
  
  function stopGame() {
    clearInterval(gameInterval);
    isGameStarted = false;
  }
  
  function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
      highScore = currentScore;
      highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
  }
/*-----------------------------------------------------------------------------------------------*/