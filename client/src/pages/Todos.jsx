import 'assets/css/Wf.css'
import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import { LayoutGroup, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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
      </ViewBox>
    </ProtectedLayout>
  )
}
