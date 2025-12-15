import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/axios';

const Menu = () => {
    const navigate = useNavigate();

    const cerrarSesion = async () => {
        try {
            await client.post('/auth/logout');
            navigate('/'); // Redirigir al login
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/pacientes">SACP Consultorio</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/pacientes">Pacientes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/citas">Citas</Link>
                        </li>
                    </ul>
                    <button className="btn btn-danger btn-sm" onClick={cerrarSesion}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Menu;