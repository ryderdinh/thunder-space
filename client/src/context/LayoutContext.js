import { createContext, useState } from 'react'

export const LayoutContext = createContext()

export default function LayoutContextProvider({ children }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [nameDialog, setNameDialog] = useState('')

  const openDialog = (nameDialog) => {
    setNameDialog(nameDialog)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <LayoutContext.Provider
      value={{ nameDialog, isDialogOpen, openDialog, closeDialog }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
