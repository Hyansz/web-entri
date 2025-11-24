import { HiOutlineCpuChip } from "react-icons/hi2";
import { MdOutlineVerified } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import OptimizedImage from "../components/OptimizedImage";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { FaUserGroup } from "react-icons/fa6";

export default function Mitra() {
    const { t } = useTranslation();

    // Daftar mitra beserta nama rumah sakit
    const partners = [
        { src: "/img/partner-1.webp", name: "RSUD SUNAN KALIJAGA DEMAK" },
        { src: "/img/partner-2.webp", name: "DINAS KESEHATAN KABUPATEN OKU SELATAN" },
        { src: "/img/partner-3.webp", name: "RSUD DR. WAHIDIN SUDIRO" },
        { src: "/img/partner-4.webp", name: "RSUD BREBES" },
        { src: "/img/partner-5.webp", name: "RSU SARILA HUSADA" },
        { src: "/img/partner-6.webp", name: "RSI PURWODADI" },
        { src: "/img/partner-7.webp", name: "RSI AT-TIN HUSADA" },
        { src: "/img/partner-8.webp", name: "RS PANTI WILASA CITARUM" },
        { src: "/img/partner-9.webp", name: "RS PKU MUHAMMADIYAH GRUP" },
        { src: "/img/partner-10.webp", name: "RS MAGUAN HUSADA" },
        { src: "/img/partner-11.webp", name: "RS JAFAR MEDIKA" },
        { src: "/img/partner-12.webp", name: "RS DKT SLAMET RIYADI" },
        { src: "/img/partner-13.webp", name: "PUSKESMAS GOMBONG II SEMONDO" },
        { src: "/img/partner-14.webp", name: "RS NUR HIDAYAH" },
        { src: "/img/partner-15.webp", name: "DINAS KESEHATAN KABUPATEN SLEMAN" },
        { src: "/img/partner-16.webp", name: "DINAS KESEHATAN PPKB KOTA TANJUNGPINANG" },
        { src: "/img/partner-17.webp", name: "DINAS KESEHATA SURABAYA KOTA MOJOKERTO" },
        { src: "/img/partner-18.webp", name: "DINAS KESEHATAN SURABAYA KABUPATEN BONDOWOSO" },
        { src: "/img/partner-19.webp", name: "PT KALI REJO MAKMUR" },
        { src: "/img/partner-20.webp", name: "RSUD DR. LOEKMONO HADI" },
    ];

    return (
        <>
            <Helmet>
                <title>Mitra Kami - PT Entri Jaya Makmur</title>
                <meta
                    name="description"
                    content="PT Entri Jaya Makmur sudah bekerjasama dengan banyak mitra, jadi pasti aman dan terpercaya"
                />
                <link
                    rel="canonical"
                    href="https://entrijayamakmur.co.id/mitra"
                />
            </Helmet>

            <div>
                <section
                    className="h-[80vh] max-h-[700px] relative flex flex-col text-white bg-cover bg-no-repeat bg-center md:bg-right"
                    style={{
                        backgroundImage: "url('./img/mitra.webp')",
                    }}
                >
                    {/* Overlay */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-800/50 via-black/50 to-black/60"></div>
                    <div className="block md:hidden absolute inset-0 bg-black/60"></div>

                    <div className="md:flex w-full items-center max-h-[700px]">
                        <div className="hidden relative z-10 w-11/12 mx-auto md:flex flex-col items-start text-left"></div>
                        <div className="relative z-10 md:w-11/12 mx-auto flex flex-col items-start text-center md:text-left bg-gradient-to-t md:bg-gradient-to-l from-cyan-800 via-cyan-800/10 md:via-cyan-800/75 to-transparent h-[80vh] max-h-[700px] justify-center px-10">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                {t("mitra.h1")}{" "}
                            </h3>
                            <h3 className="w-full text-3xl md:text-4xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-cyan-100 via-cyan-300 to-cyan-100 bg-clip-text text-transparent">
                                    {t("mitra.h2")}
                                </span>
                            </h3>
                        </div>
                    </div>
                </section>

                {/* Terpercaya */}
                <div className="w-10/12 mx-auto my-20">
                    <h1 className="text-3xl text-center font-semibold mb-5">
                        {t("mitra.klien1")}{" "}
                        <span className="text-cyan-700">
                            {t("mitra.klien2")}
                        </span>
                    </h1>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-10">
                        {partners.map((partner, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md hover:shadow-cyan-700/40 transition duration-300 p-4"
                            >
                                <OptimizedImage
                                    src={partner.src}
                                    alt={partner.name}
                                    className="w-full h-auto object-contain max-h-40 mb-3"
                                />
                                <h1 className="text-sm font-semibold text-center text-gray-700">
                                    {partner.name}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
