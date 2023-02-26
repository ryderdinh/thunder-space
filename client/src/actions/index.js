//* IMPORT =============================================
import {
  authApi,
  eventApi,
  issueApi,
  notificationApi,
  projectApi,
  timekeepingApi,
  userApi
} from 'api'
import toast from 'react-hot-toast'
import { getCookie, removeCookie, setCookie } from '../units/cookieWeb'

//? CALL API============================================
export const actSignIn = (dataUser) => {
  removeToast()
  loadingToast('Checking account...')

  return async (dispatch) => {
    let token = ''

    try {
      const res = await authApi.authentication(dataUser)
      res?.data?.accessToken && (token = res.data.accessToken)
    } catch (error) {
      removeToast()
      toast.error('Failed, try again later!')
      await dispatch(setCheckLogin(false))
    }

    if (token) {
      setCookie([{ key: 'token', value: token }])

      try {
        const res = await authApi.authorization(token)

        removeToast()

        //? Login success
        successToast('Cleaning up the space...')

        setCookie([
          { key: 'id', value: res.data?._id.toString() },
          { key: 'token', value: token }
        ])

        Promise.all([
          await dispatch(setStaffData(res.data)),
          await dispatch(actFetchTimeKeeping())
          // await dispatch(actFetchEvents())
        ]).then(() => {
          window.localStorage.setItem('thunder-space-login', 'true')
          dispatch(setCheckLogin(true))
        })
      } catch (error) {
        window.localStorage.setItem('thunder-space-login', 'false')
        removeToast()
        errorToast('Failed, double-check your login information')
      }
    } else {
      window.localStorage.setItem('thunder-space-login', 'false')
      removeToast()
      errorToast('Failed, double-check your login information')
    }
  }
}

export const actLogout = (type, onSuccess) => {
  loadingToast('Logging out...')

  return async () => {
    try {
      await authApi.logout(type)

      removeToast()
      removeCookie('all')
      successToast('Successful logout!')

      onSuccess()
    } catch (error) {
      removeToast()
      errorToast('Failed, logout failed!')
    }
  }
}

