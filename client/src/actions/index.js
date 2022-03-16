//* IMPORT =============================================
import authApi from 'api/authApi'
import timekeepingApi from 'api/timekeepingApi'
import axios from 'axios'
import toast from 'react-hot-toast'
import callAPI from '../api/callAPI'
import { getCookie, setCookie } from '../units/cookieWeb'

//? CALL API============================================
export const actSignIn = (dataUser) => {
  loadingToast('Đang đăng nhập')

  return async (dispatch) => {
    let token = ''

    try {
      const res = await authApi.authentication(dataUser)
      res?.accessToken && (token = res.accessToken)
    } catch (error) {
      console.log(error)
      removeToast()
      toast.error('Vào không gian thất bại, vui lòng thử lại sau !')
    }

    if (token) {
      setCookie([{ key: 'token', value: token }])

      try {
        const res = await authApi.authorization(token)

        removeToast()

        //? Login success
        successToast('Đang dọn dẹp không gian...')

        setCookie([
          { key: 'id', value: res.data?._id.toString() },
          { key: 'token', value: token }
        ])

        Promise.all([
          await dispatch(setStaffInfomation(res.data)),
          await dispatch(actFetchTimeKeeping())
          // await dispatch(actFetchEvents())
        ]).then(() => {
          dispatch(setCheckLogin(true))
        })
      } catch (error) {
        removeToast()
        errorToast('Thất bại, kiểm tra lại tên đăng nhập hoặc mật khẩu của bạn')
      }
    } else {
      removeToast()
      errorToast('Thất bại, kiểm tra lại tên đăng nhập hoặc mật khẩu của bạn')
    }
  }
}

export const actFetchStaffInfomation = () => {
  const { id, token } = getCookie()

  return async (dispatch) => {
    const res = await callAPI(`users/${id}`, 'GET', null, {
      authorization: `Bearer ${token}`
    })

    res && dispatch(setStaffInfomation(res.staffInfo))
  }
}

export const actFetchDataTableOfWork = () => {
  const { id, token } = getCookie()

  return async (dispatch) => {
    const res = await callAPI(`table/${id}`, 'GET', null, {
      authorization: `Bearer ${token}`
    })

    res && dispatch(getDataTimesheets(res.data))
  }
}

export const actFetchTimeKeeping = () => {
  return async (dispatch) => {
    await dispatch(setLoadingTimeKeeping())

    const res = await timekeepingApi.get()

    res.status === 200 &&
      Promise.all([
        await dispatch(setDataTimeKeeping(res.data)),
        await dispatch(setTimeKeeping(res.data))
      ])
  }
}

export const actSendLocationToServer = (location) => {
  loadingToast('Đang chấm công')

  return async (dispatch) => {
    try {
      await timekeepingApi.sendLocation(location)

      removeToast()

      dispatch(actFetchTimeKeeping())
      successToast('Chấm công thành công')
    } catch (error) {
      removeToast()

      const errorResult = await JSON.parse(error.request.response)
      switch (errorResult.error) {
        case 'try after 5 minutes': {
          errorToast('Bạn vừa chấm công, thử lại sau!')
          break
        }
        case 'you are far from company': {
          errorToast('Khoảng cách chấm công quá xa!')
          break
        }
        default:
          errorToast('Lỗi')
          break
      }
    }
  }
}

export const actFetchEvents = () => {
  const { token } = getCookie()

  return async (dispatch) => {
    const res = await callAPI(`event`, 'GET', null, {
      authorization: `Bearer ${token}`
    })

    res && dispatch(setEvents(res))
  }
}

