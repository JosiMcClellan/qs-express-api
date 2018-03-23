var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var foods = require('./routes/api/v1/foods');
var meals = require('./routes/api/v1/meals');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/foods', foods);
app.use('/api/v1/meals', meals);

module.exports = app;
