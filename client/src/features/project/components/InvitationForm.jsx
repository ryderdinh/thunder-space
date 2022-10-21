import { projectApi } from 'api'
import ButtonDanger from 'components/Button/ButtonDanger'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import { useFetch } from 'hooks'
import { useHistory } from 'react-router-dom'
import { capitalizeFirstLetter } from 'utilities'
import { errorToast, successToast } from 'utilities/toast'

const InvitationForm = ({ id, content }) => {
  const fetchApi = useFetch()
  const history = useHistory()

  const onAcceptSuccess = () => {
    successToast('Invitation accepted')
    history.push(`/projects/${id}`)
  }
  const onRejectSuccess = () => {
    successToast('Invitation rejected')
    history.goBack()
  }
  const onError = (error) => {
    errorToast(error)
  }

  const acceptInvite = () => {
    fetchApi(projectApi.acceptInvite(id), onAcceptSuccess, onError)
  }

  const rejectInvite = () => {
    fetchApi(projectApi.rejectInvite(id), onRejectSuccess, onError)
  }

  return (
    <div
      className='w-96 max-w-full divide-y divide-neutral-600/50 
      rounded-md border border-neutral-600/50 bg-neutral-800/80
      pb-2'
    >
      <div className='px-5 py-2'>
        <h5 className='text-base font-bold text-neutral-50/90'>
          Invite to join!
        </h5>
      </div>

      <div className='space-y-4 px-5 py-2'>
        <p className='text-sm text-neutral-200/90'>
          {capitalizeFirstLetter(content)}
        </p>

        <div className='flex items-center justify-end space-x-2'>
          <ButtonSuccess onClick={acceptInvite}>Accept</ButtonSuccess>
          <ButtonDanger onClick={rejectInvite}>Reject</ButtonDanger>
        </div>
      </div>
    </div>
  )
}

export default InvitationForm
