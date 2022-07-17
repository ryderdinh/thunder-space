import 'assets/css/Wf.css'
import Layout from 'components/Layouts/Layout'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import WorkflowContainer from 'components/Workfow/WorkflowContainer'
import { useEffect } from 'react'

export default function Workflow() {
  const path = 'workflow'

  useEffect(() => {
    document.title = 'Workflow'
  }, [])

  return (
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>
          <ViewBox>
            <WorkflowContainer />
          </ViewBox>
        </ViewMain>
      </Main>
    </Layout>
  )
}
