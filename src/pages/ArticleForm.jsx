import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import Editor from "../components/Editor";

export default function ArticleForm() {
    const { id } = useParams();
    const nav = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        content: "",
        thumbnail: "",
    });

    useEffect(() => {
        if (id) {
            api.get(`/articles/${id}`).then((res) => setForm(res.data));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) await api.put(`/articles/${id}`, form);
            else await api.post("/articles", form);
            nav("/admin");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto flex flex-col gap-4"
        >
            <input
                className="border p-2 rounded"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
                className="border p-2 rounded"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                }
            />
            <Editor
                value={form.content}
                onChange={(v) => setForm({ ...form, content: v })}
            />
            <input
                className="border p-2 rounded"
                placeholder="Thumbnail URL (Cloudinary)"
                value={form.thumbnail}
                onChange={(e) =>
                    setForm({ ...form, thumbnail: e.target.value })
                }
            />
            <button className="bg-cyan-600 text-white px-4 py-2 rounded">
                Save
            </button>
        </form>
    );
}
