const Caesar = {
  chars: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?<>(){}&%^#:=+-*/'"`.split(''),
  encrypt: function(strings, type) {
    // Split the plain text first into array
    let plain_text = strings.split('');
    
    // Set the key that used to encrypt
    let key;
    let allComb = false;
    switch (type) {
      case "c1":
        key = 2;
        break;
      case "c2":
        key = -3;
        break;
      case "c3":
        key = 5;
        break;
      case "cAll":
        key = 2;
        allComb = true;
        break;
    }

    // Encrypt plain text with combination
    let cipher_text = [];
    for (let i = 0; i < plain_text.length; i++) {
      let noMatch = true;
      for (let j = 0; j < this.chars.length; j++) {
        if (plain_text[i] === this.chars[j]) {
          if (key != -3 && (j + key) > (this.chars.length-1)) {
            cipher_text.push(this.chars[(j + key) - this.chars.length]);
          } else if (key == -3 && (j + key) < 0) {
            cipher_text.push(this.chars[(j + key) + this.chars.length]);
          } else {
            cipher_text.push(this.chars[j + key]);
          }
          noMatch = false;
          break;
        }
      }
      if (noMatch) {cipher_text.push(plain_text[i]);}

      // If it's all combination, then the key will shift every plain text char
      if (allComb) {
        switch (key) {
          case 2:
            key = 3;
            break;
          case 3:
            key = 5;
            break;
          case 5:
            key = 2;
            break;
        }
      }
    }

    // Return value
    return cipher_text.join('');
  },
  decrypt: function(strings, type) {
    // Split the cipher text first into array
    let cipher_text = strings.split('');
    
    // Set the key that used to decrypt
    let key;
    let allComb = false;
    switch (type) {
      case "c1":
        key = 2;
        break;
      case "c2":
        key = -3;
        break;
      case "c3":
        key = 5;
        break;
      case "cAll":
        key = 2;
        allComb = true;
        break;
    }

    // Decrypt plain text with combination
    let plain_text = [];
    for (let i = 0; i < cipher_text.length; i++) {
      let noMatch = true;
      for (let j = 0; j < this.chars.length; j++) {
        if (cipher_text[i] === this.chars[j]) {
          if (key != -3 && (j - key) < 0) {
            plain_text.push(this.chars[(j - key) + this.chars.length]);
          } else if (key == -3 && (j - key) > (this.chars.length-1)) {
            plain_text.push(this.chars[(j - key) - this.chars.length]);
          } else {
            plain_text.push(this.chars[j - key]);
          }
          noMatch = false;
          break;
        }
      }
      if (noMatch) {plain_text.push(cipher_text[i]);}
      // If it's all combination, then the key will shift every cipher text char
      if (allComb) {
        switch (key) {
          case 2:
            key = 3;
            break;
          case 3:
            key = 5;
            break;
          case 5:
            key = 2;
            break;
        }
      }
    }

    // Return value
    return plain_text.join('');
  }
}

const Subtitution = {
  chars: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?<>(){}&%^#:=+-*/'" `.split(''),
  sub1: `%ts<i87ZfhAnEQT-LBSO2(FMp91qV'){Uv}&bJ>ax^.Dwm*NKRPW056zeYyGXI!kc,u=gC+"d4H?lj:3#/or_`,
  sub2: `fzu1aiXt+FkYqE%?Md!B7Z=Q(-26&b^W}TgRVl:*GCyIhpe5crox3PL0DK>)jU{n#NS/'v94mHA,Jws<".8O_`,
  sub3: `Zx%kQo8XWe0)fJ,A^sHvhSL{R>&"/Y-ng7I'#U}Nm9<O!a*c:pbdT42wrt(.DG?ijqyzKE16luFCB+V=53PM_`,
  encrypt: function(strings, type) {
    // Split the plain text first into array
    let plain_text = strings.split('');
    
    // Set the key that used to encrypt
    let key;
    switch (type) {
      case "s1":
        key = [...this.sub1];
        break;
      case "s2":
        key = [...this.sub2];
        break;
      case "s3":
        key = [...this.sub3];
        break;
    }

    // Encrypt plain text with combination
    let cipher_text = [];
    for (let i = 0; i < this.chars.length; i++) {
      let noMatch = true;
      for (let j = 0; j < key.length; j++) {
        if (plain_text[i] === this.chars[j]) {
          cipher_text.push(key[j]);
          noMatch = false;
          break;
        }
      }
      if (noMatch && plain_text[i] === '\n') {
        cipher_text.push('~');
      } else if (noMatch) {
        cipher_text.push(plain_text[i]);
      }
    }

    // Return value
    return cipher_text.join('');
  },
  decrypt: function(strings, type) {
    // Split the plain text first into array
    let cipher_text = strings.split('');
    
    // Set the key that used to decrypt
    let key;
    switch (type) {
      case "s1":
        key = [...this.sub1];
        break;
      case "s2":
        key = [...this.sub2];
        break;
      case "s3":
        key = [...this.sub3];
        break;
    }

    // Decrypt plain text with combination
    let plain_text = [];
    for (let i = 0; i < this.chars.length; i++) {
      let noMatch = true;
      for (let j = 0; j < key.length; j++) {
        if (cipher_text[i] === key[j]) {
          plain_text.push(this.chars[j]);
          noMatch = false;
          break;
        }
      }
      if (noMatch && cipher_text[i] === `~`) {
        plain_text.push(`\n`);
      } else if (noMatch) {
        plain_text.push(cipher_text[i]);
      }
    }

    // Return value
    return plain_text.join('');
  }
}

