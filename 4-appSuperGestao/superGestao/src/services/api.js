import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.lucasverissimo.com.br/api/v1/superGestor'
});

export default api;