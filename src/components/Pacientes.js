import React, { useEffect, useState } from 'react';
import api from '../api';

function Pacientes() {
    const [pacientes, setPacientes] = useState([]);
    
    // Estado para el formulario
    const [form, setForm] = useState({ documento: '', nombre: '', telefono: '', email: '' });

    // Cargar pacientes al iniciar
    useEffect(() => {
        obtenerPacientes();
    }, []);

    const obtenerPacientes = async () => {
        try {
            const res = await api.get('/api/pacientes');
            setPacientes(res.data);
        } catch (error) {
            alert('Error al cargar pacientes');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/pacientes', form);
            alert('Paciente registrado');
            setForm({ documento: '', nombre: '', telefono: '', email: '' }); // Limpiar form
            obtenerPacientes(); // Recargar lista
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || 'Algo salió mal'));
        }
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Pacientes</h2>
            
            {/* Formulario */}
            <div className="card p-3 mb-4">
                <h5>Registrar Nuevo</h5>
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-3">
                        <input name="documento" placeholder="Documento" className="form-control" onChange={handleChange} value={form.documento} required />
                    </div>
                    <div className="col-md-3">
                        <input name="nombre" placeholder="Nombre Completo" className="form-control" onChange={handleChange} value={form.nombre} required />
                    </div>
                    <div className="col-md-3">
                        <input name="telefono" placeholder="Teléfono" className="form-control" onChange={handleChange} value={form.telefono} required />
                    </div>
                    <div className="col-md-3">
                        <input name="email" type="email" placeholder="Email" className="form-control" onChange={handleChange} value={form.email} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-success">Guardar Paciente</button>
                    </div>
                </form>
            </div>

            {/* Tabla */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map((p) => (
                        <tr key={p.documento}>
                            <td>{p.documento}</td>
                            <td>{p.nombre}</td>
                            <td>{p.telefono}</td>
                            <td>{p.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Pacientes;