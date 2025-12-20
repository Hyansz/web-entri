import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import api from "../api/axiosInstance";

export default function ProductForm() {
    const { id } = useParams();
    const nav = useNavigate();
    const [form, setForm] = useState({
        name: "",
        kemenkesNumber: "",
        brand: "",
        location: "",
        specifications: "",
        category: "",
        imagePreview: null, // 🔥 preview gambar
    });

    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);

    const ASSET_URL = import.meta.env.VITE_ASSET_URL;

    useEffect(() => {
        api.get("/api/categories")
            .then((r) => setCategories(r.data.data || []))
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (id) {
            api.get(`/api/products2/${id}`).then((r) => {
                const p = r.data;
                setForm({
                    name: p.name || "",
                    kemenkesNumber: p.kemenkesNumber || "",
                    brand: p.brand || "",
                    location: p.location || "",
                    specifications: p.specifications || "",
                    category: p.category?._id || "",
                    imagePreview: p.image ? `${ASSET_URL}${p.image}` : null,
                });
            });
        }
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // 🔥 preview image baru
        if (file) {
            setForm({
                ...form,
                imagePreview: URL.createObjectURL(file),
            });
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        const fd = new FormData();

        fd.append("name", form.name);
        fd.append("kemenkesNumber", form.kemenkesNumber);
        fd.append("brand", form.brand);
        fd.append("location", form.location);
        fd.append("specifications", form.specifications);
        fd.append("category", form.category);

        if (image) {
            fd.append("image", image);
        }

        try {
            if (id) {
                await api.put(`/api/products2/${id}`, fd);
            } else {
                await api.post("/api/products2", fd);
            }

            // 🔥 LANGSUNG PINDAH
            nav("/admin/products2");
        } catch (err) {
            alert(err.response?.data?.message || "Failed");
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
                <h2 className="text-xl mb-4">
                    {id ? "Edit" : "Tambah"} Produk
                </h2>
                <form onSubmit={submit} className="space-y-3">
                    <input
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Nama produk"
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        value={form.kemenkesNumber}
                        onChange={(e) =>
                            setForm({ ...form, kemenkesNumber: e.target.value })
                        }
                        type="number"
                        placeholder="Nomor Kemenkes"
                        className="w-full border p-2 rounded [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <input
                        value={form.brand}
                        onChange={(e) =>
                            setForm({ ...form, brand: e.target.value })
                        }
                        placeholder="Merk"
                        className="w-full border p-2 rounded"
                    />
                    <input
                        value={form.location}
                        onChange={(e) =>
                            setForm({ ...form, location: e.target.value })
                        }
                        placeholder="Lokasi produksi"
                        className="w-full border p-2 rounded"
                    />
                    <textarea
                        value={form.specifications}
                        onChange={(e) =>
                            setForm({ ...form, specifications: e.target.value })
                        }
                        placeholder="Spesifikasi"
                        className="w-full border p-2 rounded"
                    />
                    <select
                        className="border p-2 rounded cursor-pointer"
                        value={form.category}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                        required
                    >
                        <option value="">Select Category</option>
                        {Array.isArray(categories) &&
                            categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                    </select>

                    {/* 📌 Upload Gambar */}
                    <div className="flex flex-col gap-3">
                        {/* Preview */}
                        {form.imagePreview && (
                            <img
                                src={form.imagePreview}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded border"
                            />
                        )}

                        {/* Nama file */}
                        {image ? (
                            <p className="text-sm text-gray-700">
                                📁 {image.name}
                            </p>
                        ) : form.imagePreview ? (
                            <p className="text-sm text-gray-700">
                                📁 {form.imagePreview.split("/").pop()}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500 italic">
                                Belum ada foto yang dipilih
                            </p>
                        )}

                        {/* Custom Upload Button */}
                        <label
                            htmlFor="fileUpload"
                            className="bg-cyan-600 text-white px-4 py-2 rounded-lg cursor-pointer w-fit hover:bg-cyan-700 transition"
                        >
                            Pilih Foto
                        </label>

                        {/* Hidden File Input */}
                        <input
                            id="fileUpload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setImage(file);

                                if (file) {
                                    setForm({
                                        ...form,
                                        imagePreview: URL.createObjectURL(file),
                                    });
                                }
                            }}
                            className="hidden"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
                        >
                            Simpan
                        </button>
                        <button
                            type="button"
                            onClick={() => nav("/admin/products2")}
                            className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
