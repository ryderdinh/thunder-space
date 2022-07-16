import { createContext, useState } from 'react'

export const LayoutContext = createContext()

export default function LayoutContextProvider({ children }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isOpenSidebar, setIsOpenSidebar] = useState(
    localStorage.getItem('sidebar-x') === 'true' ? true : false || false
  )
  const [nameDialog, setNameDialog] = useState('')
  const [data, setData] = useState({})

  const [auth,setAuth] = useState(false)
  const [previousPath,setPreviousPath] = useState('/')

  const openDialog = (nameDialog, dataDialog) => {
    setNameDialog(nameDialog)
    setData(dataDialog)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const dialog = {
    active: isDialogOpen,
    open: (nameDialog, dataDialog) => {
      setNameDialog(nameDialog)
      setData(dataDialog)
      setIsDialogOpen(true)
    },
    close: () => {
      setIsDialogOpen(false)
    }
  }

  const sidebar = {
    active: isOpenSidebar,
    open: () => {
      setIsOpenSidebar(true)
      localStorage.setItem('sidebar-x', true)
    },
    close: () => {
      setIsOpenSidebar(false)
      localStorage.setItem('sidebar-x', false)
    },
    toggle: () => {
      setIsOpenSidebar(!isOpenSidebar)
      localStorage.setItem('sidebar-x', !isOpenSidebar)
    }
  }

  return (
    <LayoutContext.Provider
      value={{
        nameDialog,
        isDialogOpen,
        openDialog,
        closeDialog,
        dialog,
        sidebar,
        data,
        previousPath,
        setPreviousPath
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
