import todoApi from 'api/todoApi'
import {
  REMOVE_TODOS_IIEM,
  SET_TODOS_DATA,
  SET_TODOS_DATA_IIEM,
  SET_TODOS_ERROR,
  SET_TODOS_LOADING,
  UPDATE_TODOS_DATA
} from 'constants/action'
import { convertTodoDataByStatus } from 'utilities/convert'

//? Action
export const actFetchTodos = () => {
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

export const actUpdateIndexTodos = (type, data) => {
  return async (dispatch) => {
    await dispatch(setTodosLoading())

    try {
      await todoApi.updateIndexTodo()
      await dispatch(updateTodosData({ colName: type, data }))
    } catch (error) {
      await dispatch(setTodosError(error.message))
    }
  }
}

export const actUpdateTodoItem = (type, id, data) => {
  return async (dispatch) => {
    await dispatch(setTodosLoading())

    try {
      await todoApi.updateTodoItem(id, data)
      await dispatch(
        setTodosDataItems({
          colName: type,
          id,
          data
        })
      )
    } catch (error) {
      await dispatch(setTodosError(error.message))
    }
  }
}

export const actDeleteTodoItem = (type, id) => {
  return async (dispatch) => {
    await dispatch(setTodosLoading())

    try {
      await todoApi.removeTodoItem(id)
      await dispatch(
        removeTodosItems({
          colName: type,
          id
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
export const removeTodosItems = (payload) => ({
  type: REMOVE_TODOS_IIEM,
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
