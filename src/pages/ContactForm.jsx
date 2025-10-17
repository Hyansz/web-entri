import { useState, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaImage, FaUpload } from "react-icons/fa6";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");
    const fileInputRef = useRef(null); // ✅ buat ref untuk input file

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("subject", formData.subject);
            data.append("message", formData.message);
            if (file) data.append("photo", file);

            const res = await fetch(
                "https://web-entri.onrender.com/send-email",
                {
                    method: "POST",
                    body: data,
                }
            );

            if (res.ok) {
                setStatus("✅ Pesan berhasil dikirim!");
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
                setFile(null);

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }

                setTimeout(() => setStatus(""), 3000);
            } else {
                setStatus("❌ Gagal mengirim pesan.");
            }
        } catch (error) {
            console.error(error);
            setStatus("⚠️ Terjadi error.");
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <section
                className="h-[80vh] relative flex flex-col text-white bg-cover bg-no-repeat bg-center"
                style={{
                    backgroundImage: "url('/img/contact.png')",
                }}
            >
                <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-800/80 via-black/50 to-black/70"></div>
                <div className="block md:hidden absolute inset-0 bg-black/60"></div>

                <div className="relative w-11/12 z-10 mx-auto flex flex-col items-start h-[80vh] justify-center text-center">
                    <h3 className="text-3xl w-full md:text-5xl font-bold mb-4">
                        Contact{" "}
                        <span className="bg-gradient-to-l from-cyan-500 via-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                            Us
                        </span>
                    </h3>
                </div>
            </section>

            {/* Form Section */}
            <section className="w-10/12 mx-auto md:mb-8 mt-10">
                <div className="flex items-center gap-10 flex-col md:flex-row">
                    <div className="xl:w-1/2">
                        <img
                            src="/img/conper.png"
                            className="rounded-2xl"
                            alt="Contact illustration"
                        />
                    </div>
                    <div className="xl:w-1/2 px-4 pb-20 xl:p-20 mx-auto text-center">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                            Kritik dan Saran
                        </h3>
                        <form
                            onSubmit={handleSubmit}
                            className="max-w-lg mx-auto space-y-4"
                            encType="multipart/form-data"
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="subject"
                                placeholder="Your Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            ></textarea>

                            {/* File Upload */}
                            <div className="border-2 border-dashed border-cyan-400 rounded-xl p-5 cursor-pointer hover:bg-cyan-50 transition">
                                <label
                                    htmlFor="photo"
                                    className="flex flex-col items-center justify-center space-y-2 text-cyan-700 cursor-pointer"
                                >
                                    <FaUpload className="text-3xl" />
                                    <span className="font-semibold">
                                        {file ? "Ganti File" : "Klik untuk pilih file gambar"}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        (Format: JPG, PNG, WebP)
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                                {file && (
                                    <p className="mt-3 flex items-center gap-2 justify-center text-sm text-gray-700">
                                        <FaImage className="text-cyan-700" /> <strong>{file.name}</strong> ({Math.round(file.size / 1024)} KB)
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full md:w-auto px-6 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition font-semibold cursor-pointer"
                            >
                                Send
                            </button>

                            {status && (
                                <p className="text-center mt-2 text-sm font-medium">
                                    {status}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
