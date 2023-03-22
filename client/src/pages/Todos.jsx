import 'assets/css/Wf.css'
import ProtectedLayout from 'components/Layouts/ProtectedLayout'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import { useEffect } from 'react'

export default function Todos() {
  const path = 'todos'

  useEffect(() => {
    document.title = 'Todos'
  }, [])

  return (
    <ProtectedLayout path={path}>
      <ViewBox></ViewBox>
    </ProtectedLayout>
  )
}
