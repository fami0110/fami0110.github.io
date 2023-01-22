// Local storage key
const storageSupport = (typeof(Storage) !== "undefined");
const numberFormat = new Intl.NumberFormat(['ban', 'id']);
const CACHE_KEY = ['item_stored', 'item_cart', "mode"];
let items = [];
let cart = [];

// Item object constructor
function Item(a, b, c) {
  this.type = a;
  this.name = b;
  this.price = c;
  this.amount = 0;
}
// Importing data from local storage
if (storageSupport) {
  if (localStorage.getItem(CACHE_KEY[0]) !== null) {
    items = JSON.parse(localStorage.getItem(CACHE_KEY[0]));
  }
  if (localStorage.getItem(CACHE_KEY[1]) !== null) {
    cart = JSON.parse(localStorage.getItem(CACHE_KEY[1]));
  }
} else {
  alert("Sorry, your browser seems don't support web storage...")
}

// Add item function
function addItem(data) {
  // Check if item has already added or not
  for (let item of items) {
    if (data.name === item.name) {
      alert(`"${data.name}" was already added!`);
      return;
    }
  }

  items.push(data);

  if (storageSupport) {
    localStorage.setItem(CACHE_KEY[0], JSON.stringify(items));
  }
  alert(`${data.name} was added!`);
}

// Delete item function
function deleteItem(data) {
  items.splice(items.findIndex(item => item.name === data), 1);
  cart.splice(cart.indexOf(data), 1);

  if (storageSupport) {
    localStorage.setItem(CACHE_KEY[0], JSON.stringify(items));
    localStorage.setItem(CACHE_KEY[1], JSON.stringify(cart));
  }
  alert(`${data} was deleted!`);
}

// Delete all items event
document.getElementById('delete').addEventListener('click', () => {
  if (confirm(`Are you sure want to delete all items?`)) {
    items = [];
    cart = [];

    if (storageSupport) {
      localStorage.setItem(CACHE_KEY[0], JSON.stringify(items));
      localStorage.setItem(CACHE_KEY[1], JSON.stringify(cart));
    }
    alert(`all items was deleted!`);

    updateDisplay();
  }
})

// Add item amount function
function setAmountOf(data, value) {
  items.find(item => item.name === data).amount = value;
  
  // Add the item to cart
  if (!cart.includes(data) && value !== 0) {
    cart.push(data);
  } else if (cart.includes(data) && value === 0) {
    cart.splice(cart.indexOf(data), 1);
  }

  if (storageSupport) {
    localStorage.setItem(CACHE_KEY[0], JSON.stringify(items));
    localStorage.setItem(CACHE_KEY[1], JSON.stringify(cart));
  }
}

// Clear all item amount event
document.getElementById('clear').addEventListener('click', () => {
  if (confirm(`Clear all amount of items?`)) {
    if (cart.length !== 0) {
      for (let item of items) {
        item.amount = 0;
      }
      cart = [];

      if (storageSupport) {
        localStorage.setItem(CACHE_KEY[0], JSON.stringify(items));
        localStorage.setItem(CACHE_KEY[1], JSON.stringify(cart));
      }
      alert(`Item amount was cleared!`);
    } else {
      alert(`Item amount was already clear!`);
    }

    updateDisplay();
  }
})

