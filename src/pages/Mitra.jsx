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
                        backgroundImage: "url('./img/mitra.png')",
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
                                <span className="bg-gradient-to-r from-cyan-100 via-cyan-300 to-cyan-100  bg-clip-text text-transparent">
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
                        {[
                            "/img/partner-1.png",
                            "/img/partner-2.png",
                            "/img/partner-3.png",
                            "/img/partner-4.png",
                            "/img/partner-5.png",
                            "/img/partner-6.png",
                            "/img/partner-7.png",
                            "/img/partner-8.png",
                            "/img/partner-9.png",
                            "/img/partner-10.png",
                            "/img/partner-11.png",
                            "/img/partner-12.png",
                            "/img/partner-13.png",
                            "/img/partner-14.png",
                            "/img/partner-15.png",
                            "/img/partner-16.png",
                            "/img/partner-17.png",
                            "/img/partner-18.png",
                            "/img/partner-19.png",
                            "/img/partner-20.jpg",
                        ].map((src, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-center bg-white rounded-xl shadow-md hover:shadow-cyan-700/40 transition duration-300 p-4"
                            >
                                <OptimizedImage
                                    src={src}
                                    alt={`Partner ${i + 1}`}
                                    className="w-full h-auto object-contain max-h-40"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
