import axios from "axios";
import { logoutFromContext } from "../auth/logoutHelper";

const api = axios.create({
    baseURL: "http://localhost:5000",
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

// AUTO LOGOUT KETIKA 401
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            logoutFromContext();
        }
        return Promise.reject(err);
    }
);

export default api;
