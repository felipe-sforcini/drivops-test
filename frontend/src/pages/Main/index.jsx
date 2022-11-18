import { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.scss';

function Main() {
    const [cars, setCars] = useState([]);

    async function loadCars() {
        try {
            const response = await api.get('/carros');

            setCars(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadCars();
    }, []);

    return (
        <div className='container-main'>
            <form className='square'>
                <input
                    name='nome'
                    type="text"
                    placeholder='Nome do carro'
                />

                <input
                    name='valor'
                    type="number"
                    placeholder='Valor'
                />

                <button type='button'>Cadastrar</button>
            </form>
            <div className='square'>
                {cars.map((car) => (
                    <div key={car.id} className='cars'>
                        <div className="car-price">
                            <h3>{car.nome}</h3>
                            <h4>R$ {(car.valor / 100).toFixed(2)}</h4>
                        </div>
                        <div>
                            <button
                            >
                                Editar
                            </button>
                            <button
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