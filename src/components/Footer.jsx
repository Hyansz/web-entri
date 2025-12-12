import { BiLogoGmail } from "react-icons/bi";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="backdrop-blur-md bg-cyan-700/90 text-white pt-4 px-4">
            <div className="mb-10 flex flex-col xl:flex-row justify-between py-6 w-11/12 mx-auto">
                <div className="xl:w-1/3 flex flex-col justify-center xl:justify-between items-center md:items-start text-center md:text-left mb-10 xl:mb-0">
                    <div className="mb-4 xl:mb-0">
                        <img
                            src="/img/logo2.webp"
                            alt=""
                            className="mb-4 w-11/12 md:w-2/4 xl:w-2/3 mx-auto xl:mx-0"
                        />
                        <p>{t("footer.h1")}</p>
                    </div>
                    <div>
                        <ul className="flex gap-4">
                            <li className="text-xl hover:scale-110 duration-400 cursor-pointer hover:backdrop-blur-md hover:bg-pink-400/80 p-1 rounded-lg hover:shadow-xl hover:shadow-pink-500/40">
                                <a
                                    href="https://www.instagram.com/pt.entrijayamakmur/"
                                    target="_blank"
                                >
                                    <FaInstagram />
                                </a>
                            </li>
                            <li className="text-xl hover:scale-110 duration-400 cursor-pointer hover:backdrop-blur-md hover:bg-blue-400/80 p-1 rounded-lg hover:shadow-xl hover:shadow-blue-500">
                                <a
                                    href="https://web.facebook.com/pt.entrijayamakmur"
                                    target="_blank"
                                >
                                    <FaFacebookF />
                                </a>
                            </li>
                            <li className="text-xl hover:scale-110 duration-400 cursor-pointer hover:backdrop-blur-md hover:bg-black/80 p-1 rounded-lg hover:shadow-xl hover:shadow-black/40">
                                <a
                                    href="https://www.tiktok.com/@pt.entrijayamakmur"
                                    target="_blank"
                                >
                                    <FaTiktok />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-10 w-full xl:w-1/2 text-center md:text-left">
                    <div className="flex flex-col justify-center md:justify-between gap-10">
                        <div>
                            <h1 className="mb-5 md:mb-2 font-semibold text-xl md:text-lg">
                                {t("footer.site")}
                            </h1>
                            <div className="flex flex-col text-lg md:text-base md:gap-0.5 gap-3">
                                <Link
                                    to="/"
                                    title="Beranda"
                                    onClick={() =>
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        })
                                    }
                                    className="transition duration-300 w-full md:w-fit hover:scale-110"
                                >
                                    {t("nav.home")}
                                </Link>
                                <Link
                                    to="/about"
                                    title="Tentang Kami"
                                    onClick={() =>
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        })
                                    }
                                    className="transition duration-300 w-full md:w-fit hover:scale-110"
                                >
                                    {t("nav.tentang")}
                                </Link>
                                <Link
                                    to="/mitra"
                                    title="Blog"
                                    onClick={() =>
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        })
                                    }
                                    className="transition duration-300 w-full md:w-fit hover:scale-110"
                                >
                                    {t("hero.mitra")}
                                </Link>
                                <Link
                                    to="/products"
                                    title="Semua Produk"
                                    onClick={() =>
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        })
                                    }
                                    className="transition duration-300 w-full md:w-fit hover:scale-110"
                                >
                                    {t("nav.produk")}
                                </Link>
                                <Link
                                    to="/blog"
                                    title="Blog"
                                    onClick={() =>
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        })
                                    }
                                    className="transition duration-300 w-full md:w-fit hover:scale-110"
                                >
                                    {t("nav.blog")}
                                </Link>
                                <Link
                                    to="/edu"
                                    title="Edukasi"
                                    onClick={() =>
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        })
                                    }
                                    className="transition duration-300 w-full md:w-fit hover:scale-110"
                                >
                                    {t("nav.edu")}
                                </Link>
                                <Link
                                    to="/contact"
                                    title="Kontak Kami"
                                    onClick={() =>
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        })
                                    }
                                    className="transition duration-300 w-full md:w-fit hover:scale-110"
                                >
                                    {t("nav.kontak")}
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h1 className="mb-5 md:mb-2 text-xl md:text-lg font-semibold">
                                {t("footer.kontak")}
                            </h1>
                            <div className="flex flex-col gap-3 md:gap-0.5 items-center md:items-start">
                                <div>
                                    <a
                                        href="https://wa.me/6285174394123?text=Halo,%20Saya%20dari%20website%20entri."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex w-full md:w-fit items-center gap-3 text-white rounded-2xl font-semibold transition duration-300 hover:scale-105"
                                    >
                                        <FaWhatsapp className="text-2xl" />
                                        +62 851-7439-4123
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="mailto:ptentrijayamakmursolo@gmail.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex md:w-fit items-center gap-3 text-white rounded-2xl font-semibold transition duration-300 hover:scale-105"
                                    >
                                        <BiLogoGmail className="text-2xl" />
                                        ptentrijayamakmursolo@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="mb-4 md:mb-2 font-semibold text-xl md:text-lg">
                            {t("footer.alamat")}
                        </h1>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31643.4499440724!2d110.81485797431638!3d-7.527852800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a17477073a1ab%3A0xb8932b3b6617c817!2sPT.%20ENTRI%20JAYA%20MAKMUR!5e0!3m2!1sid!2sid!4v1758162647345!5m2!1sid!2sid"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full rounded-lg mb-4"
                        />
                        <p>
                            Jl. Ring Road No.95, Mojosongo, Kec. Jebres, Kota
                            Surakarta, Jawa Tengah 57127
                        </p>
                    </div>
                </div>
            </div>
            <hr className="text-cyan-300/20" />
            <div className="backdrop-blur-md rounded-2xl bg-gradient-to-r from-cyan-600/50 via-cyan-800/20 to-cyan-600/50 mt-2">
                <p className="text-sm py-4 text-center md:text-sm">
                    © {new Date().getFullYear()} PT Entri Jaya Makmur. All
                    rights reserved.
                </p>
            </div>
        </footer>
    );
}
