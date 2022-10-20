import ButtonSuccess from 'components/Button/ButtonSuccess'

const NotificationAction = ({ setRead }) => {
  return (
    <div className='flex items-center space-x-1'>
      <ButtonSuccess
        onClick={() => {
          setRead(null, true)
        }}
      >
        Mark all as read
      </ButtonSuccess>
    </div>
  )
}

export default NotificationAction
