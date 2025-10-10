import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Products() {
    const handleMenuClick = (callback) => {
        if (callback) callback();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div>
            {/* Hero */}
            <section
                className="h-[80vh] relative flex flex-col text-white bg-cover bg-no-repeat bg-right"
                style={{
                    backgroundImage: "url('/img/inventory.jpg')",
                }}
            >
                {/* Overlay */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-800 via-black/50 to-black/60"></div>
                <div className="md:hidden block absolute inset-0 bg-gradient-to-t from-cyan-800 via-black/50 to-black/60"></div>

                <div>
                    <div className="relative w-11/12 z-10 mx-auto flex flex-col items-start h-[80vh] justify-center text-center">
                        <h3 className="text-3xl w-full md:text-5xl font-bold mb-4">
                            Our{" "}
                            <span className="bg-gradient-to-l from-cyan-500 via-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                                Product
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
                            onClick={() => handleMenuClick()}
                            className="bg-cyan-700 px-4 py-2 rounded-3xl font-semibold text-white hover:scale-110 transition duration-300 hover:text-cyan-700 hover:bg-white hover:border hover:border-cyan-700"
                        >
                            Selengkapnya
                        </Link>
                    </div>
                    <div>
                        <p>
                            Aneka perabot dan perlengkapan khusus untuk
                            menunjang fasilitas kesehatan.
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
                            <span className="text-cyan-700">Produk</span>{" "}
                            Liquid.
                        </h1>
                        <Link
                            to="/products/liquid"
                            onClick={() => handleMenuClick()}
                            className="bg-cyan-700 px-4 py-2 rounded-3xl font-semibold text-white hover:scale-110 transition duration-300 hover:text-cyan-700 hover:bg-white hover:border hover:border-cyan-700"
                        >
                            Selengkapnya
                        </Link>
                    </div>
                    <div>
                        <p>
                            Aneka perabot dan perlengkapan khusus untuk
                            menunjang fasilitas kesehatan.
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
                            <span className="text-cyan-700">Produk</span> BMHP.
                        </h1>
                        <Link
                            to="/products/bmhp"
                            onClick={() => handleMenuClick()}
                            className="bg-cyan-700 px-4 py-2 rounded-3xl font-semibold text-white hover:scale-110 transition duration-300 hover:text-cyan-700 hover:bg-white hover:border hover:border-cyan-700"
                        >
                            Selengkapnya
                        </Link>
                    </div>
                    <div>
                        <p>
                            Aneka perabot dan perlengkapan khusus untuk
                            menunjang fasilitas kesehatan.
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
                            { img: "./img/alswab.png", title: "Alat Swab" },
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
                            <span className="text-cyan-700">Laboratorium</span>{" "}
                            Unit.
                        </h1>
                        <Link
                            to="/products/lab"
                            onClick={() => handleMenuClick()}
                            className="bg-cyan-700 px-4 py-2 rounded-3xl font-semibold text-white hover:scale-110 transition duration-300 hover:text-cyan-700 hover:bg-white hover:border hover:border-cyan-700"
                        >
                            Selengkapnya
                        </Link>
                    </div>
                    <div>
                        <p>
                            Aneka perabot dan perlengkapan khusus untuk
                            menunjang fasilitas kesehatan.
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
                            1024: { slidesPerView: 3 },
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
                            <span className="text-cyan-700">Motif</span> Cutting
                            Laser.
                        </h1>
                        <Link
                            to="/products/cutting"
                            onClick={() => handleMenuClick()}
                            className="bg-cyan-700 px-4 py-2 rounded-3xl font-semibold text-white hover:scale-110 transition duration-300 hover:text-cyan-700 hover:bg-white hover:border hover:border-cyan-700"
                        >
                            Selengkapnya
                        </Link>
                    </div>
                    <div>
                        <p>
                            Aneka perabot dan perlengkapan khusus untuk
                            menunjang fasilitas kesehatan.
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
        </div>
    );
}
