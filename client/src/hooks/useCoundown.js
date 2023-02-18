import { useEffect, useState } from 'react'

const useCoundown = (sec, onFinished) => {
  const [coundown, setCoundown] = useState()
  const [time, setTime] = useState({
    min: 0,
    sec: 0
  })

  useEffect(() => {
    const padTo2Digits = (num) => {
      return num.toString().padStart(2, '0')
    }

    let timeInterval = setInterval(() => {
      if (sec < 1) {
        onFinished()
        clearInterval(timeInterval)
        return
      }

      const minutes = Math.floor(sec / 60)
      const seconds = sec % 60

      setTime({ min: minutes, sec: seconds })
      setCoundown(`${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`)

      --sec
    }, 1000)

    return () => {
      clearInterval(timeInterval)
    }
  }, [onFinished, sec])

  return { coundown, time }
}

export default useCoundown
