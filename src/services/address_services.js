import axios from 'axios';

const BASE_URL = 'https://vn-public-apis.fpo.vn'

export const getProvinces = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/provinces/getAll?limit=-1`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching provinces:", error);
        throw error;
    }
};

export const getDistricts = async (provinceId) => {
    try {
        const response = await axios.get(`${BASE_URL}/district/${provinceId}`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching districts:", error);
        throw error;
    }
};

export const getWards = async (districtId) => {
    try {
        const response = await axios.get(`${BASE_URL}/ward/${districtId}`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching wards:", error);
        throw error;
    }
};
