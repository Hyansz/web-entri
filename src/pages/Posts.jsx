import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet";

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
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [page, status]);

    return (
        <>
            <Helmet>
                <title>Blog - PT Entri Jaya Makmur</title>
                <meta
                    name="description"
                    content="Artikel PT Entri Jaya Makmur untuk informasi produk dan perlengkapan medis."
                />
                <link
                    rel="canonical"
                    href="https://entrijayamakmur.co.id/blog"
                />
            </Helmet>

            <div>
                {/* Hero Section */}
                <section
                    className="h-[40vh] relative flex flex-col text-white bg-cover bg-center"
                    style={{ backgroundImage: "url('/img/bmhp.webp')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-800 via-black/50 to-black/60"></div>
                    <div className="relative z-10 w-11/12 mx-auto flex flex-col items-center justify-center h-full text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Artikel
                        </h1>
                    </div>
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
                                        className="bg-white rounded-xl overflow-hidden shadow-md shadow-cyan-700/20 hover:shadow-cyan-600/30 transition border border-cyan-500/50"
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
                                                className="text-cyan-600 font-semibold hover:text-cyan-800 transition"
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
                                    className="px-4 py-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100 cursor-pointer"
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
                                    className="px-4 py-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100 cursor-pointer"
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
