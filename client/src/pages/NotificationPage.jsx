import 'assets/css/Wf.css'
import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import { Notification } from 'features'
import { useEffect } from 'react'

export default function NotificationPage() {
  const path = 'notification'

  useEffect(() => {
    document.title = 'Notification'
  }, [])

  return (
    <ProtectedLayout path={path}>
      <ViewBox className='h-full' classNameCol='h-full'>
        <Notification />
      </ViewBox>
    </ProtectedLayout>
  )
}
