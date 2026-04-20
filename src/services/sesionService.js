import api from './api';

export const getSesionesBySujeto = (sujetoId) => {
    return api.get('/sesiones', {
        params: { sujetoId }
    });
};

export const createSesion = (sesion) => api.post('/sesiones', sesion);
export const updateSesion = (id, sesion) => api.put(`/sesiones/${id}`, sesion);
export const deleteSesion = (id) => api.delete(`/sesiones/${id}`);