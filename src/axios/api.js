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
            config.headers['auth_token'] = token;
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

// export const fetchProducts = async () => {
//     try {
//         const response = await instance.get("/products");
//         return response.data;
//     } catch (error) {
//         return error.response.data;
//     }
// };

// Assuming `instance` is already defined and configured axios instance

export const fetchProducts = async (page = 1, limit = 10, sortOrder = 'desc', category) => {
    try {
        // Construct query parameters
        let queryParams = `?page=${page}&limit=${limit}&sortOrder=${sortOrder}`;
        if (category) {
            queryParams += `&category=${category}`;
        }

        // Make the GET request
        const response = await instance.get(`/products${queryParams}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
};


export const fetchArticles = async () => {
    try {
        const response = await axios.get("https://6667b7edf53957909ff50b75.mockapi.io/api/v1/list");
        return response.data;
    } catch (error) {
        return error(error);
    }
};

export const fetchMockProducts = async () => {
    try {
        const response = await axios.get("https://6667b7edf53957909ff50b75.mockapi.io/api/v1/products");
        return response.data;
    } catch (error) {
        return error(error);
    }
};