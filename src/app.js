const env = require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');

const routes = require('./routes');
const app = express();

const handlebars = exphbs.create({
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  defaultLayout: 'main',
  extname: 'handlebars'
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 60000
  }
}));

app.use(express.static(path.join(__dirname, '/public')));
app.use(routes);

app.use(function (err, req, res, next) {
  res.status(422).send({ err: err._message })
});

app.listen(port, () => console.log(`app listening on port ${port}`))

module.exports = app