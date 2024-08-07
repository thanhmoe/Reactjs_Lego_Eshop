import axios from "axios";
import { axios_instance } from "./axios_config";
const API_PATH = '/customers'


const baseURL = import.meta.env.VITE_BASE_URL;
export const instance = axios.create({
    baseURL: baseURL
});

export const fetchCustomers = async (user) => {
    try {
        const response = await axios_instance.post(`${API_PATH}/login`, user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const registerUser = async (newUser) => {
    try {
        const response = await axios_instance.post(`${API_PATH}/register`, newUser);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const createAddress = async (newAddress) => {
    try {
        const response = await axios_instance.post(`${API_PATH}/addresses/create`, newAddress);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getCustomerAddress = async () => {
    try {
        const response = await axios_instance.get(`${API_PATH}/addresses`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};


export const facebookLogin = async (accessToken) => {
    try {
        const response = await instance.post(`${API_PATH}/facebook-login`, { accessToken });

        if (response.status === 200) {
            return {
                success: true,
                authToken: response.data.auth_token,
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Facebook login failed',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'An error occurred during Facebook login',
        };
    }
};
