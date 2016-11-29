let Router = require('express').Router;
const indexRouter = Router()

indexRouter.get('/', function (req, res) {
  res.render('index');
});

//get and render the register page
indexRouter.get('/register', function (req, res) {
  res.render('views/register');
});

indexRouter.get('/login', function (req, res) {
  res.render('views/login');
});

indexRouter.get('/dashboard', function (req, res) {
  res.render('views/dashboard');
});

indexRouter.get('/forbidden', function (req, res) {
  res.render('views/forbidden');
});

module.exports = indexRouter
