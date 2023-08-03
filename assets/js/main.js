// Toggle Dark Mode

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
    document.body.classList.remove('darkmode');
  } else if (mode === 'dark') {
    document.body.classList.add('darkmode');
  }
}

toggle.addEventListener('click', (e) => {
  mode = e.target.checked ? 'dark' : 'light';
  localStorage.setItem('mode', mode);
  updateMode(mode);
})

updateMode(mode);

// Toggle Menu

document.getElementById('menu-toggle').addEventListener('click', (e) => {
  if (e.target.checked) {
    document.querySelector('header nav ul').classList.add('active');
  } else {
    document.querySelector('header nav ul').classList.remove('active');
  }
});

// Text Animation

let element = document.querySelector('#home p');
let text = ['Hello World!', 'Typing....', '2M?jdQb=', 'My name is,'];
let i = 1;

element.innerText = text[0];

setInterval(() => {
  element.innerText = text[i];
  if (i == (text.length - 1)) {
    i = 0;
  } else {
    i++;
  }
}, 4000);