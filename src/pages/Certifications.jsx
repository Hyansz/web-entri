import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";

export default function Certifications() {
    const [data, setData] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [deleteId, setDeleteId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const load = async (page = 1) => {
        setLoading(true);
        setError("");

        try {
            const params = {
                page,
                limit: pagination.limit,
            };

            if (search) params.search = search;

            const res = await api.get("/api/certifications", { params });

            setData(res.data.data);
            setPagination({ ...res.data.pagination, page });
        } catch (err) {
            setError(err?.response?.data?.message || "Gagal memuat data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(1);
    }, [search]);

    const confirmDelete = async () => {
        try {
            await api.delete(`/api/certifications/${deleteId}`);

            setData((prev) => prev.filter((x) => x._id !== deleteId));

            setShowModal(false);
        } catch (err) {
            alert("Gagal hapus");
        }
    };

    return (
        <AdminLayout>
            <h2 className="font-semibold text-lg mb-2">Sertifikasi</h2>

            <div className="mb-4 flex items-center gap-2">
                <Link
                    to="/admin/certifications/add"
                    className="bg-cyan-600 text-white px-3 py-2 rounded hover:scale-105 transition"
                >
                    Add
                </Link>

                <input
                    className="border p-2 rounded flex-1"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Order</th>
                            <th className="p-3 text-left">Active</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="5" className="p-4 text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}

                        {!loading &&
                            data.map((item) => (
                                <tr key={item._id} className="border-t">
                                    <td className="p-2">
                                        {item.image?.url ? (
                                            <img
                                                src={item.image.url}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="p-2">{item.title}</td>
                                    <td className="p-2">{item.order}</td>
                                    <td className="p-2">
                                        {item.active ? "Yes" : "No"}
                                    </td>
                                    <td className="p-2">
                                        <Link
                                            to={`/admin/certifications/edit/${item._id}`}
                                            className="mr-2 text-cyan-700"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => {
                                                setDeleteId(item._id);
                                                setShowModal(true);
                                            }}
                                            className="text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <div className="p-4 flex justify-between">
                    <div>
                        Page {pagination.page} / {pagination.totalPages}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => load(pagination.page - 1)}
                            disabled={pagination.page <= 1}
                        >
                            Prev
                        </button>

                        <button
                            onClick={() => load(pagination.page + 1)}
                            disabled={pagination.page >= pagination.totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded">
                        <p>Hapus data?</p>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
