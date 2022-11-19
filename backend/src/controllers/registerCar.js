const knex = require('../services/connection');
const { displayError, runResponse, findCarByName } = require('../../src/supplements');

const registerCar = async (req, res) => {
    const { nome, valor } = req.body;

    try {
        const carExists = await findCarByName(nome);

        if (carExists) {
            return runResponse(400, 'Esse carro já foi cadastrado', res);
        }

        const valorEmCentavos = Number(valor) * 100;

        const registration = await knex('carros')
            .insert({ nome, valor: `${valorEmCentavos}` })
            .returning(['nome', 'valor']);

        if (!registration) {
            return runResponse(400, 'Não foi possível cadastrar esse carro', res);
        }

        return runResponse(201, 'Carro cadastrado com sucesso', res);
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = registerCar;