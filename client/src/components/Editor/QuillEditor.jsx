import ImageResize from 'quill-image-resize-module-react';
import ImageUploader from 'quill-image-uploader';
import React from 'react';
import toast from 'react-hot-toast';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import './Quill.css';
//Quill register
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageUploader', ImageUploader);

// API
// const cloudinary = `https://api.cloudinary.com/v1_1/pu/image/upload`;
// const imgbb = `https://api.imgbb.com/1/upload?key=7a859ee12dc201988125d76f39b89a10`;
const hrmadmin = `https://hrmadmin.herokuapp.com/upload/file`;
class QuillEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			readOnly: true,
			modules: {
				toolbar: [
					[{ size: [] }, { header: [] }],
					[{ align: [] }],
					['bold', 'italic', 'underline', 'strike'],
					[{ color: ['white', 'yellow'] }, { background: [] }],
					['blockquote', 'code-block'],
					[{ list: 'ordered' }, { list: 'bullet' }],
					['link', 'image', 'video']
				],
				imageResize: {
					// parchment: Quill.import('parchment'),
					modules: ['Resize', 'DisplaySize', 'Toolbar']
				},
				imageUploader: {
					upload: file => {
						return new Promise((resolve, reject) => {
							const formData = new FormData();
							formData.append('image', file); //imgbb or hrm
							// formData.append("file", file); //cloudinary
							formData.append('upload_preset', 'HRMZeliosSea'); //cloudinary

							fetch(hrmadmin, {
								method: 'POST',
								body: formData,
								header: { 'Content-Type': 'multipart/form-data' }
							})
								.then(response => response.json())
								.then(result => {
									console.log(result);
									toast.success(
										'Tải ảnh thành công, vui lòng đợi trong giây lát!'
									);
									resolve(result.data.url); //imgbb or hrm
									// resolve(result.url); //cloudinary
									// this.setState({ readOnly: true });
								})
								.catch(error => {
									reject('Upload failed');
									console.log(error);
									toast.error('Có lỗi khi tải ảnh lên!');
								});
						});
					}
				}
			},
			formats: [
				'size',
				'align',
				'header',
				'bold',
				'italic',
				'underline',
				'strike',
				'blockquote',
				'list',
				'link',
				'image',
				'color',
				'background',
				'code',
				'code-block',
				'script'
			]
		};
	}

	handleOnChangeContent = (content, delta, source, editor) => {
		// let contentDelta = editor.getContents();
		// console.log(contentDelta.ops);
		// if (contentDelta.ops.length === 1) {
		//   this.props.handleDescription("");
		//   console.log(true);
		// } else this.props.handleDescription(content);
		// this.props.handleDescription(contentDelta);
		this.props.handleDescription(content);
	};

	render() {
		return (
			<div className='text-editor'>
				<ReactQuill
					theme='bubble'
					value={this.props.description}
					readOnly={this.props.readOnly}
					placeholder={this.props.placeholder}
					modules={this.state.modules}
					formats={this.state.formats}
					onChange={this.handleOnChangeContent}
					// onFocus={() => {
					//   if (this.state.readOnly) this.setState({ readOnly: false });
					// }}
					// onBlur={(range, source, editor) => {
					//   console.log(editor.getContents());
					//   // this.setState({ readOnly: true });
					//   this.props.handleDescription(editor.getContents());
					//   // setTimeout(() => {
					//   //   let fixRange = editor.getSelection();
					//   //   if (!fixRange) {
					//   //     this.setState({ readOnly: true });
					//   //     this.props.handleDescription(this.state.deltaContent);
					//   //   }
					//   // }, 50);
					// }}
				></ReactQuill>
			</div>
		);
	}
}

export default QuillEditor;
