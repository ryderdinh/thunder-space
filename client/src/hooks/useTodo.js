import { actDeleteTodoItem, actUpdateTodoItem } from 'actions/todos'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useTodo = () => {
  const { _data } = useSelector((state) => state._todos)
  const dispatch = useDispatch()

  const findCard = useCallback(
    (colType, todoId) =>
      _data[colType].cards.find((card) => card._id === todoId) || {},
    [_data]
  )

  const findCardById = useCallback(
    (todoId) =>
      [
        ..._data.todo.cards,
        ..._data.doing.cards,
        ..._data.completed.cards
      ].find((card) => card._id === todoId) || {
        _id: '',
        title: '',
        description: '',
        status: '',
        pin: false
      },
    [_data]
  )

  const updateFlag = useCallback(
    async (colType, todoId, ...props) => {
      dispatch(
        actUpdateTodoItem(
          colType,
          todoId,
          {
            status: findCard(colType, todoId).status,
            pin: !findCard(colType, todoId).pin
          },
          {
            pin: findCard(colType, todoId).pin
          },
          ...props
        )
      )
    },
    [dispatch, findCard]
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
          findCard(colType, todoId),
          ...props
        )
      )
    },
    [dispatch, findCard]
  )

  return { findCard, findCardById, updateFlag, updateTodo, deleteTodo }
}

export default useTodo
