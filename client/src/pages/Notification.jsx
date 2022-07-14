import 'assets/css/Wf.css'
import Layout from 'components/Layouts/Layout'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import { useEffect } from 'react'

export default function Notification() {
  const path = 'notification'

  useEffect(() => {
    document.title = 'Notification'
  }, [])

  return (
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>
          <ViewBox className='h-full' classNameCol='h-full'>
            
          </ViewBox>
        </ViewMain>
      </Main>
    </Layout>
  )
}
