import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importar componentes
import Login from './componentes/auth/Login';
import ListarPacientes from './componentes/pacientes/Listar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rutas de Pacientes */}
        <Route path="/pacientes" element={<ListarPacientes />} />
        
        {/* Aquí agregaremos luego las rutas de Agregar y Editar */}
        {/* <Route path="/pacientes/agregar" element={<AgregarPaciente />} /> */}
        {/* <Route path="/pacientes/editar/:id" element={<EditarPaciente />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;