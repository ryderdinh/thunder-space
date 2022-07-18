import 'assets/css/Wf.css'
import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import WorkflowContainer from 'components/Workfow/WorkflowContainer'
import { useEffect } from 'react'

export default function Work() {
  const path = 'work'

  useEffect(() => {
    document.title = 'Works'
  }, [])

  return (
    <ProtectedLayout path={path}>
      <ViewBox>
        <WorkflowContainer />
      </ViewBox>
    </ProtectedLayout>
  )
}
