import api from "./axiosInstance";

export const getSummary = () => api.get("/api/analytics/summary");
export const getDaily = () => api.get("/api/analytics/daily");
export const getCountries = () => api.get("/api/analytics/countries");
export const getPages = () => api.get("/api/analytics/pages");
