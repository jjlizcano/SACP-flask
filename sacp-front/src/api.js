import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', 
    withCredentials: true // Para enviar cookies en solicitudes CORS
});

// Interceptor para agregar el token en cada solicitud si existe
api.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// Rutas
export const login = (formData) => api.post('/auth/login', formData);

export const fetchPacientes = () => api.get('/api/pacientes');
export const createPaciente = (newPaciente) => api.post('/api/pacientes', newPaciente);
export const updatePaciente = (id, updatedPaciente) => api.put(`/api/pacientes/${id}`, updatedPaciente); 
export const deletePaciente = (id) => api.delete(`/api/pacientes/${id}`); 

export const fetchCitas = () => api.get('/api/citas');
export const createCita = (newCita) => api.post('/api/citas', newCita);
export const updateCita = (id, updatedCita) => api.put(`/api/citas/${id}`, updatedCita); 
export const deleteCita = (id) => api.delete(`/api/citas/${id}`); 

export default api;