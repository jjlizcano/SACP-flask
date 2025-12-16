import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../api/axios';
import Menu from '../Menu';

const AgregarCita = () => {
    const navigate = useNavigate(); // Para redirigir después de guardar
    const [pacientes, setPacientes] = useState([]); // Lista de pacientes para el select
    
    const [cita, setCita] = useState({
        paciente_id: '',
        fecha_cita: '',
        motivo: ''
    });

    // Cargar la lista de pacientes al iniciar
    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const response = await client.get('/api/pacientes');
                setPacientes(response.data);
            } catch (error) {
                console.error("Error cargando pacientes");
            }
        };
        obtenerPacientes();
    }, []);

    const handleChange = (e) => {
        setCita({ ...cita, [e.target.name]: e.target.value }); // Actualiza solo el campo que cambió
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita recarga de página
        try {
            await client.post('/api/citas', cita);
            alert('Cita agendada con éxito');
            navigate('/citas');
        } catch (error) {
            alert('Error al guardar: ' + (error.response?.data?.message || 'Verifique los datos'));
        }
    };

    return (
        <>
            <Menu />
            <div className="container mt-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h4>Agendar Nueva Cita</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Paciente</label>
                                <select 
                                    name="paciente_id" 
                                    className="form-select" 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">Seleccione un paciente...</option>
                                    {pacientes.map(p => (
                                        <option key={p.documento} value={p.documento}>
                                            {p.nombre} (Doc: {p.documento})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Fecha y Hora</label>
                                <input 
                                    type="datetime-local" 
                                    name="fecha_cita"
                                    className="form-control" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Motivo</label>
                                <input 
                                    type="text" 
                                    name="motivo"
                                    className="form-control" 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Agendar</button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/citas')}>Cancelar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AgregarCita;