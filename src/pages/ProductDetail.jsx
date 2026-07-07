import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import api from "../api/axiosInstance";
import { imageUrl } from "../utils/image";

export default function ProductDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const ASSET_URL = import.meta.env.VITE_ASSET_URL;

    useEffect(() => {
        setLoading(true);
        setError(false);

        api.get(`/api/products2/slug/${slug}`)
            .then((res) => setProduct(res.data))
            .catch((err) => {
                console.error("DETAIL ERROR:", err);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, [slug]);

    const spesifikasiList = product?.specifications
        ? product.specifications
              .split("|")
              .map((s) => s.trim())
              .filter(Boolean)
        : [];

    return (
        <div style={{ background: "#F4F8F8", minHeight: "100vh" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');

                .pd-font-display { font-family: 'Space Grotesk', sans-serif; }
                .pd-font-body { font-family: 'Inter', sans-serif; }
                .pd-font-mono { font-family: 'IBM Plex Mono', monospace; }

                .pd-seal {
                    background: #FFFDF7;
                    border: 1.5px dashed #A9791D;
                    box-shadow: 0 6px 20px -6px rgba(10,46,51,0.25);
                    transform: rotate(-4deg);
                }
                .pd-seal-inner {
                    border: 1px solid #A9791D55;
                }
                @media (prefers-reduced-motion: no-preference) {
                    .pd-fade-in {
                        animation: pdFadeIn 0.5s ease-out both;
                    }
                    @keyframes pdFadeIn {
                        from { opacity: 0; transform: translateY(8px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                }
            `}</style>

            {/* Header strip */}
            <div className="h-[74px] bg-cyan-700"></div>

            <div className="w-11/12 md:w-10/12 mx-auto py-10 md:py-16">
                {/* LOADING */}
                {loading && (
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 animate-pulse">
                        <div className="aspect-square rounded-2xl bg-cyan-100/60" />
                        <div className="space-y-4 pt-4">
                            <div className="h-3 w-24 bg-cyan-100 rounded" />
                            <div className="h-8 w-3/4 bg-cyan-100 rounded" />
                            <div className="h-4 w-1/2 bg-cyan-100 rounded" />
                            <div className="h-32 w-full bg-cyan-100/70 rounded-xl mt-6" />
                        </div>
                    </div>
                )}

                {/* ERROR */}
                {!loading && error && (
                    <div className="max-w-md mx-auto text-center py-16 pd-font-body">
                        <p
                            className="text-lg font-semibold"
                            style={{ color: "#0A2E33" }}
                        >
                            Produk tidak ditemukan
                        </p>
                        <p
                            className="text-sm mt-2"
                            style={{ color: "#5C7679" }}
                        >
                            Data produk ini mungkin sudah dipindahkan atau
                            dihapus.
                        </p>
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-6 px-5 py-2.5 rounded-full text-sm font-medium bg-cyan-700 text-white hover:bg-cyan-800 transition-colors cursor-pointer"
                        >
                            Kembali
                        </button>
                    </div>
                )}

                {/* SUCCESS */}
                {!loading && !error && product && (
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 pd-fade-in">
                        {/* IMAGE + SEAL */}
                        <div className="relative">
                            <button
                                onClick={() => navigate(-1)}
                                className="md:hidden absolute right-3 top-3 z-10 bg-white/90 rounded-full p-1 shadow-md text-cyan-800 hover:scale-110 transition-transform cursor-pointer"
                                aria-label="Tutup"
                            >
                                <IoIosCloseCircleOutline size={26} />
                            </button>

                            <div
                                className="rounded-2xl overflow-hidden bg-white"
                                style={{
                                    boxShadow:
                                        "0 20px 40px -20px rgba(10,46,51,0.25)",
                                }}
                            >
                                {product.image ? (
                                    <img
                                        src={imageUrl(product.image, ASSET_URL)}
                                        alt={product.name}
                                        className="w-full aspect-square object-contain p-6"
                                        loading="lazy"
                                        onError={(e) =>
                                            (e.currentTarget.src =
                                                "/img/no-image.png")
                                        }
                                    />
                                ) : (
                                    <div
                                        className="w-full aspect-square flex items-center justify-center text-sm pd-font-body"
                                        style={{ color: "#5C7679" }}
                                    >
                                        Gambar tidak tersedia
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="pt-4 md:pt-0 md:pl-2">
                            <p
                                className="pd-font-body text-xs font-semibold tracking-[0.2em] uppercase"
                                style={{ color: "#0E7490" }}
                            >
                                Produk Kesehatan · {product.category?.name}
                            </p>

                            <div className="flex items-start justify-between gap-3 mt-2">
                                <h1
                                    className="pd-font-display text-3xl md:text-4xl font-semibold leading-tight"
                                    style={{ color: "#0A2E33" }}
                                >
                                    {product.name}
                                </h1>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="hidden md:block shrink-0 mt-1 hover:scale-110 transition-transform cursor-pointer"
                                    style={{ color: "#0E7490" }}
                                    aria-label="Tutup"
                                >
                                    <IoIosCloseCircleOutline size={28} />
                                </button>
                            </div>

                            <div className="pt-2">
                                <p
                                    className="pd-font-body text-xs tracking-widest font-semibold"
                                    style={{ color: "#A9791D" }}
                                >
                                    KEMENKES RI {product.kemenkesType} : {product.kemenkesNumber}
                                </p>
                            </div>

                            {(product.brand || product.location) && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {product.brand && (
                                        <span
                                            className="pd-font-body text-xs font-medium px-3 py-1 rounded-full"
                                            style={{
                                                background: "#0E749014",
                                                color: "#0E7490",
                                            }}
                                        >
                                            Merk · {product.brand}
                                        </span>
                                    )}
                                    {product.location && (
                                        <span
                                            className="pd-font-body text-xs font-medium px-3 py-1 rounded-full"
                                            style={{
                                                background: "#0A2E3310",
                                                color: "#5C7679",
                                            }}
                                        >
                                            Diproduksi di {product.location}
                                        </span>
                                    )}
                                </div>
                            )}

                            <div
                                className="mt-8 pt-8 mb-8"
                                style={{ borderTop: "1px solid #DCE6E7" }}
                            >
                                <p
                                    className="pd-font-body text-xs font-semibold tracking-widest uppercase mb-4"
                                    style={{ color: "#0A2E33" }}
                                >
                                    Spesifikasi
                                </p>

                                {spesifikasiList.length > 0 ? (
                                    <ul className="space-y-3">
                                        {spesifikasiList.map((item, i) => (
                                            <li
                                                key={i}
                                                className="pd-font-body text-sm flex items-start gap-3"
                                                style={{ color: "#33484B" }}
                                            >
                                                <span
                                                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                                    style={{
                                                        background: "#0E7490",
                                                    }}
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p
                                        className="pd-font-body text-sm italic"
                                        style={{ color: "#5C7679" }}
                                    >
                                        Belum ada spesifikasi tercantum.
                                    </p>
                                )}
                            </div>

                            <a
                                href="https://wa.me/6285174394123?text=Halo,%20Saya%20dari%20website%20entri."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pd-font-body inline-flex items-center gap-3 text-white py-3.5 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                                style={{ background: "#0E7490" }}
                            >
                                <FaShoppingCart className="text-lg" />
                                Pesan Sekarang
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
