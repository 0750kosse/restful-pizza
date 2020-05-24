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
  res.render('home')
}

async function getMenu(req, res, next) {
  let productList = await fetchData();
  let pizzas = productList.filter((item) => item.category === "Pizza");
  let sides = productList.filter((item) => item.category === "Sides");
  let desserts = productList.filter((item) => item.category === "Desserts");
  let drinks = productList.filter((item) => item.category === "Bebidas");
  res.render('menu', { pizzaCat: pizzas, sidesCat: sides, dessertsCat: desserts, drinksCat: drinks });
}

function getOrder(req, res, next) {
  res.render('order');
}

function getContact(req, res, next) {
  res.render('contact');
}

function postBasket(req, res, next) {
  console.log("this is a post the pizza mate")
  res.send('Success, basket works')
}

router.get(paths.home, getHome);
router.get(paths.menu, getMenu);
router.get(paths.order, getOrder);
router.get(paths.contact, getContact);

router.post(paths.basket, postBasket);

module.exports = router;

