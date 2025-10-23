import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // mobile menu
    const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    const desktopDropdownRef = useRef(null);
    const mobileDropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [lang, setLang] = useState(i18n.language || "id");

    const changeLang = (langCode) => {
        i18n.changeLanguage(langCode);
        localStorage.setItem("lang", langCode);
        setLang(langCode);
        setOpen(false);
    };

    // Auto hide/show navbar on scroll + tutup menu/dropdown
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false); // scroll down -> hide
            } else {
                setShowNavbar(true); // scroll up -> show
            }

            setIsScrolled(window.scrollY > 0);

            // Tutup semua dropdown & menu saat scroll
            setDesktopDropdownOpen(false);
            setMobileDropdownOpen(false);
            setIsOpen(false);

            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Close dropdown/menu if click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                desktopDropdownRef.current &&
                !desktopDropdownRef.current.contains(e.target)
            ) {
                setDesktopDropdownOpen(false);
            }
            if (
                mobileDropdownRef.current &&
                !mobileDropdownRef.current.contains(e.target)
            ) {
                setMobileDropdownOpen(false);
            }
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target) &&
                !e.target.closest("button[data-toggle='mobile']")
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Scroll to top and navigate home
    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Scroll to top on menu click + close menu & dropdown
    const handleMenuClick = (callback) => {
        if (callback) callback();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
        setDesktopDropdownOpen(false);
        setMobileDropdownOpen(false);
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 mx-auto right-0 left-0 transition-all duration-500 ${
                showNavbar ? "translate-y-0" : "-translate-y-[90px]"
            } ${
                isScrolled
                    ? "backdrop-blur-md bg-cyan-700/70 shadow-md text-white"
                    : "bg-transparent text-white"
            }`}
        >
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <div
                    className="max-w-[70%] md:max-w-[20%] cursor-pointer"
                    onClick={handleLogoClick}
                >
                    <img src="/img/logo2.webp" alt="Logo" className="w-full" />
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6 items-center">
                    <Link
                        to="/"
                        title="Beranda"
                        onClick={() => handleMenuClick()}
                        className="transition duration-300 hover:text-yellow-400 hover:scale-110"
                    >
                        {t("nav.home")}
                    </Link>
                    <Link
                        to="/about"
                        title="Tentang Kami"
                        onClick={() => handleMenuClick()}
                        className="transition duration-300 hover:text-yellow-400 hover:scale-110"
                    >
                        {t("nav.tentang")}
                    </Link>

                    {/* Products Dropdown - Desktop */}
                    <div className="relative" ref={desktopDropdownRef}>
                        <button
                            className="flex items-center space-x-1 transition duration-300 hover:text-yellow-400 hover:scale-110 cursor-pointer"
                            onClick={() =>
                                setDesktopDropdownOpen((prev) => !prev)
                            }
                        >
                            <span>{t("nav.produk")}</span>
                            <FaChevronDown
                                className={`transition-transform ${
                                    desktopDropdownOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                        <div
                            className={`absolute left-0 mt-7 backdrop-blur-md bg-cyan-700/95 text-white rounded-xl shadow-md overflow-hidden transition-all duration-500 ease-in-out ${
                                desktopDropdownOpen
                                    ? "max-h-80 opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                        >
                            <Link
                                to="/products"
                                title="Semua Produk"
                                onClick={() => handleMenuClick()}
                                className="block px-4 py-2 hover:text-yellow-400"
                            >
                                All Products
                            </Link>
                            <Link
                                to="/products/furniture"
                                title="Produk Furniture"
                                onClick={() => handleMenuClick()}
                                className="block px-4 py-2 hover:text-yellow-400"
                            >
                                Hospital Furniture
                            </Link>
                            <Link
                                to="/products/liquid"
                                title="Produk Liquid"
                                onClick={() => handleMenuClick()}
                                className="block px-4 py-2 hover:text-yellow-400"
                            >
                                Liquid
                            </Link>
                            <Link
                                to="/products/bmhp"
                                title="Produk BMHP"
                                onClick={() => handleMenuClick()}
                                className="block px-4 py-2 hover:text-yellow-400"
                            >
                                BMHP
                            </Link>
                            <Link
                                to="/products/lab"
                                title="Produk Laboratorium"
                                onClick={() => handleMenuClick()}
                                className="block px-4 py-2 hover:text-yellow-400"
                            >
                                Laboratorium
                            </Link>
                            <Link
                                to="/products/cutting"
                                title="Produk Cutting Laser"
                                onClick={() => handleMenuClick()}
                                className="block px-4 py-2 hover:text-yellow-400"
                            >
                                Motif Cutting
                            </Link>
                        </div>
                    </div>

                    <Link
                        to="/blog"
                        onClick={() => handleMenuClick()}
                        className="transition duration-300 hover:text-yellow-400 hover:scale-110"
                    >
                        Blog
                    </Link>

                    <Link
                        to="/contact"
                        title="Kontak Kami"
                        onClick={() => handleMenuClick()}
                        className="transition duration-300 hover:text-yellow-400 hover:scale-110"
                    >
                        {t("nav.kontak")}
                    </Link>
                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 px-3 py-2 border-2 border-white hover:border-yellow-400 cursor-pointer rounded-full transition-all duration-300 shadow-md hover:scale-105 hover:text-yellow-400"
                        >
                            <img
                                src={
                                    lang === "id"
                                        ? "https://flagcdn.com/id.svg"
                                        : "https://flagcdn.com/gb.svg"
                                }
                                alt="flag"
                                className="w-6 h-4 rounded-sm"
                            />
                            <FaChevronDown
                                className={`transition-transform duration-300 ${
                                    open ? "rotate-180" : "rotate-0"
                                }`}
                            />
                        </button>

                        <div
                            className={`absolute right-0 mt-6 backdrop-blur-md bg-cyan-700/70 shadow-md text-white w-36 rounded-xl overflow-hidden transform transition-all duration-300 origin-top ${
                                open
                                    ? "opacity-100 scale-100 translate-y-0"
                                    : "opacity-0 scale-90 -translate-y-2 pointer-events-none"
                            }`}
                        >
                            <button
                                onClick={() => changeLang("id")}
                                className={`flex items-center gap-3 w-full cursor-pointer hover:text-yellow-400 px-4 py-2 bg-cyan-700/70 transition ${
                                    lang === "id" ? "bg-cyan-800" : ""
                                }`}
                            >
                                <img
                                    src="https://flagcdn.com/id.svg"
                                    alt="Indonesia"
                                    className="w-6 h-4 rounded-sm"
                                />
                                <span className="text-sm font-medium">
                                    Indonesia
                                </span>
                            </button>

                            <button
                                onClick={() => changeLang("en")}
                                className={`flex items-center text-white cursor-pointer hover:text-yellow-400 gap-3 w-full px-4 py-2 bg-cyan-700/70 transition ${
                                    lang === "en" ? "bg-cyan-800" : ""
                                }`}
                            >
                                <img
                                    src="https://flagcdn.com/gb.svg"
                                    alt="English"
                                    className="w-6 h-4 rounded-sm"
                                />
                                <span className="text-sm font-medium">
                                    English
                                </span>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Toggle */}
                <button
                    data-toggle="mobile"
                    className="md:hidden text-2xl z-50 relative"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            <nav
                ref={mobileMenuRef}
                className={`md:hidden absolute top-full left-0 w-full backdrop-blur-md bg-cyan-700/90 overflow-hidden transition-all duration-800 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="flex flex-col space-y-2 py-4">
                    <Link
                        to="/"
                        title="Beranda"
                        onClick={() => handleMenuClick()}
                        className="block px-6 py-2 hover:text-yellow-400"
                    >
                        Home
                    </Link>

                    <Link
                        to="/about"
                        title="Tentang Kami"
                        onClick={() => handleMenuClick()}
                        className="block px-6 py-2 hover:text-yellow-400"
                    >
                        About
                    </Link>

                    {/* Dropdown Produk */}
                    <div className="px-6" ref={mobileDropdownRef}>
                        <button
                            className="w-full flex justify-between items-center py-2 hover:text-yellow-400"
                            onClick={() =>
                                setMobileDropdownOpen((prev) => !prev)
                            }
                        >
                            <span>Products</span>
                            <FaChevronDown
                                className={`transition-transform ${
                                    mobileDropdownOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        <div
                            className={`ml-2 border-l border-cyan-500 overflow-hidden transition-all duration-500 ease-in-out ${
                                mobileDropdownOpen
                                    ? "max-h-60 opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                        >
                            <Link
                                to="/products"
                                title="Semua Produk"
                                onClick={() => handleMenuClick()}
                                className="block px-4 py-2 hover:text-yellow-400"
                            >
                                All Products
                            </Link>
                            <Link
                                to="/products/furniture"
                                title="Produk Furniture"
                                onClick={() => handleMenuClick()}
                                className="block px-4 py-2 hover:text-yellow-400"
                            >
                                Hospital Furniture
                            </Link>
                            <Link
                                to="/products/liquid"
                                title="Produk Liquid"
                                onClick={() => handleMenuClick()}
                                className="block px-4 py-2 hover:text-yellow-400"
                            >
                                Liquid
                            </Link>
                            <Link
                                to="/products/bmhp"
                                title="Produk BMHP"
                                onClick={() => handleMenuClick()}
                                className="block px-4 py-2 hover:text-yellow-400"
                            >
                                BMHP
                            </Link>
                            <Link
                                to="/products/lab"
                                title="Produk Laboratorium"
                                onClick={() => handleMenuClick()}
                                className="block px-4 py-2 hover:text-yellow-400"
                            >
                                Laboratorium
                            </Link>
                            <Link
                                to="/products/cutting"
                                title="Produk Cutting Laser"
                                onClick={() => handleMenuClick()}
                                className="block px-4 py-2 hover:text-yellow-400"
                            >
                                Motif Cutting
                            </Link>
                        </div>
                    </div>

                    <Link
                        to="/blog"
                        onClick={() => handleMenuClick()}
                        className="block px-6 py-2 hover:text-yellow-400"
                    >
                        Blog
                    </Link>

                    <Link
                        to="/contact"
                        title="Kontak Kami"
                        onClick={() => handleMenuClick()}
                        className="block px-6 py-2 hover:text-yellow-400"
                    >
                        Contact
                    </Link>

                    {/* Dropdown Bahasa */}
                    <div className="px-6">
                        <button
                            className="w-full flex justify-between items-center py-2 hover:text-yellow-400"
                            onClick={() => setLangDropdownOpen((prev) => !prev)}
                        >
                            <span className="flex items-center gap-2">
                                <img
                                    src={
                                        lang === "id"
                                            ? "https://flagcdn.com/id.svg"
                                            : "https://flagcdn.com/gb.svg"
                                    }
                                    alt="flag"
                                    className="w-6 h-4 rounded-sm"
                                />
                                {lang === "id" ? "Indonesia" : "English"}
                            </span>
                            <FaChevronDown
                                className={`transition-transform ${
                                    langDropdownOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        <div
                            className={`ml-2 border-l border-cyan-500 overflow-hidden transition-all duration-500 ease-in-out ${
                                langDropdownOpen
                                    ? "max-h-32 opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                        >
                            <button
                                onClick={() => changeLang("id")}
                                className={`flex items-center gap-3 w-full text-left px-4 py-2 hover:text-yellow-400 transition ${
                                    lang === "id" ? "bg-cyan-800" : ""
                                }`}
                            >
                                <img
                                    src="https://flagcdn.com/id.svg"
                                    alt="Indonesia"
                                    className="w-6 h-4 rounded-sm"
                                />
                                <span>Indonesia</span>
                            </button>
                            <button
                                onClick={() => changeLang("en")}
                                className={`flex items-center gap-3 w-full text-left px-4 py-2 hover:text-yellow-400 transition ${
                                    lang === "en" ? "bg-cyan-800" : ""
                                }`}
                            >
                                <img
                                    src="https://flagcdn.com/gb.svg"
                                    alt="English"
                                    className="w-6 h-4 rounded-sm"
                                />
                                <span>English</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
