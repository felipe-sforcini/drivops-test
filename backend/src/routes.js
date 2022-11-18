const express = require('express');
const registerCar = require('./controllers/registerCar');
const registerSeller = require('./controllers/registerSeller');
const showCars = require('./controllers/showCars');

const routes = express();

routes.post('/carros', registerCar);
routes.post('/vendedores', registerSeller);

routes.get('/carros', showCars);

module.exports = routes;