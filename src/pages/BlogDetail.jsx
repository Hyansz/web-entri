import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BlogDetail() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [otherBlogs, setOtherBlogs] = useState([]);
    const { t } = useTranslation();

    // Ambil detail blog
    useEffect(() => {
        setLoading(true);
        fetch(`https://web-entri.onrender.com/api/blogs/${slug}`)
            .then((res) => res.json())
            .then((data) => setBlog(data.blog))
            .catch(() => setBlog(null))
            .finally(() => setLoading(false));
    }, [slug]);

    // Ambil daftar blog lain untuk "Populer Lainnya"
    useEffect(() => {
        fetch(`https://web-entri.onrender.com/api/blogs`)
            .then((res) => res.json())
            .then((data) => {
                const others = data.blogs.filter((b) => b.slug !== slug);
                setOtherBlogs(others);
            })
            .catch(() => setOtherBlogs([]));
    }, [slug]);

    if (loading)
        return <p className="text-center py-20 text-cyan-700">Memuat...</p>;
    if (!blog)
        return (
            <p className="text-center py-20 text-gray-600">
                Blog tidak ditemukan
            </p>
        );

    return (
        <div>
            <div className="h-18.5 bg-cyan-700"></div>
            <div className="w-10/12 lg:w-full mx-auto py-16 max-w-5xl">
                <Link
                    to="/blog"
                    className="text-cyan-700 font-semibold mb-4 inline-block border-2 border-transparent hover:border-cyan-600 px-3 py-2 rounded-2xl transition-all duration-500"
                >
                    ← Kembali ke Blog
                </Link>

                <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full lg:h-90 object-cover rounded-lg mb-8"
                />

                <h1 className="text-3xl font-bold text-cyan-800 mb-4">
                    {blog.title}
                </h1>
                <p className="text-gray-500 mb-6">
                    {new Date(blog.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </p>

                <div
                    className="prose max-w-none text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>

                <Link
                    to="/blog"
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        })
                    }
                    className="text-cyan-700 font-semibold inline-block border-2 border-transparent hover:border-cyan-600 px-3 py-2 rounded-2xl transition-all duration-500"
                >
                    ← Kembali ke Blog
                </Link>

                {otherBlogs.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-cyan-800 mb-6">
                            Baca Blog Populer Lainnya
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherBlogs.map((b) => (
                                <article
                                    key={b.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-700/40 transition duration-500 border border-gray-100"
                                >
                                    <img
                                        src={b.thumbnail}
                                        alt={b.title}
                                        className="w-full h-52 object-cover"
                                        loading="lazy"
                                    />
                                    <div className="p-5 text-left">
                                        <h3 className="text-xl font-semibold text-cyan-800 mb-2">
                                            {b.title}
                                        </h3>
                                        <p className="text-gray-700 mb-4 line-clamp-3">
                                            {b.description}
                                        </p>
                                        <Link
                                            to={`/blog/${b.slug}`}
                                            className="text-cyan-600 font-semibold hover:text-cyan-800 transition"
                                        >
                                            {t("hero.more")} →
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