export const actFetchStaffInfomation = () => {
  return async (dispatch) => {
    dispatch(setStaffLoading(true))

    try {
      const res = await userApi.getProfile()

      dispatch(setStaffData(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const actFetchTimeKeeping = () => {
  return async (dispatch) => {
    await dispatch(setLoadingTimeKeeping())

    try {
      const res = await timekeepingApi.get()
      await dispatch(setDataTimeKeeping(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const actFetchTimesheets = () => {
  return async (dispatch) => {
    await dispatch(setLoadingTimesheets())

    try {
      const res = await timekeepingApi.get()
      await dispatch(setDataTimesheets(res.data))
    } catch (error) {
      await dispatch(setErrorTimesheets(error.message))

      console.log(error)
    }
  }
}

export const actSendLocationToServer = (location, onSuccess, onError) => {
  return async (dispatch) => {
    try {
      await timekeepingApi.sendLocation(location)
      onSuccess()
      dispatch(actFetchTimeKeeping())
    } catch (error) {
      onError()

      switch (error.message) {
        case 'try after 5 minutes': {
          errorToast('Try after 5 minutes')
          break
        }
        case 'you are far from company': {
          errorToast('You are far from company')
          break
        }
        default:
          errorToast('Error')
          break
      }
    }
  }
}

export const actFetchEvents = () => {
  return async (dispatch) => {
    await dispatch(setEventsLoading(true))

    try {
      const res = await eventApi.get()
      dispatch(setEventsData(res.data))
    } catch (error) {
      await dispatch(setEventsError(error.response.error))
    }
  }
}

export const actSendReport = (data) => {
  const { id, token } = getCookie()

  loadingToast('Đang gửi yêu cầu')

  return async () => {
    if (true) {
      removeToast()
      errorToast('Gửi thất bại, vui lòng thử lại sau!')
    } else {
      switch (true) {
        case 'Report complete': {
          successToast('Gửi thành công')
          break
        }
        case 'Canot report': {
          errorToast('Gửi thất bại, vui lòng thử lại sau!')
          break
        }
        default:
          break
      }
    }
  }
}

export const actRefreshPage = () => {
  const { id, token } = getCookie()

  id && token && loadingToast('Logging in again...')

  if (!id && !token) {
    return (dispatch) => {
      dispatch(setCheckLogin(false))
    }
  }

  return async (dispatch) => {
    try {
      const res = await authApi.authorization(token)

      Promise.all([
        await dispatch(setStaffData(res.data)),
        await dispatch(actFetchTimeKeeping())
      ]).then(async () => {
        setCookie([
          { key: 'id', value: res.data._id.toString() },
          { key: 'token', value: token }
        ])
        removeToast()
        window.localStorage.setItem('thunder-space-login', 'true')
        await dispatch(setCheckLogin(true))
        successToast('Welcome to back')
      })
    } catch (error) {
      console.log(error)
      window.localStorage.setItem('thunder-space-login', 'false')
      removeToast()
      await dispatch(setCheckLogin(false))
      errorToast('Please log in again')
    }
  }
}

export const actChangePassword = (data, onSuccess, onError) => {
  loadingToast('Pending...')
  return async () => {
    try {
      await userApi.changePassword(data)
      onSuccess()
    } catch (error) {
      onError(error.message)
    } finally {
      removeToast()
    }
  }
}

export const actCreateProject = (data, uMail, onSuccess, onError) => {
  let sbData = data

  if (data?.managers)
    sbData = {
      ...data,
      managers: data.managers.filter((item) => item !== uMail)
    }
  else sbData = { ...data, managers: [] }

  return async (dispatch) => {
    try {
      const res = await projectApi.create(sbData)

      await dispatch(
        setInitialProject({
          name: data.name
        })
      )
      onSuccess(res.data._id)
    } catch (error) {
      onError(error)
    }
  }
}

export const actFetchProject = (pid, onSuccess, onError) => {
  return async (dispatch) => {
    await dispatch(setProjectLoading(true))

    try {
      const res = await projectApi.get(pid)
      const issueSorted = res.data.issue.sort((a, b) => b.updateAt - a.updateAt)

      await dispatch(setDataProject({ ...res.data, issue: issueSorted }))

      onSuccess && onSuccess()
    } catch (error) {
      Promise.all([
        await dispatch(setDataProject(null)),
        await dispatch(setProjectError(error.message))
      ])

      onError && onError(error)
    } finally {
      setTimeout(() => {
        dispatch(setProjectLoading(false))
      }, 1000)
    }
  }
}

export const actDeleteProject = (pid, callback) => {
  return async () => {
    try {
      await projectApi.delete(pid)
      callback()
    } catch (error) {
      errorToast(error.message)
    }
  }
}

export const actQueryProject = (query = null) => {
  return async (dispatch) => {
    await dispatch(setProjectLoading(true))

    try {
      const res = await projectApi.gets(query)
      const sortData = [...res.data].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )

      await dispatch(setDataProjects(sortData))
    } catch (error) {
      await dispatch(setProjectError(error.message))
    }
  }
}

export const actCreateIssue = (pid, data, callback) => {
  return async () => {
    try {
      const res = await issueApi.create(pid, data)
      callback(res.data._id)
    } catch (error) {
      errorToast(error.message)
    }
  }
}

export const actQueryIssue = (iid, callback) => {
  return async (dispatch) => {
    await dispatch(setIssueLoading(true))

    try {
      const res = await issueApi.get(iid)

      await dispatch(setDataIssue(res.data))
    } catch (error) {
      const err = error.message
      dispatch(setIssueError(err))
    }
  }
}

export const actUpdateIssue = (iid, data, onSuccess, onError) => {
  return async (dispatch) => {
    try {
      const res = await issueApi.update(iid, data)
      await dispatch(setDataIssue(res.data))
      onSuccess()
    } catch (error) {
      const err = error.message
      onError(err)
      errorToast(err, { id: 'update-issue' })
      dispatch(setIssueError(err))
    }
  }
}

export const actUpdateStatusIssue = (iid, status, onSuccess, onError) => {
  return async (dispatch) => {
    try {
      await issueApi.updateStatus(iid, status)
      onSuccess()
    } catch (error) {
      const err = error.message
      onError(err)
      errorToast(err, { id: 'update-issue' })
      dispatch(setIssueError(err))
    }
  }
}

export const actDeleteIssue = (iid, callback) => {
  return async (dispatch) => {
    try {
      const res = await issueApi.delete(iid)

      successToast('Issue deleted')
      await dispatch(setDataIssue(res.data))
      callback()
    } catch (error) {
      const err = error.message

      errorToast(err)
      dispatch(setIssueError(err))
    }
  }
}

export const actGetAllUsers = () => {
  return async (dispatch) => {
    await dispatch(setUsersLoading(true))

    try {
      const res = await userApi.getUsers()

      await dispatch(setUsersData(res.data))
    } catch (error) {
      dispatch(setUsersLoading(false))
    }
  }
}

export const actGetNotification = (p, onSuccess, onError) => {
  return async (dispatch) => {
    await dispatch(setNotificationsLoading(true))

    try {
      const res = await notificationApi.get(p)

      await dispatch(setNotificationsData(res?.data || []))
      onSuccess(res?.data)
    } catch (error) {
      dispatch(setNotificationsError(error?.message || 'Error'))
      onError && onError(error?.message)
    }
  }
}

// export const toggleTest = () => {
//   return (dispatch) => {
//     dispatch(toggleActiveSidebar())
//   }
// }

//? TOAST
const errorToast = toast.error
const successToast = toast.success

const loadingToast = (content) => {
  toast.loading(content)
}
const removeToast = () => toast.remove(loadingToast())

//TODO: ACTION TO REDUCER ================================
export const setLoadingTimesheets = (payload) => ({
  type: 'SET_LOADING_TIMESHEETS',
  payload
})

export const setErrorTimesheets = (payload) => ({
  type: 'SET_ERROR_TIMESHEETS',
  payload
})

export const setDataTimesheets = (payload) => ({
  type: 'SET_DATA_TIMESHEETS',
  payload
})

export const setLoadingTimeKeeping = () => ({
  type: 'SET_TIME_KEEPING_LOADING'
})

export const setDataTimeKeeping = (payload) => ({
  type: 'SET_DATA_TIME_KEEPING',
  payload
})

export const setTimeKeeping = (payload) => ({
  type: 'SET_TIME_KEEPING',
  payload
})

export const setCheckLogin = (payload) => ({
  type: 'SET_CHECK_ID',
  payload
})

export const setStaffInfomation = (payload) => ({
  type: 'SET_STAFF_INFOMATION',
  payload
})

export const setStaffData = (payload) => ({
  type: 'SET_STAFF_DATA',
  payload
})

export const setStaffLoading = (payload) => ({
  type: 'SET_STAFF_LOADING',
  payload
})

export const setStaffERROR = (payload) => ({
  type: 'SET_STAFF_ERROR',
  payload
})

export const setEventsData = (payload) => ({
  type: 'SET_EVENTS_DATA',
  payload
})

export const setEventsLoading = (payload) => ({
  type: 'SET_EVENTS_LOADING',
  payload
})

export const setEventsError = (payload) => ({
  type: 'SET_EVENTS_ERROR',
  payload
})

// PROJECT ACTION ================================
export const setProjectLoading = (payload) => ({
  type: 'SET_PROJECT_LOADING',
  payload
})
export const setProjectError = (payload) => ({
  type: 'SET_PROJECT_ERROR',
  payload
})

export const setInitialProject = (payload) => ({
  type: 'SET_INITIAL_PROJECT',
  payload
})
//? Detail project
export const setDataProject = (payload) => ({
  type: 'SET_DATA_PROJECT',
  payload
})
//? All project
export const setDataProjects = (payload) => ({
  type: 'SET_DATA_PROJECTS',
  payload
})

export const setIssueLoading = (payload) => ({
  type: 'SET_ISSUE_LOADING',
  payload
})
export const setIssueError = (payload) => ({
  type: 'SET_ISSUE_ERROR',
  payload
})
export const setDataIssue = (payload) => ({
  type: 'SET_DATA_ISSUE',
  payload
})
export const setInitialIssue = (payload) => ({
  type: 'SET_INITIAL_ISSUE',
  payload
})

export const setWorkflow = (payload) => ({
  type: 'SET_WORKFLOW',
  payload
})

// USERS ACTION ======================================
export const setUsersLoading = (payload) => ({
  type: 'SET_USERS_LOADING',
  payload
})

export const setUsersError = (payload) => ({
  type: 'SET_USERS_ERROR',
  payload
})

export const setUsersData = (payload) => ({
  type: 'SET_USERS_DATA',
  payload
})

// NOTIFICATIONS ACTION ======================================
export const setNotificationsLoading = (payload) => ({
  type: 'SET_NOTIFICATION_LOADING',
  payload
})

export const setNotificationsData = (payload) => ({
  type: 'SET_NOTIFICATION_DATA',
  payload
})

export const addOrModifiedNotificationsData = (payload) => ({
  type: 'ADD/MODIFIED_NOTIFICATION_DATA',
  payload
})

export const setNotificationsError = (payload) => ({
  type: 'SET_NOTIFICATION_ERROR',
  payload
})

export const setNotificationsRead = (payload) => ({
  type: 'SET_NOTIFICATION_READ',
  payload
})

export const setNotificationsReadAll = () => ({
  type: 'SET_NOTIFICATION_READ_ALL'
})
