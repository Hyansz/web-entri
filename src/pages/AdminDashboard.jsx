import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import VisitorsToday from "../components/stats/VisitorsToday";
import PageViewsToday from "../components/stats/PageViewsToday";
import SessionsToday from "../components/stats/SessionsToday";
import BounceRate from "../components/stats/BounceRate";
import DailyVisitorsChart from "../components/DailyVisitorsChart";

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
    const [productCount, setProductCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [articleCount, setArticleCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchCounts = async () => {
        try {
            setLoading(true);
            setErrorMsg("");

            const resProducts = await api.get("/api/products2", {
                params: { page: 1, limit: 1 },
            });
            const resCategories = await api.get("/api/categories", {
                params: { page: 1, limit: 1 },
            });
            const resArticle = await api.get("/api/posts", {
                params: { page: 1, limit: 1 },
            });

            setProductCount(resProducts.data.pagination.total);
            setCategoryCount(resCategories.data.pagination.total);
            const articleTotal =
                resArticle.data?.pagination?.total ??
                resArticle.data?.meta?.total ??
                resArticle.data?.total ??
                resArticle.data?.data?.length ??
                0;

            setArticleCount(articleTotal);
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
            <div className="mb-8">
                <div className="relative overflow-visible bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
                    {/* pattern background */}
                    <div className="absolute inset-0 opacity-80 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-semibold">
                                Selamat Datang, Admin 👋
                            </h2>
                            <p className="mt-2 max-w-md text-sm">
                                Semoga harimu menyenangkan. Kelola artikel,
                                produk, dan kategori website kamu dengan mudah
                                dari dashboard ini.
                            </p>
                        </div>

                        {/* Image */}
                        <div className="absolute right-0 translate-y-[-16.5%] hidden sm:block">
                            <img
                                src="/img/profile.png"
                                alt="Admin"
                                className="h-54"
                            />
                        </div>
                    </div>
                </div>
            </div>
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
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {/* Card Kategori */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 flex flex-col items-center gap-1 transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-300/40">
                    <div className="text-4xl text-blue-600 drop-shadow-sm">
                        🏷️
                    </div>

                    <p className="text-gray-700">Jumlah Kategori</p>

                    {loading ? (
                        <div className="mt-3 w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
                    ) : (
                        <p className="text-3xl font-bold text-blue-700 mt-2">
                            <CountUp target={categoryCount} />
                        </p>
                    )}

                    <Link
                        to="/admin/categories"
                        className="relative mt-2 text-sm font-medium text-blue-700 transition-all duration-300 hover:text-blue-800 hover:-translate-y-0.5 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-current after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-0"
                    >
                        Lihat kategori →
                    </Link>
                </div>

                {/* Card Produk */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 flex flex-col items-center gap-1 transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-xl hover:shadow-emerald-300/40">
                    <div className="text-4xl text-emerald-600 drop-shadow-sm">
                        📦
                    </div>

                    <p className="text-gray-700">Jumlah Produk</p>

                    {loading ? (
                        <div className="mt-3 w-8 h-8 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
                    ) : (
                        <p className="text-3xl font-bold text-emerald-700 mt-2">
                            <CountUp target={productCount} />
                        </p>
                    )}

                    <Link
                        to="/admin/products2"
                        className="relative mt-2 text-sm font-medium text-emerald-700 transition-all duration-300 hover:text-emerald-800 hover:-translate-y-0.5 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-current after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-0"
                    >
                        Lihat produk →
                    </Link>
                </div>

                {/* Card Artikel */}
                <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-6 flex flex-col items-center gap-1 transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-xl hover:shadow-violet-300/40">
                    <div className="text-4xl text-violet-600 drop-shadow-sm">
                        📰
                    </div>

                    <p className="text-gray-700">Jumlah Artikel</p>

                    {loading ? (
                        <div className="mt-3 w-8 h-8 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin"></div>
                    ) : (
                        <p className="text-3xl font-bold text-violet-700 mt-2">
                            <CountUp target={articleCount} />
                        </p>
                    )}

                    <Link
                        to="/admin/posts"
                        className="relative mt-2 text-sm font-medium text-violet-700 transition-all duration-300 hover:text-violet-800 hover:-translate-y-0.5 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-current after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-0"
                    >
                        Lihat artikel →
                    </Link>
                </div>
            </div>

            {/* === UMAMI ANALYTICS === */}
            <div className="mt-8 grid grid-cols-1 xl:grid-cols-4 gap-6 items-stretch">
                {/* CHART BESAR */}
                <div className="xl:col-span-2 bg-white dark:bg-[#0b0b0b] rounded-2xl shadow p-4">
                    <DailyVisitorsChart />
                </div>

                {/* STAT CARDS */}
                <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <VisitorsToday />
                    <PageViewsToday />
                    <SessionsToday />
                    <BounceRate />
                </div>
            </div>
        </AdminLayout>
    );
}
