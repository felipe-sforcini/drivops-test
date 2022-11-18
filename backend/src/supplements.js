const knex = require('./services/connection');

function displayError(error, res) {
    return res.status(500).json({
        mensagem: error.message
    });
}

function runResponse(statusCode, message, res) {
    return res.status(statusCode).json({
        mensagem: message
    });
}

async function findCarByName(nome) {
    return await knex('carros').where({ nome }).first();
}

async function findSellerByCpf(cpf) {
    return await knex('vendedores').where({ cpf }).first();
}

module.exports = {
    displayError,
    runResponse,
    findCarByName,
    findSellerByCpf
}