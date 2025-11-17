import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function ProductLabDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://web-entri.onrender.com/api/lab/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!product) return <p className="text-center mt-20">Memuat detail...</p>;

    // 🔹 Pisahkan spesifikasi berdasarkan tanda '|'
    const spesifikasiList = product.spesifikasi
        ? product.spesifikasi.split("|").map((s) => s.trim())
        : [];

    return (
        <div>
            <div className="h-18.5 bg-cyan-700"></div>
            <div className="w-10/12 mx-auto py-16 flex flex-col md:flex-row items-center justify-center gap-10">
                <div className="md:w-1/2">
                    <img
                        src={product.img}
                        alt={product.title}
                        className="rounded-xl mb-6 w-full"
                    />
                </div>
                <div className="md:w-1/2">
                    <div className="flex items-center justify-between mb-2 text-3xl">
                        <h1 className="font-bold text-cyan-800">
                            {product.title}
                        </h1>
                        <button
                            onClick={() => {
                                navigate(-1);
                                setTimeout(() => {
                                    window.scrollTo(0, 0);
                                }, 50);
                            }}
                            className="transition cursor-pointer duration-300 font-bold text-cyan-800 hover:text-cyan-800 hover:scale-110"
                        >
                            <IoIosCloseCircleOutline size={28} />
                        </button>
                    </div>
                    <table className="w-full border-separate border-spacing-y-2">
                        <tbody>
                            <tr>
                                <td className="text-base w-1/2 font-medium text-black">
                                    Kemenkes RI AKD
                                </td>
                                <td className="text-base font-medium w-1/2 text-cyan-800">
                                    {product.kemenkes}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-base w-1/2 font-medium text-black">
                                    Merk
                                </td>
                                <td className="text-base font-medium w-1/2 text-cyan-800">
                                    {product.merk}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-base w-1/2 font-medium text-black">
                                    Lokasi Produksi
                                </td>
                                <td className="text-base font-medium w-1/2 text-cyan-800">
                                    {product.lokasi}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="text-base font-medium text-black mt-2 mb-6">
                        <p>Spesifikasi :</p>
                        <ul className="list-disc text-sm ml-6 mt-2 text-cyan-800">
                            {spesifikasiList.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <a
                            href="https://wa.me/6285174394123?text=Halo,%20Saya%20dari%20website%20entri."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-fit items-center gap-3 bg-cyan-600 hover:bg-cyan-800 transition-all duration-300 text-white py-3 px-8 rounded-2xl font-semibold shadow-lg mx-auto md:mx-0"
                        >
                            <FaShoppingCart className="text-2xl" />
                            Pesan Sekarang
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
