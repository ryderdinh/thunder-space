import Issue from 'components/Issue/Issue'
import Layout from 'components/Layouts/Layout'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import { useEffect } from 'react'

const path = 'issue'

export default function IssuePage() {
  useEffect(() => {
    document.title = 'Issue'
  }, [])

  return (
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>
          <ViewBox>
            <Issue />
          </ViewBox>
        </ViewMain>
      </Main>
    </Layout>
  )
}
