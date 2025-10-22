import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BlogList() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/blogs")
            .then((res) => res.json())
            .then((data) => setBlogs(data.blogs || []))
            .catch((err) => console.error("Gagal memuat blog:", err));
    }, []);

    return (
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
            <section className="w-10/12 mx-auto py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                {b.title}
                            </h3>
                            <p className="text-gray-700 mb-4 line-clamp-3">
                                {b.description}
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
                                Selengkapnya →
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
}
