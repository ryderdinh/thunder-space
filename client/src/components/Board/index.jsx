import {
  Excalidraw,
  WelcomeScreen,
  useHandleLibrary
} from '@excalidraw/excalidraw'
import initialData from 'data/board'
import { useCallback, useEffect, useRef, useState } from 'react'

const Board = () => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null)
  const data = useRef({})

  useHandleLibrary({ excalidrawAPI })

  const onLinkOpen = useCallback((element, event) => {
    const link = element?.link
    const { nativeEvent } = event.detail
    const isNewTab = nativeEvent.ctrlKey || nativeEvent.metaKey
    const isNewWindow = nativeEvent.shiftKey
    const isInternalLink =
      link.startsWith('/') || link.includes(window.location.origin)
    if (isInternalLink && !isNewTab && !isNewWindow) {
      // signal that we're handling the redirect ourselves
      event.preventDefault()
      // do a custom redirect, such as passing to react-router
      // ...
    }
  }, [])

  useEffect(() => {
    if (!excalidrawAPI) {
      return
    }

    excalidrawAPI.updateLibrary({ libraryItems: initialData.libraryItems })
  }, [excalidrawAPI])

  return (
    <div className='h-[500px] w-full'>
      <Excalidraw
        ref={(api) => setExcalidrawAPI(api)}
        initialData={data}
        theme='dark'
        onLinkOpen={onLinkOpen}
      >
        <WelcomeScreen>
          <WelcomeScreen.Hints.ToolbarHint>
            <p> ToolBar Hints </p>
          </WelcomeScreen.Hints.ToolbarHint>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.HelpHint />
        </WelcomeScreen>
      </Excalidraw>
    </div>
  )
}

export default Board
