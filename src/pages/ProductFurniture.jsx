import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import api from "../api/axiosInstance";

export default function ProductFurniture() {
    const [furniture, setFurniture] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const limit = 16;

    const furnitureCategoryId = "6930deec256fb3df61f81c03";

    const ASSET_URL = import.meta.env.VITE_ASSET_URL;

    useEffect(() => {
        setStatus("loading");

        const query = `/api/products2?page=${page}&limit=${limit}&search=${search}&category=${furnitureCategoryId}`;

        api.get(query)
            .then((res) => {
                const data = res.data;

                if (!data.data || data.data.length === 0) {
                    setFurniture([]);
                    setTotal(0);
                    setStatus("empty");
                } else {
                    setFurniture(data.data);
                    setTotal(data.pagination.total);
                    setStatus("success");
                }
            })
            .catch((err) => {
                console.error("API ERROR:", err);
                setStatus("error");
                setMessage("Gagal memuat data dari server");
            });
    }, [page, search]);

    const totalPages = Math.ceil(total / limit);

    return (
        <>
            <Helmet>
                <title>
                    Hospital Furniture - Perabot Medis Rumah Sakit | PT Entri
                    Jaya Makmur
                </title>
                <meta
                    name="description"
                    content="Temukan berbagai hospital furniture seperti tempat tidur pasien, meja operasi, dan perlengkapan rumah sakit berkualitas tinggi."
                />
                <link
                    rel="canonical"
                    href="https://entrijayamakmur.co.id/products/furniture"
                />
            </Helmet>

            <div>
                {/* Hero */}
                <section
                    className="h-[40vh] relative flex flex-col text-white bg-cover bg-no-repeat bg-center md:bg-right"
                    style={{
                        backgroundImage: "url('/img/hosfur.webp')",
                    }}
                >
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-800 via-black/50 to-black/60"></div>
                    <div className="md:hidden block absolute inset-0 bg-gradient-to-t from-cyan-800 via-black/50 to-black/60"></div>

                    <div>
                        <div className="relative w-11/12 z-10 mx-auto flex flex-col items-start h-[50vh] md:h-[40vh] justify-center text-center">
                            <h3 className="text-3xl w-full md:text-5xl font-bold mb-4">
                                Hospital{" "}
                                <span className="bg-gradient-to-l from-cyan-500 via-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                                    Furniture
                                </span>{" "}
                            </h3>
                        </div>
                    </div>
                </section>

                {/* Produk */}
                <section className="w-full md:w-11/12 mx-auto text-center pt-10 pb-16 px-6">
                    <div className="mb-10 relative w-full">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-600" />

                        <input
                            type="text"
                            placeholder="Cari produk furniture..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="border pl-9 w-full px-3 py-2 rounded-xl bg-white shadow-md shadow-cyan-800/40 p-4 text-cyan-800 border-cyan-500/80 focus:outline-cyan-500"
                        />
                    </div>

                    {status === "loading" && (
                        <p className="text-cyan-600 text-lg font-semibold">
                            Memuat data...
                        </p>
                    )}

                    {status === "error" && (
                        <p className="text-red-600 text-lg font-semibold">
                            {message || "Terjadi kesalahan, coba lagi nanti."}
                        </p>
                    )}

                    {status === "empty" && (
                        <p className="text-gray-500 text-lg font-semibold">
                            {message || "Belum ada Produk furniture."}
                        </p>
                    )}

                    {status === "success" && (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {furniture.map((p, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-xl shadow-md shadow-cyan-800/40 p-4 hover:scale-105 duration-500 text-cyan-800 border border-cyan-500/20 flex flex-col justify-between"
                                    >
                                        <img
                                            src={`${ASSET_URL}${p.image}`}
                                            alt={p.name}
                                            className="h-[120px] md:h-[220px] w-full object-contain mx-auto mb-3"
                                        />
                                        <h3 className="text-lg font-semibold mb-3">
                                            {p.name}
                                        </h3>

                                        {/* 🔹 Tombol Detail */}
                                        <Link
                                            to={`/products/${p._id}`}
                                            className="inline-block mt-auto px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition duration-300"
                                            onClick={() =>
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth",
                                                })
                                            }
                                        >
                                            Detail
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center flex-wrap gap-2 mt-8">
                                <button
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                    className="px-4 py-2 rounded bg-cyan-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    Prev
                                </button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setPage(i + 1);
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth",
                                            });
                                        }}
                                        className={`px-4 py-2 cursor-pointer rounded ${
                                            page === i + 1
                                                ? "bg-cyan-800 text-white"
                                                : "bg-gray-200 text-cyan-800"
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 rounded bg-cyan-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </>
    );
}
