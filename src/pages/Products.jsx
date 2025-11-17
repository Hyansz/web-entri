import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function Products() {
    const handleMenuClick = (callback) => {
        if (callback) callback();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const { t } = useTranslation();

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
                        backgroundImage: "url('/img/inventory.jpg')",
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
                                    id: 1,
                                    img: "./img/bed1.png",
                                    title: "Hospital Bed Manual (1 Crank)",
                                },
                                {
                                    id: 11,
                                    img: "./img/kursi-gigi.png",
                                    title: "Phlebotomy Chair",
                                },
                                {
                                    id: 12,
                                    img: "./img/kasur-bayi1.png",
                                    title: "Hospital Children Bed",
                                },
                                {
                                    id: 17,
                                    img: "./img/lemari1.png",
                                    title: "Instrumen Cabinet 2 Door Type 01",
                                },
                                {
                                    id: 5,
                                    img: "./img/bed5.png",
                                    title: "Hospital Bed ICU",
                                },
                                {
                                    id: 6,
                                    img: "./img/examin1.png",
                                    title: "Examine Bed SS",
                                },
                            ].map((item, i) => (
                                <SwiperSlide key={i} className="py-5 mb-5">
                                    <div className="bg-white rounded-xl shadow-md text-center p-4 h-[380px] flex flex-col justify-between border border-cyan-500/20 hover:scale-105 duration-300">
                                        <div>
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="h-[220px] w-full object-contain mx-auto mb-3"
                                            />
                                            <p className="font-semibold text-lg text-cyan-800">
                                                {item.title}
                                            </p>
                                        </div>

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
                                    id: 67,
                                    img: "./img/alkohol.png",
                                    title: "Alkohol Antiseptik",
                                },
                                {
                                    id: 68,
                                    img: "./img/hand-sanitizer.png",
                                    title: "Hand Sanitizer",
                                },
                                {
                                    id: 70,
                                    img: "./img/chlorhexidine.png",
                                    title: "Chlorhexidine",
                                },
                                {
                                    id: 71,
                                    img: "./img/aquadest-5L.png",
                                    title: "Aquadest 5L",
                                },
                            ].map((item, i) => (
                                <SwiperSlide key={i} className="py-5 mb-5">
                                    <div className="bg-white rounded-xl shadow-md text-center p-4 h-[380px] flex flex-col justify-between border border-cyan-500/20 hover:scale-105 duration-300">
                                        <div>
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="h-[220px] w-full object-contain mx-auto mb-3"
                                            />
                                            <p className="font-semibold text-lg text-cyan-800">
                                                {item.title}
                                            </p>
                                        </div>

                                        <Link
                                            to={`/products/liquid/${item.id}`}
                                            className="inline-block mt-3 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition duration-300"
                                        >
                                            Detail
                                        </Link>
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
                                    id: 75,
                                    img: "./img/masker1.png",
                                    title: "Surgical Facemask (Ear Loop)",
                                },
                                { 
                                    id: 76, 
                                    img: "./img/korset.png", 
                                    title: "Korset" 
                                },
                                {
                                    id: 77, 
                                    img: "./img/masker2.png",
                                    title: "Surgical Facemask (Head Loop)",
                                },
                                {
                                    id: 78, 
                                    img: "./img/alswab.png",
                                    title: "Alkohol Swab",
                                },
                            ].map((item, i) => (
                                <SwiperSlide key={i} className="py-5 mb-5">
                                    <div className="bg-white rounded-xl shadow-md text-center p-4 h-[380px] flex flex-col justify-between border border-cyan-500/20 hover:scale-105 duration-300">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="h-56 w-full object-contain mx-auto"
                                        />
                                        <p className="font-semibold text-lg mt-3">
                                            {item.title}
                                        </p>
                                        <Link
                                            to={`/products/bmhp/${item.id}`}
                                            className="inline-block mt-3 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition duration-300"
                                        >
                                            Detail
                                        </Link>
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
                            <p>{t("hero.sc11")}</p>
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
                                    id: 83,
                                    img: "./img/lab1.png",
                                    title: "Centrifuge 12 Holes",
                                },
                                {
                                    id: 84,
                                    img: "./img/lab2.png",
                                    title: "Bio Safety Cabinet",
                                },
                                {
                                    id: 85,
                                    img: "./img/lab3.png",
                                    title: "Laminar Air Flow",
                                },
                                {
                                    id: 86,
                                    img: "./img/gluco.png",
                                    title: "Alat Gluco",
                                },
                            ].map((item, i) => (
                                <SwiperSlide key={i} className="py-5 mb-5">
                                    <div className="bg-white rounded-xl shadow-md text-center p-4 h-[380px] flex flex-col justify-between border border-cyan-500/20 hover:scale-105 duration-300">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="h-60 w-full object-contain mx-auto"
                                        />
                                        <p className="font-semibold text-lg mt-3">
                                            {item.title}
                                        </p>
                                        <Link
                                            to={`/products/lab/${item.id}`}
                                            className="inline-block mt-3 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition duration-300"
                                        >
                                            Detail
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
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
