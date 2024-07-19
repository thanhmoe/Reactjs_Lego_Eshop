import { axios_instance } from "./axios_config";

const API_PATH = '/news'
export const fetchArticles = async () => {
    try {
        const response = await axios_instance.get(`${API_PATH}`);
        return response.data;
    } catch (error) {
        return error(error);
    }
};

export const fetchNewsById = async (id) => {
    try {
        const response = await axios_instance.get(`${API_PATH}/${id}`);
        return response.data.news[0];
    } catch (error) {
        return error(error);
    }
};