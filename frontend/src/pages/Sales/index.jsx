import { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.scss';
import Sidebar from '../../components/Sidebar';

export default function Sales() {
    const [sellers, setSellers] = useState([]);
    const [cars, setCars] = useState([]);
    const [sales, setSales] = useState([]);
    const [form, setForm] = useState({ nome: '', valor: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function loadCars() {
        try {
            const response = await api.get('/carros');

            setCars(response.data);
        } catch (error) {
            throw error
        }
    }

    async function loadSales() {
        try {
            const response = await api.get('/vendas');

            setSales(response.data);
        } catch (error) {
            throw error
        }
    }

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

        if (!form.cpf) {
            setError('O cpf é obrigatório...');
            return;
        }

        if (!form.carro) {
            setError('O carro é obrigatório...');
            return;
        }

        if (!form.data) {
            setError('A data é obrigatória...');
            return;
        }

        await handleAddSale();
        setSuccess('Cadastro efetuado com sucesso!');
    }

    async function handleAddSale() {
        try {
            const response = await api.post('/vendas', {
                cpf: form.cpf,
                carro: form.carro,
                data: form.data
            });

            setSales([...sales, response.data]);
            loadSales();
            handleClearForm();

        } catch (error) {
            throw error
        }
    }

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleClearForm() {
        setForm({ cpf: '', carro: '', data: '' });
    }

    async function deleteCar(id) {
        try {
            await api.delete(`/carros/${id}`);

            const localCars = [...cars];

            const indexCar = localCars.findIndex((car) => car.id === id);

            localCars.splice(indexCar, 1);

            setCars(localCars);

        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        loadCars();
        loadSellers();
        loadSales();
    }, []);

    return (
        <div className='fullpage'>
            <Sidebar />
            <div className='container-main'>
                <strong>Registrar nova venda</strong>
                <form className='square' onSubmit={handleSubmit}>
                    <input
                        name='cpf'
                        type="text"
                        placeholder='CPF do(a) vendedor(a)'
                        value={form.cpf}
                        list='name-list'
                        onChange={handleChangeInputValue}
                    />

                    <datalist id='name-list'>
                        {sellers.map((seller) => (
                            <option key={seller.id} value={seller.cpf}></option>
                        ))}
                    </datalist>

                    <input
                        name='carro'
                        type="text"
                        placeholder='Carro'
                        value={form.carro}
                        list='cars-list'
                        onChange={handleChangeInputValue}
                    />

                    <datalist id='cars-list'>
                        {cars.map((car) => (
                            <option key={car.id} value={car.nome}></option>
                        ))}
                    </datalist>

                    <input
                        name='data'
                        type="date"
                        placeholder='Valor'
                        value={form.data}
                        onChange={handleChangeInputValue}
                    />


                    {error && <span>{error}</span>}
                    {success && <span>{success}</span>}

                    <button type='submit'>Cadastrar</button>
                </form>
                <strong>Lista de vendas</strong>
                <div className='square'>
                    {sales.map((sale) => (
                        <div key={sale.id} className='sales'>
                            <div>
                                <h3>{sale.nome_vendedor}</h3>
                                <h4>{sale.carro_nome}</h4>
                                <h4>Data da venda: {(sale.data_venda).slice(0, 10)}</h4>
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