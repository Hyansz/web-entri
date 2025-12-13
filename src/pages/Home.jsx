import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { FaWhatsapp } from "react-icons/fa";
import YTLazy from "../components/YTLazy";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export default function Home() {
    const [dbProducts, setDbProducts] = useState([]);
    const [loadingDb, setLoadingDb] = useState(true);
    const [errorDb, setErrorDb] = useState(false);

    const ASSET_URL = import.meta.env.VITE_ASSET_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingDb(true);
                const res = await api.get("/api/products2/all");
                setDbProducts(res.data.data);
            } catch (err) {
                console.error(err);
                setErrorDb(true);
            } finally {
                setLoadingDb(false);
            }
        };

        fetchProducts();
    }, []);

    const LoadingMessage = ({ text }) => (
        <div className="w-full flex justify-center py-10 text-cyan-700 font-semibold animate-pulse">
            {text}
        </div>
    );

    const EmptyMessage = ({ text }) => (
        <div className="w-full text-center py-10 text-gray-500">{text}</div>
    );

    const handleMenuClick = (callback) => {
        if (callback) callback();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const { t } = useTranslation();

    const filterDb = (catId) =>
        dbProducts.filter(
            (p) => p.category?._id === catId || p.category === catId
        );

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
                        backgroundImage: "url('/img/bsm1.webp')",
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
                                {t("hero.h2")}{" "}
                                <span className="bg-gradient-to-l from-cyan-500 via-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                                    {t("hero.h1")}
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
                    <p className="text-md w-11/12 mx-auto">{t("hero.sc2")}</p>

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
                                <span className="text-black">
                                    {t("hero.op1")}
                                </span>{" "}
                                {t("hero.op2")}
                            </h1>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                {t("hero.sc3")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Banner */}
                <section className="w-11/12 mx-auto text-center">
                    <h3 className="text-xl md:text-2xl font-semibold">
                        {t("hero.bs")}
                    </h3>
                    <div className="w-11/12 mx-auto">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            loop
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                1024: { slidesPerView: 1 },
                            }}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000 }}
                            className="cursor-grab rounded-2xl"
                        >
                            <SwiperSlide className="py-5 mb-5">
                                <div className="bg-white rounded-xl shadow-md hover:shadow-cyan-700/40 transition duration-300 m-2 flex justify-center">
                                    <img
                                        src="./img/best1.webp"
                                        alt="Trend 1"
                                        className="rounded-xl w-full md:h-72 object-cover"
                                    />
                                </div>
                            </SwiperSlide>

                            <SwiperSlide className="py-5 mb-5">
                                <div className="bg-white rounded-xl shadow-md hover:shadow-cyan-700/40 transition duration-300 m-2 flex justify-center">
                                    <img
                                        src="./img/best2.webp"
                                        alt="Trend 2"
                                        className="rounded-xl w-full md:h-72 object-cover"
                                    />
                                </div>
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
                            <p>{t("hero.sc4")}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        {loadingDb ? (
                            <LoadingMessage text="Memuat produk furniture..." />
                        ) : errorDb ? (
                            <EmptyMessage text="Gagal memuat produk." />
                        ) : filterDb("6930deec256fb3df61f81c03").length ===
                          0 ? (
                            <EmptyMessage text="Produk furniture belum tersedia." />
                        ) : (
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                spaceBetween={10}
                                slidesPerView={1}
                                breakpoints={{
                                    640: { slidesPerView: 3 },
                                    1024: { slidesPerView: 4 },
                                }}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000 }}
                                className="cursor-grab rounded-2xl"
                            >
                                {filterDb("6930deec256fb3df61f81c03")
                                    .slice(0, 4)
                                    .map((item) => (
                                        <SwiperSlide
                                            key={item._id}
                                            className="py-5 px-2 mb-5"
                                        >
                                            <div className="bg-white rounded-xl shadow-md text-center p-4 md:h-[380px] flex flex-col justify-between border border-cyan-500/20 hover:scale-105 duration-300">
                                                <img
                                                    src={`${ASSET_URL}${item.image}`}
                                                    alt={item.name}
                                                    className="h-[240px] md:h-[220px] w-full object-contain mx-auto mb-3"
                                                />
                                                <p className="font-semibold text-lg text-cyan-800">
                                                    {item.name}
                                                </p>
                                                <Link
                                                    to={`/products/${item._id}`}
                                                    onClick={() =>
                                                        window.scrollTo({
                                                            top: 0,
                                                            behavior: "smooth",
                                                        })
                                                    }
                                                    className="mt-2 inline-block px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                                                >
                                                    Detail
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        )}
                    </div>
                </section>

                {/* Product 2 */}
                <section className="w-10/12 py-15 md:py-20 mx-auto">
                    <div>
                        <div className="flex items-center justify-between mb-5 h-12 gap-2">
                            <h1 className="text-2xl font-semibold">
                                <span className="text-cyan-700">
                                    {t("hero.sc5")}
                                </span>{" "}
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
                            <p>{t("hero.sc7")}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        {loadingDb ? (
                            <LoadingMessage text="Memuat produk liquid..." />
                        ) : errorDb ? (
                            <EmptyMessage text="Gagal memuat produk." />
                        ) : filterDb("6930def8256fb3df61f81c0d").length ===
                          0 ? (
                            <EmptyMessage text="Produk liquid belum tersedia." />
                        ) : (
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                spaceBetween={10}
                                slidesPerView={1}
                                breakpoints={{
                                    640: { slidesPerView: 3 },
                                    1024: { slidesPerView: 4 },
                                }}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000 }}
                                className="cursor-grab rounded-2xl"
                            >
                                {filterDb("6930def8256fb3df61f81c0d")
                                    .slice(0, 4)
                                    .map((item) => (
                                        <SwiperSlide
                                            key={item._id}
                                            className="py-5 px-2 mb-5"
                                        >
                                            <div className="bg-white rounded-xl shadow-md text-center p-4 md:h-[380px] flex flex-col justify-between border border-cyan-500/20 hover:scale-105 duration-300">
                                                <img
                                                    src={`${ASSET_URL}${item.image}`}
                                                    alt={item.name}
                                                    className="h-[240px] md:h-[220px] w-full object-contain mx-auto mb-3"
                                                />
                                                <p className="font-semibold text-lg text-cyan-800">
                                                    {item.name}
                                                </p>
                                                <Link
                                                    to={`/products/${item._id}`}
                                                    onClick={() =>
                                                        window.scrollTo({
                                                            top: 0,
                                                            behavior: "smooth",
                                                        })
                                                    }
                                                    className="mt-2 inline-block px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                                                >
                                                    Detail
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        )}
                    </div>
                </section>

                {/* Product 3 */}
                <section className="w-10/12 py-15 md:py-20 mx-auto">
                    <div>
                        <div className="flex items-center justify-between mb-5 h-12 gap-2">
                            <h1 className="text-2xl font-semibold">
                                <span className="text-cyan-700">
                                    {t("hero.sc8")}
                                </span>{" "}
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
                            <p>{t("hero.sc10")}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        {loadingDb ? (
                            <LoadingMessage text="Memuat produk bmhp..." />
                        ) : errorDb ? (
                            <EmptyMessage text="Gagal memuat produk." />
                        ) : filterDb("6930def2256fb3df61f81c08").length ===
                          0 ? (
                            <EmptyMessage text="Produk bmhp belum tersedia." />
                        ) : (
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                spaceBetween={10}
                                slidesPerView={1}
                                breakpoints={{
                                    640: { slidesPerView: 3 },
                                    1024: { slidesPerView: 4 },
                                }}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000 }}
                                className="cursor-grab rounded-2xl"
                            >
                                {filterDb("6930def2256fb3df61f81c08")
                                    .slice(0, 4)
                                    .map((item) => (
                                        <SwiperSlide
                                            key={item._id}
                                            className="py-5 px-2 mb-5"
                                        >
                                            <div className="bg-white rounded-xl shadow-md text-center p-4 md:h-[380px] flex flex-col justify-between border border-cyan-500/20 hover:scale-105 duration-300">
                                                <img
                                                    src={`${ASSET_URL}${item.image}`}
                                                    alt={item.name}
                                                    className="h-[240px] md:h-[220px] w-full object-contain mx-auto mb-3"
                                                />
                                                <p className="font-semibold text-lg text-cyan-800">
                                                    {item.name}
                                                </p>
                                                <Link
                                                    to={`/products/${item._id}`}
                                                    onClick={() =>
                                                        window.scrollTo({
                                                            top: 0,
                                                            behavior: "smooth",
                                                        })
                                                    }
                                                    className="mt-2 inline-block px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                                                >
                                                    Detail
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        )}
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
                            <p>{t("hero.sc11")}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        {loadingDb ? (
                            <LoadingMessage text="Memuat produk laboratorium..." />
                        ) : errorDb ? (
                            <EmptyMessage text="Gagal memuat produk." />
                        ) : filterDb("6930df06256fb3df61f81c12").length ===
                          0 ? (
                            <EmptyMessage text="Produk laboratorium belum tersedia." />
                        ) : (
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                spaceBetween={10}
                                slidesPerView={1}
                                breakpoints={{
                                    640: { slidesPerView: 3 },
                                    1024: { slidesPerView: 4 },
                                }}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000 }}
                                className="cursor-grab rounded-2xl"
                            >
                                {filterDb("6930df06256fb3df61f81c12")
                                    .slice(0, 4)
                                    .map((item) => (
                                        <SwiperSlide
                                            key={item._id}
                                            className="py-5 px-2 mb-5"
                                        >
                                            <div className="bg-white rounded-xl shadow-md text-center p-4 md:h-[380px] flex flex-col justify-between border border-cyan-500/20 hover:scale-105 duration-300">
                                                <img
                                                    src={`${ASSET_URL}${item.image}`}
                                                    alt={item.name}
                                                    className="h-[240px] md:h-[220px] w-full object-contain mx-auto mb-3"
                                                />
                                                <p className="font-semibold text-lg text-cyan-800">
                                                    {item.name}
                                                </p>
                                                <Link
                                                    to={`/products/${item._id}`}
                                                    onClick={() =>
                                                        window.scrollTo({
                                                            top: 0,
                                                            behavior: "smooth",
                                                        })
                                                    }
                                                    className="mt-2 inline-block px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
                                                >
                                                    Detail
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        )}
                    </div>
                </section>

                {/* Product 5 */}
                {/* <section className="w-10/12 py-15 md:py-20 mx-auto">
                    <div>
                        <div className="flex items-center justify-between mb-10 md:mb-5 h-12">
                            <h1 className="text-2xl font-semibold">
                                <span className="text-cyan-700">
                                    {t("hero.sc12")}
                                </span>{" "}
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
                            <p>{t("hero.sc14")}</p>
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
                                    img: "./img/motif1.webp",
                                    title: "Motif Cutting 1",
                                },
                                {
                                    img: "./img/motif2.webp",
                                    title: "Motif Cutting 2",
                                },
                                {
                                    img: "./img/motif3.webp",
                                    title: "Motif Cutting 3",
                                },
                                {
                                    img: "./img/motif4.webp",
                                    title: "Motif Cutting 4",
                                },
                                {
                                    img: "./img/motif5.webp",
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
                                        <Link
                                            to={`/products/furniture/${item.id}`}
                                            className="inline-block mt-3 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition duration-300"
                                        >
                                            Detail
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section> */}

                {/* Contact Us */}
                <section className="w-11/12 md:w-10/12 py-12 md:py-20 mx-auto">
                    <div
                        className="relative flex flex-col md:flex-row items-center justify-between gap-0 md:gap-20 backdrop-blur-md bg-cyan-200/70 px-6 md:px-10 rounded-3xl bg-center bg-no-repeat bg-cover overflow-hidden pt-10 md:pt-0"
                        style={{
                            backgroundImage: "url('./img/room.webp')",
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
                                src="./img/person.webp"
                                alt="Person"
                                className="w-full md:max-h-[400px] object-contain"
                            />
                        </div>
                    </div>
                </section>

                {/* Mitra */}
                <section className="w-11/12 pb-15 md:pb-20 mx-auto text-center">
                    <div className="w-11/12 mx-auto mt-20">
                        <h1 className="text-2xl font-semibold mb-5">
                            {t("hero.mitra")}
                        </h1>
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={2}
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
                                    src="./img/partner-1.webp"
                                    alt="Partner 1"
                                    className="rounded-xl shadow-md h-30 md:h-40 w-full object-contain p-2"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner-2.webp"
                                    alt="Partner 2"
                                    className="rounded-xl shadow-md h-30 md:h-40 w-full object-contain p-2"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner-3.webp"
                                    alt="Partner 3"
                                    className="rounded-xl shadow-md h-30 md:h-40 w-full object-contain p-2"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner-4.webp"
                                    alt="Partner 4"
                                    className="rounded-xl shadow-md h-30 md:h-40 w-full object-contain p-2"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner-5.webp"
                                    alt="Partner 5"
                                    className="rounded-xl shadow-md h-30 md:h-40 w-full object-contain p-2"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner-6.webp"
                                    alt="Partner 6"
                                    className="rounded-xl shadow-md h-30 md:h-40 w-full object-contain p-2"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner-7.webp"
                                    alt="Partner 7"
                                    className="rounded-xl shadow-md h-30 md:h-40 w-full object-contain p-2"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner-8.webp"
                                    alt="Partner 8"
                                    className="rounded-xl shadow-md h-30 md:h-40 w-full object-contain p-2"
                                />
                            </SwiperSlide>
                            <SwiperSlide className="py-5 mb-5">
                                <img
                                    src="./img/partner-9.webp"
                                    alt="Partner 8"
                                    className="rounded-xl shadow-md h-30 md:h-40 w-full object-contain p-2"
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>
            </div>
        </>
    );
}
