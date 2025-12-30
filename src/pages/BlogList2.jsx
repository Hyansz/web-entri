import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Link } from "react-router-dom";

export default function BlogList2() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        api.get(`/api/posts?page=${page}&search=${search}`).then((res) =>
            setPosts(res.data.posts)
        );
    }, [page, search]);

    return (
        <div className="mt-50">
            <h2>Blog</h2>

            <input
                placeholder="Search title..."
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />

            {posts.map((post) => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <Link to={`/api/posts/edit/${post._id}`}>Edit</Link>
                </div>
            ))}

            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Prev
            </button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
}
