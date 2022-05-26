import Layout from 'components/Layouts/Layout'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import Event from 'components/Main/ViewMain/Event'
import ListTimeKeeping from 'components/Main/ViewMain/ListTimeKeeping'
import TimeKeeping from 'components/Main/ViewMain/TimeKeeping'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import ViewBoxName from 'components/Main/ViewMain/ViewBoxName'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import { useEffect } from 'react'
import variantGlobal from 'units/variantGlobal'

const path = 'home'

export default function Home() {
  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>
          <ViewBox>
            <ViewBoxName name={'Attendance'} />
            <TimeKeeping variants={variantGlobal(1, 0)} />
            <ListTimeKeeping variants={variantGlobal(1, 0.3)} />
          </ViewBox>
          <ViewBox>
            <ViewBoxName name={'Event'} />
            <Event variants={variantGlobal(1, 0.6)} />
          </ViewBox>
        </ViewMain>
      </Main>
    </Layout>
  )
}
