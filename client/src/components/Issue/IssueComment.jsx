import React, { useEffect, useRef, useState } from 'react'

function IssueComment({ className = '', data = [] }) {
  //? State
  const [inputComment, setInputComment] = useState('')
  const [rowComment, setRowComment] = useState(1)

  //? Create Ref
  const scrollEnd = useRef(null)

  //? Create Effect
  useEffect(() => {
    scrollToBottom()
  }, [])

  //? Create Fction
  const handleInput = (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        setInputComment('')
        setRowComment(1)
      }
    }
  }
  const scrollToBottom = () => {
    scrollEnd.current.scrollTo(
      0,
      scrollEnd.current.scrollHeight - scrollEnd.current.clientHeight
    )
  }

  return (
    <div
      className={`${className} w-full text-sm text-neutral-50`}
      ref={scrollEnd}
    >
      {(!data || !data?.length) && (
        <p className='w-full py-14 text-center text-xs text-neutral-500'>
          No comment
        </p>
      )}

      {(data || data.length) &&
        data.map((item, index) => (
          <div className='grid grid-cols-2 text-neutral-500' key={index}>
            <div className='flex items-center gap-2'>
              <img src={item.users[0].avatar} alt='Avatar user 1' />
              <p>{`${item.users[0].name} :`}</p>
            </div>

            <div className='font-bold'>
              <p>{`${item.action} `}</p>
            </div>

            {item.users[1] && (
              <div className='font-bold'>
                <p>{`${item.users[1].name} `}</p>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default IssueComment
