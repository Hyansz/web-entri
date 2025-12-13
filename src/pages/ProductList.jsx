import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import api from "../api/axiosInstance";

export default function ProductList() {
    const { token } = useContext(AuthContext);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const ASSET_URL = import.meta.env.VITE_ASSET_URL;

    const load = async (page = 1) => {
        setLoading(true);
        setError("");

        try {
            const res = await api.get("/api/products2", {
                params: { page, limit: pagination.limit, search, category },
            });
            setProducts(res.data.data);
            setPagination(res.data.pagination);
        } catch (err) {
            setProducts([]);
            setError(err?.response?.data?.message || "Gagal memuat produk");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        api
            .get("/api/categories")
            .then((r) => setCategories(r.data.data || []))
            .catch(() => {});
    }, []);

    useEffect(() => {
        load(1);
    }, [search, category]);

    const openDeleteModal = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/api/products2/${deleteId}`);
            load(pagination.page);
            setShowModal(false);
        } catch (err) {
            setShowModal(false);
            alert("Failed to delete");
        }
    };

    return (
        <AdminLayout>
            <h2 className="font-semibold text-lg mb-2">Produk</h2>

            {/* 🔎 Filter/Search */}
            <div className="mb-4 flex items-center gap-2">
                <Link
                    to="/admin/products2/add"
                    className="bg-cyan-600 text-white px-3 py-2 rounded hover:scale-105 duration-300 transition-all"
                >
                    Add
                </Link>
                <input
                    className="border p-2 rounded flex-1"
                    placeholder="Search name.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="border p-2 rounded cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All categories</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="bg-white rounded shadow overflow-hidden relative pb-20">
                {/* AREA TABEL (masih bisa scroll kanan-kiri) */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 text-left">Image</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Kemenkes</th>
                                <th className="p-3 text-left">Brand</th>
                                <th className="p-3 text-left">Location</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* ⏳ Loading */}
                            {loading && (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="p-4 text-center text-gray-500"
                                    >
                                        Memuat data produk...
                                    </td>
                                </tr>
                            )}

                            {/* ❌ Error */}
                            {!loading && error && (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="p-4 text-center text-red-600"
                                    >
                                        {error}
                                    </td>
                                </tr>
                            )}

                            {/* 🚫 No Data */}
                            {!loading && !error && products.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="p-4 text-center text-gray-500"
                                    >
                                        Tidak ada produk ditemukan
                                    </td>
                                </tr>
                            )}

                            {/* ✅ Products render */}
                            {!loading &&
                                !error &&
                                products.map((p) => (
                                    <tr key={p._id} className="border-t">
                                        <td className="p-2">
                                            {p.image ? (
                                                <img
                                                    src={`${ASSET_URL}${p.image}`}
                                                    alt={p.name}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                        </td>
                                        <td className="p-2">{p.name}</td>
                                        <td className="p-2">
                                            {p.kemenkesNumber}
                                        </td>
                                        <td className="p-2">{p.brand}</td>
                                        <td className="p-2">{p.location}</td>
                                        <td className="p-2">
                                            {p.category?.name || "-"}
                                        </td>
                                        <td className="p-2 text-center">
                                            <div className="inline-flex items-center justify-center gap-3">
                                                <Link
                                                    to={`/admin/products2/edit/${p._id}`}
                                                    className="text-cyan-800 cursor-pointer border border-cyan-700 py-1 px-2 duration-300 transition-all rounded-xl hover:bg-cyan-700 hover:text-white"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        openDeleteModal(p._id)
                                                    }
                                                    className="text-red-700 cursor-pointer py-1 px-2 duration-300 transition-all rounded-xl hover:bg-red-600 border border-red-600 hover:text-white"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                    {/* PAGINATION */}
                    {!loading && !error && (
                        <div
                            className="
                absolute bottom-0 left-0 right-0
                bg-white border-t 
                p-4 flex items-center justify-between
                z-10
            "
                        >
                            <div>
                                Page {pagination.page} / {pagination.totalPages}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    disabled={pagination.page <= 1}
                                    onClick={() => load(pagination.page - 1)}
                                    className="px-3 py-1 border rounded cursor-pointer disabled:opacity-40"
                                >
                                    Prev
                                </button>

                                <button
                                    disabled={
                                        pagination.page >= pagination.totalPages
                                    }
                                    onClick={() => load(pagination.page + 1)}
                                    className="px-3 py-1 border rounded cursor-pointer disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
                        <h3 className="text-lg font-semibold mb-2">
                            Hapus Produk?
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">
                            Apakah Anda yakin ingin menghapus produk ini?
                        </p>

                        <div className="flex justify-center gap-3">
                            <button
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
