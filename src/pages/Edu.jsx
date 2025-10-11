import { useEffect, useState } from "react";
import YTLazy from "../components/YTLazy";

export default function EducationVideo() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const limit = 9;

    // Gunakan base URL dinamis agar bisa otomatis menyesuaikan saat deploy
    const API_BASE = import.meta.env.VITE_API_URL || "https://web-entri.onrender.com";

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `${API_BASE}/api/videos?page=${page}&limit=${limit}`
                );

                if (!res.ok) throw new Error("Gagal memuat data video");

                const data = await res.json();
                setVideos(data.videos || []);
                setTotal(data.total || 0);
            } catch (err) {
                console.error("Gagal memuat video:", err);
                setError(
                    "Tidak dapat memuat video edukasi. Silakan coba lagi."
                );
            } finally {
                setLoading(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        };

        fetchVideos();
    }, [page]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div>
            {/* Hero Section */}
            <section
                className="h-[80vh] relative flex flex-col text-white bg-cover bg-top"
                style={{ backgroundImage: "url('/img/education.png')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-800 via-black/50 to-black/60"></div>

                <div className="relative z-10 w-11/12 mx-auto flex flex-col items-center h-[80vh] justify-center text-center">
                    <h3 className="text-3xl md:text-5xl font-bold mb-4">
                        Video{" "}
                        <span className="bg-gradient-to-l from-cyan-400 via-cyan-300 to-cyan-100 bg-clip-text text-transparent">
                            Edukasi
                        </span>
                    </h3>
                    <p className="text-lg max-w-xl text-gray-100">
                        Pelajari lebih dalam tentang produk kami melalui
                        berbagai video edukasi yang kami sajikan.
                    </p>
                </div>
            </section>

            {/* Video Section */}
            <section className="w-10/12 mx-auto text-center py-16 px-6">
                {loading ? (
                    <p className="text-cyan-700 text-lg animate-pulse">
                        Memuat video...
                    </p>
                ) : error ? (
                    <p className="text-red-600 text-lg">{error}</p>
                ) : videos.length === 0 ? (
                    <p className="text-gray-600 text-lg">
                        Belum ada video edukasi tersedia.
                    </p>
                ) : (
                    <>
                        {/* Grid Video */}
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {videos.map((v) => (
                                <article
                                    key={v._id || v.id}
                                    className="bg-white rounded-xl shadow-md shadow-cyan-800/30 p-3 hover:scale-[1.03] transition-transform duration-300 text-cyan-800 border border-cyan-500/20"
                                >
                                    <div className="aspect-video rounded-lg overflow-hidden mb-3">
                                        <YTLazy
                                            videoId={`${v.videoId}`}
                                            className="shadow-xl"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold">
                                        {v.title}
                                    </h3>
                                    {v.description && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            {v.description}
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <nav className="flex justify-center flex-wrap gap-2 mt-10">
                                <button
                                    onClick={() =>
                                        setPage((p) => Math.max(p - 1, 1))
                                    }
                                    disabled={page === 1}
                                    className="px-4 py-2 rounded bg-cyan-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    Prev
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={`px-4 py-2 rounded cursor-pointer ${
                                            page === i + 1
                                                ? "bg-cyan-800 text-white"
                                                : "bg-gray-200 text-cyan-800 hover:bg-cyan-100"
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() =>
                                        setPage((p) =>
                                            Math.min(p + 1, totalPages)
                                        )
                                    }
                                    disabled={page === totalPages}
                                    className="px-4 py-2 rounded bg-cyan-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    Next
                                </button>
                            </nav>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}
