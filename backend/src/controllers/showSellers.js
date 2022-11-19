const knex = require('../services/connection');
const { displayError, runResponse } = require('../../src/supplements');

const showSellers = async (req, res) => {
    try {
        const sellers = await knex('vendedores').select('*');

        if (!sellers) {
            return runResponse(400, 'Não existem vendedores cadastrados', res);
        }

        return res.status(200).json(sellers);
    } catch (error) {
        displayError(error, res)
    }
}

module.exports = showSellers;