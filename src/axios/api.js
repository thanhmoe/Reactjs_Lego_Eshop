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

export const fetchProducts = async (
    page,
    limit,
    sortBy ,
    sortOrder ,
    category
) => {
    try {
        let queryParams = `?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        if (category) {
            queryParams += `&category=${category}`;
        }
        const response = await instance.get(`/products${queryParams}`);
        console.log(response.data,123123);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await instance.get(`/products/${id}`);
        return response.data.data[0];
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
};

export const fetchRelatedProducts = async (
    page,
    limit,
    sortBy = 'create_at' ,
    sortOrder = 'desc',
    categoryId
) => {
    try {
        let queryParams = `?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&category=${categoryId}`;
        const response = await instance.get(`/products${queryParams}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
};

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

export const searchProducts = async (page, limit, sortBy, sortOrder, search_keywords) => {
    try {
        const response = await instance.post(`/products/search?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`, { search_keywords });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
};
