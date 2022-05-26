import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import { Col, Row } from 'components/Layouts'
import { useHistory, useLocation } from 'react-router-dom'

export const IssueSetting = () => {
  const history = useHistory()
  const location = useLocation()

  const returnIssuePage = () => {
    history.push(location.pathname.replace('/settings', ''))
  }

  return (
    <div className='w-full space-y-5'>
      <Row className='md:flex'>
        <Col className='mb-2 w-full md:mb-0 md:w-1/2'>
          <button
            className='panel inline-flex h-9 w-max items-center 
            justify-center rounded-md bg-opacity-20 py-2 px-4 text-sm
            font-medium text-neutral-100 hover:bg-opacity-30 focus:outline-none
            focus-visible:ring-2 focus-visible:ring-neutral-100
            focus-visible:ring-opacity-75'
            onClick={returnIssuePage}
          >
            <ArrowNarrowLeftIcon className='h-6 w-10' />
          </button>
        </Col>
      </Row>
    </div>
  )
}
