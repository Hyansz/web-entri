import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export default function Products() {
    const [dbProducts, setDbProducts] = useState([]);
    const [loadingDb, setLoadingDb] = useState(true);
    const [errorDb, setErrorDb] = useState(false);

    const ASSET_URL = import.meta.env.VITE_ASSET_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingDb(true);
                const res = await api.get(
                    "/api/products2/all"
                );
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
                <title>Semua Produk - PT Entri Jaya Makmur</title>
                <meta
                    name="description"
                    content="Jelajahi katalog produk PT Entri Jaya Makmur, meliputi hospital furniture, BMHP, cairan medis, dan perlengkapan laboratorium berkualitas tinggi."
                />
                <link
                    rel="canonical"
                    href="https://entrijayamakmur.co.id/products"
                />
            </Helmet>

            <div>
                {/* Hero */}
                <section
                    className="h-[80vh] max-h-[700px] relative flex flex-col text-white bg-cover bg-no-repeat bg-right"
                    style={{
                        backgroundImage: "url('/img/inventory.webp')",
                    }}
                >
                    {/* Overlay */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-800 via-black/50 to-black/60"></div>
                    <div className="md:hidden block absolute inset-0 bg-gradient-to-t from-cyan-800 via-black/50 to-black/60"></div>

                    <div>
                        <div className="relative w-11/12 z-10 mx-auto flex flex-col items-start h-[80vh] max-h-[700px] justify-center text-center">
                            <h3 className="text-3xl w-full md:text-5xl font-bold mb-4">
                                {t("produk.h1")}{" "}
                                <span className="bg-gradient-to-l from-cyan-500 via-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                                    {t("produk.h2")}
                                </span>{" "}
                            </h3>
                        </div>
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
            </div>
        </>
    );
}
