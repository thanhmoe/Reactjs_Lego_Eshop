import { axios_instance } from "./axios_config";
const API_PATH = '/products'

export const fetchProductsRefactor = async (params) => {
    const { page, limit, textQuery, sortBy, sortOrder, product, category } = params
    try {
        // required params
        let url = `${API_PATH}?page=${page}&limit=${limit}`

        // optional params
        if (sortOrder, sortBy) {
            url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`
        }
        if (product) {
            url += `&product=${product}`
        }
        if (category) {
            url += `&category=${category}`
        }
        if (textQuery) {
            url += `&textQuery=${textQuery}`
        }
        const response = await axios_instance.get(url)
        console.log('RES ==>', response)
        if (response && response.status == 200) {
            return response.data
        }
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
}

export const fetchProductById = async (id) => {
    try {
        const response = await axios_instance.get(`${API_PATH}/${id}`);
        return response.data.data[0];
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
};

export const fetchRelatedProducts = async (params) => {
    const { page, limit, relatedToProduct } = params
    try {
        let queryParams = `?page=${page}&limit=${limit}&relatedToProduct=${relatedToProduct}`;
        const response = await axios_instance.get(`${API_PATH}${queryParams}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
};

export const searchProducts = async (page, limit, sortBy, sortOrder, search_keywords) => {
    try {
        const response = await axios_instance.post(`${API_PATH}/search?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`, { search_keywords });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
};

export const fetchTopProducts = async (params) => {
    const { limit } = params
    try {
        const response = await axios_instance.get(`${API_PATH}/top-selling/list?limit=${limit}`)
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
};