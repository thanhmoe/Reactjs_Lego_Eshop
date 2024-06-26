import axios from "axios";
import { getToken } from "./auth";

const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
    baseURL: baseURL
});


instance.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if (token) {
            config.headers['auth_token'] = token; // Không cần 'Bearer '
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const fetchCustomers = async (user) => {
    try {
        const response = await instance.post("/customers/login", user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const registerUser = async (newUser) => {
    try {
        const response = await instance.post("/customers/register", newUser);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await instance.get("/products");
        console.log(response.data,'191919919');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const fetchArticles = async () => {
    try {
        const response = await axios.get("https://6667b7edf53957909ff50b75.mockapi.io/api/v1/list");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};