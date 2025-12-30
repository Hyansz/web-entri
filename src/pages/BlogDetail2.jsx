import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";

export default function BlogDetail2() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        api.get(`/api/posts/${id}`).then((res) => setPost(res.data));
    }, []);

    if (!post) return null;

    return (
        <div>
            <img src={post.image} style={{ width: "100%" }} />
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
}
