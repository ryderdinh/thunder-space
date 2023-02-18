import TimesheetsHeader from './components/TimesheetsHeader'
import TimesheetsTable from './components/TimesheetsTable'
import { getDayEnoughTime } from './services/getDayEnoughTime'
import { getDayListByMonth } from './services/getDayListByMonth'
import { getHistoryFromDate } from './services/getHistoryFromDate'
import { handleMonths } from './services/handleDate'
import { actFetchTimesheets } from 'actions'
import { Motion } from 'components/Layouts'
import CheckinFeature from 'features/checkin'
import { getCheckinHour } from 'features/checkin/services/getCheckinHour'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

    setMonth((prev) => (prev === 1 ? 12 : prev - 1))
  }

  const returnPresent = () => {
    setTableTitle(now())

    setDay(new Date().getDate())
    setMonth(new Date().getMonth() + 1)
  }

  const next = () => {
    setTableTitle(handleMonths(1, new Date(tableTitle)))

    setMonth((prev) => (prev === 12 ? 1 : prev + 1))
  }

  const getHistoryData = useCallback(
    (type = 'day') =>
      getHistoryFromDate(_data, {
        year: new Date(tableTitle).getFullYear(),
        month,
        day
      })[type],
    [_data, day, month, tableTitle]
  )

  const getDaysComplete = useMemo(
    () => getDayEnoughTime(getHistoryData('month'), 8),
    [getHistoryData]
  )

  return (
    <Motion variants={variants} className='space-y-3 overflow-hidden'>
      <TimesheetsHeader
        title={tableTitle}
        previous={previous}
        returnPresent={returnPresent}
        next={next}
      />

      <TimesheetsTable
        setDay={setDay}
        year={new Date(tableTitle).getFullYear()}
        month={month}
        day={day}
        days={getDayListByMonth(
          Number(month),
          new Date(tableTitle).getFullYear()
        )}
        daysComplete={getDaysComplete}
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
        totalHour={getCheckinHour(getHistoryData())}
        history={getHistoryData()}
      />
    </Motion>
  )
}

export default TimesheetsFeature
