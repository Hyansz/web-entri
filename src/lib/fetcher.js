import api from "../api/axiosInstance";

export const fetcher = (url) =>
    api.get(url).then((res) => res.data);
