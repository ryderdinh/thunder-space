import { ArrowLongDownIcon } from '@heroicons/react/24/outline'
import { actUpdateIndexTodosLocal, actUpdateTodoItem } from 'actions/todos'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Draggable } from 'react-smooth-dnd'
import variantGlobal from 'units/variantGlobal'
import { applyDrag } from 'utilities/applyDrag'
import { mapOrder } from 'utilities/sort'
import CreateTodoButton from '../CreateTodoButton'
import TodoCard from './TodoCard'

const TodoColumn = ({
  type,
  cards = [],
  cardOrder = [],
  whenDrop,
  onCreateTodo
}) => {
  const dispatch = useDispatch()

  const cardsSorted = useMemo(
    () => mapOrder(cards, cardOrder, '_id'),
    [cardOrder, cards]
  )

  /*
   * when dragging and dropping, onDrop will always be called
   * even if the column's data is unchanged
   */
  const onDrop = async (dropResult) => {
    // const { removedIndex, addedIndex, payload, element } = dropResult

    /* Get new card list and card id list  */
    const newCards = applyDrag(cardsSorted, dropResult)
    const newOrder = applyDrag(cardsSorted, dropResult).map((item) => item._id)

    /* Assign value to colType if current column is the column to be added data */
    let colType = null
    if (dropResult.addedIndex !== null) {
      colType = type
    }

    /* Change redux data and call api update status todo item */
    colType &&
      colType !== dropResult.payload.status &&
      dispatch(
        actUpdateTodoItem(
          colType,
          dropResult.payload._id,
          {
            status: colType
          },
          {
            status: dropResult.payload.status
          } // rollback to old status when call api failed
        )
      )

    /* Update index todo in redux
     * when success: callback whenDrop func to update todos index to server
     */
    dispatch(
      actUpdateIndexTodosLocal(
        type,
        {
          cards: colType
            ? newCards.map((card) =>
                card._id === dropResult.payload._id
                  ? { ...card, status: colType }
                  : card
              )
            : newCards,
          cardOrder: newOrder
        },
        () =>
          whenDrop(type, newOrder, {
            cards: cardsSorted,
            cardOrder: cardsSorted.map((item) => item._id)
          })
      )
    )
  }

  return (
    <div
      className='card-list w-1/3 min-w-[380px] snap-end 
      space-y-[30px]'
    >
      <div
        className='rounded-5 border border-gray-500 
        bg-gray-800/50 px-5 py-3'
      >
        {/* Add Create Button if Column is Todo Column */}
        {type === 'todo' ? (
          <div className='flex w-full items-center justify-between'>
            <div className='space-y-2.5'>
              <h1
                className='text-[22px] font-bold capitalize leading-[28px] 
                text-white'
              >
                {type}
              </h1>
              <p className='text-sm text-gray-200'>
                {cardOrder.length} cards variable
              </p>
            </div>
            <CreateTodoButton onClick={onCreateTodo} />
          </div>
        ) : (
          <div className='flex w-full flex-col items-center space-y-2.5'>
            <h1
              className='text-[22px] font-bold capitalize leading-[28px] 
              text-white'
            >
              {type}
            </h1>
            <p className='text-sm text-gray-200'>
              {cardOrder.length} cards variable
            </p>
          </div>
        )}
      </div>
      <AnimatePresence mode='wait'>
        <motion.div
          className='rounded-5 border 
          border-gray-500 bg-gray-800/50 px-5 pb-5'
        >
          <AnimatePresence mode='wait'>
            {!cardsSorted.length ? (
              <motion.div
                className='mt-5 flex w-full flex-col items-center 
                justify-center gap-2 rounded-5 border border-gray-500
                bg-gray-700/90 py-5 text-center text-gray-200 opacity-90'
                key={`ap-card-1-${type}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                layout
              >
                <p className='text-sm'>No card, you can drop card here</p>
                <motion.div
                  className=''
                  initial={{ y: 0 }}
                  animate={{ y: -5 }}
                  transition={{ repeat: Infinity, duration: 1, type: 'just' }}
                >
                  <ArrowLongDownIcon className='h-5' />
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <AnimatePresence mode='popLayout'>
            <Container
              key={`ap-card-2-${type}`}
              groupName='col'
              onDrop={onDrop}
              getChildPayload={(index) => cardsSorted[index]}
              dragClass='card-ghost opacity-90'
              dropClass='card-ghost-drop opacity-100'
              dragHandleSelector='.card-drag-handle'
              dropPlaceholder={{
                animationDuration: 150,
                showOnTop: true,
                className:
                  'cards-drop-preview border border-dashed border-gray-200 bg-gray-500 rounded-5 mt-5 w-full'
              }}
              dropPlaceholderAnimationDuration={300}
              autoScrollEnabled
            >
              {cardsSorted.map((card, idx) => (
                <Draggable key={card._id}>
                  <TodoCard
                    colType={type}
                    data={card}
                    variant={variantGlobal(4, idx * 0.1)}
                  />
                </Draggable>
              ))}
            </Container>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TodoColumn
