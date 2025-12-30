import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import Editor from "../components/Editor";

export default function BlogForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        excerpt: "",
        content: "",
        image: null,
    });

    useEffect(() => {
        if (id) {
            api.get(`/api/posts/${id}`).then((res) => {
                setForm({ ...res.data, image: null });
            });
        }
    }, [id]);

    const submit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", form.title);
        data.append("excerpt", form.excerpt);
        data.append("content", form.content);
        if (form.image) data.append("image", form.image);

        id
            ? await api.put(`/api/posts/${id}`, data)
            : await api.post("/api/posts", data);

        navigate("/");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 mt-20">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                {id ? "Edit Blog" : "Tambah Blog"}
            </h1>

            <form
                onSubmit={submit}
                className="space-y-6 bg-white p-6 rounded-xl shadow-sm border"
            >
                {/* Judul */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Judul
                    </label>
                    <input
                        type="text"
                        placeholder="Masukkan judul blog"
                        value={form.title}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Deskripsi Singkat
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Ringkasan singkat blog"
                        value={form.excerpt}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                excerpt: e.target.value,
                            }))
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Isi Blog
                    </label>
                    <div className="rounded-lg border border-gray-300 overflow-hidden">
                        <Editor
                            value={form.content}
                            onChange={(html) =>
                                setForm((prev) => ({ ...prev, content: html }))
                            }
                        />
                    </div>
                </div>

                {/* Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Gambar Header
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                image: e.target.files[0],
                            }))
                        }
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                </div>

                {/* Action */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/posts")}
                        className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
                    >
                        Batal
                    </button>

                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    );
}
