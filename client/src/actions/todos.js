import todoApi from 'api/todoApi'
import {
  SET_TODOS_DATA,
  SET_TODOS_DATA_IIEM,
  SET_TODOS_ERROR,
  SET_TODOS_LOADING,
  UPDATE_TODOS_DATA
} from 'constants/action'
import { convertTodoDataByStatus } from 'utilities/convert'

export const actFetchTimesheets = () => {
  return async (dispatch) => {
    await dispatch(setTodosLoading())

    try {
      const res = await todoApi.getTodos()
      await dispatch(
        setTodosData({
          data: {
            todos: {
              ...convertTodoDataByStatus(res.data, 'todo')
            },
            doing: {
              ...convertTodoDataByStatus(res.data, 'doing')
            },
            completed: {
              ...convertTodoDataByStatus(res.data, 'completed')
            }
          }
        })
      )
    } catch (error) {
      await dispatch(setTodosError(error.message))
    }
  }
}

export const setTodosData = (payload) => ({
  type: SET_TODOS_DATA,
  payload
})
export const updateTodosData = (payload) => ({
  type: UPDATE_TODOS_DATA,
  payload
})
export const setTodosDataItems = (payload) => ({
  type: SET_TODOS_DATA_IIEM,
  payload
})
export const setTodosLoading = (payload) => ({
  type: SET_TODOS_LOADING,
  payload
})
export const setTodosError = (payload) => ({
  type: SET_TODOS_ERROR,
  payload
})
