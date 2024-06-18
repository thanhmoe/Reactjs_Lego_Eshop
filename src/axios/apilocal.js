import axios from "axios";

const baseURL = "http://localhost:3000/customers";

const instance = axios.create({
    baseURL: baseURL
});

export const fetchCustomers = async (user) => {
    try {
        const response = await instance.post("/login", user);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
