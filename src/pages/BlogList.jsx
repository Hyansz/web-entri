import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");
    const { t, i18n } = useTranslation();

    useEffect(() => {
        setStatus("loading");
        fetch("https://web-entri.onrender.com/api/blogs")
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text);
                }
                return res.json();
            })
            .then((data) => {
                if (data.status === "empty") {
                    setStatus("empty");
                    setMessage(data.message || "Data Kosong");
                    setBlogs([]);
                } else {
                    setStatus("success");
                    setBlogs(data.blogs);
                }
            })
            .catch(() => {
                setStatus("error");
                setMessage("Gagal memuat data dari server");
            });
    }, []);

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
                    className="h-[80vh] relative flex flex-col text-white bg-cover bg-center"
                    style={{ backgroundImage: "url('/img/bmhp.jpg')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-800 via-black/50 to-black/60"></div>
                    <div className="relative z-10 w-11/12 mx-auto flex flex-col items-center justify-center h-full text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Blog
                        </h1>
                    </div>
                </section>

                {/* Blog List */}
                <section className="w-10/12 mx-auto py-16 text-center">
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
                            {message || "Belum ada Blog."}
                        </p>
                    )}

                    {status === "success" && (
                        <>
                            <div className="mx-auto py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {blogs.map((b) => (
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
                                                {i18n.language === "id"
                                                    ? b.title_id
                                                    : b.title_en}
                                            </h3>
                                            <p className="text-gray-700 mb-4 line-clamp-3">
                                                {i18n.language === "id"
                                                    ? b.description_id
                                                    : b.description_en}
                                            </p>
                                            <Link
                                                to={`/blog/${b.slug}`}
                                                onClick={() =>
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: "smooth",
                                                    })
                                                }
                                                className="text-cyan-600 font-semibold hover:text-cyan-800 transition"
                                            >
                                                {t("hero.more")} →
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </>
    );
}
