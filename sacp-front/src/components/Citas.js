import React, { useState, useEffect } from 'react';
import { fetchCitas, createCita, updateCita, deleteCita, fetchPacientes } from '../api';

const Citas = () => {
    const [citas, setCitas] = useState([]);
    const [pacientes, setPacientes] = useState([]); // Para el select
    const [form, setForm] = useState({ fecha: '', motivo: '', paciente_id: '' });
    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const resCitas = await fetchCitas();
            const resPacientes = await fetchPacientes();
            setCitas(resCitas.data);
            setPacientes(resPacientes.data);
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await updateCita(idEditar, form);
                alert('Cita actualizada');
                setEditando(false);
                setIdEditar(null);
            } else {
                await createCita(form);
                alert('Cita creada');
            }
            setForm({ fecha: '', motivo: '', paciente_id: '' });
            cargarDatos();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al procesar la cita');
        }
    };

    const editar = (cita) => {
        // Formatear fecha para que el input type="datetime-local" la acepte
        // La fecha suele venir como "YYYY-MM-DD HH:MM:SS", el input requiere "YYYY-MM-DDTHH:MM"
        const fechaFormatoInput = cita.fecha.replace(' ', 'T').slice(0, 16); 
        
        setForm({ 
            fecha: fechaFormatoInput, 
            motivo: cita.motivo, 
            paciente_id: cita.paciente_id 
        });
        setEditando(true);
        setIdEditar(cita.id);
    };

    const eliminar = async (id) => {
        if (window.confirm('¿Eliminar esta cita?')) {
            try {
                await deleteCita(id);
                cargarDatos();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Citas</h2>

            <div className="card mb-4 p-3 shadow-sm">
                <h4>{editando ? 'Editar Cita' : 'Nueva Cita'}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-3 mb-2">
                            <label className="form-label">Fecha y Hora</label>
                            <input type="datetime-local" name="fecha" value={form.fecha} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="col-md-4 mb-2">
                            <label className="form-label">Motivo</label>
                            <input name="motivo" value={form.motivo} onChange={handleChange} className="form-control" placeholder="Ej: Consulta general" required />
                        </div>
                        <div className="col-md-3 mb-2">
                            <label className="form-label">Paciente</label>
                            <select name="paciente_id" value={form.paciente_id} onChange={handleChange} className="form-select" required>
                                <option value="">Seleccione...</option>
                                {pacientes.map(p => (
                                    <option key={p.id} value={p.id}>{p.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2 d-flex align-items-end mb-2">
                            <button type="submit" className={`btn ${editando ? 'btn-warning' : 'btn-primary'} w-100`}>
                                {editando ? 'Actualizar' : 'Agendar'}
                            </button>
                        </div>
                    </div>
                    {editando && <button type="button" className="btn btn-secondary mt-2" onClick={() => {
                        setEditando(false);
                        setForm({ fecha: '', motivo: '', paciente_id: '' });
                    }}>Cancelar Edición</button>}
                </form>
            </div>

            <ul className="list-group">
                {citas.map((c) => (
                    <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{c.fecha}</strong> - {c.motivo} 
                            <span className="badge bg-info text-dark ms-2">
                                {pacientes.find(p => p.id === c.paciente_id)?.nombre || 'Paciente ID: ' + c.paciente_id}
                            </span>
                        </div>
                        <div>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editar(c)}>Editar</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(c.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Citas;