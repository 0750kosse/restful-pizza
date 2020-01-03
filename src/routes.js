const express = require('express');
const router = express.Router();
const paths = require('./paths')

function getHome(req, res, next) {
  res.render('home');
}

function getMenu(req, res, next) {
  res.render('menu');
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