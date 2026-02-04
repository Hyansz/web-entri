import api from "./axiosInstance";

export const getSummary = (range = "7d") =>
    api.get(`/api/analytics/summary?range=${range}`);

export const getSummaryCompare = (range = "7d") =>
    api.get(`/api/analytics/summary-compare?range=${range}`);

export const getDaily = (range = "7d") =>
    api.get(`/api/analytics/daily?range=${range}`);

export const getCountries = (range = "7d") =>
    api.get(`/api/analytics/countries?range=${range}`);

export const getPages = (range = "7d") =>
    api.get(`/api/analytics/pages?range=${range}`);

export const getEngagement = (range = "24h") =>
    api.get(`/api/analytics/engagement?range=${range}`);
