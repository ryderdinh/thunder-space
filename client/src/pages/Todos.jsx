import 'assets/css/Wf.css'
import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import TodoColumn from 'components/Todo/Overview/TodoColumn'
import { LayoutGroup, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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

  useEffect(() => {
    document.title = 'Todos'
  }, [])

  return (
    <ProtectedLayout path={path}>
      <ViewBox>
        {items.map((item) => (
          <LayoutGroup id='a'>
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

        <div className='flex min-w-[80rem] gap-3'>
          <TodoColumn
            type={'todo'}
            cards={_data.todo.cards}
            cardOrder={_data.todo.cardOrder}
          />
          <TodoColumn
            type={'doing'}
            cards={_data.doing.cards}
            cardOrder={_data.doing.cardOrder}
          />
          <TodoColumn
            type={'completed'}
            cards={_data.completed.cards}
            cardOrder={_data.completed.cardOrder}
          />
        </div>
      </ViewBox>
    </ProtectedLayout>
  )
}
