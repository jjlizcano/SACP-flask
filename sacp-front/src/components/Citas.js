import React, { useEffect, useState } from 'react';
import api from '../api';

function Citas() {
    const [citas, setCitas] = useState([]);
    const [form, setForm] = useState({ paciente_id: '', fecha_cita: '', motivo: '' });

    useEffect(() => {
        obtenerCitas();
    }, []);

    const obtenerCitas = async () => {
        try {
            const res = await api.get('/api/citas');
            setCitas(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/citas', form);
            alert('Cita agendada');
            obtenerCitas();
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || 'Verifique el documento del paciente'));
        }
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Citas</h2>

            {/* Formulario */}
            <div className="card p-3 mb-4 bg-light">
                <h5>Agendar Cita</h5>
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-4">
                        <input 
                            className="form-control" 
                            placeholder="Documento del Paciente" 
                            value={form.paciente_id}
                            onChange={(e) => setForm({...form, paciente_id: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="col-md-4">
                        <input 
                            type="datetime-local" 
                            className="form-control" 
                            value={form.fecha_cita}
                            onChange={(e) => setForm({...form, fecha_cita: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="col-md-4">
                        <input 
                            className="form-control" 
                            placeholder="Motivo" 
                            value={form.motivo}
                            onChange={(e) => setForm({...form, motivo: e.target.value})} 
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary">Agendar</button>
                    </div>
                </form>
            </div>

            {/* Listado */}
            <div className="row">
                {citas.map((cita) => (
                    <div key={cita.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{cita.nombre}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{new Date(cita.fecha_cita).toLocaleString()}</h6>
                                <p className="card-text">
                                    <strong>Motivo:</strong> {cita.motivo} <br/>
                                    <strong>Estado:</strong> {cita.estado}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Citas;