import { updateTodosData } from 'actions/todos'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag } from 'utilities/applyDrag'
import { mapOrder } from 'utilities/sort'
import TodoCard from './TodoCard'

const TodoColumn = ({ type, cards = [], cardOrder = [] }) => {
  const dispatch = useDispatch()

  const cardsSorted = useMemo(
    () => mapOrder(cards, cardOrder, '_id'),
    [cardOrder, cards]
  )

  const onDrop = (dropResult) => {
    // const { removedIndex, addedIndex, payload, element } = dropResult=

    const newCards = applyDrag(cardsSorted, dropResult)
    const newOrder = applyDrag(cardsSorted, dropResult).map((item) => item._id)
    console.log(type, newCards, newOrder)
    dispatch(
      updateTodosData({
        colName: type,
        data: { cards: newCards, cardOrder: newOrder }
      })
    )
  }

  return (
    <div className='card-list w-1/3 bg-white'>
      <h1>{type}</h1>
      <Container
        groupName='col'
        onDrop={onDrop}
        getChildPayload={(index) => cardsSorted[index]}
        dragClass='card-ghost'
        dropClass='card-ghost-drop'
        // dropPlaceholder={{
        //   animationDuration: 150,
        //   showOnTop: true,
        //   className: 'cards-drop-preview'
        // }}
        // dropPlaceholderAnimationDuration={300}
      >
        {cardsSorted.map((card) => (
          <Draggable key={card._id}>
            <TodoCard data={card} />
          </Draggable>
        ))}
      </Container>
    </div>
  )
}

export default TodoColumn
