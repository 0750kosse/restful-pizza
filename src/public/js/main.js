const onReady = (callback) => {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

function init() {
  addEventListeners();
}

function addEventListeners() {
  document.querySelectorAll('.menu-item__add').forEach(button => {
    button.addEventListener("click", addToBasket);
  })
}

async function addToBasket(e) {
  e.preventDefault();

  const response = await fetch('http://localhost:5000/basket', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: e.target.name })
  });
  const data = await response.json();

  console.log('items numbers', data.basket.length);
  console.log("RESPONSE: ", JSON.stringify(data, null, 2))
};

onReady(init);
