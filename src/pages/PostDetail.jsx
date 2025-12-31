import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [otherPosts, setOtherPosts] = useState([]);

    // Ambil detail post
    useEffect(() => {
        setLoading(true);
        fetch(`https://web-entri.vercel.app/api/posts/${id}`)
            .then((res) => res.json())
            .then((data) => setPost(data))
            .catch(() => setPost(null))
            .finally(() => setLoading(false));
    }, [id]);

    // Ambil post lain untuk "Baca Artikel Lainnya"
    useEffect(() => {
        fetch(`https://web-entri.vercel.app/api/posts`)
            .then((res) => res.json())
            .then((data) => {
                const others = data.posts.filter((p) => p._id !== id);
                setOtherPosts(others);
            })
            .catch(() => setOtherPosts([]));
    }, [id]);

    if (loading)
        return <p className="text-center py-20 text-cyan-700">Memuat...</p>;
    if (!post)
        return (
            <p className="text-center py-20 text-gray-600">
                Post tidak ditemukan
            </p>
        );

    return (
        <div>
            <div className="h-18.5 bg-cyan-700"></div>
            <div className="w-10/12 lg:w-full mx-auto py-16 max-w-5xl">
                <Link
                    to="/posts"
                    className="text-cyan-700 font-semibold mb-4 inline-block border-2 border-transparent hover:border-cyan-600 px-3 py-2 rounded-2xl transition-all duration-500"
                >
                    ← Kembali ke Blog
                </Link>

                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full lg:h-90 object-cover rounded-lg mb-8"
                    />
                )}

                <p className="text-gray-500 mb-6">
                    {new Date(post.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </p>
                <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-bold text-cyan-800 mb-4">
                        {post.title}
                    </h1>
                </div>

                <div className="bg-white shadow-md rounded-lg p-8 mb-5">
                    <div
                        className="content-html max-w-none text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>
                </div>

                <section class="bg-white shadow-md rounded-lg p-8 text-center">
                    <h2 class="text-2xl font-semibold mb-4">Kesimpulan</h2>
                    <p class="text-gray-700 leading-relaxed mb-6">
                        Alkohol antiseptik IPA 5 & BIT 6 adalah solusi efektif
                        untuk menjaga kualitas, keamanan, dan kestabilan produk
                        kosmetik, sabun, dan parfum. Dengan berbagai ukuran
                        kemasan, produk ini siap mendukung kebutuhan produksi
                        skala kecil hingga besar.
                    </p>
                    <a
                        href="https://wa.me/6285174394123?text=Halo,%20Saya%20dari%20website%20entri."
                        target="_blank"
                        class="inline-block bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-cyan-700 transition duration-500 hover:scale-105"
                    >
                        Hubungi Kami untuk Pemesanan
                    </a>
                </section>

                <Link
                    to="/posts"
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        })
                    }
                    className="text-cyan-700 font-semibold inline-block border-2 border-transparent hover:border-cyan-600 px-3 py-2 rounded-2xl transition-all duration-500 mt-6"
                >
                    ← Kembali ke Blog
                </Link>
            </div>
            <hr className="w-[90%] mx-auto text-cyan-800/20" />
            <div className="w-10/12 mx-auto pb-16">
                {otherPosts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-cyan-800 mb-6">
                            Baca Artikel Lainnya
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherPosts.map((p) => (
                                <article
                                    key={p._id}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-700/40 transition duration-500 border border-gray-100"
                                >
                                    {p.image && (
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="w-full aspect-[16/9] object-cover rounded-t-xl"
                                            loading="lazy"
                                        />
                                    )}
                                    <div className="p-5 text-left">
                                        <h3 className="text-xl font-semibold text-cyan-800 mb-2 line-clamp-2">
                                            {p.title}
                                        </h3>
                                        {p.excerpt && (
                                            <p className="text-gray-700 mb-4 line-clamp-3">
                                                {p.excerpt}
                                            </p>
                                        )}
                                        <Link
                                            to={`/posts/${p._id}`}
                                            onClick={() =>
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth",
                                                })
                                            }
                                            className="text-cyan-600 font-semibold hover:text-cyan-800 transition"
                                        >
                                            Baca Selengkapnya →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
