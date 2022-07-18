import 'assets/css/Wf.css'
import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import ProjectDetail from 'components/Project/ProjectDetail'
import { ProjectSetting } from 'components/Project/ProjectSetting'
import ProjectsOverview from 'components/Project/ProjectsOverview'
import { ProjectInvitation } from 'features/project'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const defaultPath = 'project'
const pageName = {
  setting: 'Setting | Project',
  invitation: 'Invitation | Project',
  '': 'Projects'
}

export default function ProjectPage({ type = '' }) {
  const [path, setPath] = useState(defaultPath)

  const pathName = useParams()

  useEffect(() => {
    document.title = pageName[type] || 'Project'
  }, [type])

  useEffect(() => {
    type && setPath(`${defaultPath}-${type}`)
  }, [type])

  return (
    <ProtectedLayout path={path}>
      <ViewBox className='h-full' classNameCol='h-full'>
        {pathName?.pid && !type && <ProjectDetail />}

        {pathName?.pid && type === 'setting' && <ProjectSetting />}

        {!pathName?.pid && !type && <ProjectsOverview />}

        {type === 'invitation' && <ProjectInvitation />}
      </ViewBox>
    </ProtectedLayout>
  )
}
