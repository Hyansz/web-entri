import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function BlogDetail() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://web-entri.onrender.com/api/blogs/${slug}`)
            .then((res) => res.json())
            .then((data) => setBlog(data))
            .catch(() => setBlog(null))
            .finally(() => setLoading(false));
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
            <div className="w-10/12 mx-auto py-16 max-w-4xl">
                <Link
                    to="/blog"
                    className="text-cyan-700 font-semibold mb-4 inline-block hover:underline"
                >
                    ← Kembali ke Blog
                </Link>

                <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-80 object-cover rounded-lg mb-8"
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
            </div>
        </div>
    );
}
