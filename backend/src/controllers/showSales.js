const knex = require('../services/connection');
const { displayError, runResponse } = require('../../src/supplements');

const showSales = async (req, res) => {
    try {
        const sales = await knex('vendas').select('*');

        if (!sales) {
            return runResponse(400, 'Não existem vendas cadastradas', res);
        }

        return res.status(200).json(sales);
    } catch (error) {
        displayError(error, res)
    }
}

module.exports = showSales;