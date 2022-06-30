import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import { DuplicateIcon, FilterIcon } from '@heroicons/react/solid'
import { joiResolver } from '@hookform/resolvers/joi'
import { actFetchProject, actQueryIssue, actUpdateIssue } from 'actions'
import { Col, Row } from 'components/Layouts'
import { LayoutContext } from 'context/LayoutContext'
import Joi from 'joi'
import queryString from 'query-string'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCopyClipboard } from 'react-recipes'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import { successToast } from 'utilities/toast'

const subTabs = [
  { name: 'General', tab: 'general' },
  { name: 'Security', tab: 'security' },
  { name: 'Advanced', tab: 'advanced' }
]

const schemaName = Joi.object({
  issueName: Joi.string().min(2).max(60)
})

export const IssueSetting = () => {
  //? Connect redux
  const {
    _data: _dataIssue,
    isLoading,
    error
  } = useSelector((state) => state._issue)
  const dispatch = useDispatch()

  //? Connect router
  const history = useHistory()
  const location = useLocation()
  const { pid, iid } = useParams()

  //? State
  const [tab, setTab] = useState(
    queryString.parse(location.search)?.opt || 'general'
  )
  const [, setMobileFiltersOpen] = useState(false)
  const [allowActionForm, setAllowActionForm] = useState({
    issueName: false
  })

  //? Hook Form
  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    formState: { errors: errorsName },
    watch: watchName,
    setValue: setValueName
  } = useForm({
    resolver: joiResolver(schemaName)
  })
  const issueNameInForm = watchName('issueName')

  //? Function
  const returnIssuePage = () => {
    history.push(location.pathname.replace('/settings', ''))
  }

  const onSaveName = (data) => {
    !allowActionForm.issueName &&
      dispatch(actUpdateIssue(iid, { name: data.issueName }))
  }

  //? Effect
  useEffect(() => {
    const checkDuplicateName = (name = '') => {
      return name.trim() === _dataIssue?.name.trim()
    }

    setAllowActionForm((prev) => ({
      ...prev,
      issueName: checkDuplicateName(issueNameInForm)
    }))
  }, [_dataIssue?.name, issueNameInForm])

  useEffect(() => {
    setTab(queryString.parse(location.search)?.opt || 'general')
  }, [location.search])

  useEffect(() => {
    Promise.all([dispatch(actFetchProject(pid)), dispatch(actQueryIssue(iid))])
  }, [pid, iid, dispatch])

  useEffect(() => {
    if (error === 'issue does not exist') {
      history.push(`/projects/${pid}`)
    }
  }, [error, history, pid])

  useEffect(() => {
    setValueName('issueName', _dataIssue?.name)
  }, [_dataIssue?.name, setValueName])

  return (
    <div className='h-full w-full space-y-5'>
      <Row className='max-h-10 md:flex'>
        <Col className='mb-2 w-full md:mb-0 md:w-1/2'>
          <button
            className='panel inline-flex h-9 w-max items-center 
            justify-center rounded-md bg-opacity-20 py-2 px-4 text-sm
            font-medium text-neutral-100 hover:bg-opacity-30 focus:outline-none
            focus-visible:ring-2 focus-visible:ring-neutral-100
            focus-visible:ring-opacity-75'
            onClick={returnIssuePage}
          >
            <ArrowNarrowLeftIcon className='h-6 w-10' />
          </button>
        </Col>
      </Row>

      <Row className='h-[calc(100%-40px)] '>
        <Col className='h-full'>
          <>
            <div className='relative h-full'>
              <div
                className='sticky top-0 z-10 flex 
                w-full items-baseline justify-end'
              >
                <div className='flex items-center'>
                  <button
                    type='button'
                    className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 
                    sm:ml-6 lg:hidden'
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className='sr-only'>Filters</span>
                    <FilterIcon className='h-5 w-5' aria-hidden='true' />
                  </button>
                </div>
              </div>

              <section className='h-full pt-3'>
                <div className='grid h-full grid-cols-1 grid-rows-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
                  <form className='hidden lg:row-span-1 lg:block'>
                    <h3 className='sr-only'>Tab</h3>
                    <ul
                      className='space-y-1 pb-6 text-sm 
                      font-medium text-gray-900'
                    >
                      {subTabs.map((action) => (
                        <li key={action.name}>
                          <Link
                            to={(location) => ({
                              ...location,
                              search: `opt=${action.tab}`
                            })}
                          >
                            <p
                              className={`rounded-md  p-2 text-base transition-all 
                              duration-150 ease-linear hover:bg-neutral-600 
                              hover:text-neutral-200
                              ${
                                action.tab === tab
                                  ? 'bg-neutral-600 text-neutral-200'
                                  : 'bg-transparent text-neutral-500'
                              }`}
                            >
                              {action.name}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </form>

                  <div
                    className='custom-scrollbar overflow-y-scroll pr-2 
                    text-neutral-400 lg:col-span-3 lg:row-span-1'
                  >
                    <div className='space-y-10'>
                      {(tab === 'general' || tab === '') && (
                        <>
                          <div
                            className='overflow-hidden rounded-lg border-[#282828]
                            bg-[#1f1f1f]'
                          >
                            <div className='space-y-2 p-6'>
                              <h5 className='text-xl font-bold text-neutral-100'>
                                Issue Name
                              </h5>
                              <p className='text-sm'>
                                Used to identify Issue in the Project
                              </p>
                              <form
                                className='w-full'
                                onSubmit={handleSubmitName(onSaveName)}
                              >
                                <input
                                  {...registerName('issueName', {
                                    required: true
                                  })}
                                  type='text'
                                  className='mt-1 block w-full rounded-md border 
                                  border-neutral-300 py-[7px] pl-3 text-neutral-700 
                                  shadow-sm focus:border-emerald-500 focus:outline-none 
                                  focus:ring-2 focus:ring-emerald-500 
                                  disabled:cursor-not-allowed 
                                  disabled:opacity-70 sm:text-sm'
                                  placeholder='Issue name...'
                                  disabled={isLoading}
                                />
                                {errorsName?.issueName && (
                                  <span className='text-xs italic text-red-500'>
                                    {errorsName?.issueName?.message}
                                  </span>
                                )}
                              </form>
                            </div>

                            <footer className='flex justify-end bg-neutral-800 px-6 py-3'>
                              <button
                                type='submit'
                                className='rounded-md border border-emerald-600 
                                bg-emerald-600 px-3 py-1 text-neutral-100
                                transition-all duration-150 ease-linear 
                                hover:bg-transparent 
                                hover:text-emerald-600 
                                disabled:cursor-not-allowed
                                disabled:border-neutral-400  
                                disabled:bg-transparent
                                disabled:text-neutral-400
                                disabled:opacity-50'
                                disabled={allowActionForm.issueName}
                                onClick={handleSubmitName(onSaveName)}
                              >
                                Save
                              </button>
                            </footer>
                          </div>
                          <IssueID id={_dataIssue._id} />
                          <DeleteIssue id={_dataIssue._id} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        </Col>
      </Row>
    </div>
  )
}

function IssueID({ id }) {
  const [, setIsCopied] = useCopyClipboard()

  const copyToClipboard = () => {
    setIsCopied(id)
    successToast('Copied to clipboard')
  }

  return (
    <SettingActionBox
      title='Issue ID'
      description='Used to interacting'
      action={
        <>
          <span className='mr-1'>Learn more</span>
          <a href='#fff'>Issue ID</a>
        </>
      }
    >
      <div className='relative '>
        <input
          type='text'
          className='mt-1 block w-full rounded-md border border-neutral-300
          bg-neutral-50 py-[7px] pl-3 text-neutral-700 
          shadow-sm sm:text-sm'
          placeholder='Issue id'
          disabled={true}
          defaultValue={id}
        />
        <div
          className='group absolute right-[2px] top-1/2 flex aspect-square 
          h-8 max-h-full -translate-y-1/2 transform 
          cursor-pointer items-center justify-center rounded-md 
          transition-all duration-150 ease-linear
          hover:bg-neutral-700'
          onClick={copyToClipboard}
        >
          <DuplicateIcon
            className='h-6 w-6 text-neutral-700 transition-all
            duration-150 ease-linear group-hover:text-neutral-50'
          />
        </div>
      </div>
    </SettingActionBox>
  )
}

function DeleteIssue({ id }) {
  const { openDialog } = useContext(LayoutContext)
  const removeIssue = () => {
    openDialog('remove-issue', { id })
  }

  return (
    <SettingActionBox
      className={'border-red-500'}
      title={'Delete Issue'}
      description='The issue will be permanently deleted. This action is irreversible and can not be undone.'
      action={
        <button
          type='submit'
          className='rounded-md border border-red-600 
          bg-red-600 px-3 py-1 text-neutral-100
          transition-all duration-150 ease-linear 
          hover:bg-transparent 
          hover:text-red-600'
          onClick={removeIssue}
        >
          Delete
        </button>
      }
    />
  )
}

function SettingActionBox({
  className = '',
  title,
  description,
  action,
  children
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border-2 border-[#282828]
      bg-[#1f1f1f] ${className}`}
    >
      <div className='space-y-2 p-6'>
        <h5 className='text-xl font-bold text-neutral-100'>{title}</h5>
        <p className='text-sm'>{description}</p>
        {children}
      </div>

      <footer className='flex justify-end bg-neutral-800 px-6 py-3'>
        {action}
      </footer>
    </div>
  )
}
