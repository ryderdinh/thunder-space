import { useLocation } from 'react-router-dom'
import InvitationForm from './components/InvitationForm'

const ProjectInvitation = () => {
  const location = useLocation()

  return (
    <div className='flex w-full items-center justify-center'>
      <InvitationForm
        id={location.state?.data?.pid || null}
        content={location.state?.content || ''}
      />
    </div>
  )
}

export default ProjectInvitation
