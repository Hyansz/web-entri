import React from "react";
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
                    // Core editing features
                    "anchor",
                    "autolink",
                    "charmap",
                    "codesample",
                    "emoticons",
                    "link",
                    "lists",
                    "media",
                    "searchreplace",
                    "table",
                    "visualblocks",
                    "wordcount",
                    // Your account includes a free trial of TinyMCE premium features
                    // Try the most popular premium features until Jan 14, 2026:
                    "checklist",
                    "mediaembed",
                    "casechange",
                    "formatpainter",
                    "pageembed",
                    "a11ychecker",
                    "tinymcespellchecker",
                    "permanentpen",
                    "powerpaste",
                    "advtable",
                    "advcode",
                    "advtemplate",
                    "ai",
                    "uploadcare",
                    "mentions",
                    "tinycomments",
                    "tableofcontents",
                    "footnotes",
                    "mergetags",
                    "autocorrect",
                    "typography",
                    "inlinecss",
                    "markdown",
                    "importword",
                    "exportword",
                    "exportpdf",
                ],

                toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
                mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                ],
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
