const encryptCode = new Map([
    ['e','enter'],
    ['i','imes'],
    ['a','ai'],
    ['o','ober'],
    ['u','ufat'],
]);

let isEncrypt = false;
let displayMainWindow = document.querySelector('.main_container__main_window');
let displaySecondaryWindow = document.querySelector('.main_container__secondary_window');
let textArea = document.getElementsByClassName('main_container__secondary_window__input_text')[0];
let containerButtonsSecondaryWindow = document.querySelector('.main_container__secondary_window__buttons_container');
let secondButton = containerButtonsSecondaryWindow.children[1];
let btn_copy = document.createElement('button');
btn_copy.textContent = 'Copy';
btn_copy.addEventListener('click', copyTextArea);

let isOnButton = document.getElementById('power_button');

function powerButton(){
    // Activa la interfaz del PC
    if (!(isOnButton.checked)){
        displayMainWindow.style.visibility = 'visible';
        showMainWindow();
    } else {
        displayMainWindow.style.visibility = 'hidden';
        showMainWindow();
    }
}

function showMainWindow(){
    // Modifica los valores del display de las ventanas, mostrando el menu principal 
        displayMainWindow.style.display = 'flex';
        displaySecondaryWindow.style.display = 'none';
        btn_copy.remove();
        textArea.value = '';
        habiliteAlgorithm();
}

function showSecondaryWindow(bool){ 
    // Modifica los valores de las ventanas, mostrando la ventana secundaria. Se modifica text de un boton y el placeholder del textArea
    isEncrypt = bool
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

function encryptOrDecrypt(){
    let result = '';

    if (textArea.value){
        if (isEncrypt){
            result = encrypt(textArea.value);
            textArea.placeholder = 'Text copied to clipboard! \n\nIf you want to continue encrypting: Enter text to encrypt...';
        } else {
            result = decrypt(textArea.value);
            textArea.placeholder = 'Text copied to the clipboard! \n\nIf you want to continue decrypting: Enter text to decrypt...'
        }
        containerButtonsSecondaryWindow.insertBefore(btn_copy, secondButton);
        secondButton.disabled = true;
        secondButton.classList.add('hover-activo');
        textArea.value = result;
        textArea.disabled = true;
    } else {
        textArea.placeholder = 'You must enter text to continue...'
    }
}

function encrypt(msg){
    let encryptMsg = '';
    
    for (let i = 0; i < msg.length; i++){
        if (encryptCode.has(msg.charAt(i))){
            encryptMsg += encryptCode.get(msg.charAt(i));
        } else {
            encryptMsg += msg.charAt(i);
        }
    }
    return encryptMsg;
}

function decrypt(msg){

    let decryptMsg = '';

    for (let i = 0; i < msg.length; i++){
        if (encryptCode.has(msg.charAt(i))){
            decryptMsg += msg.charAt(i);
            i += ((encryptCode.get(msg.charAt(i))).length)-1; 
        } else {
            decryptMsg += msg.charAt(i);
        }
    }
    return decryptMsg;
}

function copyTextArea(){
    textArea.select();
    document.execCommand('copy');
    textArea.value = '';
    textArea.blur();
    btn_copy.remove();
    habiliteAlgorithm();
}

function habiliteAlgorithm(){
    secondButton.disabled = false;
    secondButton.classList.remove('hover-activo');
    textArea.disabled = false;
}