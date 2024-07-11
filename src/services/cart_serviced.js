import { axios_instance } from "./axios_config";
const API_PATH = '/carts'
export const addProductToCart = async (params) => {
    const { product, quantity } = params
    try {
        let url = `${API_PATH}/add-product?product=${product}&quantity=${quantity}`
        const response = await axios_instance.post(url);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};