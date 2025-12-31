import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { FiMenu, FiHome, FiBox, FiGrid, FiLogOut } from "react-icons/fi";
import { FaRegFile } from "react-icons/fa";

export default function AdminLayout({ children }) {
    const { logout } = useContext(AuthContext);
    const nav = useNavigate();
    const location = useLocation();
    const [allowTransition, setAllowTransition] = useState(false);

    // MODAL STATE
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // collapsed dari localStorage
    const [collapsed, setCollapsed] = useState(() => {
        const saved = localStorage.getItem("sidebar-collapsed");
        return saved === "true";
    });

    function doLogout() {
        logout();
        nav("/admin/login");
    }

    useEffect(() => {
        localStorage.setItem("sidebar-collapsed", collapsed);
    }, [collapsed]);

    const NavItem = ({ to, icon, label }) => {
        const active = location.pathname === to;

        return (
            <Link
                to={to}
                className={`
                    flex items-center
                    px-3 py-2 rounded-lg
                    transition-colors duration-300
                    ${
                        active
                            ? "bg-teal-50 text-teal-700 font-semibold"
                            : "text-gray-600 hover:bg-gray-100"
                    }
                `}
            >
                <span className="text-lg w-6">{icon}</span>

                <span
                    className={`
                        ml-3 text-sm whitespace-nowrap overflow-hidden
                        ${
                            collapsed
                                ? "opacity-0 max-w-0 !transition-none"
                                : "opacity-100 max-w-[160px] transition-all duration-300"
                        }
                    `}
                >
                    {label}
                </span>
            </Link>
        );
    };

    const handleTransitionEnd = (e) => {
        if (!allowTransition) return;
        if (e.propertyName !== "width" && e.propertyName !== "max-width")
            return;
        setAllowTransition(false);
    };

    return (
        <div className="min-h-screen flex bg-[#f9fbfc]">
            {/* SIDEBAR */}
            <aside
                onTransitionEnd={handleTransitionEnd}
                className={`
                    hidden md:flex flex-col
                    bg-white border-r border-gray-100
                    shadow-sm
                    fixed md:sticky top-0
                    h-screen
                    transition-all duration-300 ease-in-out
                    ${collapsed ? "w-15" : "w-64"}
                `}
            >
                {/* TOP */}
                <div className="flex items-center justify-between px-4 py-4">
                    <span
                        className={`
                            font-semibold flex items-center gap-3 text-gray-800 text-lg
                            whitespace-nowrap overflow-hidden
                            transition-all duration-300
                            ${
                                collapsed
                                    ? "opacity-0 delay-100 max-w-0"
                                    : "opacity-100 delay-0 max-w-[220px]"
                            }
                            `}
                    >
                        <img src="/img/logo1.webp" alt="" className="w-8" />
                        Admin Panel
                    </span>

                    <button
                        onClick={() => {
                            setAllowTransition(true);
                            setCollapsed(!collapsed);
                        }}
                        className="text-gray-600 hover:text-teal-600 transition cursor-pointer"
                    >
                        <FiMenu className="text-2xl my-1" />
                    </button>
                </div>

                {/* NAV */}
                <nav className="flex flex-col gap-1 px-2 mt-2">
                    <NavItem
                        to="/admin/dashboard"
                        icon={<FiHome />}
                        label="Dashboard"
                    />
                    <NavItem
                        to="/admin/products2"
                        icon={<FiBox />}
                        label="Products"
                    />
                    <NavItem
                        to="/admin/categories"
                        icon={<FiGrid />}
                        label="Categories"
                    />
                    <NavItem
                        to="/admin/posts"
                        icon={<FaRegFile />}
                        label="Artikel"
                    />
                </nav>

                {/* LOGOUT */}
                <button
                    onClick={() => setShowLogoutModal(true)}
                    className={`
                        mt-auto mx-2 mb-4
                        flex items-center
                        ${collapsed ? "gap-0" : "gap-3 justify-start"}
                        px-3 py-2 rounded-lg
                        transition-all duration-300
                        bg-red-50 text-red-600
                        hover:bg-red-500 hover:text-white cursor-pointer
                    `}
                >
                    <span className="w-6 flex justify-center">
                        <FiLogOut size={18} />
                    </span>

                    <span
                        className={` text-sm whitespace-nowrap overflow-hidden
                            ${
                                collapsed
                                    ? "opacity-0 max-w-0 !transition-none pointer-events-none"
                                    : "opacity-100 max-w-[100px] transition-all duration-300"
                            }
                        `}
                    >
                        Logout
                    </span>
                </button>
            </aside>

            {/* MAIN CONTENT */}
            <main
                className={`
                    flex-1 
                    p-4 md:p-6 
                    overflow-y-auto 
                    h-screen
                    md:ml-${collapsed ? "15" : "64"}
                    lg:ml-${collapsed ? "15" : "64"}
                `}
            >
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 min-h-full">
                    {children}
                </div>
            </main>

            {/* LOGOUT CONFIRM MODAL */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[999]">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-80 animate-fadeIn">
                        <h2 className="text-lg text-center font-semibold text-gray-800">
                            Apakah anda yakin ingin keluar?
                        </h2>

                        <div className="flex justify-center gap-3 mt-6">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition cursor-pointer"
                            >
                                Batal
                            </button>

                            <button
                                onClick={doLogout}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                            >
                                Keluar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
