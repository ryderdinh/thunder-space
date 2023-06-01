import Board from 'components/Board'
import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import ViewBox from 'components/Main/ViewMain/ViewBox'

const path = 'todos'

export default function Boards() {
  return (
    <ProtectedLayout path={path}>
      <ViewBox className='z-[2] py-10' classNameCol='space-y-[30px]'>
        <Board />
      </ViewBox>
    </ProtectedLayout>
  )
}
