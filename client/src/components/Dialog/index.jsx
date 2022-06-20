import { Dialog as DialogHeadlessui, Transition } from '@headlessui/react'
import { LayoutContext } from 'context/LayoutContext'
import { Fragment, useContext } from 'react'
import WarningDialog from './WarningDialog'
import AddMemberToProject from './Workflow/AddMemberToProject'
import CreateIssue from './Workflow/CreateIssue'
import CreateProject from './Workflow/CreateProject'
import DeleteIssue from './Workflow/DeleteIssue'
import DeleteProject from './Workflow/DeleteProject'

function Dialog() {
  const { nameDialog, isDialogOpen, closeDialog, data } =
    useContext(LayoutContext)

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

        {nameDialog === 'remove-project' && (
          <DeleteProject closeModal={closeDialog} data={data} />
        )}

        {nameDialog === 'create-issue' && (
          <CreateIssue closeModal={closeDialog} />
        )}

        {nameDialog === 'remove-issue' && (
          <DeleteIssue closeModal={closeDialog} data={data} />
        )}

        {nameDialog === 'denied-action' && (
          <WarningDialog closeModal={closeDialog} data={data} />
        )}

        {nameDialog === 'add-member-to-project' && (
          <AddMemberToProject closeModal={closeDialog} data={data} />
        )}
      </DialogHeadlessui>
    </Transition>
  )
}

export default Dialog