const EB64 = {
	base64: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.split(''),
	chars: `3O^IR>QXFct&NjZA/B'y"5orD1lK!{0ME.6h,aT8:pPxfdWinC)?<uH=2s7gzmY(e+S}GU4LqJv-kVb%*w#9`,
  encrypt: function(strings) {
    // Encode and split it first into base64 encoding
    let plain_text = btoa(strings).split('');
    
    // Generate random key
    let key = Math.floor(Math.random() * 36 + 1);

    // Make a combination characters from a key
    let temp = [...this.chars];
    let combination = [];
    let all_index = (Math.floor(Math.tan((key+8) * (Math.PI / 180)) * 10000000000000000)).toString().split("");
    let currentIndex = 0;
    for (let i = 0; i < 4; i++) {
      for (let index of all_index) {
        for (let j = 0; j <= parseInt(index); j++) {
          currentIndex++;
          if (!(currentIndex < temp.length-1)) {
            currentIndex = 0;
          }
        }
        combination.push(temp[currentIndex]);
        temp.splice(currentIndex, 1);
      }
      // Add one more combination, so the total of characters combination is 65
      if (i == 3) {
        for (let j = 0; j < 5; j++) {
          currentIndex++;
          if (!(currentIndex < temp.length-1)) {
            currentIndex = 0;
          }
        }
        combination.push(temp[currentIndex]);
      }
    }

    // Encrypt plain text with combination
    let cipher_text = [];
    for (let i = 0; i < plain_text.length; i++) {
      for (let j = 0; j < this.base64.length; j++) {
        if (plain_text[i] === this.base64[j]) {
          cipher_text.push(combination[j]);
          break;
        }
      }
    }

    // Insert key inside cipher text
    let length = cipher_text.length;
    let insert = [...btoa(key)];
    for (let i = 3; i >= 0; i--) {
      cipher_text.splice(((length/4)*(i+1)), 0, insert[i]);
    }

    // Return value
    return cipher_text.join('');
  },
  decrypt: function(strings) {    
    // Split it first into array
    let cipher_text = [...strings];

    // Find the key that have already inserted
    let key = [];
    let length = (cipher_text.length - 4);
    for (let i = 0; i < 4; i++) {
      key.push(cipher_text[length/4*(i+1)])
      cipher_text.splice((length/4*(i+1)), 1);
    }
    key = parseInt(atob(key.join('')));

    // Make a combination characters from a key
    let temp = [...this.chars];
    let combination = [];
    let all_index = (Math.floor(Math.tan((key+8) * (Math.PI / 180)) * 10000000000000000)).toString().split("");
    let currentIndex = 0;
    for (let i = 0; i < 4; i++) {
      for (let index of all_index) {
        for (let j = 0; j <= parseInt(index); j++) {
          currentIndex++;
          if (!(currentIndex < temp.length-1)) {
            currentIndex = 0;
          }
        }
        combination.push(temp[currentIndex]);
        temp.splice(currentIndex, 1);
      }
      // Add one more combination, so the total of characters combination is 65
      if (i == 3) {
        for (let j = 0; j < 5; j++) {
          currentIndex++;
          if (!(currentIndex < temp.length-1)) {
            currentIndex = 0;
          }
        }
        combination.push(temp[currentIndex]);
      }
    }

    // Decrypt cipher text with combination
    let plain_text = [];
    for (let i = 0; i < cipher_text.length; i++) {
      for (let j = 0; j < combination.length; j++) {
        if (cipher_text[i] === combination[j]) {
          plain_text.push(this.base64[j]);
          break;
        }
      }
    }

    // Decode plain text using base64
    plain_text = atob(plain_text.join(''));

    // Return value
    return plain_text;
  }
}