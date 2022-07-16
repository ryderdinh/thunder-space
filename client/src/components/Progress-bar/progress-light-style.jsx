import 'assets/css/progress.css'
import { useEffect, useState } from 'react'

function ProgressLightStyle({ now }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(now)
  }, [now])

  return (
    <div className='progress light-style'>
      <div className='progress-bar' style={{ width: `${width}%` }}></div>
    </div>
  )
}

export default ProgressLightStyle
