import axios from "axios";

const baseURL = "https://6667b7edf53957909ff50b75.mockapi.io/api/v1";

const instance = axios.create({
    baseURL: baseURL
});

export const fetchProducts = async () => {
    try {
        const response = await instance.get("/products");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchArticles = async () => {
    try {
        const response = await instance.get("/list");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
