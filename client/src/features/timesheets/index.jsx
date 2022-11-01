import { actFetchTimesheets } from 'actions'
import { Motion } from 'components/Layouts'
import CheckinFeature from 'features/checkin'
import { getHour } from 'features/checkin/services/getHour'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TimesheetsHeader from './components/TimesheetsHeader'
import TimesheetsTable from './components/TimesheetsTable'
import { getDayListByMonth } from './services/getDayListByMonth'
import { getHistoryFromDate } from './services/getHistoryFromDate'
import { handleMonths } from './services/handleDate'

const now = () => {
  let date = new Date()

  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
}

const TimesheetsFeature = ({ variants }) => {
  const { _data } = useSelector((state) => state._timesheets)

  const [tableTitle, setTableTitle] = useState(now())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [day, setDay] = useState(new Date().getDate())

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actFetchTimesheets())
  }, [dispatch])

  const previous = () => {
    setTableTitle(handleMonths(-1, new Date(tableTitle)))

    setMonth(month - 1)
  }

  const returnPresent = () => {
    setTableTitle(now())

    setDay(new Date().getDate())
    setMonth(new Date().getMonth() + 1)
  }

  const next = () => {
    setTableTitle(handleMonths(1, new Date(tableTitle)))

    setMonth(month + 1)
  }

  const getHistoryData = () => {
    return getHistoryFromDate(_data, {
      year: new Date(tableTitle).getFullYear(),
      month,
      day
    })
  }

  return (
    <Motion variants={variants} className='space-y-3 overflow-hidden'>
      <TimesheetsHeader
        title={tableTitle}
        previous={previous}
        returnPresent={returnPresent}
        next={next}
      />

      <TimesheetsTable
        days={getDayListByMonth(month)}
        month={month}
        day={day}
        setDay={setDay}
      />

      <CheckinFeature
        allowCheckin={false}
        date={
          new Date(
            `${new Date(tableTitle).getFullYear()}`,
            `${month - 1}`,
            `${day}`
          )
        }
        totalHour={getHour(getHistoryData())}
        history={getHistoryFromDate(_data, {
          year: new Date(tableTitle).getFullYear(),
          month,
          day
        })}
      />
    </Motion>
  )
}

export default TimesheetsFeature
