const knex = require('.././services/connection');
const bcrypt = require('bcrypt');
const { displayError, runResponse } = require('../supplements');
const { findUserByEmail } = require('../supplements');

const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const emailExists = await findUserByEmail(email);

        if (emailExists) {
            return runResponse(400, 'Esse email já foi cadastrado', res);
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const registration = await knex('usuarios')
            .insert({
                nome,
                email,
                senha: encryptedPassword
            })
            .returning(['nome', 'email']);

        if (!registration) {
            return runResponse(400, 'Não foi possível cadastrar esse usuário', res);
        }

        return runResponse(201, 'Usuário cadastrado com sucesso.', res);
    } catch (error) {
        displayError(error, res);
    }
};

module.exports = registerUser;