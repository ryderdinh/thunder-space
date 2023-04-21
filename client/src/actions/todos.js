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
export const actCreateTodo = (
  title,
  description,
  status = 'todo',
  pin = false,
  onSuccess,
  onError
) => {
  return async (dispatch) => {
    await dispatch(setTodosLoading())

    try {
      await todoApi.createTodo({
        title,
        description,
        pin,
        status
      })
      onSuccess && onSuccess()
    } catch (error) {
      console.error(error)
      onError && onError(error)
    }
  }
}

export const actFetchTodos = () => {
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
    await dispatch(
      setTodosDataItems({
        colName: type,
        id,
        data
      })
    )

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
