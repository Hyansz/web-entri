import { Editor as TinyEditor } from "@tinymce/tinymce-react";

export default function Editor({ value, onChange }) {
    return (
        <TinyEditor
            apiKey="tn57x6l28t7z7usy0et7fhicwy9aurdulwsl7ax5f896wfk9" // aman tanpa key untuk local & dev
            value={value}
            init={{
                height: 420,
                menubar: false,

                plugins: [
                    "lists",
                    "link",
                    "image",
                    "table",
                    "code",
                    "media",
                    "searchreplace",
                    "wordcount",
                ],

                toolbar:
                    "undo redo | blocks | bold italic underline | " +
                    "bullist numlist | link image table | removeformat | code",
                content_style: `
                    body {
                        font-family: sans-serif;
                        font-size: 16px;
                    }
                `,
                ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                        Promise.reject("See docs to implement AI Assistant")
                    ),
                uploadcare_public_key: "17d13a028f71f0aa508a",
            }}
            onEditorChange={(content) => onChange(content)}
        />
    );
}
