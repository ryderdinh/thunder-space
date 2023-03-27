import 'assets/css/todo.css'

import {
  actCreateTodo,
  actFetchTodos,
  actUpdateIndexTodos
} from 'actions/todos'
import 'assets/css/Wf.css'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import TodoColumn from 'components/Todo/Overview/TodoColumn'
import { LayoutGroup, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import TodoItem from './TodosItem'

const items = [
  {
    id: 1,
    subtitle: 'aaa',
    title: 'hiasdasda'
  },
  {
    id: 2,
    subtitle: 'bbb',
    title: 'hhahahas'
  }
]

export default function Todos() {
  const match = useRouteMatch()

  const path = 'todos'
  const [selectedId, setSelectedId] = useState(null)
  const [item, setItem] = useState({})

  const history = useHistory()

  const { _data } = useSelector((state) => state._todos)
  const dispatch = useDispatch()

  const dropTypeUpdatedRef = useRef([])
  const dropCardsUpdatedRef = useRef([])
  const dropCurrentDataUpdatedRef = useRef({})

  /*
   * to avoid calling api 3 times when drag and drop because there
   * are 3 columns, i created 3 refs to save data when this function
   * is called
   */
  const whenDrop = useCallback(
    (type, orders, currentData) => {
      let dropTypeUpdatedClone = [...dropTypeUpdatedRef.current]
      let dropCardsUpdatedClone = [...dropCardsUpdatedRef.current]
      let dropCurrentDataUpdatedClone = { ...dropCurrentDataUpdatedRef.current }

      /* check which column of data already exists */
      if (!dropTypeUpdatedClone.includes(type)) {
        dropTypeUpdatedClone = [...dropTypeUpdatedClone, type]
        dropTypeUpdatedRef.current = [...dropTypeUpdatedRef.current, type]
        dropCardsUpdatedClone = [...dropCardsUpdatedClone, ...orders]
        dropCardsUpdatedRef.current = [
          ...dropCardsUpdatedRef.current,
          ...orders
        ]
      }
      dropCurrentDataUpdatedClone[type] = currentData
      dropCurrentDataUpdatedRef.current[type] = currentData

      if (
        ['todo', 'doing', 'completed'].every((item) =>
          dropTypeUpdatedClone.some((x) => x === item)
        )
      ) {
        dropTypeUpdatedRef.current = []
        dropCardsUpdatedRef.current = []
        dropCurrentDataUpdatedRef.current = {}

        dispatch(
          actUpdateIndexTodos(
            dropCardsUpdatedClone,
            dropCurrentDataUpdatedClone
          )
        )
        console.log('all', dropCardsUpdatedClone)
      }
    },
    [dispatch]
  )

  useEffect(() => {
    document.title = 'Todos'
  }, [])

  useEffect(() => {
    dispatch(actFetchTodos())
  }, [dispatch])

  return (
    <ProtectedLayout path={path}>
      <ViewBox>
        {items.map((item, idx) => (
          <LayoutGroup id='a' key={`todo-group-${idx}`}>
            <motion.div
              className='border border-black bg-slate-400'
              layoutId={item.id}
              onClick={() => {
                setSelectedId(item.id)
                setItem(item)
                history.push(`/todos?todo=${item.id}`)
              }}
            >
              <motion.h5>{item.subtitle}</motion.h5>
              <motion.h2>{item.title}</motion.h2>
            </motion.div>
          </LayoutGroup>
        ))}

        <TodoItem todoId={selectedId} />
        <div className=''>
          <ButtonSuccess
            onClick={() =>
              dispatch(
                actCreateTodo(
                  `task${new Date().getTime()}`,
                  'Action move card outside column',
                  true,
                  'todo',
                  () => dispatch(actFetchTodos())
                )
              )
            }
          >
            Add Todo
          </ButtonSuccess>
        </div>
        <div className='flex min-w-[80rem] snap-x gap-[30px] overflow-x-auto'>
          <TodoColumn
            type={'todo'}
            cards={_data.todo.cards}
            cardOrder={_data.todo.cardOrder}
            whenDrop={whenDrop}
          />
          <TodoColumn
            type={'doing'}
            cards={_data.doing.cards}
            cardOrder={_data.doing.cardOrder}
            whenDrop={whenDrop}
          />
          <TodoColumn
            type={'completed'}
            cards={_data.completed.cards}
            cardOrder={_data.completed.cardOrder}
            whenDrop={whenDrop}
          />
        </div>
      </ViewBox>
    </ProtectedLayout>
  )
}
