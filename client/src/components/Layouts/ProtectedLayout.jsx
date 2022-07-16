import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import React from 'react'
import Layout from './Layout'

const ProtectedLayout = ({ path, children }) => {
  return (
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>{children}</ViewMain>
      </Main>
    </Layout>
  )
}

export default ProtectedLayout
