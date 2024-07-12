import { axios_instance } from "./axios_config";

const BASE_URL = import.meta.env.VITE_BASE_URL
const CUSTOMER_URL = '/customers/addresses/vietnam'
export const getProvinces = async () => {
    try {
        const response = await axios_instance.get(`${BASE_URL}${CUSTOMER_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching provinces:", error);
        throw error;
    }
};

export const getDistricts = async (provinceId) => {
    try {
        const response = await axios_instance.get(`${BASE_URL}${CUSTOMER_URL}?province=${provinceId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching districts:", error);
        throw error;
    }
};

export const getWards = async (districtId) => {
    try {
        const response = await axios_instance.get(`${BASE_URL}${CUSTOMER_URL}?district=${districtId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching wards:", error);
        throw error;
    }
};
