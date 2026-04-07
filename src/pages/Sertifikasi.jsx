import { useState, useCallback } from "react";
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

// ✅ LIGHTBOX
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function Sertifikasi() {
    const { t } = useTranslation();
    const [index, setIndex] = useState(-1);

    const sertif = [
        { src: "/img/sertif1.webp", title: "ISO 9001 PT ENTRI JAYA MAKMUR" },
        { src: "/img/sertif2.webp", title: "ISO 14001 PT ENTRI JAYA MAKMUR" },
        { src: "/img/sertif3.webp", title: "ISO 45001 PT ENTRI JAYA MAKMUR" },
        { src: "/img/sertif4.png", title: "CPAKB ENTRI 21015-1" },
        { src: "/img/sertif5.png", title: "CPAKB ENTRI 22194-1" },
        { src: "/img/sertif6.png", title: "CPAKB ENTRI 26602-1" },
        { src: "/img/sertif7.png", title: "CPAKB ENTRI 32509-1" },
        { src: "/img/sertif8.png", title: "CPAKB ENTRI 32501-1" },
        { src: "/img/sertif-halal-1.webp", title: "SH-PT ENTRI JAYA MAKMUR-LIQUID-01" },
        { src: "/img/sertif-halal-2.webp", title: "SH-PT ENTRI JAYA MAKMUR-LIQUID-02" },
        { src: "/img/sertif-halal-3.webp", title: "SH-PT ENTRI JAYA MAKMUR-LIQUID-03" },
    ];

    const openLightbox = useCallback((i) => setIndex(i), []);

    return (
        <>
            <Helmet>
                <title>Sertifikasi Kami - PT Entri Jaya Makmur</title>
                <meta
                    name="description"
                    content="PT Entri Jaya Makmur sudah lolos banyak sertifikasi"
                />
                <link
                    rel="canonical"
                    href="https://entrijayamakmur.co.id/sertifikasi"
                />
            </Helmet>

            <div>
                {/* HERO */}
                <section
                    className="h-[80vh] max-h-[700px] relative flex flex-col text-white bg-cover bg-no-repeat bg-center md:bg-right"
                    style={{
                        backgroundImage: "url('./img/since.webp')",
                    }}
                >
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-800/50 via-black/50 to-black/60"></div>
                    <div className="block md:hidden absolute inset-0 bg-black/60"></div>

                    <div className="md:flex w-full items-center max-h-[700px]">
                        <div className="hidden relative z-10 w-11/12 mx-auto md:flex flex-col items-start text-left"></div>
                        <div className="relative z-10 md:w-11/12 mx-auto flex flex-col items-start text-center md:text-left bg-gradient-to-t md:bg-gradient-to-l from-cyan-800 via-cyan-800/10 md:via-cyan-800/75 to-transparent h-[80vh] max-h-[700px] justify-center px-10">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                {t("sertif.h1")}
                            </h3>
                            <h3 className="w-full text-3xl md:text-4xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-cyan-100 via-cyan-300 to-cyan-100 bg-clip-text text-transparent">
                                    {t("sertif.h2")}
                                </span>
                            </h3>
                        </div>
                    </div>
                </section>

                {/* GRID */}
                <div className="w-10/12 mx-auto my-20">
                    <h1 className="text-3xl text-center font-semibold mb-5">
                        {t("sertif.klien1")}{" "}
                        <span className="text-cyan-700">
                            {t("sertif.klien2")}
                        </span>
                    </h1>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10">
                        {sertif.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => openLightbox(i)}
                                className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-cyan-700/40 transition duration-300 p-6 cursor-pointer focus:outline-none"
                            >
                                <OptimizedImage
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-auto object-contain max-h-56 mb-4"
                                />
                                <h1 className="text-base font-semibold text-center text-gray-700">
                                    {item.title}
                                </h1>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* LIGHTBOX */}
            <Lightbox
                open={index >= 0}
                close={() => setIndex(-1)}
                index={index}
                slides={sertif}
                plugins={[Thumbnails, Zoom]}
                thumbnails={{ border: 0, padding: 8 }}
                zoom={{ maxZoomPixelRatio: 3, doubleTapDelay: 300 }}
            />
        </>
    );
}