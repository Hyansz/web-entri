import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";

export default function ArticleDetail() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        api.get(`/articles/${slug}`).then((res) => setArticle(res.data));
    }, [slug]);

    if (!article) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
            <img
                src={article.thumbnail}
                className="w-full h-64 object-cover mb-4 rounded"
            />
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
    );
}
