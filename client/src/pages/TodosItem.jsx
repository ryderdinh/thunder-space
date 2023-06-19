import 'assets/css/Wf.css'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

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

export default function TodoItem({ todoId }) {
  const path = 'todos'
  const history = useHistory()

  const data = useMemo(
    () =>
      items.filter((item) => {
        return item.id === Number(todoId)
      })[0] || {},
    [todoId]
  )

  useEffect(() => {
    document.title = 'Todos'
  }, [])

  return (
    <LayoutGroup id='a'>
      <AnimatePresence>
        {todoId ? (
          <motion.div
            layoutId={todoId}
            className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-200'
            onClick={() => history.push('/todos')}
          >
            {
              <>
                <motion.h5>{data.subtitle}</motion.h5>
                <motion.h2>{data.title}</motion.h2>
              </>
            }
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LayoutGroup>
  )
}
