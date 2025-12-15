import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importar componentes
import Login from './componentes/auth/Login';
import ListarPacientes from './componentes/pacientes/Listar';
import AgregarPaciente from './componentes/pacientes/Agregar';
import EditarPaciente from './componentes/pacientes/Editar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rutas de Pacientes */}
        <Route path="/pacientes" element={<ListarPacientes />} />
        <Route path="/pacientes/agregar" element={<AgregarPaciente />} />
        <Route path="/pacientes/editar/:id" element={<EditarPaciente />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;