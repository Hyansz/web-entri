import React, { useEffect } from "react";

export default function SessionExpiredModal({ visible, onClose }) {
    useEffect(() => {
        if (visible) {
            const t = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(t);
        }
    }, [visible, onClose]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white dark:bg-gray-900 px-8 py-6 rounded-xl shadow-xl max-w-sm w-[90%] text-center animate-fadeIn">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    Sesi Berakhir
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Sesi kamu telah berakhir. Mengalihkan ke halaman login...
                </p>

                {/* Loader kecil */}
                <div className="mt-4 flex justify-center">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    );
}
