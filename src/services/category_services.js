import { axios_instance } from "./axios_config";
const API_PATH = '/categories'

export const fetCategoryWithProductCount = async () => {
    try {
        const response = await axios_instance.get(`${API_PATH}/with-product-count`);
        return response.data.categories;
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
};
