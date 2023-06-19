import ButtonDanger from 'components/Button/ButtonDanger'
import ButtonNormalLoad from 'components/Button/ButtonNormalLoad'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import { useCallback } from 'react'

const ActionStatus = ({ status, role, loading, onChange }) => {
  const checkStatus = useCallback((value) => status === value, [status])

  const PendingBtn = useCallback(
    () => (
      <ButtonNormalLoad
        className='shrink grow basis-0 py-1 text-center 
        text-lg font-semibold'
        loading={loading.pending}
        size='mid'
        onClick={() => onChange('pending')}
      >
        Re open
      </ButtonNormalLoad>
    ),
    [loading.pending, onChange]
  )

  const StartBtn = useCallback(
    () => (
      <ButtonNormalLoad
        className='shrink grow basis-0 py-1 text-center 
        text-lg font-semibold'
        loading={loading.started}
        size='mid'
        onClick={() => onChange('started')}
      >
        Start
      </ButtonNormalLoad>
    ),
    [loading.started, onChange]
  )

  const RejectBtn = useCallback(
    () => (
      <ButtonDanger
        className='shrink grow basis-0 py-1 text-center 
        text-lg font-semibold'
        loading={loading.reject}
        size='mid'
        onClick={() => onChange('reject')}
      >
        Reject
      </ButtonDanger>
    ),
    [loading.reject, onChange]
  )

  const DoneBtn = useCallback(
    () => (
      <ButtonSuccess
        className='shrink grow basis-0 py-1 text-center 
        text-lg font-semibold'
        loading={loading.close}
        size='mid'
        onClick={() => onChange('done')}
      >
        Done
      </ButtonSuccess>
    ),
    [loading.close, onChange]
  )

  const CloseBtn = useCallback(
    () => (
      <ButtonDanger
        className='shrink grow basis-0 py-1 text-center 
        text-lg font-semibold'
        loading={loading.closed}
        size='mid'
        onClick={() => onChange('close')}
      >
        Close
      </ButtonDanger>
    ),
    [loading.closed, onChange]
  )

  return (
    <div className='space-y-2'>
      <div className='cursor-default select-none text-center font-bold'>
        {checkStatus('reject') && (
          <p className='py-4 text-red-500'>Rejected issue</p>
        )}
        {checkStatus('done') && (
          <p className='py-4 text-emerald-500'>Finished the assigned work</p>
        )}
        {checkStatus('close') && <p className='py-4 text-orange-500'>Closed</p>}
      </div>

      <div className='mt-3 flex w-full items-center gap-3'>
        {/* User is assignee, status is pending*/}
        {['assignee'].includes(role) && checkStatus('pending') && (
          <>
            {StartBtn()}
            {RejectBtn()}
          </>
        )}

        {/* User is bolh creator and assignee, status is pending*/}
        {['both'].includes(role) && checkStatus('pending') && StartBtn()}

        {/* User is assignee (both except creator) and status is started*/}
        {['both', 'assignee'].includes(role) &&
          checkStatus('started') &&
          DoneBtn()}

        {/* User is creator (both except assignee) and status is reject or done*/}
        {['both', 'creator'].includes(role) &&
          (checkStatus('reject') || checkStatus('done')) &&
          PendingBtn()}

        {/* User is creator (both except assignee) and status is close*/}
        {['both', 'creator'].includes(role) &&
          checkStatus('close') &&
          PendingBtn()}

        {/* User is creator (both except assignee) and status isn't close*/}
        {['both', 'creator'].includes(role) &&
          !checkStatus('close') &&
          CloseBtn()}
      </div>
    </div>
  )
}

export default ActionStatus
