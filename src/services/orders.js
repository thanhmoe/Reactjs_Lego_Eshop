import { axios_instance } from "./axios_config";

const API_PATH = '/orders'

export const createOrders = async (orderData) => {
    try {
        const response = await axios_instance.post(`${API_PATH}/create`,orderData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};