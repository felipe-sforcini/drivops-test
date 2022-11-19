import { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.scss';

function Main() {
    const [cars, setCars] = useState([]);
    const [form, setForm] = useState({ nome: '', valor: '' });

    async function loadCars() {
        try {
            const response = await api.get('/carros');

            setCars(response.data);
        } catch (error) {
            throw error
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.nome || !form.valor) {
            return;
        }

        await handleAddCar();
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
    }, []);

    return (
        <div className='container-main'>
            <form className='square' onSubmit={handleSubmit}>
                <input
                    name='nome'
                    type="text"
                    placeholder='Nome do carro'
                    value={form.nome}
                    onChange={handleChangeInputValue}
                />

                <input
                    name='valor'
                    type="text"
                    placeholder='Valor'
                    value={form.valor}
                    onChange={handleChangeInputValue}
                />

                <button type='submit'>Cadastrar</button>
            </form>
            <div className='square'>
                {cars.map((car) => (
                    <div key={car.id} className='cars'>
                        <div className="car-price">
                            <h3>{car.nome}</h3>
                            <h4>R${(Number(car.valor) / 100).toFixed(2)}</h4>
                        </div>
                        <div>
                            <button
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => deleteCar(car.id)}
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
    )
}

export default Main;