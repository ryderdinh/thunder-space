import EditorPreview from 'components/Editor/EditorPreview'
import TinyEditor from 'components/Editor/TinyEditor'

export default function IssueDescription({
  content,
  className = '',
  onChange,
  show
}) {
  return (
    <div className={`${className} w-full text-sm text-neutral-50`}>
      <TinyEditor
        dataEditor={content}
        setDataEditor={onChange}
        className={`${show ? 'block' : 'hidden'}`}
      />

      {!show && <EditorPreview content={content} />}
    </div>
  )
}
