import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import OutApisProvider from 'context/OutApisContext'
import TimesheetsFeature from 'features/timesheets'
import { useEffect, useState } from 'react'
import variantGlobal from 'units/variantGlobal'

export default function TimeSheets() {
  const [path] = useState('timesheets')

  useEffect(() => {
    document.title = 'Timesheets'
  }, [])

  return (
    <OutApisProvider>
      <ProtectedLayout path={path}>
        <ViewBox>
          <TimesheetsFeature variants={variantGlobal(1, 0)} />
        </ViewBox>
      </ProtectedLayout>
    </OutApisProvider>
  )
}
