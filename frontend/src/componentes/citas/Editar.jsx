import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../../api/axios';
import Menu from '../Menu';

const EditarCita = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [pacientes, setPacientes] = useState([]);
    const [cita, setCita] = useState({
        paciente_id: '',
        fecha_cita: '',
        motivo: '',
        estado: 'Pendiente'
    });

    useEffect(() => {
        // Cargar Pacientes y la Cita actual
        const cargarDatos = async () => {
            try {
                const resPacientes = await client.get('/api/pacientes');
                setPacientes(resPacientes.data);

                const resCita = await client.get(`/api/citas/${id}`);
                // Ajuste de formato fecha para que el input lo lea (YYYY-MM-DDTHH:MM)
                let fechaFormateada = resCita.data.fecha_cita;
                if(fechaFormateada) {
                    fechaFormateada = new Date(resCita.data.fecha_cita).toISOString().slice(0, 16);
                }

                setCita({
                    paciente_id: resCita.data.documento, // Ojo: el backend devuelve 'documento' en el JOIN
                    fecha_cita: fechaFormateada,
                    motivo: resCita.data.motivo,
                    estado: resCita.data.estado
                });
            } catch (error) {
                alert('Error al cargar datos');
                navigate('/citas');
            }
        };
        cargarDatos();
    }, [id, navigate]);

    const handleChange = (e) => {
        setCita({ ...cita, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await client.put(`/api/citas/${id}`, cita);
            alert('Cita actualizada');
            navigate('/citas');
        } catch (error) {
            alert('Error al actualizar');
        }
    };

    return (
        <>
            <Menu />
            <div className="container mt-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-warning text-dark">
                        <h4>Editar Cita #{id}</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Paciente</label>
                                <select 
                                    name="paciente_id" 
                                    value={cita.paciente_id}
                                    className="form-select" 
                                    onChange={handleChange} 
                                    disabled // Generalmente no se cambia el paciente al editar, pero puedes quitar esto
                                >
                                    {pacientes.map(p => (
                                        <option key={p.documento} value={p.documento}>{p.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Fecha</label>
                                <input type="datetime-local" name="fecha_cita" value={cita.fecha_cita} onChange={handleChange} className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Motivo</label>
                                <input type="text" name="motivo" value={cita.motivo} onChange={handleChange} className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Estado</label>
                                <select name="estado" value={cita.estado} onChange={handleChange} className="form-select">
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Realizada">Realizada</option>
                                    <option value="Cancelada">Cancelada</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-warning">Actualizar</button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/citas')}>Cancelar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditarCita;