import 'assets/css/Wf.css'
import Layout from 'components/Layouts/Layout'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import ProjectDetail from 'components/Project/ProjectDetail'
import { ProjectSetting } from 'components/Project/ProjectSetting'
import ProjectsOverview from 'components/Project/ProjectsOverview'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const defaultPath = 'project'

export default function ProjectPage({ type = '' }) {
  const [path, setPath] = useState(defaultPath)

  const pathName = useParams()

  useEffect(() => {
    document.title = 'Project ' + type
  }, [type])

  useEffect(() => {
    type && setPath(`${defaultPath}-${type}`)
  }, [type])

  return (
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>
          <ViewBox className='h-full' classNameCol='h-full'>
            {pathName?.pid && !type && <ProjectDetail />}

            {pathName?.pid && type === 'setting' && <ProjectSetting />}

            {!pathName?.pid && <ProjectsOverview />}
          </ViewBox>
        </ViewMain>
      </Main>
    </Layout>
  )
}
