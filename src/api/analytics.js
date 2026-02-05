import api from "./axiosInstance";

/**
 * Helper normalizer
 */
const unwrapArray = (res) => {
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.data)) return res.data.data;
    if (Array.isArray(res.data?.rows)) return res.data.rows;
    return [];
};

const unwrapObject = (res) => {
    if (res.data && typeof res.data === "object") return res.data;
    return {};
};

// ================= SUMMARY =================
export const getSummary = async (range = "7d") => {
    const res = await api.get(`/api/analytics/summary`, {
        params: { range },
    });
    return unwrapObject(res);
};

export const getSummaryCompare = async (range = "7d") => {
    const res = await api.get(`/api/analytics/summary-compare`, {
        params: { range },
    });
    return unwrapObject(res);
};

// // ================= DAILY =================
// export const getDaily = async (range = "7d") => {
//     const res = await api.get(`/api/analytics/daily`, {
//         params: { range },
//     });
//     return unwrapArray(res);
// };

// ================= ENGAGEMENT =================
export const getEngagement = async (range = "24h") => {
    const res = await api.get(`/api/analytics/engagement`, {
        params: { range },
    });
    return unwrapObject(res);
};

// ================= OTHER =================
export const getCountries = async (range = "7d") => {
    const res = await api.get(`/api/analytics/countries`, {
        params: { range },
    });
    return unwrapArray(res);
};

export const getPages = async (range = "7d") => {
    const res = await api.get("/api/analytics/pages", {
        params: { range }, // ✔️ frontend → backend OK
    });

    // backend wajib balikin array langsung
    return Array.isArray(res.data) ? res.data : [];
};

export const getDaily = async (range = "7d") => {
    const res = await api.get("/api/analytics/daily", {
        params: { range },
    });

    // 🔥 PASTI SESUAI RESPONSE UMAMI
    return res.data?.data?.pageviews || [];
};

