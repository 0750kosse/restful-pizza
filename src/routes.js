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
  res.render('menu', { item: productList });
}

function getOrder(req, res, next) {
  res.render('order');
}

function getContact(req, res, next) {
  res.render('contact');
}

router.get(paths.home, getHome);
router.get(paths.menu, getMenu);
router.get(paths.order, getOrder);
router.get(paths.contact, getContact)

module.exports = router;

