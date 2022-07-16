import {
  AnnotationIcon,
  BellIcon,
  SwitchVerticalIcon,
  UserGroupIcon
} from '@heroicons/react/solid'

const notificationLink = (data) => ({
  'invite-to-project': `/projects/invitation?pid=${data?.pid}`,
  'assign-to-issue': `/projects/issues/invitation?pid=${data?.pid}&iid=${data?.iid}`,
  'change-project': `/projects/${data?.pid}`,
  'change-issue': `/projects/${data?.pid}/${data?.iid}`
})

const notificationIcon = (type) => {
  const iconProps = {
    className: 'h-5 w-5'
  }

  switch (type) {
    case 'invite-to-project': {
      return <UserGroupIcon {...iconProps} />
    }

    case 'assign-to-issue': {
      return <AnnotationIcon {...iconProps} />
    }

    case 'change-project':
    case 'change-issue': {
      return <SwitchVerticalIcon {...iconProps} />
    }

    default:
      return <BellIcon {...iconProps} />
  }
}

const detectNotification = (type, data) => {
  return {
    icon: notificationIcon(type),
    link: notificationLink(data)[type]
  }
}

export default detectNotification
