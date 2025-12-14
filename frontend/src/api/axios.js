import axios from 'axios';

// Configuración básica de Axios para comunicarse con el backend Flask
const client = axios.create({
    baseURL: 'http://localhost:5000', // URL base del backend Flask
    withCredentials: true // Incluir cookies en las solicitudes
});

export default client;