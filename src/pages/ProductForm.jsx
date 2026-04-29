import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import api from "../api/axiosInstance";
import { mutate } from "swr";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

export default function ProductForm() {
    const { id } = useParams();
    const nav = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [fileError, setFileError] = useState("");
    const [removeImageFlag, setRemoveImageFlag] = useState(false);

    const [form, setForm] = useState({
        name: "",
        kemenkesType: "AKD",
        kemenkesNumber: "",
        brand: "",
        location: "",
        specifications: "",
        category: "",
        imagePreview: "", // ⚠️ HARUS STRING
    });

    /* =======================
       LOAD CATEGORIES
    ======================= */
    useEffect(() => {
        api.get("/api/categories")
            .then((r) => setCategories(r.data.data || []))
            .catch(() => {});
    }, []);

    /* =======================
       LOAD PRODUCT (EDIT)
    ======================= */
    useEffect(() => {
        if (!id) return;

        api.get(`/api/products2/${id}`).then((r) => {
            const p = r.data;

            setForm({
                name: p.name || "",
                kemenkesType: p.kemenkesType || "AKD",
                kemenkesNumber: p.kemenkesNumber || "",
                brand: p.brand || "",
                location: p.location || "",
                specifications: p.specifications || "",
                category: p.category?._id || "",
                imagePreview:
                    typeof p.image === "object"
                        ? p.image?.url || ""
                        : typeof p.image === "string"
                          ? p.image
                          : "",
            });

            setImage(null);
            setFileError("");
            setRemoveImageFlag(false);
        });
    }, [id]);

    /* =======================
       IMAGE CHANGE
    ======================= */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setFileError("Ukuran file lebih besar dari 4 MB");
            setImage(null);
            return;
        }

        if (!file.type.startsWith("image/")) {
            setFileError("File harus berupa gambar");
            setImage(null);
            return;
        }

        setFileError("");
        setRemoveImageFlag(false);

        if (form.imagePreview?.startsWith("blob:")) {
            URL.revokeObjectURL(form.imagePreview);
        }

        const previewUrl = URL.createObjectURL(file);

        setImage(file);
        setForm((prev) => ({
            ...prev,
            imagePreview: previewUrl,
        }));
    };

    /* =======================
       REMOVE IMAGE (❌)
    ======================= */
    const removeImage = () => {
        if (form.imagePreview?.startsWith("blob:")) {
            URL.revokeObjectURL(form.imagePreview);
        }

        setImage(null);
        setFileError("");
        setRemoveImageFlag(true);

        setForm((prev) => ({
            ...prev,
            imagePreview: "",
        }));
    };

    /* =======================
       SUBMIT
    ======================= */
    const submit = async (e) => {
        e.preventDefault();
        if (submitting || fileError) return;

        setSubmitting(true);

        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("kemenkesType", form.kemenkesType);
        fd.append("kemenkesNumber", form.kemenkesNumber);
        fd.append("brand", form.brand);
        fd.append("location", form.location);
        fd.append("specifications", form.specifications);
        fd.append("category", form.category);

        // 🔥 INI KUNCI UTAMA
        fd.append("removeImage", removeImageFlag ? "true" : "false");

        if (image) {
            fd.append("image", image);
        }

        try {
            if (id) {
                await api.put(`/api/products2/${id}`, fd);
            } else {
                await api.post("/api/products2", fd);
            }

            mutate("/api/products2/all");
            nav("/admin/products2");
        } catch (err) {
            alert(err?.response?.data?.message || "Failed");
        } finally {
            setSubmitting(false);
        }
    };

    const previewName =
        typeof form.imagePreview === "string" && form.imagePreview
            ? form.imagePreview.split("/").pop()
            : "";

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

                    <div className="space-y-1">
                        <label className="text-sm font-medium">
                            Kemenkes RI
                        </label>

                        <div className="flex gap-2">
                            <select
                                value={form.kemenkesType}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        kemenkesType: e.target.value,
                                    })
                                }
                                className="border p-2 rounded"
                            >
                                <option value="AKD">AKD</option>
                                <option value="PKD">PKD</option>
                            </select>

                            <input
                                value={form.kemenkesNumber}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        kemenkesNumber: e.target.value,
                                    })
                                }
                                placeholder={`Nomor ${form.kemenkesType}`}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>

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
                            setForm({
                                ...form,
                                specifications: e.target.value,
                            })
                        }
                        placeholder="Spesifikasi"
                        className="w-full border p-2 rounded"
                    />

                    <select
                        value={form.category}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                        className="border p-2 rounded"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    {/* IMAGE */}
                    <div className="flex flex-col gap-3">
                        {form.imagePreview && (
                            <div className="relative w-32">
                                <img
                                    src={form.imagePreview}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded border"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {image ? (
                            <p className="text-sm">📁 {image.name}</p>
                        ) : previewName ? (
                            <p className="text-sm">📁 {previewName}</p>
                        ) : (
                            <p className="text-sm italic text-gray-500">
                                Belum ada foto
                            </p>
                        )}

                        {fileError && (
                            <p className="text-sm text-red-600 font-medium">
                                ⚠️ {fileError}
                            </p>
                        )}

                        <label
                            htmlFor="fileUpload"
                            className="bg-cyan-600 text-white px-4 py-2 rounded cursor-pointer w-fit"
                        >
                            Pilih Foto
                        </label>

                        <input
                            id="fileUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={submitting || !!fileError}
                            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60 cursor-pointer disabled:cursor-progress"
                        >
                            {submitting ? "Menyimpan..." : "Simpan"}
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
