import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import TimesheetDetail from 'components/Main/ViewMain/TimesheetDetail'
import Timesheets from 'components/Main/ViewMain/Timesheets'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import { useEffect, useState } from 'react'
import variantGlobal from 'units/variantGlobal'

export default function TimeSheets() {
  const [path] = useState('timesheets')

  useEffect(() => {
    document.title = 'Timesheets'
  }, [])

  return (
    <ProtectedLayout path={path}>
      <ViewBox>
        <Timesheets variants={variantGlobal(1, 0)} />
        <TimesheetDetail variants={variantGlobal(1, 0.3)} />
      </ViewBox>
    </ProtectedLayout>
  )
}