export const actSendReport = (data) => {
  const { id, token } = getCookie()

  loadingToast('Đang gửi yêu cầu')

  return async () => {
    const res = await callAPI(`user/storeReport/${id}`, 'POST', data, {
      authorization: `Bearer ${token}`
    })

    if (!res) {
      removeToast()
      errorToast('Gửi thất bại, vui lòng thử lại sau!')
    } else {
      switch (res?.data?.status) {
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

  id && token && loadingToast('Đang đăng nhập lại...')

  if (!id && !token) {
    return (dispatch) => {
      dispatch(setCheckLogin(false))
    }
  }

  return async (dispatch) => {
    try {
      const res = await authApi.authorization(token)

      Promise.all([
        await dispatch(setStaffInfomation(res.data)),
        await dispatch(actFetchTimeKeeping())
        // await dispatch(actFetchEvents())
      ]).then(async () => {
        setCookie([
          { key: 'id', value: res.data._id.toString() },
          { key: 'token', value: token }
        ])
        removeToast()
        await dispatch(setCheckLogin(true))
        successToast('Chào mừng quay trở lại')
      })
    } catch (error) {
      removeToast()
      await dispatch(setCheckLogin(false))
      errorToast('Bạn cần đăng nhập lại')
    }
  }
}

export const actChangePassword = (data) => {
  loadingToast('Đang xử lí yêu cầu...')
  const { id, token } = getCookie()
  return async () => {
    const res = await callAPI(`change-password/${id}`, 'PUT', data, {
      authorization: `Bearer ${token}`
    })
    removeToast()

    if (res) {
      switch (res?.data?.status) {
        case 'Change password successfully': {
          successToast('Đổi mật khẩu thành công')
          break
        }
        case 'New password is invalid': {
          errorToast('Mật khẩu mới phải trên 5 kí tự')
          break
        }
        case 'Wrong old password': {
          errorToast('Mật khẩu cũ không đúng')
          break
        }
        case 'New password is same your current password': {
          errorToast('Mật khẩu mới không được trùng với mật khẩu cũ')
          break
        }
        default:
          break
      }
    }
  }
}

export const actCreateProject = (data) => {
  loadingToast('Đang xử lí yêu cầu...')
  const { id, token } = getCookie()
  return async (dispatch) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `https://hrmadmin.herokuapp.com/api/createProject/${id}`,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        data
      })
      removeToast()
      if (res?.data?.data) {
        successToast('Tạo dự án thành công')
        dispatch(closePopup())
      } else {
        errorToast('Tạo dự án thất bại')
        throw new Error('Failed')
      }
    } catch (error) {
      removeToast()
      errorToast('Tạo dự án thất bại')
    }
  }
}

export const actFetchProject = (data) => {
  // loadingToast("Đang lấy dữ liệu...");
  const { id, token } = getCookie()
  let _param = ''
  if (data) {
    for (const item of data) {
      _param = `projectCode=${item}`
    }
    _param = '?' + _param
  }
  return async (dispatch) => {
    try {
      const res = await axios({
        method: 'GET',
        url: `https://hrmadmin.herokuapp.com/api/projectInfo/${id}${_param}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      let data = res.data

      if (data?.status) {
        errorToast(`${data.status}`)
      } else {
        dispatch(setDataProject(data))

        if (!data) {
          dispatch(
            setWorkflow({
              workflowName: 'Tất cả',
              workflowType: 'project',
              workflowId: ''
            })
          )
        } else {
          dispatch(
            setWorkflow({
              workflowName: data[0].projectName,
              workflowType: 'project',
              workflowId: data[0].projectCode
            })
          )
        }
      }
    } catch (error) {
      errorToast(`Lỗi không xác định`)
    }
  }
}

export const actCreateIssue = (wid, data) => {
  loadingToast('Đang xử lí yêu cầu...')
  const { id, token } = getCookie()

  return async (dispatch) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `https://hrmadmin.herokuapp.com/api/createIssue/${id}/${wid}`,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        data
      })

      removeToast()

      if (res?.data?.data) {
        successToast('Tạo issue thành công')
        dispatch(closePopup())
      } else errorToast('Tạo issue thất bại')
    } catch (error) {
      errorToast('Tạo issue thất bại')
    }
  }
}

export const toggleTest = () => {
  return (dispatch) => {
    dispatch(toggleActiveSidebar())
  }
}

//? TOAST
const errorToast = toast.error
const successToast = toast.success
const loadingToast = (content) => {
  toast.loading(content)
}
const removeToast = () => toast.remove(loadingToast())

//TODO: ACTION TO REDUCER ================================
export const toggleActiveSidebar = (payload) => ({
  type: 'TOGGLE_ACTIVE_SIDEBAR',
  payload
})

export const getLocation = () => ({
  type: 'TIME_KEEPING'
})

export const getDataTimesheets = (payload) => ({
  type: 'GET_DATA_TIMESHEETS',
  payload
})

export const setDataTimesheetsDetail = (payload) => ({
  type: 'SET_DATA_TIMESHEETS_DETAIL',
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

export const setEvents = (payload) => ({
  type: 'SET_EVENTS',
  payload
})

export const setPopup = (payload) => ({
  type: 'SET_POPUP',
  payload
})

export const closePopup = () => ({
  type: 'CLOSE_POPUP'
})

export const setLoading = (payload) => ({
  type: 'SET_LOADING',
  payload
})

export const finishLoading = () => ({
  type: 'FINISH_LOADING'
})

export const setDataProject = (payload) => ({
  type: 'SET_DATA_PROJECT',
  payload
})

export const setInitalProject = () => ({
  type: 'SET_INITAL_PROJECT'
})

export const setDataIssue = (payload) => ({
  type: 'SET_DATA_ISSUE',
  payload
})

export const setWorkflow = (payload) => ({
  type: 'SET_WORKFLOW',
  payload
})
