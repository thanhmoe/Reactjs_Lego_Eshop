import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
    baseURL: baseURL
});

const API_PATH = '/banners'

export const getBanner = async(params)=>{
    const {page,limit} = params
    try {
        let url = `${API_PATH}/?page=${page}&limit=${limit}`
        const res = await instance.get(url)
        return res.data
    } catch (error) {
        return error(error)
    }
}