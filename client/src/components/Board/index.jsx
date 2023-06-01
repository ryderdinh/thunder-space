import { Excalidraw } from '@excalidraw/excalidraw'
import initialData from 'data/board'
import { useRef, useState } from 'react'

const Board = () => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null)
  const initialStatePromiseRef = useRef({ promise: initialData })

  return (
    <div className='h-[500px] w-full'>
      <Excalidraw />
    </div>
  )
}

export default Board
