import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { FaWhatsapp } from "react-icons/fa";
import YTLazy from "../components/YTLazy";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function Home() {
    const handleMenuClick = (callback) => {
        if (callback) callback();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>
                    PT Entri Jaya Makmur - Solusi Perlengkapan Medis & Industri
                </title>
                <meta
                    name="description"
                    content="PT Entri Jaya Makmur menyediakan berbagai produk kesehatan, laboratorium, dan perlengkapan medis berkualitas tinggi untuk rumah sakit dan industri."
                />
                <link rel="canonical" href="https://entrijayamakmur.co.id/" />
            </Helmet>

            <div>
                {/* Hero */}
                <section
                    className="h-screen max-h-[800px] relative flex flex-col justify-center items-center text-white bg-cover bg-center"
                    style={{
                        backgroundImage: "url('./img/bsm1.jpg')",
                    }}
                >
                    {/* Overlay hitam transparan */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-800 via-black/50 to-black/60"></div>
                    <div className="md:hidden block absolute inset-0 bg-gradient-to-t from-cyan-800 via-black/50 to-black/60"></div>

                    {/* Content */}
                    <div className="relative z-10 h-screen content-center text-center px-4">
                        <div
                            className="w-11/12 mx-auto mt-10 z-10"
                            data-aos="zoom-in"
                        >
                            <h1 className="text-3xl md:text-5xl mx-auto md:w-[90%] font-bold mb-4 drop-shadow-lg">
                                {t("hero.h1")}{" "}
                                <span className="bg-gradient-to-l from-cyan-500 via-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                                    {t("hero.h2")}
                                </span>{" "}
                                {t("hero.h3")}
                            </h1>
                            <p className="text-base md:text-xl mb-6 max-w-2xl mx-auto drop-shadow">
                                {t("hero.h4")}
                            </p>
                            <Link
                                to="/about"
                                title="Tentang Kami"
                                className="px-6 py-3 backdrop-blur-md bg-white/20 border border-white/20 text-white rounded-xl shadow hover:text-cyan-700 hover:bg-gray-100 transition text-sm md:text-base font-semibold cursor-pointer duration-400"
                            >
                                {t("hero.btn")}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Welcome */}
                <section className="w-11/12 py-15 md:py-20 mx-auto text-center">
                    <h3 className="text-lg md:text-xl font-semibold">
                        {t("hero.sc1")}
                    </h3>
                    <h1 className="text-2xl md:text-4xl font-bold pt-1 pb-5 md:pt-2 md:pb-6 text-cyan-600">
                        PT ENTRI JAYA MAKMUR
                    </h1>
                    <p className="text-md w-11/12 mx-auto">
                        {t("hero.sc2")}
                    </p>

                    <div className="w-11/12 mx-auto bg-slate-100 flex flex-col md:flex-row items-center mt-10 rounded-2xl p-6 md:p-10 gap-8 md:gap-10 shadow-lg shadow-slate-300">
                        {/* Video */}
                        <div className="md:w-1/2 w-full">
                            <div className="relative w-full overflow-hidden rounded-xl shadow-md">
                                <YTLazy
                                    videoId="t_9Zu8M9KJI"
                                    className="shadow-xl"
                                />
                            </div>
                        </div>

                        {/* Deskripsi */}
                        <div className="md:w-1/2 w-full text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-semibold text-cyan-700 pb-4">
                                <span className="text-black">{t("hero.op1")}</span>{" "}
                                {t("hero.op2")}
                            </h1>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                {t("hero.sc3")}
                            </p>
                        </div>
                    </div>

                    <div className="w-11/12 mx-auto mt-20">
                        <h1 className="text-2xl font-semibold mb-5">
                            {t("hero.mitra")}
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
                                <img
                                    src="./img/partner1.png"
                                    alt="Partner 1"
                                    className="rounded-xl shadow-md"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner2.png"
                                    alt="Partner 2"
                                    className="rounded-xl shadow-md"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner3.png"
                                    alt="Partner 3"
                                    className="rounded-xl shadow-md"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner4.png"
                                    alt="Partner 4"
                                    className="rounded-xl shadow-md"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner5.png"
                                    alt="Partner 5"
                                    className="rounded-xl shadow-md"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner6.png"
                                    alt="Partner 6"
                                    className="rounded-xl shadow-md"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner7.png"
                                    alt="Partner 7"
                                    className="rounded-xl shadow-md"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner8.png"
                                    alt="Partner 8"
                                    className="rounded-xl shadow-md"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner9.png"
                                    alt="Partner 8"
                                    className="rounded-xl shadow-md"
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>

                {/* Product 1 */}
                <section className="w-10/12 py-15 md:py-20 mx-auto">
                    <div>
                        <div className="flex items-center justify-between mb-5 h-12 gap-2">
                            <h1 className="text-2xl font-semibold">
                                <span className="text-cyan-700">Hospital</span>{" "}
                                Furniture.
                            </h1>
                            <Link
                                to="/products/furniture"
                                title="Produk Furnitue"
                                onClick={() => handleMenuClick()}
                                className="bg-cyan-700 px-4 py-2 rounded-3xl font-semibold text-white hover:scale-110 transition duration-300 hover:text-cyan-700 hover:bg-white hover:border hover:border-cyan-700"
                            >
                                {t("hero.more")}
                            </Link>
                        </div>
                        <div>
                            <p>
                                {t("hero.sc4")}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000 }}
                            className="cursor-grab rounded-2xl"
                        >
                            {[
                                {
                                    img: "./img/bed1.png",
                                    title: "Hospital Bed Manual (1 Crank)",
                                },
                                {
                                    img: "./img/kursi-gigi.png",
                                    title: "Phlebotomy Chair",
                                },
                                {
                                    img: "./img/kasur-bayi1.png",
                                    title: "Hospital Children Bed",
                                },
                                {
                                    img: "./img/lemari1.png",
                                    title: "Instrumen Cabinet 2 Door Type 01",
                                },
                                {
                                    img: "./img/bed5.png",
                                    title: "Hospital Bed ICU",
                                },
                                {
                                    img: "./img/examin1.png",
                                    title: "Examine Bed SS",
                                },
                            ].map((item, i) => (
                                <SwiperSlide key={i} className="py-5 mb-5">
                                    <div className="rounded-xl shadow-md text-center p-3 h-80 flex flex-col justify-start">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="h-56 w-full object-contain mx-auto"
                                        />
                                        <p className="font-semibold text-lg mt-3">
                                            {item.title}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                {/* Product 2 */}
                <section className="w-10/12 py-15 md:py-20 mx-auto">
                    <div>
                        <div className="flex items-center justify-between mb-5 h-12 gap-2">
                            <h1 className="text-2xl font-semibold">
                                <span className="text-cyan-700">{t("hero.sc5")}</span>{" "}
                                {t("hero.sc6")}
                            </h1>
                            <Link
                                to="/products/liquid"
                                title="Produk Liquid"
                                onClick={() => handleMenuClick()}
                                className="bg-cyan-700 px-4 py-2 rounded-3xl font-semibold text-white hover:scale-110 transition duration-300 hover:text-cyan-700 hover:bg-white hover:border hover:border-cyan-700"
                            >
                                {t("hero.more")}
                            </Link>
                        </div>
                        <div>
                            <p>
                                {t("hero.sc7")}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000 }}
                            className="cursor-grab rounded-2xl"
                        >
                            {[
                                {
                                    img: "./img/alkohol.png",
                                    title: "Alkohol Antiseptik",
                                },
                                {
                                    img: "./img/hand-sanitizer.png",
                                    title: "Hand Sanitizer",
                                },
                                {
                                    img: "./img/chlorhexidine.png",
                                    title: "Chlorhexidine",
                                },
                                {
                                    img: "./img/aquadest-5L.png",
                                    title: "Aquadest 5L",
                                },
                            ].map((item, i) => (
                                <SwiperSlide key={i} className="py-5 mb-5">
                                    <div className="rounded-xl shadow-md text-center p-3 h-auto flex flex-col justify-start">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="h-auto w-full object-contain mx-auto"
                                        />
                                        <p className="font-semibold text-lg mt-3">
                                            {item.title}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                {/* Product 3 */}
                <section className="w-10/12 py-15 md:py-20 mx-auto">
                    <div>
                        <div className="flex items-center justify-between mb-5 h-12 gap-2">
                            <h1 className="text-2xl font-semibold">
                                <span className="text-cyan-700">{t("hero.sc8")}</span>{" "}
                                {t("hero.sc9")}
                            </h1>
                            <Link
                                to="/products/bmhp"
                                title="Produk BMHP"
                                onClick={() => handleMenuClick()}
                                className="bg-cyan-700 px-4 py-2 rounded-3xl font-semibold text-white hover:scale-110 transition duration-300 hover:text-cyan-700 hover:bg-white hover:border hover:border-cyan-700"
                            >
                                {t("hero.more")}
                            </Link>
                        </div>
                        <div>
                            <p>
                                {t("hero.sc10")}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000 }}
                            className="cursor-grab rounded-2xl"
                        >
                            {[
                                {
                                    img: "./img/masker1.png",
                                    title: "Surgical Facemask (Ear Loop)",
                                },
                                { img: "./img/korset.png", title: "Korset" },
                                {
                                    img: "./img/masker2.png",
                                    title: "Surgical Facemask (Head Loop)",
                                },
                                { img: "./img/alswab.png", title: "Alkohol Swab" },
                            ].map((item, i) => (
                                <SwiperSlide key={i} className="py-5 mb-5">
                                    <div className="rounded-xl shadow-md text-center p-3 h-80 flex flex-col justify-start">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="h-56 w-full object-contain mx-auto"
                                        />
                                        <p className="font-semibold text-lg mt-3">
                                            {item.title}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                {/* Product 4 */}
                <section className="w-10/12 py-15 md:py-20 mx-auto">
                    <div>
                        <div className="flex items-center justify-between mb-5 h-12">
                            <h1 className="text-xl md:text-2xl font-semibold">
                                <span className="text-cyan-700">
                                    Laboratorium
                                </span>{" "}
                                Unit.
                            </h1>
                            <Link
                                to="/products/lab"
                                title="Produk Laboratorium"
                                onClick={() => handleMenuClick()}
                                className="bg-cyan-700 px-4 py-2 rounded-3xl font-semibold text-white hover:scale-110 transition duration-300 hover:text-cyan-700 hover:bg-white hover:border hover:border-cyan-700"
                            >
                                {t("hero.more")}
                            </Link>
                        </div>
                        <div>
                            <p>
                                {t("hero.sc11")}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 4 },
                                1024: { slidesPerView: 4 },
                            }}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000 }}
                            className="cursor-grab rounded-2xl"
                        >
                            {[
                                {
                                    img: "./img/lab1.png",
                                    title: "Centrifuge 12 Holes",
                                },
                                {
                                    img: "./img/lab2.png",
                                    title: "Bio Safety Cabinet",
                                },
                                {
                                    img: "./img/lab3.png",
                                    title: "Laminar Air Flow",
                                },
                                {
                                    img: "./img/gluco.png",
                                    title: "Alat Gluco",
                                },
                            ].map((item, i) => (
                                <SwiperSlide key={i} className="py-5 mb-5">
                                    <div className="rounded-xl shadow-md text-center p-3 h-80 flex flex-col justify-start">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="h-60 w-full object-contain mx-auto"
                                        />
                                        <p className="font-semibold text-lg mt-3">
                                            {item.title}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                {/* Product 5 */}
                <section className="w-10/12 py-15 md:py-20 mx-auto">
                    <div>
                        <div className="flex items-center justify-between mb-10 md:mb-5 h-12">
                            <h1 className="text-2xl font-semibold">
                                <span className="text-cyan-700">{t("hero.sc12")}</span>{" "}
                                {t("hero.sc13")}
                            </h1>
                            <Link
                                to="/products/cutting"
                                title="Produk Cutting Laser"
                                onClick={() => handleMenuClick()}
                                className="bg-cyan-700 px-4 py-2 rounded-3xl font-semibold text-white hover:scale-110 transition duration-300 hover:text-cyan-700 hover:bg-white hover:border hover:border-cyan-700"
                            >
                                {t("hero.more")}
                            </Link>
                        </div>
                        <div>
                            <p>
                                {t("hero.sc14")}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000 }}
                            className="cursor-grab rounded-2xl"
                        >
                            {[
                                {
                                    img: "./img/motif1.png",
                                    title: "Motif Cutting 1",
                                },
                                {
                                    img: "./img/motif2.png",
                                    title: "Motif Cutting 2",
                                },
                                {
                                    img: "./img/motif3.png",
                                    title: "Motif Cutting 3",
                                },
                                {
                                    img: "./img/motif4.png",
                                    title: "Motif Cutting 4",
                                },
                                {
                                    img: "./img/motif5.png",
                                    title: "Motif Cutting 5",
                                },
                            ].map((item, i) => (
                                <SwiperSlide key={i} className="py-5 mb-5">
                                    <div className="rounded-xl shadow-md text-center p-3 h-auto flex flex-col justify-start">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="h-72 w-full object-contain mx-auto"
                                        />
                                        <p className="font-semibold text-lg mt-3">
                                            {item.title}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                {/* Contact Us */}
                <section className="w-11/12 md:w-10/12 py-12 md:py-20 mx-auto">
                    <div
                        className="relative flex flex-col md:flex-row items-center justify-between gap-0 md:gap-20 backdrop-blur-md bg-cyan-200/70 px-6 md:px-10 rounded-3xl bg-center bg-no-repeat bg-cover overflow-hidden pt-10 md:pt-0"
                        style={{
                            backgroundImage: "url('./img/room.jpg')",
                        }}
                    >
                        {/* Overlay */}
                        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-700/80 via-black/50 to-black/40 rounded-3xl"></div>
                        <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-cyan-700/80 via-black/50 to-black/40 rounded-3xl"></div>

                        {/* Content */}
                        <div className="relative z-10 w-full md:w-2/3 text-center md:text-left">
                            <h1 className="text-2xl md:text-4xl leading-snug md:leading-tight font-semibold text-white mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0 drop-shadow-lg">
                                {t("hero.hub")}
                            </h1>

                            <div className="hidden md:block">
                                <a
                                    href="https://wa.me/6285174394123?text=Halo,%20Saya%20dari%20website%20entri."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-fit items-center gap-3 bg-green-600 hover:bg-green-700 transition-all duration-300 text-white py-3 px-8 rounded-2xl font-semibold shadow-lg mx-auto md:mx-0"
                                >
                                    <FaWhatsapp className="text-2xl" />
                                    +62 851-7439-4123
                                </a>
                            </div>
                        </div>
                        <div className="absolute md:hidden z-20 bottom-10">
                            <a
                                href="https://wa.me/6285174394123?text=Halo,%20Saya%20dari%20website%20entri."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-fit items-center gap-3 backdrop-blur-md bg-cyan-700/80 md:bg-green-600 hover:scale-110 hover:backdrop-blur-md hover:bg-cyan-700/60 md:hover:bg-green-700 transition-all text-white py-3 px-8 rounded-2xl font-semibold shadow-lg mx-auto md:mx-0 duration-500 hover:shadow-xl hover:shadow-cyan-500/30"
                            >
                                <FaWhatsapp className="text-2xl" />
                                +62 851-7439-4123
                            </a>
                        </div>

                        {/* Image */}
                        <div className="relative z-10 w-full md:w-1/2">
                            <img
                                src="./img/person.png"
                                alt="Person"
                                className="w-full md:max-h-[400px] object-contain"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
