const PREFIX = "admin_products_realtime_v1";

export const loadCache = () => {
    const raw = sessionStorage.getItem(PREFIX);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

export const saveCache = (data) => {
    sessionStorage.setItem(PREFIX, JSON.stringify(data));
};

export const clearCache = () => {
    sessionStorage.removeItem(PREFIX);
};
