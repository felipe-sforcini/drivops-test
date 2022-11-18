const knex = require('../services/connection');
const { displayError, runResponse } = require('../../src/supplements');

const showCars = async (req, res) => {
    try {
        const cars = await knex('carros').select('*');

        if (!cars) {
            return runResponse(400, 'Não existem carros cadastrados', res);
        }

        return res.status(200).json(cars);
    } catch (error) {
        displayError(error, res)
    }
}

module.exports = showCars;