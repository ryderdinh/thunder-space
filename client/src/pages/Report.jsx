import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import ReportForm from 'components/Main/ViewMain/ReportForm'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import ViewBoxName from 'components/Main/ViewMain/ViewBoxName'
import { useEffect, useState } from 'react'
import variantGlobal from 'units/variantGlobal'

export default function Report() {
  const [path] = useState('report')

  useEffect(() => {
    document.title = 'Report'
  }, [])

  return (
    <ProtectedLayout path={path}>
      <ViewBox>
        <ViewBoxName
          name={'Form xin nghỉ phép'}
          variants={variantGlobal(2, 0)}
        />
        <ReportForm />
      </ViewBox>
    </ProtectedLayout>
  )
}
