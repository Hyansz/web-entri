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

export default function About() {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>Tentang Kami - PT Entri Jaya Makmur</title>
                <meta
                    name="description"
                    content="Kenali PT Entri Jaya Makmur, perusahaan penyedia perlengkapan medis, laboratorium, dan kebutuhan industri terpercaya di Indonesia."
                />
                <link
                    rel="canonical"
                    href="https://entrijayamakmur.co.id/about"
                />
            </Helmet>

            <div>
                {/* Hero */}
                <section
                    className="h-[80vh] max-h-[700px] relative flex flex-col text-white bg-cover bg-no-repeat bg-center md:bg-right"
                    style={{
                        backgroundImage: "url('./img/about.png')",
                    }}
                >
                    {/* Overlay */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-800/50 via-black/50 to-black/60"></div>
                    <div className="block md:hidden absolute inset-0 bg-black/60"></div>

                    <div className="md:flex w-full items-center max-h-[700px]">
                        <div className="hidden relative z-10 w-11/12 mx-auto md:flex flex-col items-start text-left"></div>
                        <div className="relative z-10 md:w-11/12 mx-auto flex flex-col items-start text-center md:text-left bg-gradient-to-t md:bg-gradient-to-l from-cyan-800 via-cyan-800/10 md:via-cyan-800/75 to-transparent h-[80vh] max-h-[700px] justify-center px-10">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                {t("about.h1")}{" "}
                                <span className="bg-gradient-to-r from-cyan-100 via-cyan-300 to-cyan-100 bg-clip-text text-transparent">
                                    {t("about.h2")}
                                </span>{" "}
                                {t("about.h3")}
                            </h3>
                            <h3 className="w-full text-3xl md:text-4xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-cyan-100 via-cyan-300 to-cyan-100  bg-clip-text text-transparent">
                                    {t("about.h4")}
                                </span>{" "}
                                {t("about.h5")}
                            </h3>
                        </div>
                    </div>
                </section>

                {/* Since */}
                <section
                    className="w-10/12 my-20 mx-auto relative text-white bg-cover bg-no-repeat bg-center rounded-3xl"
                    style={{
                        backgroundImage:
                            "url('https://kitchensetentri.com/img/hero-bg.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 via-black/50 to-black/60 rounded-3xl"></div>

                    <div className="relative flex justify-center items-center p-6 md:p-20">
                        <div className="w-full md:w-2/3">
                            <h1 className="text-3xl font-semibold mb-5 text-center md:text-left">
                                {t("about.thn")}
                            </h1>
                            <p className="text-justify">{t("about.sejarah")}</p>
                        </div>
                        <div className="hidden md:block bg-green-500 w-1/2"></div>
                    </div>
                </section>

                {/* Komitmen */}
                <section className="w-10/12 mx-auto py-20">
                    <h1 className="text-center text-3xl font-semibold">
                        <span className="text-cyan-700">
                            {t("about.komit1")}
                        </span>{" "}
                        {t("about.komit2")}
                    </h1>

                    <div className="flex flex-col md:flex-row flex-wrap items-start gap-5 pt-16">
                        {/* Item 1 */}
                        <div className="flex-1 w-full md:w-1/4">
                            <div className="hidden md:flex items-center gap-4 justify-center md:justify-start mb-4 h-15">
                                <HiOutlineCpuChip className="text-4xl bg-cyan-700 p-1 rounded-full text-white" />
                                <h2 className="text-lg font-semibold">
                                    {t("about.komit3")}
                                    <h2 className="text-lg font-semibold">
                                        {t("about.komit3-1")}
                                    </h2>
                                </h2>
                            </div>
                            <div className="flex md:hidden items-center gap-4 justify-center md:justify-start mb-4 h-15">
                                <HiOutlineCpuChip className="text-4xl bg-cyan-700 p-1 rounded-full text-white" />
                                <h2 className="text-lg font-semibold">
                                    {t("about.komit3-2")}
                                </h2>
                            </div>
                            <div className="bg-white p-2 shadow-md shadow-slate-400 rounded-lg">
                                <OptimizedImage
                                    src="/img/las.jpg"
                                    alt="Teknologi Mesin Modern"
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="flex-1 w-full md:w-1/4">
                            <div className="hidden md:flex items-center gap-4 justify-center md:justify-start mb-4 h-15">
                                <FaUserGroup className="text-4xl bg-cyan-700 p-1 rounded-full text-white" />
                                <h2 className="text-lg font-semibold">
                                    {t("about.komit4")}
                                    <h2 className="text-lg font-semibold">
                                        {t("about.komit4-1")}
                                    </h2>
                                </h2>
                            </div>
                            <div className="flex md:hidden items-center gap-4 justify-center md:justify-start mb-4 h-15">
                                <FaUserGroup className="text-4xl bg-cyan-700 p-1 rounded-full text-white" />
                                <h2 className="text-lg font-semibold">
                                    {t("about.komit4-2")}
                                </h2>
                            </div>
                            <div className="bg-white p-2 shadow-md shadow-slate-400 rounded-lg">
                                <OptimizedImage
                                    src="/img/profesional.jpeg"
                                    alt="Teknologi Mesin Modern"
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="flex-1 w-full md:w-1/4">
                            <div className="hidden md:flex items-center gap-4 justify-center md:justify-start mb-4 h-15">
                                <RiCustomerService2Fill className="text-4xl bg-cyan-700 p-1.5 rounded-full text-white" />
                                <h2 className="text-lg font-semibold">
                                    {t("about.komit5")}
                                    <h2 className="text-lg font-semibold">
                                        {t("about.komit5-1")}
                                    </h2>
                                </h2>
                            </div>
                            <div className="flex md:hidden items-center gap-4 justify-center md:justify-start mb-4 h-15">
                                <RiCustomerService2Fill className="text-4xl bg-cyan-700 p-1.5 rounded-full text-white" />
                                <h2 className="text-lg font-semibold">
                                    {t("about.komit5-2")}
                                </h2>
                            </div>
                            <div className="bg-white py-2 shadow-md shadow-slate-400 rounded-lg">
                                <OptimizedImage
                                    src="/img/qc.jpg"
                                    alt="Pelayanan Profesional"
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className="flex-1 w-full md:w-1/4">
                            <div className="hidden md:flex items-center gap-4 justify-center md:justify-start mb-4 h-15">
                                <MdOutlineVerified className="text-4xl bg-cyan-700 p-1.5 rounded-full text-white" />
                                <h2 className="text-lg font-semibold">
                                    {t("about.komit6")}
                                    <h2 className="text-lg font-semibold">
                                        {t("about.komit6-1")}
                                    </h2>
                                </h2>
                            </div>
                            <div className="flex md:hidden items-center gap-4 justify-center md:justify-start mb-4 h-15">
                                <MdOutlineVerified className="text-4xl bg-cyan-700 p-1.5 rounded-full text-white" />
                                <h2 className="text-lg font-semibold">
                                    {t("about.komit6-2")}
                                </h2>
                            </div>
                            <div className="bg-white p-2 shadow-md shadow-slate-400 rounded-lg">
                                <OptimizedImage
                                    src="/img/inovasi.jpeg"
                                    alt="Harmoni Kreativitas & Teknologi"
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Terpercaya */}
                <div className="w-10/12 mx-auto my-20">
                    <h1 className="text-3xl text-center font-semibold mb-5">
                        {t("about.klien1")}{" "}
                        <span className="text-cyan-700">
                            {t("about.klien2")}
                        </span>
                    </h1>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={3}
                        loop
                        breakpoints={{
                            640: { slidesPerView: 4 },
                            1024: { slidesPerView: 7 },
                        }}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        className="cursor-grab rounded-2xl h-auto"
                    >
                        <SwiperSlide className="py-5 mb-5">
                            <OptimizedImage
                                src="/img/partner1.png"
                                alt="Partner 1"
                                className="rounded-xl shadow-md"
                            />
                        </SwiperSlide>
                        <SwiperSlide className="py-5 mb-5">
                            <OptimizedImage
                                src="/img/partner2.png"
                                alt="Partner 2"
                                className="rounded-xl shadow-md"
                            />
                        </SwiperSlide>
                        <SwiperSlide className="py-5 mb-5">
                            <OptimizedImage
                                src="/img/partner3.png"
                                alt="Partner 3"
                                className="rounded-xl shadow-md"
                            />
                        </SwiperSlide>
                        <SwiperSlide className="py-5 mb-5">
                            <OptimizedImage
                                src="/img/partner4.png"
                                alt="Partner 4"
                                className="rounded-xl shadow-md"
                            />
                        </SwiperSlide>
                        <SwiperSlide className="py-5 mb-5">
                            <OptimizedImage
                                src="/img/partner5.png"
                                alt="Partner 5"
                                className="rounded-xl shadow-md"
                            />
                        </SwiperSlide>
                        <SwiperSlide className="py-5 mb-5">
                            <OptimizedImage
                                src="/img/partner6.png"
                                alt="Partner 6"
                                className="rounded-xl shadow-md"
                            />
                        </SwiperSlide>
                        <SwiperSlide className="py-5 mb-5">
                            <OptimizedImage
                                src="/img/partner7.png"
                                alt="Partner 7"
                                className="rounded-xl shadow-md"
                            />
                        </SwiperSlide>
                        <SwiperSlide className="py-5 mb-5">
                            <OptimizedImage
                                src="/img/partner8.png"
                                alt="Partner 8"
                                className="rounded-xl shadow-md"
                            />
                        </SwiperSlide>
                        <SwiperSlide className="py-5 mb-5">
                            <OptimizedImage
                                src="/img/partner9.png"
                                alt="Partner 9"
                                className="rounded-xl shadow-md"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    );
}
