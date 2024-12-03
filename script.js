function caesarCipher(text, shift) {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
  });
}

function rot13(text) {
  return caesarCipher(text, 13);
}

function base64Encode(text) {
  return btoa(text);
}

function base64Decode(text) {
  return atob(text);
}

function vigenereCipher(text, key, encrypt = true) {
  key = key.toUpperCase();
  let result = '';
  let keyIndex = 0;

  for (let char of text) {
    if (/[a-zA-Z]/.test(char)) {
      const shift = key.charCodeAt(keyIndex % key.length) - 65;
      result += caesarCipher(char, encrypt ? shift : 26 - shift);
      keyIndex++;
    } else {
      result += char;
    }
  }

  return result;
}

function atbashCipher(text) {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 90 : 122;
    return String.fromCharCode(base - (char.charCodeAt(0) - (base - 25)));
  });
}

function binaryEncode(text) {
  return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

function binaryDecode(text) {
  return text.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}

function encryptText() {
  const text = document.getElementById('inputText').value;
  const method = document.getElementById('cipherMethod').value;
  let result = '';

  switch (method) {
    case 'caesar':
      result = caesarCipher(text, 3); // Default shift for Caesar
      break;
    case 'rot13':
      result = rot13(text);
      break;
    case 'base64':
      result = base64Encode(text);
      break;
    case 'vigenere':
      result = vigenereCipher(text, 'KEY');
      break;
    case 'atbash':
      result = atbashCipher(text);
      break;
    case 'binary':
      result = binaryEncode(text);
      break;
  }

  document.getElementById('outputText').value = result;
}

function decryptText() {
  const text = document.getElementById('outputText').value;
  const method = document.getElementById('cipherMethod').value;
  let result = '';

  switch (method) {
    case 'caesar':
      result = caesarCipher(text, 23); // Decrypt with negative shift
      break;
    case 'rot13':
      result = rot13(text);
      break;
    case 'base64':
      result = base64Decode(text);
      break;
    case 'vigenere':
      result = vigenereCipher(text, 'KEY', false);
      break;
    case 'atbash':
      result = atbashCipher(text);
      break;
    case 'binary':
      result = binaryDecode(text);
      break;
  }

  document.getElementById('inputText').value = result;
}
