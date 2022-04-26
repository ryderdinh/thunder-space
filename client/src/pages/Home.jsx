import Layout from 'components/Layouts/Layout'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import Event from 'components/Main/ViewMain/Event'
import ListTimeKeeping from 'components/Main/ViewMain/ListTimeKeeping'
import TimeKeeping from 'components/Main/ViewMain/TimeKeeping'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import ViewBoxName from 'components/Main/ViewMain/ViewBoxName'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import { useEffect, useState } from 'react'
import variantGlobal from 'units/variantGlobal'

export default function Home() {
  const [path] = useState('home')

  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>
          <ViewBox>
            <ViewBoxName name={'Chấm công'} />
            <TimeKeeping variants={variantGlobal({ type: 1, addValue: 0 })} />
            <ListTimeKeeping
              variants={variantGlobal({ type: 1, addValue: 0.3 })}
            />
          </ViewBox>
          <ViewBox>
            <ViewBoxName name={'Sự kiện'} />
            <Event variants={variantGlobal({ type: 1, addValue: 0.6 })} />
          </ViewBox>
        </ViewMain>
      </Main>
    </Layout>
  )
}
