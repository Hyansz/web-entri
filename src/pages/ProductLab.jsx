import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function ProductLab() {
    const [lab, setLab] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState("loading"); // 🔹 status data
    const [message, setMessage] = useState("");
    const limit = 16;

    useEffect(() => {
        setStatus("loading");
        fetch(
            `https://web-entri.onrender.com/api/lab?page=${page}&limit=${limit}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "empty") {
                    setStatus("empty");
                    setMessage(data.message || "Data kosong");
                    setLab([]);
                    setTotal(0);
                } else {
                    setStatus("success");
                    setLab(data.lab);
                    setTotal(data.total);
                }
            })
            .catch(() => {
                setStatus("error");
                setMessage("Gagal memuat data dari server");
            });
    }, [page]);

    const totalPages = Math.ceil(total / limit);

    return (
        <>
            <Helmet>
                <title>
                    Peralatan Laboratorium - Alat Tes & Analisis | PT Entri Jaya
                    Makmur
                </title>
                <meta
                    name="description"
                    content="Menyediakan perlengkapan laboratorium lengkap seperti alat uji, instrumen analisis, dan kebutuhan riset berkualitas tinggi."
                />
                <link
                    rel="canonical"
                    href="https://entrijayamakmur.co.id/products/lab"
                />
            </Helmet>

            <div>
                {/* Hero */}
                <section
                    className="h-[80vh] relative flex flex-col text-white bg-cover bg-no-repeat bg-center md:bg-right"
                    style={{
                        backgroundImage: "url('/img/laborat.jpg')",
                    }}
                >
                    {/* Overlay */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-800 via-black/50 to-black/60"></div>
                    <div className="md:hidden block absolute inset-0 bg-gradient-to-t from-cyan-800 via-black/50 to-black/60"></div>

                    <div>
                        <div className="relative w-11/12 z-10 mx-auto flex flex-col items-start h-[80vh] justify-center text-center">
                            <h3 className="text-3xl w-full md:text-5xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                                    Laboratorium
                                </span>{" "}
                                Unit{" "}
                            </h3>
                        </div>
                    </div>
                </section>

                {/* Produk */}
                <section className="w-10/12 mx-auto text-center py-16 px-6">
                    {/* 🔹 Status Data */}
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
                            {/* Produk Grid */}
                            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {lab.map((p, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-xl shadow-md shadow-cyan-800/40 p-4 hover:scale-105 duration-500 text-cyan-800 border border-cyan-500/20"
                                    >
                                        <img
                                            src={p.img}
                                            alt={p.title}
                                            loading="lazy"
                                            className="rounded mb-3 mx-auto"
                                        />
                                        <h3 className="text-lg font-semibold">
                                            {p.title}
                                        </h3>
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
                                        onClick={() => setPage(i + 1)}
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
