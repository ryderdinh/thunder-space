import clsx from 'clsx'
import ClipboardIcon from 'components/Icon/ClipboardIcon'

const { useState, useEffect } = require('react')

const CopyButton = ({ value }) => {
  let [copyCount, setCopyCount] = useState(0)
  let copied = copyCount > 0

  useEffect(() => {
    if (copyCount > 0) {
      let timeout = setTimeout(() => setCopyCount(0), 1000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [copyCount])

  return (
    <button
      type='button'
      className={clsx(
        'group/button relative overflow-hidden rounded-5 py-1 pl-2 pr-3 text-2xs font-medium opacity-100 backdrop-blur transition',
        copied
          ? 'bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20'
          : 'bg-white/2.5 hover:bg-white/5'
      )}
      onClick={() => {
        window.navigator.clipboard.writeText(value).then(() => {
          setCopyCount((count) => count + 1)
        })
      }}
    >
      <span
        aria-hidden={copied}
        className={clsx(
          'pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300',
          copied && '-translate-y-1.5 opacity-0'
        )}
      >
        <ClipboardIcon
          className='group-hover/button:stroke-zinc-400 h-5 w-5 fill-zinc-500/20 
          stroke-zinc-500 transition-colors'
        />
        Copy
      </span>
      <span
        aria-hidden={!copied}
        className={clsx(
          'pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300',
          !copied && 'translate-y-1.5 opacity-0'
        )}
      >
        Copied!
      </span>
    </button>
  )
}

export default CopyButton
