import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaSearch } from "react-icons/fa";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("loading");
    const [totalPages, setTotalPages] = useState(1);
    const [prefetchCache, setPrefetchCache] = useState({});
    const limit = 6; // jumlah post per halaman sesuai API

    // Fungsi fetch dengan cache
    const fetchPosts = async (pageNum, searchTerm) => {
        const cacheKey = `${pageNum}-${searchTerm}`;
        if (prefetchCache[cacheKey]) return prefetchCache[cacheKey];

        const res = await api.get(
            `/api/posts?page=${pageNum}&search=${searchTerm}`
        );
        setPrefetchCache((prev) => ({ ...prev, [cacheKey]: res.data }));
        return res.data;
    };

    // Fetch data saat page atau search berubah
    useEffect(() => {
        setStatus("loading");
        fetchPosts(page, search)
            .then((data) => {
                setPosts(data.posts);
                const pages = Math.ceil(data.total / limit) || 1;
                setTotalPages(pages);
                setStatus(data.posts.length ? "success" : "empty");
            })
            .catch(() => setStatus("error"));
    }, [page, search]);

    // Scroll ke atas setiap kali page berubah dan data berhasil dimuat
    useEffect(() => {
        if (status === "success") {
            window.scrollTo({ top: 500, behavior: "smooth" });
        }
    }, [page, status]);

    return (
        <div>
            {/* HERO */}
            <section
                className="h-[70vh] relative flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('/img/bmhp.webp')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-black/50 to-black/60" />
                <h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold">
                    Artikel
                </h1>
            </section>

            {/* CONTENT */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                {/* SEARCH */}
                <div className="mx-auto mb-12 relative w-full">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-600" />
                    <input
                        type="text"
                        placeholder="Cari artikel..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="border pl-9 w-full px-3 py-2 rounded-xl bg-white shadow-md shadow-cyan-800/40 p-4 text-cyan-800 border-cyan-500/80 focus:outline-cyan-500"
                    />
                </div>

                {/* STATUS & GRID */}
                {status === "loading" && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: limit }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl overflow-hidden shadow-md border-none p-5"
                            >
                                <Skeleton height={208} />
                                <Skeleton height={24} className="mt-4" />
                                <Skeleton count={2} className="mt-2" />
                                <Skeleton
                                    width={120}
                                    height={20}
                                    className="mt-4"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {status === "error" && (
                    <p className="text-center text-red-600 font-semibold">
                        Gagal memuat data
                    </p>
                )}

                {status === "empty" && (
                    <p className="text-center text-gray-500 font-semibold">
                        Belum ada artikel
                    </p>
                )}

                {status === "success" && (
                    <>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <article
                                    key={post._id}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-blue-600/30 transition border"
                                >
                                    {post.image && (
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-52 object-cover"
                                            loading="lazy"
                                        />
                                    )}

                                    <div className="p-5 text-left">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {post.title}
                                        </h3>
                                        {post.excerpt && (
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        <Link
                                            to={`/posts/${post._id}`}
                                            className="text-blue-600 font-semibold hover:text-blue-800 transition"
                                        >
                                            Baca Selengkapnya →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* PAGINATION */}
                        <div className="flex justify-center gap-4 mt-16">
                            <button
                                disabled={page === 1}
                                onClick={() =>
                                    setPage((prev) => Math.max(prev - 1, 1))
                                }
                                className="px-4 py-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100"
                            >
                                Prev
                            </button>
                            <button
                                disabled={page === totalPages}
                                onClick={() =>
                                    setPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                className="px-4 py-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
