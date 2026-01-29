import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import api from "../api/axiosInstance";
import { imageUrl } from "../utils/image";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const ASSET_URL = import.meta.env.VITE_ASSET_URL;

    useEffect(() => {
        setLoading(true);
        setError(false);

        api.get(`/api/products2/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.error("DETAIL ERROR:", err);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    // 🔹 Pisahkan spesifikasi
    const spesifikasiList = product?.specifications
        ? product.specifications.split("|").map((s) => s.trim())
        : [];

    return (
        <div>
            {/* 🔹 Header tetap muncul */}
            <div className="h-[74px] bg-cyan-700"></div>

            <div className="w-10/12 mx-auto py-16 flex flex-col md:flex-row items-center justify-center gap-10">
                {/* 🔹 LOADING */}
                {loading && (
                    <p className="text-center font-semibold text-cyan-700 w-full">
                        Memuat detail...
                    </p>
                )}

                {/* 🔹 ERROR */}
                {!loading && error && (
                    <p className="text-center font-semibold text-red-600 w-full">
                        Gagal memuat detail produk.
                    </p>
                )}

                {/* 🔹 SUCCESS */}
                {!loading && !error && product && (
                    <>
                        <div className="md:w-1/2">
                            <img
                                src={imageUrl(product.image, ASSET_URL)}
                                alt={product.name}
                                className="rounded-xl mb-6 w-full object-contain"
                                loading="lazy"
                                onError={(e) =>
                                    (e.target.src = "/img/no-image.png")
                                }
                            />
                            <button
                                onClick={() => navigate(-1)}
                                className="md:hidden absolute right-4 top-30 transition duration-300 hover:scale-110 text-cyan-800 cursor-pointer"
                            >
                                <IoIosCloseCircleOutline size={28} />
                            </button>
                        </div>

                        <div className="md:w-1/2">
                            <div className="flex items-center justify-between mb-2 text-3xl">
                                <h1 className="font-bold text-cyan-800">
                                    {product.name}
                                </h1>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="hidden md:block transition duration-300 hover:scale-110 text-cyan-800 cursor-pointer"
                                >
                                    <IoIosCloseCircleOutline size={28} />
                                </button>
                            </div>

                            <table className="w-full border-separate border-spacing-y-2">
                                <tbody>
                                    <tr>
                                        <td className="w-1/2 font-medium">
                                            Kemenkes RI AKD
                                        </td>
                                        <td className="w-1/2 font-medium text-cyan-800">
                                            : {product.kemenkesNumber}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="w-1/2 font-medium">
                                            Merk
                                        </td>
                                        <td className="w-1/2 font-medium text-cyan-800">
                                            : {product.brand}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="w-1/2 font-medium">
                                            Lokasi Produksi
                                        </td>
                                        <td className="w-1/2 font-medium text-cyan-800">
                                            : {product.location}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mt-4 mb-6">
                                <p className="font-medium">Spesifikasi :</p>
                                <ul className="list-disc ml-6 mt-2 text-sm text-cyan-800">
                                    {spesifikasiList.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href="https://wa.me/6285174394123?text=Halo,%20Saya%20dari%20website%20entri."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-fit items-center gap-3 bg-cyan-600 hover:bg-cyan-800 transition-all duration-300 text-white py-3 px-8 rounded-2xl font-semibold shadow-lg"
                            >
                                <FaShoppingCart className="text-2xl" />
                                Pesan Sekarang
                            </a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
