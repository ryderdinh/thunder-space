import { actDeleteTodoItem, actUpdateTodoItem } from 'actions/todos'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useTodo = () => {
  const { _data } = useSelector((state) => state._todos)
  const dispatch = useDispatch()

  const findCardById = useCallback(
    (colType, todoId) =>
      _data[colType].cards.find((card) => card._id === todoId) || {},
    [_data]
  )

  const updateFlag = useCallback(
    async (colType, todoId, ...props) => {
      dispatch(
        actUpdateTodoItem(
          colType,
          todoId,
          {
            pin: !findCardById(colType, todoId).pin
          },
          {
            pin: findCardById(colType, todoId).pin
          },
          ...props
        )
      )
    },
    [dispatch, findCardById]
  )

  const deleteTodo = useCallback(
    async (colType, todoId, ...props) => {
      dispatch(actDeleteTodoItem(colType, todoId, ...props))
    },
    [dispatch]
  )

  const updateTodo = useCallback(
    async (colType, todoId, newData, ...props) => {
      dispatch(
        actUpdateTodoItem(
          colType,
          todoId,
          newData,
          findCardById(colType, todoId),
          ...props
        )
      )
    },
    [dispatch, findCardById]
  )

  return { findCardById, updateFlag, updateTodo, deleteTodo }
}

export default useTodo
