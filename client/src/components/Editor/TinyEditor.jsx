import { Editor } from '@tinymce/tinymce-react'
import React, { useMemo, useRef, useState } from 'react'

const image_upload_handler = (blobInfo, progress) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = false
    xhr.open(
      'POST',
      'https://api.imgbb.com/1/upload?key=f30a19f586acf7f1a7989330c143b14d'
    )

    xhr.upload.onprogress = (e) => {
      progress((e.loaded / e.total) * 100)
    }

    xhr.onload = () => {
      if (xhr.status === 403) {
        reject({ message: 'HTTP Error: ' + xhr.status, remove: true })
        return
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject('HTTP Error: ' + xhr.status)
        return
      }

      const json = JSON.parse(xhr.responseText)

      if (!json || typeof json.data.display_url != 'string') {
        reject('Invalid JSON: ' + xhr.responseText)
        return
      }

      resolve(json.data.display_url)
    }

    xhr.onerror = () => {
      reject(
        'Image upload failed due to a XHR Transport error. Code: ' + xhr.status
      )
    }

    const formData = new FormData()
    formData.append('image', blobInfo.blob(), blobInfo.filename())

    xhr.send(formData)
  })

export default function TinyEditor({ className, dataEditor, setDataEditor }) {
  const [readonly] = useState(false)

  const config = useMemo(
    () => ({
      skin: 'oxide-dark',
      content_css: 'dark',
      images_upload_handler: image_upload_handler,
      // images_upload_url:
      // 	'https://api.imgbb.com/1/upload?key=f30a19f586acf7f1a7989330c143b14d',
      height: 500,
      menubar: false,
      plugins: [
        'advlist',
        'autolink',
        'lists',
        'link',
        'image',
        'charmap',
        'anchor',
        'searchreplace',
        'visualblocks',
        'code',
        'fullscreen',
        'insertdatetime',
        'media',
        'table',
        'preview',
        'help',
        'wordcount',
        'table'
      ],
      toolbar:
        'undo redo | blocks | ' +
        'bold italic | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'link image |' +
        'table tabledelete | tableprops tablerowprops tablecellprops | ' +
        'tableinsertrowbefore tableinsertrowafter tabledeleterow | ' +
        'tableinsertcolbefore tableinsertcolafter tabledeletecol ' +
        'preview | removeformat | help',
      color_map: [
        '808080',
        'Gray',
        'FFFFFF',
        'White',
        'FF0000',
        'Red',
        'FFFF00',
        'Yellow'
      ],
      help_tabs: ['shortcuts', 'keyboardnav'],
      readonly,
      max_height: 500
    }),
    [readonly]
  )

  const editorRef = useRef(null)
  const getContent = () =>
    editorRef.current ? editorRef.current.getContent() : ''

  return (
    <div className={`${className}`}>
      <Editor
        apiKey='qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc'
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={dataEditor}
        init={config}
        onEditorChange={(val) => {
          setDataEditor(getContent())
        }}
      />
    </div>
  )
}
