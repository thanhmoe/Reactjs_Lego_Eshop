import axios from "axios";
import { getToken } from "../utils/token_utils";

// Init axios instance
const baseURL = import.meta.env.VITE_BASE_URL;
export const axios_instance = axios.create({
    baseURL: baseURL
});

// axios config
axios_instance.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if (token) {
            config.headers['auth_token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);