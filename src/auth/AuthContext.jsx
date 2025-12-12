import React, { createContext, useEffect, useState } from "react";
import { setAuthToken } from "../api/axiosInstance";
import { registerLogout } from "./logoutHelper";
import SessionExpiredModal from "../components/SessionExpiredModal";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [expireTime, setExpireTime] = useState(
        localStorage.getItem("expireTime")
    );
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        registerLogout(triggerLogout);
    }, []);

    useEffect(() => {
        setAuthToken(token);
    }, [token]);

    useEffect(() => {
        if (!expireTime) return;

        const now = Date.now();

        if (now >= expireTime) {
            triggerLogout();
            return;
        }

        const timeout = expireTime - now;

        const timer = setTimeout(() => {
            triggerLogout();
        }, timeout);

        return () => clearTimeout(timer);
    }, [expireTime]);

    const login = (tkn, expiresIn) => {
        const expTimeMs = Date.now() + expiresIn * 1000;

        localStorage.setItem("token", tkn);
        localStorage.setItem("expireTime", expTimeMs);

        setToken(tkn);
        setExpireTime(expTimeMs);
    };

    // === FUNGSI LOGOUT DENGAN MODAL ===
    const triggerLogout = () => {
        setShowModal(true);

        setTimeout(() => {
            logout();
        }, 3000); // redirect setelah modal tutup
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("expireTime");

        setToken(null);
        setExpireTime(null);
        setShowModal(false);

        window.location.href = "/admin/login";
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            <>
                {children}
                <SessionExpiredModal
                    visible={showModal}
                    onClose={() => setShowModal(false)}
                />
            </>
        </AuthContext.Provider>
    );
}
