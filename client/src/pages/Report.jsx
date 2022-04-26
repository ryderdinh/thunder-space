import Layout from 'components/Layouts/Layout'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import ReportForm from 'components/Main/ViewMain/ReportForm'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import ViewBoxName from 'components/Main/ViewMain/ViewBoxName'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import { useEffect, useState } from 'react'
import variantGlobal from 'units/variantGlobal'

export default function Report() {
  const [path] = useState('report')

  useEffect(() => {
    document.title = 'Report'
  }, [])

  return (
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>
          <ViewBox>
            <ViewBoxName
              name={'Form xin nghỉ phép'}
              variants={variantGlobal({ type: 2, addValue: 0 })}
            />
            <ReportForm />
          </ViewBox>
        </ViewMain>
      </Main>
    </Layout>
  )
}
