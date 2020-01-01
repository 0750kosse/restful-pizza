const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

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

const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));


app.use(function (err, req, res, next) {
  res.status(422).send({ err: err._message })
})
app.get('/', function (req, res, next) {
  res.render('home');
});

app.listen(port, () => console.log(`app listening on port ${port}`))