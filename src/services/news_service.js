export const fetchArticles = async () => {
    try {
        const response = await axios.get("https://6667b7edf53957909ff50b75.mockapi.io/api/v1/list");
        return response.data;
    } catch (error) {
        return error(error);
    }
};