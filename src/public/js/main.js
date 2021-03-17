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
  const response = await fetch('https://pizzadominos.herokuapp.com/basket', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: e.target.name })
  });

  const data = await response.json();
  const orderQty = data.basket.totalItems;
  const price = data.basket.total;
  updateBasket(orderQty, price)
};

function updateBasket(orderQty, orderPrice) {
  document.querySelector('.basket-quantity').textContent = orderQty;
  document.querySelector('.basket-amount').innerHTML = `£${orderPrice}`;
}

function orderPage() {
  document.querySelector(".submenu-heading__main--basket").onclick = () => {
    location.href = "https://pizzadominos.herokuapp.com/order"
  }
}

onReady(init);
