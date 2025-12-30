import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: "", content: "" });

    useEffect(() => {
        if (id) {
            api.get(`/api/posts/${id}`).then((res) => setForm(res.data));
        }
    }, [id]);

    const submit = async (e) => {
        e.preventDefault();
        id
            ? await api.put(`/api/posts/${id}`, form)
            : await api.post("/api/posts", form);

        navigate("/");
    };

    return (
        <form onSubmit={submit} className="mt-50">
            <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
                placeholder="Content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <button>Save</button>
        </form>
    );
}
