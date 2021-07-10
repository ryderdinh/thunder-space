import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);
class QuillEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      modules: {
        toolbar: [
          [{ font: [] }, { size: [] }, { header: [] }],
          [{ align: [] }, "direction"],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "super" }, { script: "sub" }],
          ["blockquote", "code-block"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
          ["clean"],
        ],
        imageResize: {
          // parchment: Quill.import('parchment'),
          modules: ["Resize", "DisplaySize"],
        },
      },
      formats: [
        "font",
        "size",
        "align",
        "direction",
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "background",
        "code",
        "clean",
        "code-block",
        "script",
      ],
    };
  }

  handleOnChangeContent = (value) => {
    console.log(value);
    this.setState({ text: value });
  };
  render() {
    return (
      <div className="text-editor">
        <ReactQuill
          value={this.state.text}
          theme="snow"
          readOnly={false}
          modules={this.state.modules}
          formats={this.state.formats}
          onChange={this.handleOnChangeContent}
        ></ReactQuill>
      </div>
    );
  }
}

export default QuillEditor;
