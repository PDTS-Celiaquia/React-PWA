import axios from 'axios';
import { getToken, deleteUser } from './auth';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401 && !window.location.href.includes("/login")) {
            deleteUser(); // remove user from localstorage
            return window.location.href = "/login"
        };
        return Promise.reject(error);
    }
);

export default axiosInstance;
