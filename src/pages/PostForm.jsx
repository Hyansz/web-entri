import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import Editor from "../components/Editor";
import AdminLayout from "../components/AdminLayout";

export default function PostForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [preview, setPreview] = useState(false);

    const [form, setForm] = useState({
        title: "",
        excerpt: "",
        content: "",
        image: null,
        currentImage: "",
    });

    const isEdit = Boolean(id);

    // fetch data saat edit
    useEffect(() => {
        if (isEdit) {
            api.get(`/api/posts/${id}`).then((res) => {
                setForm({
                    title: res.data.title ?? "",
                    excerpt: res.data.excerpt ?? "",
                    content: res.data.content ?? "",
                    image: null,
                    currentImage: res.data.image ?? "",
                });
            });
        }
    }, [id]);

    const submit = async (e) => {
        e.preventDefault();

        if (!form.title.trim() || !form.content.trim()) {
            alert("Judul dan isi blog wajib diisi!");
            return;
        }

        try {
            const data = new FormData();
            data.append("title", form.title);
            data.append("excerpt", form.excerpt);
            data.append("content", form.content);
            if (form.image) data.append("image", form.image);

            if (isEdit) {
                await api.put(`/api/posts/${id}`, data);
            } else {
                await api.post("/api/posts", data);
            }

            navigate("/admin/posts");
        } catch (err) {
            console.error("Error submit:", err);
            alert("Gagal menyimpan blog");
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    {isEdit ? "Edit Artikel" : "Tambah Artikel"}
                </h1>
                <div className="inline-flex bg-gray-100 rounded-xl p-1 mb-6">
                    <button
                        type="button"
                        onClick={() => setPreview(false)}
                        className={`
                            px-4 py-2 text-sm rounded-lg transition-all duration-300 cursor-pointer
                            ${
                                !preview
                                    ? "bg-white shadow text-blue-600"
                                    : "text-gray-600 hover:text-gray-800"
                            }
                        `}
                    >
                        ✍️ Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => setPreview(true)}
                        className={`
                            px-4 py-2 text-sm rounded-lg transition-all duration-300 cursor-pointer
                            ${
                                preview
                                    ? "bg-white shadow text-blue-600"
                                    : "text-gray-600 hover:text-gray-800"
                            }
                        `}
                    >
                        👁️ Preview
                    </button>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-6 bg-white p-6 rounded-xl shadow border"
                >
                    {/* Judul */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Judul Artikel
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) =>
                                setForm((p) => ({
                                    ...p,
                                    title: e.target.value,
                                }))
                            }
                            className="w-full mt-1 rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan judul artikel"
                        />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Deskripsi Singkat
                        </label>
                        <textarea
                            rows={3}
                            value={form.excerpt}
                            onChange={(e) =>
                                setForm((p) => ({
                                    ...p,
                                    excerpt: e.target.value,
                                }))
                            }
                            className="w-full mt-1 rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            placeholder="Ringkasan singkat artikel"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Isi Artikel
                        </label>

                        <div className="mt-2 border rounded-lg p-4 min-h-[400px] bg-white">
                            {preview ? (
                                <div
                                    className="content-html"
                                    dangerouslySetInnerHTML={{
                                        __html: form.content,
                                    }}
                                />
                            ) : (
                                <Editor
                                    value={form.content}
                                    onChange={(html) =>
                                        setForm((p) => ({
                                            ...p,
                                            content: html,
                                        }))
                                    }
                                />
                            )}
                        </div>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Gambar Header
                        </label>

                        {/* preview image lama */}
                        {form.currentImage && !form.image && (
                            <img
                                src={form.currentImage}
                                alt="Current"
                                className="mt-2 w-64 rounded-lg border"
                            />
                        )}

                        {/* preview image baru */}
                        {form.image && (
                            <img
                                src={URL.createObjectURL(form.image)}
                                alt="Preview"
                                className="mt-2 w-64 rounded-lg border"
                            />
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setForm((p) => ({
                                    ...p,
                                    image: e.target.files?.[0] || null,
                                }))
                            }
                            className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/posts")}
                            className="px-4 py-2 bg-red-100 border rounded-lg text-red-600 hover:bg-red-600 hover:text-white duration-300 cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
