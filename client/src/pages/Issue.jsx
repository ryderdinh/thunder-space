import Issue from 'components/Issue/Issue'
import { IssueSetting } from 'components/Issue/IssueSetting'
import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import { useEffect, useState } from 'react'

const defaultPath = 'issue'

export default function IssuePage({ type = '' }) {
  const [path, setPath] = useState(defaultPath)

  useEffect(() => {
    document.title = `Issue ${type}`
  }, [type])

  useEffect(() => {
    type && setPath(`${defaultPath}-${type}`)
  }, [type])

  return (
    <ProtectedLayout path={path}>
      <ViewBox className='h-full' classNameCol='h-full'>
        {!type ? <Issue /> : <IssueSetting />}
      </ViewBox>
    </ProtectedLayout>
  )
}
