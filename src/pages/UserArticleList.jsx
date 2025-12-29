import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";

export default function UserArticleList() {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        api.get("/api/articles").then((res) => setArticles(res.data));
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((a) => (
                    <Link
                        key={a._id}
                        to={`/article/${a.slug}`}
                        className="border rounded shadow p-4 hover:shadow-lg transition"
                    >
                        <img
                            src={a.thumbnail || "/no-image.png"}
                            className="w-full h-48 object-cover mb-2 rounded"
                        />
                        <h2 className="font-semibold text-lg">{a.title}</h2>
                        <p className="text-gray-600">{a.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
