import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function RichEditor({ value, onChange }) {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        if (!editorRef.current || quillRef.current) return;

        quillRef.current = new Quill(editorRef.current, {
            theme: "snow",
            placeholder: "Tulis isi blog...",
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                ],
            },
        });

        quillRef.current.on("text-change", () => {
            onChange(quillRef.current.root.innerHTML);
        });
    }, []);

    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = value || "";
        }
    }, [value]);

    return <div ref={editorRef} />;
}
