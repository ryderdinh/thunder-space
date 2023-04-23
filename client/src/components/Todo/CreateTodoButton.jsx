import { PencilIcon } from '@heroicons/react/24/solid'
import ButtonSuccess from 'components/Button/ButtonSuccess'

const CreateTodoButton = ({ onClick }) => {
  return (
    <ButtonSuccess
      className='flex aspect-square h-full items-center 
      justify-center'
      onClick={onClick}
    >
      <PencilIcon className='w-6 text-gray-900' />
    </ButtonSuccess>
  )
}

export default CreateTodoButton
