import React, { useState, useContext } from "react";
import axios from "../api/axiosInstance";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
    const [form, setForm] = useState({ email: "", password: "" });
    const { login } = useContext(AuthContext);
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/admin/login", form);
            login(res.data.token, res.data.expiresIn);
            nav("/admin/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            {/* WRAPPER */}
            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* LEFT – FORM */}
                <div className="p-10 md:p-14 flex flex-col justify-center">
                    {/* LOGO */}
                    <div className="flex items-center gap-2 mb-10">
                        <div className="w-3 h-3 rounded-full bg-cyan-600"></div>
                        <span className="font-semibold text-gray-800">
                            PT. Entri Jaya Makmur
                        </span>
                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-900 leading-snug">
                        Halo,
                        <br /> Selamat Datang
                    </h1>

                    <p className="text-gray-500 mt-3 mb-10">
                        Mohon masukkan email dan password
                    </p>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <input
                                className="w-full border border-gray-300 bg-gray-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="stanley@gmail.com"
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <input
                                className="w-full border border-gray-300 bg-gray-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="Password"
                                type="password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* <div className="flex items-center justify-between text-sm">
                            <button
                                type="button"
                                className="text-cyan-600 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div> */}

                        <button
                            type="submit"
                            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                {/* RIGHT – ILLUSTRATION / GRADIENT */}
                <div className="hidden md:flex items-center justify-center relative p-10 overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/80 via-cyan-500/20 to-cyan-500/80 z-10"></div>

                    {/* Image as Cover */}
                    <img
                        src="/img/bsm1.webp"
                        alt="Login Illustration"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Optional content di atas overlay */}
                    <div className="relative z-20">
                        {/* Jika kamu ada teks atau elemen lain, taruh di sini */}
                    </div>
                </div>
            </div>
        </div>
    );
}
