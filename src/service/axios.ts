import axios from 'axios';

const  api = axios.create({
    baseURL: 'https://myfrota.pt/api',  // URL base da API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;