document.querySelectorAll('.menu-item__add').forEach(button => {
  button.addEventListener("click", addToBasket);
})

async function addToBasket(e) {
  e.preventDefault();

  const response = await fetch('http://localhost:5000/basket', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pizza: e.target.name })
  });
  const basket = await response.json();
  console.log(basket);
};
