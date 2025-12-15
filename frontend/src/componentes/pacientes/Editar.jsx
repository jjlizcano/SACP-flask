import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../../api/axios';
import Menu from '../Menu';

const EditarPaciente = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Captura el documento de la URL (ej: /editar/1098)
    
    const [paciente, setPaciente] = useState({
        documento: '',
        nombre: '',
        telefono: '',
        email: ''
    });

    // Cargar datos al abrir la página
    useEffect(() => {
        const cargarPaciente = async () => {
            try {
                const response = await client.get(`/api/pacientes/${id}`);
                setPaciente(response.data);
            } catch (error) {
                alert('Error al cargar datos del paciente');
                navigate('/pacientes');
            }
        };
        cargarPaciente();
    }, [id, navigate]);

    const handleChange = (e) => {
        setPaciente({ ...paciente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await client.put(`/api/pacientes/${id}`, paciente);
            alert('Paciente actualizado con éxito');
            navigate('/pacientes');
        } catch (error) {
            console.error(error);
            alert('Error al actualizar');
        }
    };

    return (
        <>
            <Menu />
            <div className="container mt-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-warning text-dark">
                        <h4>Editar Paciente: {id}</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {/* El documento no se debe editar, es la llave primaria */}
                            <div className="mb-3">
                                <label className="form-label">Nombre Completo</label>
                                <input 
                                    type="text" 
                                    name="nombre"
                                    value={paciente.nombre}
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
                                    value={paciente.telefono}
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
                                    value={paciente.email}
                                    className="form-control" 
                                    onChange={handleChange} 
                                />
                            </div>
                            <button type="submit" className="btn btn-warning">Actualizar</button>
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

export default EditarPaciente;