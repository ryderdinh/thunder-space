import IssueContainer from 'components/Issue/IssueContainer'
import Layout from 'components/Layouts/Layout'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import { useEffect, useState } from 'react'

export default function Issue() {
  const [path] = useState('issue')

  useEffect(() => {
    document.title = 'Issue'
  }, [])

  return (
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>
          <ViewBox>
            <IssueContainer />
          </ViewBox>
        </ViewMain>
      </Main>
    </Layout>
  )
}
