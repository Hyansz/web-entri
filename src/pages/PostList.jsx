import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import AdminLayout from "../components/AdminLayout";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        const res = await api.get("/api/posts?limit=100");
        setPosts(res.data.posts);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin hapus artikel ini?")) return;
        await api.delete(`/api/posts/${id}`);
        fetchPosts();
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <AdminLayout title="Manajemen Artikel">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Artikel</h1>
                <Link
                    to="/admin/posts/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Tambah Artikel
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow">
                    <table className="w-full text-left">
                        <thead className="border-b">
                            <tr>
                                <th className="p-4">Judul</th>
                                <th className="p-4">Tanggal</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post._id} className="border-b">
                                    <td className="p-4">{post.title}</td>
                                    <td className="p-4">
                                        {new Date(
                                            post.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        <Link
                                            to={`/admin/posts/edit/${post._id}`}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(post._id)
                                            }
                                            className="px-3 py-1 bg-red-600 text-white rounded"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
}
