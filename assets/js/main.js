// Toggle Dark Mode

let mode = 'light';
const toggle = document.getElementById('toggle-mode');

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

element.addEventListener("animationiteration", (e) => {
  if (e.animationName === "typewriter" && e.pseudoElement === "::before") {
    element.innerText = text[i];
    if (i == (text.length - 1)) {
      i = 0;
    } else {
      i++;
    }
  }
});

// Slice title

document.querySelectorAll('.title').forEach(e => {
  let sliced_text = e.innerText.split('');
  e.innerHTML = '<span translate="no">' + sliced_text.join('</span><span translate="no">') + '</span>';
})

// Tilt Card

VanillaTilt.init(document.querySelectorAll(".card"), {
  glare: true,
  "max-glare": 0.5
});

// EmailJS for Contact Me
(function(){
  emailjs.init("SaF0lnzFSeXz8fh32");
})();

const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function(event) {
   event.preventDefault();

   if (confirm("Do you want to send this email?")) {
    btn.innerText = 'Sending...';

    const serviceID = 'service_3otccbb';
    const templateID = 'template_5cmbhli';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        console.log('Sent!');
      }, (err) => {
        console.log(JSON.stringify(err));
      })
      .finally(() => {btn.innerText = 'Submit';});
   }
});