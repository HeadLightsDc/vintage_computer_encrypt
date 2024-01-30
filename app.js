let isEncrypt = false;
let displayMainWindow = document.getElementsByClassName('main_container__main_window')[0];
let displaySecondaryWindow = document.getElementsByClassName('main_container__secondary_window')[0];

let isOnButton = document.getElementById('power_button');
console.log(isOnButton.checked);

function powerButton(){
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
}

function showSecondaryWindow(bool){ 
    // Modifica los valores de las ventanas, mostrando la ventana secundaria. Se modifica text de un boton y el placeholder del textArea
    isEncrypt = bool
    displayMainWindow.style.display = 'none';
    displaySecondaryWindow.style.display = 'flex';

    let containerButtons = document.getElementsByClassName('main_container__secondary_window__buttons_container')[0];

    let secondButton = containerButtons.children[1];

    let textArea = document.getElementsByClassName('main_container__secondary_window__input_text')[0];

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
    let textArea = document.getElementsByClassName('main_container__secondary_window__input_text')[0];

    if (isEncrypt){
        result = encrypt(textArea.value);

    } else {
        result = decrypt(textArea.value);
    }
    textArea.value = result;
}

const encryptCode = new Map([
    ['e','enter'],
    ['i','imes'],
    ['a','ai'],
    ['o','ober'],
    ['u','ufat'],
]);

function encrypt(msg){
    console.log(msg);
    console.log(typeof(msg));

    encryptMsg = '';
    
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

    decryptMsg = '';

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
