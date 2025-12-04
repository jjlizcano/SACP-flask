import axios from 'axios';
// Archivo para no repetir la URL a cada rato
// Instancia de axios configurada
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // La URL de mi Flask
    withCredentials: true // Para enviar o recibir cookies de sesión
});

api.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// Auth
export const login = (formData) => api.post('/auth/login', formData);

// Pacientes
export const fetchPacientes = () => api.get('/pacientes');
export const createPaciente = (newPaciente) => api.post('/pacientes', newPaciente);
export const updatePaciente = (id, updatedPaciente) => api.put(`/pacientes/${id}`, updatedPaciente); 
export const deletePaciente = (id) => api.delete(`/pacientes/${id}`); 

// --- Citas ---
export const fetchCitas = () => api.get('/citas');
export const createCita = (newCita) => api.post('/citas', newCita);
export const updateCita = (id, updatedCita) => api.put(`/citas/${id}`, updatedCita); 
export const deleteCita = (id) => api.delete(`/citas/${id}`); 

export default api;