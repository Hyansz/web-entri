import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import AdminLayout from "../components/AdminLayout";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 1,
    });

    const load = async (page = 1) => {
        setLoading(true);
        setError("");

        try {
            const res = await api.get("/api/posts", {
                params: {
                    page,
                    limit: pagination.limit,
                    search,
                },
            });

            setPosts(res.data.posts || []);
            if (res.data.pagination) {
                setPagination(res.data.pagination);
            }
        } catch {
            setPosts([]);
            setError("Gagal memuat artikel");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(1);
    }, [search]);

    const handleDelete = async (id) => {
        if (!confirm("Yakin hapus artikel ini?")) return;
        await api.delete(`/api/posts/${id}`);
        load(pagination.page);
    };

    return (
        <AdminLayout>
            <h2 className="font-semibold text-lg mb-2">Artikel</h2>

            {/* 🔎 Search + Add */}
            <div className="mb-4 flex items-center gap-2">
                <Link
                    to="/admin/posts/create"
                    className="bg-blue-600 text-white px-3 py-2 rounded cursor-pointer"
                >
                    Add Article
                </Link>

                <input
                    className="border p-2 rounded flex-1"
                    placeholder="Cari artikel..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* 🧾 Table */}
            <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left w-28">Image</th>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Loading */}
                        {loading && (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="p-4 text-center text-gray-500"
                                >
                                    Memuat artikel...
                                </td>
                            </tr>
                        )}

                        {/* Error */}
                        {!loading && error && (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="p-4 text-center text-red-600"
                                >
                                    {error}
                                </td>
                            </tr>
                        )}

                        {/* Empty */}
                        {!loading && !error && posts.length === 0 && (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="p-4 text-center text-gray-500"
                                >
                                    No articles found
                                </td>
                            </tr>
                        )}

                        {/* Data */}
                        {!loading &&
                            !error &&
                            posts.map((post) => (
                                <tr
                                    key={post._id}
                                    className="border-t align-middle"
                                >
                                    {/* Image */}
                                    <td className="p-2">
                                        {post.image ? (
                                            <img
                                                src={post.image.replace(
                                                    "/upload/",
                                                    "/upload/w_300,h_180,c_fill,q_auto,f_auto/"
                                                )}
                                                alt="No Image"
                                                className="w-24 aspect-video object-cover rounded border"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.currentTarget.replaceWith(
                                                        Object.assign(
                                                            document.createElement(
                                                                "div"
                                                            ),
                                                            {
                                                                className:
                                                                    "w-24 aspect-video bg-gray-100 flex items-center justify-center text-xs text-gray-500 rounded border",
                                                                innerText:
                                                                    "No Image",
                                                            }
                                                        )
                                                    );
                                                }}
                                            />
                                        ) : (
                                            <div className="w-24 aspect-video bg-gray-100 flex items-center justify-center text-xs text-gray-500 rounded border">
                                                No Image
                                            </div>
                                        )}
                                    </td>

                                    {/* Title */}
                                    <td className="p-2 font-medium">
                                        {post.title}
                                    </td>

                                    {/* Date */}
                                    <td className="p-2 text-gray-600">
                                        {new Date(
                                            post.createdAt
                                        ).toLocaleDateString("id-ID")}
                                    </td>

                                    {/* Actions */}
                                    <td className="p-2">
                                        <div className="inline-flex gap-3">
                                            <Link
                                                to={`/admin/posts/edit/${post._id}`}
                                                className="text-cyan-800 border border-cyan-700 py-1 px-2 rounded-xl hover:bg-cyan-700 hover:text-white transition"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleDelete(post._id)
                                                }
                                                className="text-red-700 border border-red-600 py-1 px-2 rounded-xl hover:bg-red-600 hover:text-white transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {/* 📌 Pagination */}
                {!loading && !error && (
                    <div className="flex items-center justify-between p-4">
                        <div>
                            Page {pagination.page} /{" "}
                            {pagination.totalPages || 1}
                        </div>
                        <div className="flex gap-2">
                            <button
                                disabled={pagination.page <= 1}
                                onClick={() =>
                                    load(pagination.page - 1)
                                }
                                className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50"
                            >
                                Prev
                            </button>
                            <button
                                disabled={
                                    pagination.page >=
                                    pagination.totalPages
                                }
                                onClick={() =>
                                    load(pagination.page + 1)
                                }
                                className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
