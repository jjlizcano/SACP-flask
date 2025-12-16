import React, { useEffect, useState } from 'react';
import client from '../../api/axios';
import { Link } from 'react-router-dom';
import Menu from '../Menu';

const ListarCitas = () => {
    const [citas, setCitas] = useState([]);

    const cargarCitas = async () => {
        try {
            const response = await client.get('/api/citas');
            setCitas(response.data);
        } catch (error) {
            console.error("Error al cargar citas:", error);
        }
    };

    useEffect(() => {
        cargarCitas();
    }, []);

    const eliminarCita = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta cita?")) {
            try {
                await client.delete(`/api/citas/${id}`);
                cargarCitas();
            } catch (error) {
                alert("Error al eliminar");
            }
        }
    };

    // Formatea la fecha para mostrarla de forma legible
    const formatearFecha = (fechaString) => {
        return new Date(fechaString).toLocaleString();
    };

    return (
        <>
            <Menu />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Gestión de Citas</h2>
                    <Link to="/citas/agregar" className="btn btn-primary">
                        + Nueva Cita
                    </Link>
                </div>

                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Fecha</th>
                                <th>Paciente</th>
                                <th>Motivo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citas.map((cita) => (
                                <tr key={cita.id}>
                                    <td>{formatearFecha(cita.fecha_cita)}</td>
                                    <td>{cita.nombre}</td> {/* Nombre del paciente (viene del backend) */}
                                    <td>{cita.motivo}</td>
                                    <td>
                                        <span className={`badge ${cita.estado === 'Pendiente' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                            {cita.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <Link to={`/citas/editar/${cita.id}`} className="btn btn-warning btn-sm me-2">
                                            Editar
                                        </Link>
                                        <button onClick={() => eliminarCita(cita.id)} className="btn btn-danger btn-sm">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ListarCitas;