const knex = require('../services/connection');
const { displayError, runResponse, runDeleteCar, findCarById } = require('../../src/supplements');

const deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        const carFound = await findCarById(id);

        if (!carFound) {
            return runResponse(404, 'Carro não encontrado', res);
        }

        const carDeleted = await runDeleteCar(carFound);

        if (!carDeleted) {
            return runResponse(400, "Não foi possível excluir o carro", res);
        }

        return runResponse(200, 'Carro excluido com sucesso', res);
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = deleteCar;