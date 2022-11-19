const knex = require('../services/connection');
const { displayError, runResponse, runDeleteCar, findSellerById, runDeleteSeller } = require('../../src/supplements');

const deleteSeller = async (req, res) => {
    const { id } = req.params;

    try {
        const sellerFound = await findSellerById(id);

        if (!sellerFound) {
            return runResponse(404, 'Vendedor(a) não encontrado(a)', res);
        }

        const sellerDeleted = await runDeleteSeller(sellerFound);

        if (!sellerDeleted) {
            return runResponse(400, "Não foi possível excluir o(a) vendedor(a)", res);
        }

        return runResponse(200, 'Vendedor(a) excluido com sucesso', res);
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = deleteSeller;