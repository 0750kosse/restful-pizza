const express = require('express');
const router = express.Router();
const paths = require('./paths');
const fetch = require('node-fetch');

async function fetchMenu() {
  let response = await fetch('https://dominos-api.herokuapp.com/api/menu');
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
  let drinks = productList.filter((item) => item.category === "Drinks");
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
  const { total, totalItems, ...items } = req.session.basket
  res.render('order', {
    total,
    totalItems,
    items
  });
}

function getContact(req, res, next) {
  res.render('contact');
}

async function addItemToBasket(item, basket = {}) {
  const apiItem = await getMenuItemByName(item);
  if (basket.hasOwnProperty(item)) {
    basket = {
      ...basket,
      [item]: {
        name: item,
        quantity: basket[item].quantity + 1,
        price: apiItem[0].price,
        subtotal: (basket[item].quantity + 1) * apiItem[0].price
      }
    }
  } else {
    basket[item] = {
      name: item,
      quantity: 1,
      price: apiItem[0].price,
      subtotal: apiItem[0].price
    }
  }
  basket.totalItems = basket.hasOwnProperty('totalItems') ? basket.totalItems + 1 : 1
  basket.total = basket.hasOwnProperty('total') ? basket.total + apiItem[0].price : apiItem[0].price
  return basket;
}

async function postBasket(req, res, next) {
  const basket = await addItemToBasket(req.body.name, req.session.basket)
  req.session.basket = basket;
  return res.send({
    basket: req.session.basket,
    total: req.session.total,
    totalOrderQuantity: req.session.totalItems
  })
}

router.get(paths.home, getHome);
router.get(paths.menu, getMenu);
router.get(paths.order, getOrder);
router.get(paths.contact, getContact);

router.post(paths.basket, postBasket);

module.exports = router;

