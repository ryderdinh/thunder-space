import { createContext, useState } from 'react'

export const LayoutContext = createContext()

export default function LayoutContextProvider({ children }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [nameDialog, setNameDialog] = useState('')
  const [data, setData] = useState({})

  const openDialog = (nameDialog, dataDialog) => {
    setNameDialog(nameDialog)
    setData(dataDialog)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <LayoutContext.Provider
      value={{
        nameDialog,
        isDialogOpen,
        openDialog,
        closeDialog,
        data
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
