import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const useIsMe = (id) => {
  const { _data: profile } = useSelector((state) => state._staffInfomation)

  const isMe = useMemo(() => id === profile._id, [id, profile._id])

  return isMe
}

export default useIsMe
