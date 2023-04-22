import todoApi from 'api/todoApi'
import {
  ADD_TODOS_ITEM,
  REMOVE_TODOS_ITEM,
  SET_TODOS_DATA,
  SET_TODOS_DATA_ITEM,
  SET_TODOS_ERROR,
  SET_TODOS_LOADING,
  UPDATE_TODOS_DATA
} from 'constants/action'
import { convertTodoDataByStatus } from 'utilities/convert'

//? Action
export const actCreateTodo = (
  title,
  description,
  status = 'todo',
  pin = false,
  onSuccess,
  onError
) => {
  return async () => {
    try {
      const res = await todoApi.createTodo({
        title,
        description,
        pin,
        status
      })
      onSuccess && onSuccess(res.data._id)
    } catch (error) {
      console.error(error)
      onError && onError(error)
    }
  }
}

export const actFetchTodos = (onSuccess) => {
  return async (dispatch) => {
    await dispatch(setTodosLoading())

    try {
      const res = await todoApi.getTodos()
      await dispatch(
        setTodosData({
          todo: {
            ...convertTodoDataByStatus(res.data, 'todo')
          },
          doing: {
            ...convertTodoDataByStatus(res.data, 'doing')
          },
          completed: {
            ...convertTodoDataByStatus(res.data, 'completed')
          }
        })
      )
      onSuccess && onSuccess(res.data)
    } catch (error) {
      await dispatch(setTodosError(error.message))
    }
  }
}

export const actUpdateIndexTodosLocal = (type, data, onSuccess) => {
  return async (dispatch) => {
    try {
      await dispatch(
        updateTodosData({
          colName: type,
          data
        })
      )
      onSuccess && onSuccess()
    } catch (error) {
      console.error(error)
    }
  }
}

export const actUpdateIndexTodos = (data, currentData) => {
  return async (dispatch) => {
    await dispatch(setTodosLoading())
    try {
      await todoApi.updateIndexTodo(data.map((item) => ({ tid: item })))
    } catch (error) {
      console.error(error)
      await dispatch(setTodosError(error.message))
      Promise.all([
        await dispatch(
          updateTodosData({ colName: 'todo', data: currentData['todo'] })
        ),
        await dispatch(
          updateTodosData({ colName: 'doing', data: currentData['doing'] })
        ),
        await dispatch(
          updateTodosData({
            colName: 'completed',
            data: currentData['completed']
          })
        )
      ])
    }
  }
}

export const actUpdateTodoItem = (
  type,
  id,
  data,
  oldData,
  onPending,
  onSuccess,
  onError
) => {
  return async (dispatch) => {
    if (type !== data?.status) {
      await dispatch(
        removeTodosItems({
          colName: type,
          id
        })
      )
      await dispatch(addTodosItems({ colName: data?.status, data }))
    } else {
      await dispatch(
        setTodosDataItems({
          colName: type,
          id,
          data
        })
      )
    }
    onPending && onPending()

    try {
      await todoApi.updateTodoItem(id, data)
      onSuccess && onSuccess()
    } catch (error) {
      onError && onError(error.message)
      await dispatch(setTodosError(error.message))
      await dispatch(
        setTodosDataItems({
          colName: type,
          id,
          oldData
        })
      )
      await dispatch(actFetchTodos())
    }
  }
}

export const actDeleteTodoItem = (type, id, onSuccess, onError) => {
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
      onSuccess && onSuccess()
    } catch (error) {
      await dispatch(setTodosError(error.message))
      onError && onError(error)
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
  type: SET_TODOS_DATA_ITEM,
  payload
})
export const addTodosItems = ({ colName, data }) => ({
  type: ADD_TODOS_ITEM,
  payload: { colName, data }
})
export const removeTodosItems = (payload) => ({
  type: REMOVE_TODOS_ITEM,
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
