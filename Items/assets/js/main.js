// responsive navigation
document.getElementById('toggle-menu').addEventListener('click', () => {
  document.querySelector('nav ul').classList.toggle('active');
})

// dropdown function
let dropdowns = document.getElementsByClassName('dropdown')

for (let dropdown of dropdowns) {
  dropdown.addEventListener('click', () => {
    dropdown.lastElementChild.classList.toggle('active');
    for (let list of dropdown.lastElementChild.children) {
      list.addEventListener('click', (e) => {
        dropdown.firstElementChild.innerText = e.target.innerText;
        updateDisplay();
      })
    }
  })
}

// dark & light mode
let mode = "light";

if (storageSupport) {
  if (localStorage.getItem(CACHE_KEY[2]) !== null) {
    mode = localStorage.getItem(CACHE_KEY[2]);
  } else {
    localStorage.setItem(CACHE_KEY[2], mode);
  }
}

function updateMode(mode) {
  if (mode === "light") {
    document.body.style.setProperty('--uiColor1', '#f76e11');
    document.body.style.setProperty('--uiColor2', '#ff9f45');
    document.body.style.setProperty('--uiColor3', '#ffbc80');
    document.body.style.setProperty('--bgColor1', '#ffffff');
    document.body.style.setProperty('--bgColor2', '#f7f7f7');
    document.body.style.setProperty('--txtTheme', '#151515');
    document.body.style.setProperty('--plcHover', '#525151');
  } else if (mode === "dark") {
    document.body.style.setProperty('--uiColor1', '#6d1900');
    document.body.style.setProperty('--uiColor2', '#8d2a00');
    document.body.style.setProperty('--uiColor3', '#a93e00');
    document.body.style.setProperty('--bgColor1', '#212121');
    document.body.style.setProperty('--bgColor2', '#424242');
    document.body.style.setProperty('--txtTheme', '#ffffff');
    document.body.style.setProperty('--plcHover', '#d1cece');
  }
}

document.getElementById('toggle-mode').addEventListener('click', () => {
  switch (mode) {
    case "light":
      mode = "dark";
      break;
    case "dark":
      mode = "light";
      break;
  }

  localStorage.setItem(CACHE_KEY[2], mode);

  updateMode(mode);
})

updateMode(mode);