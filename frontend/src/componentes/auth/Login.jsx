import React, { useState } from 'react';
import client from '../../api/axios'; // Cliente Axios configurado
import { useNavigate } from 'react-router-dom'; // Hook para navegar

function Login() {
    // Estados para los campos del formulario y mensajes de error
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Para redireccionar después del login exitoso
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => { // Manejador del envío del formulario, e es el evento
        e.preventDefault(); // Evita que la página se recargue al enviar el form
        try {
            //  Se usa el cliente de Axios para hacer la solicitud POST al backend
            const response = await client.post('/auth/login', { username, password });
            
            if (response.data.success) {
                // Si el backend dice "success: true", se muestra un mensaje y se redirige a /pacientes
                alert('Bienvenido: ' + response.data.user.nombre_completo);
                navigate('/pacientes'); 
            }
        } catch (err) {
            // Si algo falla (401, 500, etc.), se muestra el error
            console.error(err);
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="container mt-5"> {/* Contenedor principal */}
            <div className="row justify-content-center"> {/* Centrar el contenido */}
                <div className="col-md-4"> {/* Columna para el formulario */}
                    <div className="card shadow"> {/* Tarjeta para el formulario */}
                        <div className="card-body"> {/* Cuerpo de la tarjeta */}
                            <h3 className="text-center mb-3">Iniciar Sesión</h3> {/* Título */}
                            {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar error si existe */}
                            <form onSubmit={handleSubmit}> {/* Formulario de login */}
                                <div className="mb-3">
                                    <label className="form-label">Usuario:</label> {/* Campo de usuario */}
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña:</label> {/* Campo de contraseña */}
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Ingresar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;