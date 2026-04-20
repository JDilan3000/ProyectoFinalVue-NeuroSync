import api from './api';

export const getSujetos = (query = '') => {
    return api.get(`/sujetos?q=${query}`);
};

export const getSujetoById = (id) => api.get(`/sujetos/${id}`);
export const createSujeto = (sujeto) => api.post('/sujetos', sujeto);
export const updateSujeto = (id, sujeto) => api.put(`/sujetos/${id}`, sujeto);
export const deleteSujeto = (id) => api.delete(`/sujetos/${id}`);