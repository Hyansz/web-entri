import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
    const { token } = useContext(AuthContext);
    if (!token) return <Navigate to="/admin/login" />;
    return children;
}
