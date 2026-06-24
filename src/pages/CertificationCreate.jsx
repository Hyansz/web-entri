import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function CertificationCreate() {
    const nav = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        order: 0,
        active: true,
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        if (image) fd.append("image", image);

        try {
            await api.post("/api/certifications", fd);
            nav("/admin/certifications");
        } catch (err) {
            alert("Gagal tambah");
        }
    };

    return (
        <AdminLayout>
            <h2 className="text-lg font-semibold mb-4">Tambah Sertifikasi</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="border p-2 w-full"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                />

                <textarea
                    className="border p-2 w-full"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />

                <input
                    type="number"
                    className="border p-2 w-full"
                    value={form.order}
                    onChange={(e) =>
                        setForm({ ...form, order: e.target.value })
                    }
                />

                <input
                    type="file"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                        setPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                />

                {preview && <img src={preview} className="w-32 mt-2 rounded" />}

                <button className="bg-cyan-600 text-white px-4 py-2 rounded">
                    Save
                </button>
            </form>
        </AdminLayout>
    );
}
