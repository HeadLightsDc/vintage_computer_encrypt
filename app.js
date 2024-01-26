const encryptCode = new Map([
    ['e','enter'],
    ['i','imes'],
    ['a','ai'],
    ['o','ober'],
    ['u','ufat'],
]);

console.log(typeof(encryptCode))

function encrypt(msg){

    encryptMsg = '';
    
    for (let i = 0; i < msg.length; i++){
        if (encryptCode.has(msg.charAt(i))){
            encryptMsg += encryptCode.get(msg.charAt(i));
        } else {
            encryptMsg += msg.charAt(i);
        }
    }
    console.log(encryptMsg);
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
    console.log(decryptMsg);
}

encrypt('Hola');
decrypt('fenterlimescimesdaidenters poberr enternfrenterntair enterstenter dentersaifimesober y haibenterrlober cobernclufatimesdober cobern enterximestober!');

