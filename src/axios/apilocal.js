import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
    baseURL: baseURL
});

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
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};