// Update Event
function updateEvent() {
  // Placeholder elements
  let addBtn = document.getElementById('addItem');
  let inputType = document.getElementById('addType');
  let inputName = document.getElementById('addName');
  let inputPrice = document.getElementById('addPrice');

  // Add item validation
  addBtn.addEventListener('mouseover', () => {
    if (inputName.value != '' && inputPrice.value != '') {
      addBtn.setAttribute('disable', 'false');
      addBtn.classList.add('valid');
    } else {
      addBtn.classList.remove('valid');
      addBtn.setAttribute('disable', 'true');
    }
  })

  // Add item click event
  addBtn.addEventListener('click', () => {
    if (addBtn.attributes.disable.value === 'false') {
      addItem(new Item(inputType.value, inputName.value, inputPrice.value));
      updateDisplay();
    }
  })

  // Item elements
  let deleteButtons = document.querySelectorAll('button.close');
  let countButtons = document.querySelectorAll('button.count');
  let itemsAmount = document.querySelectorAll('input.counter');

  // Delete item click event
  for (let deleteButton of deleteButtons) {
    deleteButton.addEventListener('click', () => {
      const item = deleteButton.parentElement.children[2].innerText;
      if (confirm(`Are you sure want to delete ${item}?`)) {
        deleteItem(item);
        updateDisplay();
      }
    })
  }

  // Count item click event
  for (let countButton of countButtons) {
    countButton.addEventListener('click', (e) => {
      let dataTarget = countButton.parentElement.previousElementSibling.previousElementSibling.innerText;

      switch (countButton.innerText) {
        case '+':
          if (countButton.previousElementSibling.valueAsNumber < 999) {
            countButton.previousElementSibling.valueAsNumber++;
            setAmountOf(dataTarget, countButton.previousElementSibling.valueAsNumber);
          }
          break;
        case '-':
          if (countButton.nextElementSibling.valueAsNumber > 0) {
            countButton.nextElementSibling.valueAsNumber--;
            setAmountOf(dataTarget, countButton.nextElementSibling.valueAsNumber);
          }
          break;
      }

      updateCart();
    })
  }

  // Counter onchange event
  for (let itemAmount of itemsAmount) {
    itemAmount.addEventListener('change', () => {
      let dataTarget = itemAmount.parentElement.previousElementSibling.previousElementSibling.innerText;

      if (itemAmount.valueAsNumber < 0 && itemAmount.valueAsNumber > 999) {
        itemAmount.valueAsNumber = 0;
      }
      setAmountOf(dataTarget, itemAmount.valueAsNumber);

      updateCart();
    })
  }
}

// Update cart
function updateCart() {
  let total = 0;

  let tBody = document.querySelector('#total tbody');
  tBody.innerHTML = "";

  for (let id of cart) {
    let item = items.find(item => item.name === id);

    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
			<td>Rp ${numberFormat.format(item.price)}</td>
			<td>${item.amount}</td>
			<td>Rp ${numberFormat.format(item.price * item.amount)}</td>
    `;

    tBody.appendChild(row);

    total += item.price * item.amount; // Sum all subtotal
  }

  // Display total
  document.querySelector('#total tfoot td:last-child').innerText = `Rp ${numberFormat.format(total)}`;
}

// Update display
function updateDisplay() {
  let itemList = document.getElementsByClassName('item-list')[0];
  itemList.innerHTML = "";

  let itemsThatWillDisplayed = items;
  let itemFilter = document.querySelector('.item-filter h3').innerText;

  if (itemFilter === 'Food') {
    itemsThatWillDisplayed = items.filter(item => item.type === 'food');
  } else if (itemFilter === 'Drink') {
    itemsThatWillDisplayed = items.filter(item => item.type === 'drink');
  } else if (itemFilter === 'Other Items') {
    itemsThatWillDisplayed = items.filter(item => item.type === 'other');
  }

  for (let item of itemsThatWillDisplayed) {
    let card = document.createElement('div');
    card.className = `card ${item.type}`;
    card.innerHTML = `
      <button type="button" class="close">x</button>
      <i class="icon"></i>
      <h3>${item.name}</h3>
      <h4>Rp. ${numberFormat.format(item.price)}</h4>
      <div class="add">
        <button type="button" class="count" translate="no">-</button>
        <input type="number" class="counter" value="${item.amount}" min="0" max="999" />
        <button type="button" class="count" translate="no">+</button>
      </div>
    `;

    itemList.appendChild(card);
  }
  
  // placeholder at the end of list
  let placeholder = document.createElement('div');
  placeholder.className = `card placeholder`;
  placeholder.innerHTML = `
    <button type="button" class="material-icons" id="addItem">&#xe147;</button>
    <select id="addType">
      <option value="food">Food</option>
      <option value="drink">Drink</option>
      <option value="other">Other Items</option>
    </select>
    <input type="text" id="addName" placeholder="Name Item" />
    <input type="number" id="addPrice" min="0" placeholder="Item Price" />
  `;

  itemList.appendChild(placeholder);

  updateEvent();
  updateCart();
}

updateDisplay(); // Update display right after page loaded