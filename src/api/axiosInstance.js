import axios from "axios";
import { logoutFromContext } from "../auth/logoutHelper";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: false,
    timeout: 15000, // ⏱️ aman untuk Vercel
});

// SET TOKEN
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const status = err?.response?.status;

        // 🔒 AUTO LOGOUT
        if (status === 401) {
            logoutFromContext();
        }

        return Promise.reject(err);
    }
);

export default api;
