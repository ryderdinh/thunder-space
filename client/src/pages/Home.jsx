import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import OutApisProvider from 'context/OutApisContext'
import CheckinFeature from 'features/checkin'
import EventFeature from 'features/event'
import GreetingFeature from 'features/greeting'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import variantGlobal from 'units/variantGlobal'

const path = 'home'

export default function Home() {
  const {
    _count,
    _status,
    _list: checkinHistory
  } = useSelector((state) => state._timeOfAttendance)

  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
    <OutApisProvider>
      <ProtectedLayout path={path}>
        <ViewBox classNameCol='space-x-2'>
          <div className='view-row mx-auto w-full max-w-3xl space-y-12'>
            <GreetingFeature variants={variantGlobal(1, 0)} />
            <CheckinFeature
              variants={variantGlobal(1, 0.2)}
              status={_status}
              allowCheckin={true}
              totalHour={_count}
              history={checkinHistory}
            />
            <EventFeature variants={variantGlobal(1, 0.4)} />
          </div>
          {/* <div className='w-[50%]'>
            <ViewBoxName name={'Attendance'} />
            <div className='flex'>
              <TimeKeeping variants={variantGlobal(1, 0.2)} />
              <TimeKeepingHistory variants={variantGlobal(1, 0.4)} />
            </div>
          </div> */}
        </ViewBox>
      </ProtectedLayout>
    </OutApisProvider>
  )
}
