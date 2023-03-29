import { actUpdateTodoItem } from 'actions/todos'
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
  return { findCardById, updateFlag }
}

export default useTodo
