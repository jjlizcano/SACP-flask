import React, { useState, useEffect } from 'react';
import { fetchPacientes, createPaciente, updatePaciente, deletePaciente } from '../api';

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [form, setForm] = useState({ nombre: '', edad: '', telefono: '' });
    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    // Cargar pacientes al iniciar
    useEffect(() => {
        cargarPacientes();
    }, []);

    const cargarPacientes = async () => {
        try {
            const { data } = await fetchPacientes();
            setPacientes(data);
        } catch (error) {
            console.error('Error cargando pacientes:', error);
        }
    };

    // Manejar cambios en inputs
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Enviar formulario (Crear o Actualizar)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await updatePaciente(idEditar, form);
                alert('Paciente actualizado correctamente');
                setEditando(false);
                setIdEditar(null);
            } else {
                await createPaciente(form);
                alert('Paciente creado correctamente');
            }
            setForm({ nombre: '', edad: '', telefono: '' }); // Limpiar
            cargarPacientes(); // Recargar lista
        } catch (error) {
            console.error('Error guardando paciente:', error);
            alert('Hubo un error al guardar.');
        }
    };

    // Cargar datos en el formulario para editar
    const editar = (paciente) => {
        setForm({ nombre: paciente.nombre, edad: paciente.edad, telefono: paciente.telefono });
        setEditando(true);
        setIdEditar(paciente.id);
    };

    // Eliminar paciente
    const eliminar = async (id) => {
        if (window.confirm('¿Seguro que deseas eliminar este paciente?')) {
            try {
                await deletePaciente(id);
                cargarPacientes();
            } catch (error) {
                console.error('Error eliminando:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Pacientes</h2>

            {/* Formulario */}
            <div className="card mb-4 p-3 shadow-sm">
                <h4>{editando ? 'Editar Paciente' : 'Nuevo Paciente'}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 mb-2">
                            <input name="nombre" value={form.nombre} onChange={handleChange} className="form-control" placeholder="Nombre completo" required />
                        </div>
                        <div className="col-md-2 mb-2">
                            <input name="edad" type="number" value={form.edad} onChange={handleChange} className="form-control" placeholder="Edad" required />
                        </div>
                        <div className="col-md-3 mb-2">
                            <input name="telefono" value={form.telefono} onChange={handleChange} className="form-control" placeholder="Teléfono" required />
                        </div>
                        <div className="col-md-3 d-flex gap-2">
                            <button type="submit" className={`btn ${editando ? 'btn-warning' : 'btn-success'} w-100`}>
                                {editando ? 'Actualizar' : 'Guardar'}
                            </button>
                            {editando && (
                                <button type="button" className="btn btn-secondary" onClick={() => {
                                    setEditando(false);
                                    setForm({ nombre: '', edad: '', telefono: '' });
                                }}>Cancelar</button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* Lista de Pacientes */}
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map((p) => (
                        <tr key={p.id}>
                            <td>{p.nombre}</td>
                            <td>{p.edad}</td>
                            <td>{p.telefono}</td>
                            <td>
                                <button className="btn btn-sm btn-primary me-2" onClick={() => editar(p)}>Editar</button>
                                <button className="btn btn-sm btn-danger" onClick={() => eliminar(p.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Pacientes;