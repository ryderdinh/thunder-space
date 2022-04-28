import 'assets/css/Wf.css'
import Layout from 'components/Layouts/Layout'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import ProjectDetail from 'components/Project/ProjectDetail'
import ProjectsOverview from 'components/Project/ProjectsOverview'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import variantGlobal from 'units/variantGlobal'

export default function Project() {
  const [path] = useState('project')

  const pathName = useParams()

  useEffect(() => {
    document.title = 'Project'
  }, [])

  return (
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>
          <ViewBox>
            {pathName?.pid && (
              <ProjectDetail
                variants={variantGlobal({ type: 2, addValue: 0 })}
              />
            )}

            {!pathName?.pid && (
              <ProjectsOverview
                variants={variantGlobal({ type: 2, addValue: 0 })}
              />
            )}
          </ViewBox>
        </ViewMain>
      </Main>
    </Layout>
  )
}
