import React, { useEffect, useState } from 'react';
import client from '../../api/axios';
import { Link } from 'react-router-dom';
import Menu from '../Menu'; // Importamos el menú para que se vea arriba

const ListarPacientes = () => {
    const [pacientes, setPacientes] = useState([]);

    const cargarPacientes = async () => {
        try {
            const response = await client.get('/api/pacientes');
            setPacientes(response.data);
        } catch (error) {
            console.error("Error al cargar pacientes:", error);
        }
    };

    useEffect(() => {
        cargarPacientes();
    }, []);

    const eliminarPaciente = async (documento) => {
        if (window.confirm("¿Estás seguro de eliminar este paciente?")) {
            try {
                await client.delete(`/api/pacientes/${documento}`);
                cargarPacientes(); // Recargar la lista
            } catch (error) {
                alert("Error al eliminar");
            }
        }
    };

    return (
        <>
            <Menu />
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Lista de Pacientes</h2>
                    <Link to="/pacientes/agregar" className="btn btn-primary">
                        + Nuevo Paciente
                    </Link>
                </div>

                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Documento</th>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.map((paciente) => (
                                <tr key={paciente.documento}>
                                    <td>{paciente.documento}</td>
                                    <td>{paciente.nombre}</td>
                                    <td>{paciente.telefono}</td>
                                    <td>{paciente.email}</td>
                                    <td>
                                        <Link 
                                            to={`/pacientes/editar/${paciente.documento}`} 
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Editar
                                        </Link>
                                        <button 
                                            onClick={() => eliminarPaciente(paciente.documento)} 
                                            className="btn btn-danger btn-sm"
                                        >
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

export default ListarPacientes;