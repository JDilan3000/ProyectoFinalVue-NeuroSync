import api from './api';
import appMemory from './appMemory';

export const register = async (name, email, password) => {
    const res = await api.post('/register', { name, email, password });
    const { accessToken, user } = res.data;
    localStorage.setItem('token', accessToken);
    appMemory.set('user', user, true);
    return user;
};

export const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    const { accessToken, user } = res.data;
    localStorage.setItem('token', accessToken);
    appMemory.set('user', user, true);
    return user;
};

export const logout = () => {
    localStorage.removeItem('token');
    appMemory.remove('user');
    window.location.href = '/login';
};

export const isLogin = () => {
    const token = localStorage.getItem('token');
    return !!token;
};