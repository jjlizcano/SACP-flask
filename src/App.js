import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap

import Login from './components/Login';
import Pacientes from './components/Pacientes';
import Citas from './components/Citas';
import api from './api';

function App() {
  const [usuario, setUsuario] = useState(null);

  const handleLogout = async () => {
    await api.post('/auth/logout');
    setUsuario(null);
  };

  return (
    <Router>
      {/* Barra de Navegación (Solo visible si hay usuario) */}
      {usuario && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container">
            <span className="navbar-brand">Consultorio SACP</span>
            <div className="navbar-nav">
              <Link className="nav-link" to="/pacientes">Pacientes</Link>
              <Link className="nav-link" to="/citas">Citas</Link>
              <button className="btn btn-danger btn-sm ms-3" onClick={handleLogout}>Salir</button>
            </div>
          </div>
        </nav>
      )}

      {/* Rutas */}
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={!usuario ? <Login setUsuario={setUsuario} /> : <Navigate to="/pacientes" />} 
          />
          <Route 
            path="/pacientes" 
            element={usuario ? <Pacientes /> : <Navigate to="/" />} 
          />
          <Route 
            path="/citas" 
            element={usuario ? <Citas /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;