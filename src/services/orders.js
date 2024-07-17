import { axios_instance } from "./axios_config";

const API_PATH = '/orders'

export const createOrders = async (orderData) => {
    try {
        const response = await axios_instance.post(`${API_PATH}/create`, orderData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getOrders = async (param) => {
    const { page, limit, sortStatus } = param
    try {
        let url = `${API_PATH}?page=${page}&limit=${limit}&sortStatus=${sortStatus}`
        const response = await axios_instance.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};