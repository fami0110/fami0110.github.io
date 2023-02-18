// Toggle dark mode
let mode = 'light';
const toggle = document.getElementById('toggle-check');

if (typeof(Storage) !== 'undefined') {
  if (localStorage.getItem('mode') !== null) {
    mode = localStorage.getItem('mode');
  } else {
    localStorage.setItem('mode', mode);
  }
}

toggle.checked = mode === 'dark' ? true : false; // To change the toggle check is true if the setting is in dark mode

function updateMode(mode) {
  if (mode === 'light') {
    document.body.style.setProperty('--bg-Theme', '#ffffff');
    document.body.style.setProperty('--ui-Color1', '#0e1b2b');
    document.body.style.setProperty('--ui-Color2', '#1e3f66');
    document.body.style.setProperty('--ui-Color3', '#2e5984');
    document.body.style.setProperty('--ui-Color4', '#528aae');
    document.body.style.setProperty('--txt-Theme', '#151515');
  } else if (mode === 'dark') {
    document.body.style.setProperty('--bg-Theme', '#212121');
    document.body.style.setProperty('--ui-Color1', '#162238');
    document.body.style.setProperty('--ui-Color2', '#182841');
    document.body.style.setProperty('--ui-Color3', '#203354');
    document.body.style.setProperty('--ui-Color4', '#2a4470');
    document.body.style.setProperty('--txt-Theme', '#ffffff');
  }
}

toggle.addEventListener('click', (e) => {
  mode = e.target.checked ? 'dark' : 'light';
  localStorage.setItem('mode', mode);
  updateMode(mode);
})

updateMode(mode);




// Main tool section
const process = document.getElementById('process');
const reset = document.getElementById('reset');
const input = document.getElementById('text-input');
const output = document.getElementById('text-output');
const iteration = document.getElementById('iteration');

input.addEventListener('input', () => {
  if (input.value !== '') {
    process.disabled = false;
  } else {
    process.disabled = true;
  }
})

iteration.addEventListener('change', () => {
  if (parseInt(iteration.value) > 10) {
    console.log('lebih besar dari 10')
    iteration.value = '10';
  } else if (parseInt(iteration.value) < 1) {
    console.log('lebih kecil dari 1')
    iteration.value = '0';
  }
})

process.addEventListener('click', () => {
  let method = document.getElementById('method').value;
  let key = document.getElementById('key').value;
  let itr = parseInt(iteration.value);

  let processedText = input.value;
  for (let i = 0; i < itr; i++) {
    if (method == 'encryption') {
      if (key == 'c1' || key == 'c2' || key == 'c3' || key == 'cAll') {
        processedText = Caesar.encrypt(processedText, key);
      } else if (key == 's1' || key == 's2' || key == 's3') {
        processedText = Subtitution.encrypt(processedText, key);
      } else if (key == 'EB64') {
        processedText = EB64.encrypt(processedText);
      }
    } else if (method == 'decryption') {
      if (key == 'c1' || key == 'c2' || key == 'c3' || key == 'cAll') {
        processedText = Caesar.decrypt(processedText, key);
      } else if (key == 's1' || key == 's2' || key == 's3') {
        processedText = Subtitution.decrypt(processedText, key);
      } else if (key == 'EB64') {
        try {
          processedText = EB64.decrypt(processedText);
        } catch (error) {
          processedText = '';
          output.dataset.content = "Error : can't decrypt, that's not a chiper text";
          break;
        }
      }
    }
  }

  output.innerText = processedText;
})

reset.addEventListener('click', () => {
  input.value = '';
  output.innerHTML = '';
  output.dataset.content = "Output will be here";
  process.disabled = true;
})

// Copy and paste button
const copy = document.getElementById('copy');
const paste = document.getElementById('paste');

copy.addEventListener('click', () => {
  navigator.clipboard.writeText(output.innerText)
    .then(() => {
      copy.classList.remove('popup');
      setTimeout(() => {copy.classList.add('popup');}, 50);
    });
})

paste.addEventListener('click', () => {
  input.select();
  navigator.clipboard.readText()
    .then(cliptext => {
      input.value = cliptext;
      process.disabled = cliptext == '' ? true : false;
      paste.classList.remove('popup');
      setTimeout(() => {paste.classList.add('popup');}, 50);
    });
  window.getSelection().removeAllRanges();
})