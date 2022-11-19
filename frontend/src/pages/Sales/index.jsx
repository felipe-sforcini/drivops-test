import { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.scss';
import Sidebar from '../../components/Sidebar';

export default function Sales() {
    const [sellers, setSellers] = useState([]);
    const [cars, setCars] = useState([]);
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

        if (!form.valor) {
            setError('O valor é obrigatório...');
            return;
        }

        await handleAddCar();
        setSuccess('Cadastro efetuado com sucesso!');
    }

    async function handleAddCar() {
        try {
            const response = await api.post('/carros', {
                nome: form.nome,
                valor: form.valor
            });

            setCars([...cars, response.data]);
            loadCars();
            handleClearForm();

        } catch (error) {
            throw error
        }
    }

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleClearForm() {
        setForm({ nome: '', valor: '' });
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
    }, []);

    return (
        <div className='fullpage'>
            <Sidebar />
            <div className='container-main'>
                <strong>Registrar nova venda</strong>
                <form className='square' onSubmit={handleSubmit}>
                    <input
                        name='nome'
                        type="text"
                        placeholder='Nome do(a) vendedor(a)'
                        value={form.nome}
                        list='name-list'
                        onChange={handleChangeInputValue}
                    />

                    <datalist id='name-list'>
                        {sellers.map((seller) => (
                            <option key={seller.id} value={seller.nome}></option>
                        ))}
                    </datalist>

                    <input
                        name='valor'
                        type="text"
                        placeholder='Valor'
                        value={form.valor}
                        onChange={handleChangeInputValue}
                    />

                    {error && <span>{error}</span>}
                    {success && <span>{success}</span>}

                    <button type='submit'>Cadastrar</button>
                </form>
                <strong>Lista de vendas</strong>
                <div className='square'>
                    {cars.map((car) => (
                        <div key={car.id} className='cars'>
                            <div>
                                <h3>{car.nome}</h3>
                                <h4>R${(Number(car.valor) / 100).toFixed(2)}</h4>
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