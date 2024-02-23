/*--------------------------------Encendido Macintosh/iPhone---------------------------------*/

//Se necesita invertir el valor de isOnButton para mejor legibilidad.
let isOnButton = document.getElementById('power_button');
isOnButton.addEventListener('click', function() {
    turnOnOffDevice(!(isOnButton.checked));
    isOnButtonMobile.checked = !(isOnButton.checked);
  });
  
let isOnButtonMobile = document.getElementById('power_button_mobile');
isOnButtonMobile.addEventListener('click', function() {
    turnOnOffDevice(isOnButtonMobile.checked);
    isOnButton.checked = !(isOnButtonMobile.checked);
  });

function turnOnOffDevice(isOn){
    if (isOn){
        displayMainWindow.style.visibility = 'visible';
        showMainWindow(); //Vuelve a la pantalla de inicio
    } else {
        displayMainWindow.style.visibility = 'hidden';
        showMainWindow(); //Vuelve a la pantalla de inicio
    }
}
/*-------------------------------------------------------------------------------------------*/

/*------------------------------Pantalla de Inicio/Secundaria--------------------------------*/
let displayMainWindow = document.querySelector('.main_container__main_window');
let displaySecondaryWindow = document.querySelector('.main_container__secondary_window');
let displayAlertNotAllowed = document.querySelector('.main_container__secondary_window__alert');
let isEncrypt = false;

function showMainWindow(){
        displayMainWindow.style.display = 'flex';
        displaySecondaryWindow.style.display = 'none';
        displayAlertNotAllowed.style.display = 'none';
        btn_copy.remove();
        textArea.value = '';
        habiliteAlgorithm();
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
/*-------------------------------------------------------------------------------------------*/

/*-----------------------------------Validacion de texto-------------------------------------*/
let textArea = document.getElementById('main_container__secondary_window__input_text');
textArea.addEventListener('keyup', isValidText);

let containerButtonsSecondaryWindow = document.querySelector('.main_container__secondary_window__buttons_container');
let secondButton = containerButtonsSecondaryWindow.children[1];

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
            result = decrypt(textArea.value);
            textArea.placeholder = 'Text copied to the clipboard! \n\nIf you want to continue decrypting: Enter text to decrypt...';
        }
        containerButtonsSecondaryWindow.insertBefore(btn_copy, secondButton);
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
let btn_copy = document.createElement('button');
btn_copy.textContent = 'Copy';
btn_copy.addEventListener('click', copyTextArea);


function copyTextArea(){
    navigator.clipboard.writeText(textArea.value);
    textArea.value = '';
    textArea.blur();
    btn_copy.remove();
    habiliteAlgorithm();
}
/*-----------------------------------------------------------------------------------------------*/