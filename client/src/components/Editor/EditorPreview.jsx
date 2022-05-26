import 'assets/css/Editor.css'
import { Markup } from 'interweave'

function EditorPreview({ content }) {
  return (
    <div className='editor-preview-ryder-app w-full'>
      <Markup content={content} />
    </div>
  )
}

export default EditorPreview
