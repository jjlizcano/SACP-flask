import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importar componentes
import Login from './componentes/auth/Login';
import ListarPacientes from './componentes/pacientes/Listar';
import AgregarPaciente from './componentes/pacientes/Agregar';
import EditarPaciente from './componentes/pacientes/Editar';
import ListarCitas from './componentes/citas/Listar';
import AgregarCita from './componentes/citas/Agregar';
import EditarCita from './componentes/citas/Editar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rutas de Pacientes */}
        <Route path="/pacientes" element={<ListarPacientes />} />
        <Route path="/pacientes/agregar" element={<AgregarPaciente />} />
        <Route path="/pacientes/editar/:id" element={<EditarPaciente />} />
        
        {/* Rutas de Citas */}
        <Route path="/citas" element={<ListarCitas />} />
        <Route path="/citas/agregar" element={<AgregarCita />} />
        <Route path="/citas/editar/:id" element={<EditarCita />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;