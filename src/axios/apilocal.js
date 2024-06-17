import axios from "axios";

const baseURL = "http://localhost:3000/";

const instance = axios.create({
    baseURL: baseURL
});

export const fetchCustomers = async () => {
    try {
        const response = await instance.get("/customer");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

