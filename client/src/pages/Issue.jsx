import Issue from 'components/Issue/Issue'
import { IssueSetting } from 'components/Issue/IssueSetting'
import Layout from 'components/Layouts/Layout'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import ViewMain from 'components/Main/ViewMain/ViewMain'
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
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>
          <ViewBox>{!type ? <Issue /> : <IssueSetting />}</ViewBox>
        </ViewMain>
      </Main>
    </Layout>
  )
}
