import { Dialog as DialogHeadlessui, Transition } from '@headlessui/react'
import { LayoutContext } from 'context/LayoutContext'
import { Fragment, useContext } from 'react'
import CreateIssue from './Workflow/CreateIssue'
import CreateProject from './Workflow/CreateProject'

function Dialog() {
  const { nameDialog, isDialogOpen, closeDialog } = useContext(LayoutContext)

  return (
    <Transition appear show={isDialogOpen} as={Fragment}>
      <DialogHeadlessui
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={closeDialog}
      >
        <DialogHeadlessui.Overlay className='absolute top-0 h-full w-full bg-neutral-900 opacity-70' />

        {nameDialog === 'create-project' && (
          <CreateProject closeModal={closeDialog} />
        )}

        {nameDialog === 'create-issue' && (
          <CreateIssue closeModal={closeDialog} />
        )}
      </DialogHeadlessui>
    </Transition>
  )
}

export default Dialog
