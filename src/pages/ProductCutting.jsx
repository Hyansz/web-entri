import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function ProductCutting() {
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        setStatus("loading");
        fetch(`http://localhost:5000/api/products2`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "empty") {
                    setStatus("empty");
                    setMessage(data.message || "Data kosong");
                    setProducts([]);
                } else {
                    setStatus("success");
                    setProducts(data.data);
                }
            })
            .catch(() => {
                setStatus("error");
                setMessage("Gagal memuat data dari server");
            });
    }, []);

    return (
        <>
            <Helmet>
                <title>
                    Motif Cutting Laser - Desain Presisi untuk Industri | PT
                    Entri Jaya Makmur
                </title>
                <meta
                    name="description"
                    content="Layanan motif cutting laser dengan hasil presisi tinggi untuk kebutuhan industri dan dekorasi. Solusi desain berkualitas dari PT Entri Jaya Makmur."
                />
                <link
                    rel="canonical"
                    href="https://entrijayamakmur.co.id/products/cutting"
                />
            </Helmet>

            <div>
                {/* Hero */}
                <section
                    className="h-[80vh] relative flex flex-col text-white bg-cover bg-no-repeat bg-center md:bg-right"
                    style={{
                        backgroundImage: "url('/img/mofcut.webp')",
                    }}
                >
                    {/* Overlay */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-cyan-800/80 via-black/50 to-black/80"></div>
                    <div className="block md:hidden absolute inset-0 bg-black/60"></div>

                    <div>
                        <div className="relative w-11/12 z-10 mx-auto flex flex-col items-start h-[80vh] justify-center text-center">
                            <h3 className="text-3xl w-full md:text-5xl font-bold mb-4">
                                Motif{" "}
                                <span className="bg-gradient-to-l from-cyan-200 via-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                                    Cutting
                                </span>{" "}
                                Laser
                            </h3>
                        </div>
                    </div>
                </section>

                {/* Produk */}
                <section className="w-10/12 mx-auto text-center py-16 px-6">
                    {status === "loading" && (
                        <p className="text-cyan-600 text-lg font-semibold">
                            Memuat data...
                        </p>
                    )}

                    {status === "error" && (
                        <p className="text-red-600 text-lg font-semibold">
                            {message || "Terjadi kesalahan, coba lagi nanti."}
                        </p>
                    )}

                    {status === "empty" && (
                        <p className="text-gray-500 text-lg font-semibold">
                            {message || "Belum ada Produk furniture."}
                        </p>
                    )}

                    {status === "success" && (
                        <>
                            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {products.map((item) => (
                                    <div
                                        className="bg-white rounded-xl shadow-md shadow-cyan-800/40 p-4 hover:scale-105 duration-500 text-cyan-800 border border-cyan-500/20 flex flex-col justify-between"
                                    >
                                        <div>
                                            <img
                                                src={`http://localhost:5000${item.image}`}
                                                alt={item.name}
                                                className="h-[220px] w-full object-contain mx-auto mb-3"
                                            />
                                            <p className="font-semibold text-lg text-cyan-800">
                                                {item.name}
                                            </p>
                                        </div>
                                        <Link
                                            to={`/products/${item._id}`}
                                            id="button"
                                            className="inline-block mt-3 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition duration-300"
                                        >
                                            Detail
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </>
    );
}
