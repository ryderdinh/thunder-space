import { CalendarIcon } from '@heroicons/react/outline'
import { SCol, SmallTable, SRow } from 'components/Table/SmallTable'
import { useSelector } from 'react-redux'

const EventTable = () => {
  const { data: events, isLoading } = useSelector((state) => state._events)

  return (
    <SmallTable
      title={'Event'}
      logo={<EventTableLogo />}
      data={events}
      loading={isLoading}
    >
      <SRow isHead={true}>
        <SCol className='w-1/4 min-w-max'>Date</SCol>
        <SCol className=''>Event name</SCol>
      </SRow>
      {events?.map((row) => (
        <SRow>
          {row.map((col) => (
            <SCol></SCol>
          ))}
        </SRow>
      ))}
    </SmallTable>
  )
}

export default EventTable

const EventTableLogo = () => (
  <div className='flex h-8 w-8 items-center justify-center rounded-[4px] bg-neutral-50'>
    <CalendarIcon className='w-4 text-neutral-900' />
  </div>
)
