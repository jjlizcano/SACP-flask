import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap

// Importar componentes
import Login from './componentes/auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz: Muestra el Login */}
        <Route path="/" element={<Login />} />
        
        {/* Más adelante se agregan aquí las rutas de /pacientes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;