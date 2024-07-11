import { axios_instance } from "./axios_config";
const API_PATH = '/customers'

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