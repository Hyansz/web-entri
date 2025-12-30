import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Link } from "react-router-dom";

export default function BlogList2() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        setStatus("loading");
        api.get(`/api/posts?page=${page}&search=${search}`)
            .then((res) => {
                setPosts(res.data.posts);
                setStatus(res.data.posts.length ? "success" : "empty");
            })
            .catch(() => setStatus("error"));
    }, [page, search]);

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
                <div className="max-w-md mx-auto mb-12">
                    <input
                        type="text"
                        placeholder="Cari artikel..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* STATUS */}
                {status === "loading" && (
                    <p className="text-center text-blue-600 font-semibold">
                        Memuat data...
                    </p>
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

                {/* GRID BLOG */}
                {status === "success" && (
                    <>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <article
                                    key={post._id}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-blue-600/30 transition border"
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-52 object-cover"
                                        loading="lazy"
                                    />

                                    <div className="p-5 text-left">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <Link
                                            to={`/detail/${post._id}`}
                                            onClick={() =>
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth",
                                                })
                                            }
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
                                onClick={() => setPage(page - 1)}
                                className="px-4 py-2 rounded-lg border disabled:opacity-50 hover:bg-gray-100"
                            >
                                Prev
                            </button>
                            <button
                                onClick={() => setPage(page + 1)}
                                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
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
