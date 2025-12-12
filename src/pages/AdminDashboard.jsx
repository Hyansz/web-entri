import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";

// 🎯 Fungsi animasi angka (lebih cepat)
function CountUp({ target }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = Number(target);
        if (start === end) return;

        const timer = setInterval(() => {
            start += Math.ceil(end / 15); // lebih cepat
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }
            setValue(start);
        }, 20); // lebih cepat

        return () => clearInterval(timer);
    }, [target]);

    return <span>{value}</span>;
}

export default function AdminDashboard() {
    const [productCount, setProductCount] = useState(null);
    const [categoryCount, setCategoryCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchCounts = async () => {
        try {
            setLoading(true);
            setErrorMsg("");

            const resProducts = await axios.get("/api/products2", {
                params: { page: 1, limit: 1 },
            });
            const resCategories = await axios.get("/api/categories", {
                params: { page: 1, limit: 1 },
            });

            setProductCount(resProducts.data.pagination.total);
            setCategoryCount(resCategories.data.pagination.total);
        } catch (err) {
            setErrorMsg(err.message || "Error mengambil data!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCounts();
    }, []);

    return (
        <AdminLayout>
            <h1 className="text-xl font-bold mb-6">Dashboard</h1>

            {errorMsg && (
                <div className="bg-red-100 text-red-600 p-3 rounded mb-4 flex justify-between">
                    {errorMsg}
                    <button
                        onClick={fetchCounts}
                        className="text-sm underline ml-3 cursor-pointer"
                    >
                        Coba lagi
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card Kategori */}
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-1">
                    <div className="text-4xl">🏷️</div>
                    <p className="text-gray-600">Jumlah Kategori</p>

                    {loading ? (
                        <div className="mt-3 border-4 border-blue-200 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
                    ) : (
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            <CountUp target={categoryCount} />
                        </p>
                    )}

                    <Link
                        to="/admin/categories"
                        className="text-sm underline text-blue-600 mt-1"
                    >
                        Lihat kategori →
                    </Link>
                </div>

                {/* Card Produk */}
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-1">
                    <div className="text-4xl">📦</div>
                    <p className="text-gray-600">Jumlah Produk</p>

                    {loading ? (
                        <div className="mt-3 border-4 border-green-200 border-t-green-600 rounded-full w-8 h-8 animate-spin"></div>
                    ) : (
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            <CountUp target={productCount} />
                        </p>
                    )}

                    <Link
                        to="/admin/products2"
                        className="text-sm underline text-green-600 mt-1"
                    >
                        Lihat produk →
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
