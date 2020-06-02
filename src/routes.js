const express = require('express');
const router = express.Router();
const paths = require('./paths');
const fetch = require('node-fetch');

async function fetchData() {
  let response = await fetch('https://manolopizza.herokuapp.com/api/menu');
  let data = await response.json();
  let productArray = await data.product;
  return productArray
}

function getHome(req, res, next) {
  res.render('home', { title: 'Your pizza place' })
}

async function getMenu(req, res, next) {
  let productList = await fetchData();
  let pizzas = productList.filter((item) => item.category === "Pizza");
  let sides = productList.filter((item) => item.category === "Sides");
  let desserts = productList.filter((item) => item.category === "Desserts");
  let drinks = productList.filter((item) => item.category === "Bebidas");
  res.render('menu', { title: 'Your pizza place', pizzaCat: pizzas, sidesCat: sides, dessertsCat: desserts, drinksCat: drinks });
}

function getOrder(req, res, next) {
  res.render('order');
}

function getContact(req, res, next) {
  res.render('contact');
}

function postBasket(req, res, next) {
  const item = {
    name: req.body.name,
    quantity: 1
  }

  let newBasket;
  if (req.session.basket) {
    newBasket = [...req.session.basket, item]
  } else {
    newBasket = [item]
  }
  req.session.basket = newBasket
  //console.log('basket in session', req.session.basket)
  res.send({ basket: newBasket })
}

router.get(paths.home, getHome);
router.get(paths.menu, getMenu);
router.get(paths.order, getOrder);
router.get(paths.contact, getContact);

router.post(paths.basket, postBasket);

module.exports = router;

