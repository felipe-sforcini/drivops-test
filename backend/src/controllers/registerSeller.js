const knex = require('../services/connection');
const { displayError, runResponse, findSellerByCpf } = require('../../src/supplements');

const registerSeller = async (req, res) => {
    const { nome, cpf } = req.body;

    try {
        const sellerExists = await findSellerByCpf(cpf);

        if (sellerExists) {
            return runResponse(400, 'Vendedor(a) já cadastrado(a)', res);
        }

        if (cpf.length !== 11) {
            return runResponse(400, 'O número de CPF precisa conter 11 caracteres', res);
        }

        const registration = await knex('vendedores')
            .insert({ nome, cpf })
            .returning(['nome', 'cpf']);

        if (!registration) {
            return runResponse(400, 'Não foi possível cadastrar vendedor(a)', res);
        }

        return runResponse(201, 'Vendedor(a) cadastrado(a) com sucesso', res);
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = registerSeller;