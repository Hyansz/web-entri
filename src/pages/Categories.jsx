import React, { useContext, useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import AdminLayout from "../components/AdminLayout";
import { AuthContext } from "../auth/AuthContext";

export default function Categories() {
    const { token } = useContext(AuthContext);

    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");

    const [name, setName] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const load = async (page = 1) => {
        setLoading(true);
        setError("");

        try {
            const res = await axios.get("/api/categories", {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    page,
                    limit: pagination.limit,
                    search,
                },
            });

            setCategories(res.data.data || res.data);
            if (res.data.pagination) setPagination(res.data.pagination);
        } catch (err) {
            setCategories([]);
            setError("Gagal memuat kategori");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(1);
    }, [search]);

    const add = async () => {
        if (!name.trim()) return alert("Nama kategori wajib diisi!");

        if (
            categories.some((c) => c.name.toLowerCase() === name.toLowerCase())
        ) {
            return alert("Nama kategori sudah ada!");
        }

        try {
            await axios.post(
                "/api/categories",
                { name },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setName("");
            setIsAdding(false);
            load(1);
        } catch (err) {
            alert("Gagal menambah kategori");
        }
    };

    const startEdit = (cat) => {
        setEditId(cat._id);
        setEditName(cat.name);
    };

    const saveEdit = async () => {
        if (!editName.trim()) return alert("Nama kategori wajib!");

        try {
            await axios.put(
                `/api/categories/${editId}`,
                { name: editName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEditId(null);
            setEditName("");
            load(pagination.page);
        } catch (err) {
            alert("Gagal update kategori");
        }
    };

    const openDeleteModal = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/categories/${deleteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            load(pagination.page);
            setShowModal(false);
        } catch (err) {
            alert("Gagal hapus");
            setShowModal(false);
        }
    };

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <h2 className="font-semibold text-lg mb-2">Categories</h2>

            {/* 🔎 Search + Add */}
            <div className="mb-4 flex items-center gap-2">
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-blue-600 text-white px-3 py-2 rounded cursor-pointer"
                >
                    Add Category
                </button>

                <input
                    className="border p-2 rounded flex-1"
                    placeholder="Cari kategori..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* ➕ Form Tambah */}
            {isAdding && (
                <div className="bg-white p-4 rounded shadow mb-4 flex gap-2 items-center">
                    <input
                        className="border p-2 rounded flex-1"
                        placeholder="Category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                    <button
                        onClick={add}
                        className="bg-green-600 text-white px-3 py-2 rounded cursor-pointer"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setIsAdding(false)}
                        className="bg-gray-400 text-white px-3 py-2 rounded cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* 🧾 Table */}
            <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Products</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Loading */}
                        {loading && (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="p-4 text-center text-gray-500"
                                >
                                    Memuat kategori...
                                </td>
                            </tr>
                        )}

                        {/* Error */}
                        {!loading && error && (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="p-4 text-center text-red-600"
                                >
                                    {error}
                                </td>
                            </tr>
                        )}

                        {/* No data */}
                        {!loading &&
                            !error &&
                            filteredCategories.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="p-4 text-center text-gray-500"
                                    >
                                        No categories found
                                    </td>
                                </tr>
                            )}

                        {/* Data */}
                        {!loading &&
                            !error &&
                            filteredCategories.map((c) => (
                                <tr key={c._id} className="border-t">
                                    <td className="p-2">{c.name}</td>
                                    <td className="p-2">{c.count || "-"}</td>

                                    <td className="p-2">
                                        <div className="inline-flex items-center gap-3">
                                            {/* Edit Button */}
                                            <button
                                                onClick={() => startEdit(c)}
                                                className="text-cyan-800 cursor-pointer border border-cyan-700 py-1 px-2 rounded-xl duration-300 hover:bg-cyan-700 hover:text-white"
                                            >
                                                Edit
                                            </button>

                                            {/* Delete Button */}
                                            {c.count > 0 ? (
                                                <button
                                                    disabled
                                                    className="text-gray-400 border border-gray-300 py-1 px-2 rounded-xl cursor-not-allowed"
                                                    title="Kategori masih digunakan produk"
                                                >
                                                    Delete
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        openDeleteModal(c._id)
                                                    }
                                                    className="text-red-700 cursor-pointer py-1 px-2 duration-300 transition-all rounded-xl hover:bg-red-600 border border-red-600 hover:text-white"
                                                >
                                                    Delete
                                                </button>
                                            )}
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
                            Page {pagination.page} / {pagination.totalPages}
                        </div>
                        <div className="flex gap-2">
                            <button
                                disabled={pagination.page <= 1}
                                onClick={() => load(pagination.page - 1)}
                                className="px-3 py-1 border rounded cursor-pointer"
                            >
                                Prev
                            </button>
                            <button
                                disabled={
                                    pagination.page >= pagination.totalPages
                                }
                                onClick={() => load(pagination.page + 1)}
                                className="px-3 py-1 border rounded cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 🟥 Modal Delete */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
                        <h3 className="text-lg font-semibold mb-2">
                            Hapus Kategori?
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">
                            Kategori yang dihapus tidak dapat dikembalikan.
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

            {/* ✏ Modal Edit */}
            {editId && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg w-80">
                        <h3 className="font-semibold mb-3">Edit Category</h3>

                        <input
                            className="border w-full p-2 rounded mb-3"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            autoFocus
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setEditId(null)}
                                className="px-4 py-2 border rounded cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveEdit}
                                className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
