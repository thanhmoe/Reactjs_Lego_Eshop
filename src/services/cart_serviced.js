import { axios_instance } from "./axios_config";
const API_PATH = '/carts'

export const getProductsOnCart = async () => {
    try {
        const res = await axios_instance.get(API_PATH);
        return res.data;
    } catch (error) {
        return error.res.data;
    }
};


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

export const getTotalProductCount = async () => {
    try {
        let url = `${API_PATH}/total-product-counts`
        const response = await axios_instance.get(url);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateProductQuantity = async (params) => {
    const { productId, increase } = params
    try {
        let url = `${API_PATH}/update/${productId}?increase=${increase}`
        const response = await axios_instance.patch(url);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const removeItemsFromCart = async (productId) => {
    try {
        const response = await axios_instance.delete(`${API_PATH}/remove/${productId}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}