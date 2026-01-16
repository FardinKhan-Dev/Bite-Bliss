import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor = ({ name, value, onChange, disabled }) => {
    const editorRef = useRef(null);

    return (
        <Editor
            apiKey="no-api-key" // Use 'no-api-key' for self-hosted TinyMCE
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={value || ''}
            disabled={disabled}
            init={{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={(content) => {
                onChange({ target: { name, value: content } });
            }}
        />
    );
};

export default TinyMCEEditor;
