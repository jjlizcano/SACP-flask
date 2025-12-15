import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../api/axios';
import Menu from '../Menu';

const AgregarPaciente = () => {
    const navigate = useNavigate();
    
    // Estado inicial del formulario
    const [paciente, setPaciente] = useState({
        documento: '',
        nombre: '',
        telefono: '',
        email: ''
    });

    const handleChange = (e) => {
        // Actualiza solo el campo que cambió, manteniendo los demás
        setPaciente({ ...paciente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await client.post('/api/pacientes', paciente);
            alert('Paciente registrado con éxito');
            navigate('/pacientes'); // Regresa a la lista
        } catch (error) {
            console.error(error);
            alert('Error al guardar: ' + (error.response?.data?.message || 'Verifique los datos'));
        }
    };

    return (
        <>
            <Menu />
            <div className="container mt-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h4>Registrar Nuevo Paciente</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Documento (Cédula)</label>
                                <input 
                                    type="text" 
                                    name="documento"
                                    className="form-control" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombre Completo</label>
                                <input 
                                    type="text" 
                                    name="nombre"
                                    className="form-control" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Teléfono</label>
                                <input 
                                    type="text" 
                                    name="telefono"
                                    className="form-control" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    className="form-control" 
                                    onChange={handleChange} 
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Guardar</button>
                            <button 
                                type="button" 
                                className="btn btn-secondary ms-2" 
                                onClick={() => navigate('/pacientes')}
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AgregarPaciente;