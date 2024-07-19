import axios from "axios";

// Init axios instance
const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
    baseURL: baseURL
});

const API_PATH = `customers/recover-password`

export const requestRecoverPassword = async (email) => {
    try {
        const response = await instance.post(`${API_PATH}/request`, email);
        return response.data
    } catch (error) {
        return error.response.data;
    }
};

export const sendVerfyOTP = async (requestData) => {
    try {
        const response = await instance.post(`${API_PATH}/verify-otp`, requestData);
        return response.data
    } catch (error) {
        return error.response.data;
    }
};

export const resetPassword = async (newPassword) => {
    try {
        const response = await instance.patch(`${API_PATH}/reset`, newPassword);
        return response.data
    } catch (error) {
        return error.response.data;
    }
};