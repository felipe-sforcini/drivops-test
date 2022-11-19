import './styles.scss';
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="sidebar-icons">
            <button className="btn-purple" onClick={() => navigate("/cars")}>Carros</button>
            <button className="btn-purple" onClick={() => navigate("/sellers")}>Vendedores</button>
            <button className="btn-purple" onClick={() => navigate("/sales")}>Vendas</button>
        </div>
    )
}