import axios from 'axios';
// Archivo para no repetir la URL a cada rato
// Instancia de axios configurada
const api = axios.create({
    baseURL: 'http://localhost:5000', // La URL de mi Flask
    withCredentials: true // Para enviar o recibir cookies de sesión
});

export default api;