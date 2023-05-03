import 'assets/css/todo.css'

import { actFetchTodos, actUpdateIndexTodos } from 'actions/todos'
import 'assets/css/Wf.css'
import SearchInput from 'components/Form/SearchInput'
import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import TodoColumn from 'components/Todo/Overview/TodoColumn'
import { useLayoutContext } from 'context/LayoutContext'
import { useInput } from 'hooks'
import queryString from 'query-string'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

const path = 'todos'

export default function Todos() {
  const history = useHistory()
  const location = useLocation()

  const { _data } = useSelector((state) => state._todos)
  const dispatch = useDispatch()
  const { nameDialog, dialog } = useLayoutContext()

  const dropTypeUpdatedRef = useRef([])
  const dropCardsUpdatedRef = useRef([])
  const dropCurrentDataUpdatedRef = useRef({})

  const searchInput = useInput('')

  const isOpenDetail = useMemo(
    () => queryString.parse(location.search)?.todoId,
    [location.search]
  )

  const itemDetail = useMemo(
    () =>
      location.state ||
      [
        ..._data.todo.cards,
        ..._data.doing.cards,
        ..._data.completed.cards
      ]?.find((x) => x._id === queryString.parse(location.search)?.todoId) ||
      {},
    [_data, location.search, location.state]
  )

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

  const onSearch = useCallback(() => {
    console.log(searchInput.value)
  }, [searchInput.value])

  /*
   * after created todo, re-fetch todo data and redirect to todo item route (have todoId)
   */
  const onCreateSuccess = useCallback(
    (id) => {
      const onSuccess = () => {
        history.push(`/todos?todoId=${id}`)
      }
      dispatch(actFetchTodos(onSuccess))
    },
    [dispatch, history]
  )

  useEffect(() => {
    document.title = 'Todos'
  }, [])

  useEffect(() => {
    dispatch(actFetchTodos())
  }, [dispatch])

  useEffect(() => {
    if (Object.keys(itemDetail).length && isOpenDetail) {
      dialog.open('todo-detail', {
        id: itemDetail._id,
        onClose: () => history.push('/todos')
      })
    }

    if (nameDialog === 'todo-detail') {
      if ((!Object.keys(itemDetail).length && !isOpenDetail) || !isOpenDetail) {
        dialog.close()
      }
    }
  }, [dialog, history, isOpenDetail, itemDetail, nameDialog])

  return (
    <ProtectedLayout path={path}>
      <ViewBox className='z-[2] py-10' classNameCol='space-y-[30px]'>
        {/* {items.map((item, idx) => (
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
        ))} */}

        <div className='flex w-full flex-wrap'>
          <SearchInput
            className='!w-[309px] max-w-full'
            placeholder='Enter text'
            onSubmit={onSearch}
            {...searchInput.bind}
          />
        </div>

        <div className='flex max-w-full snap-x gap-[30px] overflow-x-scroll xl:overflow-x-auto'>
          <TodoColumn
            type={'todo'}
            cards={_data.todo.cards}
            cardOrder={_data.todo.cardOrder}
            whenDrop={whenDrop}
            onCreateTodo={() =>
              dialog.open('create-todo', {
                onSuccess: onCreateSuccess
              })
            }
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
