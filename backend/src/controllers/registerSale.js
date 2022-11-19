const knex = require('../services/connection');
const { displayError, runResponse, findCarByName, findSellerByCpf } = require('../../src/supplements');

const registerSale = async (req, res) => {
    const { cpf, carro, data } = req.body;

    try {
        const carExists = await findCarByName(carro);
        const sellerExists = await findSellerByCpf(cpf);

        const registration = await knex('vendas')
            .insert({
                nome_vendedor: sellerExists.nome,
                vendedor_id: sellerExists.id,
                carro_id: carExists.id,
                carro_nome: carExists.nome,
                data_venda: data,
                valor_venda: carExists.valor
            })
            .returning(['vendedor_id', 'carro_id', 'data_venda']);

        if (!registration) {
            return runResponse(400, 'Não foi possível cadastrar essa venda', res);
        }

        return runResponse(201, 'Venda cadastrada com sucesso', res);
    } catch (error) {
        displayError(error, res);
    }
}

module.exports = registerSale;