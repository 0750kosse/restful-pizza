const express = require('express');
const router = express.Router();
const paths = require('./paths');
const fetch = require('node-fetch');

async function fetchMenu() {
  let response = await fetch('https://manolopizza.herokuapp.com/api/menu');
  let data = await response.json();
  let productArray = await data.product;
  return productArray
}

function getHome(req, res, next) {
  res.render('home', { title: 'Your pizza place' })
}

async function getMenu(req, res, next) {
  let productList = await fetchMenu();
  let pizzas = productList.filter((item) => item.category === "Pizza");
  let sides = productList.filter((item) => item.category === "Sides");
  let desserts = productList.filter((item) => item.category === "Desserts");
  let drinks = productList.filter((item) => item.category === "Bebidas");
  res.render('menu', {
    title: 'Your pizza place',
    pizzaCat: pizzas,
    sidesCat: sides,
    dessertsCat: desserts,
    drinksCat: drinks,
    basket: req.session.basket,
    total: req.session.total || 0,
    amount: req.session.basket ? req.session.basket.length : 0
  });
}

async function getMenuItemByName(name) {
  let productList = await fetchMenu();
  return productList.filter((item) => item.name === name);
}

function getOrder(req, res, next) {
  res.render('order');
}

function getContact(req, res, next) {
  res.render('contact');
}

async function postBasket(req, res, next) {
  const apiItem = await getMenuItemByName(req.body.name);
  let newBasket;

  const item = await {
    name: apiItem[0].name,
    quantity: 1
  }

  if (req.session.basket) {
    newBasket = [...req.session.basket, item]
  } else {
    newBasket = [item]
  }

  req.session.basket = newBasket
  req.session.total = req.session.total ? req.session.total + apiItem[0].price : apiItem[0].price
  let newBasketQty = newBasket.length;

  res.send({
    basket: req.session.basket,
    quantity: newBasketQty,
    price: req.session.total
  })
}

router.get(paths.home, getHome);
router.get(paths.menu, getMenu);
router.get(paths.order, getOrder);
router.get(paths.contact, getContact);

router.post(paths.basket, postBasket);

module.exports = router;

