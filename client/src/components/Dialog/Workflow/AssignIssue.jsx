import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { actUpdateIssue, setDataIssue } from 'actions'
import ButtonDanger from 'components/Button/ButtonDanger'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import SearchBox from 'components/Project/SearchBox'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorToast } from 'utilities/toast'

export default function AssignIssue({
  closeModal,
  data: { iid, members, currentAssignee }
}) {
  const { _data } = useSelector((state) => state._issue)
  const dispatch = useDispatch()

  const [selected, setSelected] = useState({})
  const [updating, setUpdating] = useState(false)

  const onSubmit = () => {
    setUpdating(true)

    const onSuccess = () => {
      const { name, _id, email, avatar } = selected
      dispatch(setDataIssue({ ..._data, assign: { name, _id, email, avatar } }))
      setUpdating(false)
      closeModal()
    }
    const onError = (err) => {
      setUpdating(false)
      errorToast(err.message, { id: 'update-issue' })
    }

    dispatch(
      actUpdateIssue(
        iid,
        { assigned: selected?.email || '' },
        onSuccess,
        onError
      )
    )
  }

  const handleSearch = () => {}

  useEffect(() => {
    setSelected(
      members[members.findIndex((mem) => mem._id === currentAssignee._id)]
    )
  }, [currentAssignee._id, members])

  return (
    <div className='min-h-screen px-4 text-center'>
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Dialog.Overlay className='fixed inset-0' />
      </Transition.Child>

      <span className='inline-block h-screen align-middle' aria-hidden='true'>
        &#8203;
      </span>

      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <div
          className='my-8 inline-block w-full max-w-xl transform
          rounded-md border border-neutral-800 bg-[#232323] p-4 text-left align-middle 
          shadow-xl transition-all md:p-6'
        >
          <Dialog.Title
            as='h3'
            className='text-lg font-bold leading-6 text-neutral-200'
          >
            Assignee
          </Dialog.Title>

          <div className='mt-5'>
            <div className='mt-2 space-y-6'>
              <p className='space-y-2 text-sm text-neutral-200'>
                <span className='block'>
                  Select 1 member you want to assign:
                </span>
              </p>
            </div>
          </div>

          <div className='mt-4'>
            <div className=''>
              <SearchBox
                placeholder={'Search member'}
                handleSearch={handleSearch}
                defaultValue={''}
                inputProps={{ onFocus: () => {}, onBlur: () => {} }}
              />

              <div className='mt-3 h-max max-h-96 overflow-y-scroll rounded-md bg-neutral-50'>
                <div
                  className='custom-scrollbar text-scale-1200 block h-max min-h-[100px] w-full 
                  py-2 text-xs'
                >
                  <RadioGroup value={selected} onChange={setSelected}>
                    {members.map((member) => (
                      <RadioGroup.Option
                        key={member._id}
                        value={member}
                        className={({ active, checked }) =>
                          `${
                            active
                              ? 'flex w-full items-center bg-emerald-400'
                              : ''
                          }
                          ${
                            checked
                              ? 'bg-emerald-400 text-neutral-50'
                              : 'bg-neutral-50'
                          }
                            relative flex outline-none transition-all
                            duration-75 ease-linear`
                        }
                      >
                        <div className='flex w-full cursor-pointer items-center px-2.5 py-2'>
                          <div
                            className='h-5 w-5 overflow-hidden rounded-full border 
                            border-neutral-50'
                          >
                            <img src={member.avatar} alt='avatar' />
                          </div>
                          <div className='ml-2'>
                            <p className='text-sm font-bold'>{member.name}</p>
                            <p className='text-xs italic'>{member.email}</p>
                          </div>
                        </div>
                      </RadioGroup.Option>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-4 flex justify-end gap-2'>
            <ButtonSuccess
              size='mid'
              loading={updating}
              className='w-24'
              onClick={onSubmit}
            >
              Update
            </ButtonSuccess>

            <ButtonDanger
              size='mid'
              disabled={updating}
              className='w-24'
              onClick={closeModal}
            >
              Cancel
            </ButtonDanger>
          </div>
        </div>
      </Transition.Child>
    </div>
  )
}
