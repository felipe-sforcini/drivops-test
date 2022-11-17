const express = require('express');
const registerCar = require('./controllers/registerCar');

const routes = express();

routes.post('/carros', registerCar);

module.exports = routes;