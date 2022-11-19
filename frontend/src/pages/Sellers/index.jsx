import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.scss';


export default function Sellers() {
    const [sellers, setSellers] = useState([]);
    const [form, setForm] = useState({ nome: '', cpf: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function loadSellers() {
        try {
            const response = await api.get('/vendedores');

            setSellers(response.data);
        } catch (error) {
            throw error
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError('');
        setSuccess('');

        if (!form.nome) {
            setError('O nome é obrigatório...');
            return;
        }

        if (!form.cpf) {
            setError('O cpf é obrigatório...');
            return;
        }

        await handleAddSeller();
        setSuccess('Cadastro efetuado com sucesso!');
    }

    async function handleAddSeller() {
        try {
            const response = await api.post('/vendedores', {
                nome: form.nome,
                cpf: form.cpf
            });

            setSellers([...sellers, response.data]);
            loadSellers();
            handleClearForm();

        } catch (error) {
            throw error
        }
    }

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleClearForm() {
        setForm({ nome: '', cpf: '' });
    }

    async function deleteSeller(id) {
        try {
            await api.delete(`/vendedores/${id}`);

            const localSellers = [...sellers];

            const indexSeller = localSellers.findIndex((seller) => seller.id === id);

            localSellers.splice(indexSeller, 1);

            setSellers(localSellers);

        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        loadSellers();
    }, []);

    return (
        <div className='fullpage'>
            <Sidebar />
            <div className='container-main'>
                <strong>Registrar novo(a) vendedor(a)</strong>
                <form className='square' onSubmit={handleSubmit}>
                    <input
                        name='nome'
                        type="text"
                        placeholder='Nome'
                        value={form.nome}
                        onChange={handleChangeInputValue}
                    />

                    <input
                        name='cpf'
                        type="text"
                        placeholder='CPF'
                        value={form.cpf}
                        onChange={handleChangeInputValue}
                    />

                    {error && <span>{error}</span>}
                    {success && <span>{success}</span>}

                    <button type='submit'>Cadastrar</button>
                </form>
                <strong>Lista de vendedores</strong>
                <div className='square'>
                    {sellers.map((seller) => (
                        <div key={seller.id} className='sellers'>
                            <div>
                                <h3>{seller.nome}</h3>
                                <h4>{seller.cpf}</h4>
                            </div>
                            <div>
                                <button
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => deleteSeller(seller.id)}
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div>

                </div>
            </div>
        </div>

    )
}