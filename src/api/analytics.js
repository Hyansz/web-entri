import api from "./axiosInstance";

export const getSummary = () => api.get("/api/analytics/summary");
export const getDaily = () => api.get("/api/analytics/daily");
export const getBounceRate = () => api.get("/api/analytics/bounce-rate");
export const getSummaryCompare = () => api.get("/api/analytics/summary-compare");
