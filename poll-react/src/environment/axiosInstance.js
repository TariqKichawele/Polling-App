import axios from "axios";
import { getToken } from "../utility/common";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
});

export default axiosInstance;

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});