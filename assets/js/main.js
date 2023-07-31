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