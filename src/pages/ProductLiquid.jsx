import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import { imageUrl } from "../utils/image";

export default function ProductLiquid() {
    const [liquid, setLiquid] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");
    const [search, setSearch] = "";

    const limit = 16;

    const liquidCategoryId = "6930def8256fb3df61f81c0d";

    useEffect(() => {
        setStatus("loading");

        const query = `/api/products2?page=${page}&limit=${limit}&search=${search}&category=${liquidCategoryId}`;

        api.get(query)
            .then((res) => {
                const data = res.data;

                if (!data.data || data.data.length === 0) {
                    setLiquid([]);
                    setTotal(0);
                    setStatus("empty");
                } else {
                    setLiquid(data.data);
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
                    Produk Liquid - Cairan Pembersih & Desinfektan | PT Entri Jaya Makmur
                </title>
                <meta
                    name="description"
                    content="Kami menyediakan berbagai produk liquid seperti cairan pembersih, desinfektan, dan bahan cair untuk kebutuhan medis maupun industri."
                />
                <link
                    rel="canonical"
                    href="https://entrijayamakmur.co.id/products/liquid"
                />
            </Helmet>

            <div>
                {/* Hero (SAMA STRUKTUR DENGAN BMHP) */}
                <section
                    className="h-[40vh] relative flex flex-col text-white bg-cover bg-no-repeat bg-center md:bg-right"
                    style={{
                        backgroundImage: "url('/img/liq.webp')",
                    }}
                >
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-800 via-black/50 to-black/60"></div>
                    <div className="md:hidden block absolute inset-0 bg-gradient-to-t from-cyan-800 via-black/50 to-black/60"></div>

                    <div>
                        <div className="relative w-11/12 z-10 mx-auto flex flex-col items-start h-[50vh] md:h-[40vh] justify-center text-center">
                            <h3 className="text-3xl w-full md:text-5xl font-bold mb-4">
                                Produk{" "}
                                <span className="bg-gradient-to-l from-cyan-500 via-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                                    Liquid
                                </span>
                            </h3>
                        </div>
                    </div>
                </section>

                {/* Produk */}
                <section className="w-full md:w-11/12 mx-auto text-center pt-10 pb-16 px-6">

                    {/* Search (SAMA PERSIS DENGAN BMHP) */}
                    <div className="mb-10 relative w-full">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-600" />

                        <input
                            type="text"
                            placeholder="Cari produk Liquid..."
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
                            {message}
                        </p>
                    )}

                    {status === "empty" && (
                        <p className="text-gray-500 text-lg font-semibold">
                            Belum ada produk Liquid.
                        </p>
                    )}

                    {status === "success" && (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {liquid.map((p, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-xl shadow-md shadow-cyan-800/40 p-4 hover:scale-105 duration-500 text-cyan-800 border border-cyan-500/20 flex flex-col justify-between"
                                    >
                                        <img
                                            src={imageUrl(p.image)}
                                            alt={p.name}
                                            className="h-[120px] md:h-[220px] w-full object-contain mx-auto mb-3"
                                            loading="lazy"
                                        />

                                        <h3 className="text-lg font-semibold mb-3">
                                            {p.name}
                                        </h3>

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

                            {/* Pagination (SAMA PERSIS) */}
                            <div className="flex justify-center flex-wrap gap-2 mt-8">
                                <button
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                    className="px-4 py-2 rounded bg-cyan-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                                        className={`px-4 py-2 rounded ${
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
                                    className="px-4 py-2 rounded bg-cyan-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
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