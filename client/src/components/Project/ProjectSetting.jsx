import { Listbox, Transition } from '@headlessui/react'
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import {
  CheckIcon,
  ChevronDownIcon,
  DuplicateIcon,
  FilterIcon,
  SearchIcon
} from '@heroicons/react/solid'
import { joiResolver } from '@hookform/resolvers/joi'
import { actFetchProject, actUpdateIssue } from 'actions'
import { projectApi } from 'api'
import { Col, Dropdown, Row } from 'components/Layouts'
import BallTriangle from 'components/Loading/BallTriangle'
import { LayoutContext } from 'context/LayoutContext'
import { useInput } from 'hooks'
import Joi from 'joi'
import queryString from 'query-string'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCopyClipboard } from 'react-recipes'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import { successToast } from 'utilities/toast'

const permissions = {
  delete: false,
  changeName: false,
  changeRoleMember: false,
  addMember: false
}

const subTabs = [
  { name: 'General', tab: 'general' },
  { name: 'Collaborators', tab: 'collaborator' },
  { name: 'Security', tab: 'security' },
  { name: 'Advanced', tab: 'advanced' }
]

const schemaName = Joi.object({
  projectName: Joi.string().min(2).max(60)
})

export const ProjectSetting = () => {
  //? Connect redux
  const { _dataProject, isLoading, error } = useSelector(
    (state) => state._project
  )
  const { _id: ownId } = useSelector(
    (state) => state._staffInfomation._staffInfomation
  )
  const dispatch = useDispatch()

  //? Connect router
  const history = useHistory()
  const location = useLocation()
  const { pid } = useParams()

  //? State
  const [tab, setTab] = useState(
    queryString.parse(location.search)?.opt || 'general'
  )
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [own, setOwn] = useState({})

  //? Function
  const returnIssuePage = () => {
    history.push(location.pathname.replace('/settings', ''))
  }

  const permissionsAction = () => {
    if (own?.role === 'admin')
      return {
        ...permissions,
        delete: true,
        changeName: true,
        changeRoleMember: true,
        addMember: true
      }

    if (own?.role === 'manager')
      return { ...permissions, changeRoleMember: true, addMember: true }

    return { ...permissions }
  }

  //? Effect
  useEffect(() => {
    setTab(queryString.parse(location.search)?.opt || 'general')
  }, [location.search])

  useEffect(() => {
    dispatch(actFetchProject(pid))
  }, [pid, dispatch])

  useEffect(() => {
    if (error === 'project does not exist') {
      history.push(`/projects/${pid}`)
    }
  }, [error, history, pid])

  useEffect(() => {
    setOwn(_dataProject?.member?.find((user) => user._id === ownId))
  }, [_dataProject?.member, ownId])

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
                              duration-100 ease-in-out hover:bg-neutral-600 
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
                    <div className='h-full space-y-10'>
                      {(tab === 'general' || tab === '') && (
                        <GeneralTab
                          dataProject={_dataProject}
                          isLoading={isLoading}
                          error={error}
                          permissions={permissionsAction()}
                          ownId={ownId}
                        />
                      )}

                      {tab === 'collaborator' && (
                        <CollaboratorTab
                          dataProject={_dataProject}
                          isLoading={isLoading}
                          error={error}
                          permissions={permissionsAction()}
                          ownId={ownId}
                        />
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

function GeneralTab({ dataProject, isLoading, error, permissions }) {
  return (
    <>
      <ProjectName
        data={dataProject}
        isLoading={isLoading}
        permissions={permissions}
      />
      <ProjectID id={dataProject._id} />
      <DeleteProject
        id={dataProject._id}
        name={dataProject.name}
        permissions={permissions}
      />
    </>
  )
}

const typeOfUser = [
  { name: 'All', value: 1 },
  { name: 'Manager', value: 2 },
  { name: 'Member', value: 3 }
]

const typeOfMember = ['Manager', 'Member']

function CollaboratorTab({
  dataProject,
  isLoading,
  error,
  permissions,
  ownId
}) {
  //? Context
  const { openDialog } = useContext(LayoutContext)

  const dispatch = useDispatch()

  const [selected, setSelected] = useState(typeOfUser[0])
  const [memberId, setMemberId] = useState('')

  const { value: valueAddUser, bind: bindAddUser } = useInput('')
  const { value: valueSearchMember, bind } = useInput('')

  const handleFindEmail = () => {
    if (!valueAddUser) return

    permissionsAccept('addMember')

    console.log(valueAddUser)
  }

  const handleSelectedFilter = (value) => {
    setSelected(value)
  }
  const handleChangeRole = async (value) => {
    try {
      await projectApi.updateRole(
        dataProject._id,
        memberId,
        value === 'Manager' ? 1 : 2
      )

      dispatch(actFetchProject(dataProject._id))
    } catch (error) {
      error(error.message)
    }
  }
  const filterCollaborator = (member) => {
    let convertSelectVal =
      selected.value !== 1
        ? selected.value === 2
          ? 'manager'
          : 'member'
        : false
    let roleEdit = member.role
    if (roleEdit === 'normal') roleEdit = 'member'

    if (
      (member.name.includes(valueSearchMember) ||
        member.email.includes(valueSearchMember)) &&
      (!convertSelectVal || roleEdit === convertSelectVal)
    )
      return true

    return false
  }

  const sortCollaborator = (member1, member2) => {
    const getPoint = (value) => {
      return value === 'admin' ? 3 : value === 'manager' ? 2 : 1
    }

    return getPoint(member2.role) - getPoint(member1.role)
  }

  const permissionsAccept = (permissionName) => {
    const isAllow = permissions[permissionName] || false

    if (isAllow) return

    openDialog('denied-action', {
      title: 'Permissions denied',
      description: 'You are not permitted to perform this action'
    })
  }

  const dropdownChangeRole = (role, uid) => {
    if (role === 'admin')
      return (
        <div className='relative'>
          <button
            className='relative w-max cursor-pointer 
            space-x-1 pr-5 text-left text-xs
            font-light text-neutral-400 shadow-none focus:outline-none'
          >
            <span className='block truncate'>Admin</span>
          </button>
        </div>
      )

    return (
      <Dropdown
        list={typeOfMember}
        selected={capitalizeFirstLetter(role === 'normal' ? 'member' : role)}
        setSelected={handleChangeRole}
        onClickParent={() => setMemberId(uid)}
        onClickOption={() => permissionsAccept('changeRoleMember')}
      />
    )
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className='h-full'>
      <div className='space-y-7 p-6 pr-0'>
        <div className='space-y-3'>
          <div className='space-y-2'>
            <h5 className='text-xl font-bold text-neutral-100'>
              Collaborators
            </h5>
            <p className='text-sm'>
              Team members on project and can create issue or change their
              settings, depending on their permissions
            </p>
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div
              className='col-span-1 space-y-2 rounded-lg border-2
              border-[#282828] bg-[#1f1f1f] px-6 py-3'
            >
              <h6 className='text-base font-bold text-neutral-100'>Manager</h6>
              <p className='text-xs'>Can adjust everything in the project</p>
            </div>
            <div
              className='col-span-1 space-y-2 rounded-lg border-2
              border-[#282828] bg-[#1f1f1f] px-6 py-3'
            >
              <h6 className='text-base font-bold text-neutral-100'>Member</h6>
              <p className='text-xs'>Can add/modify their issues in project</p>
            </div>
          </div>
        </div>

        <div className='relative flex items-center gap-3'>
          <input
            type='email'
            className='block w-full rounded-md border 
            border-neutral-300 py-[7px] pl-3 text-sm 
            text-neutral-700 shadow-sm focus:border-emerald-500 
            focus:outline-none focus:ring-2 focus:ring-emerald-500'
            placeholder='Enter email address'
            {...bindAddUser}
          />

          <button
            type='submit'
            className='min-w-[100px] rounded-md border 
            border-emerald-600 bg-emerald-600 px-3 py-[7px]
            text-sm text-neutral-100 transition-all 
            duration-150 
            ease-linear 
            hover:bg-transparent
            hover:text-emerald-600  
            disabled:cursor-not-allowed
            disabled:border-neutral-400
            disabled:bg-transparent
            disabled:text-neutral-400 disabled:opacity-50'
            onClick={handleFindEmail}
          >
            Add
          </button>
        </div>

        <div
          className='rounded-lg border-2 border-[#282828]
          bg-[#1f1f1f]'
        >
          <div
            className='flex w-full items-center justify-between 
            rounded-lg rounded-b-none bg-[#282828] px-6 py-4'
          >
            <div className='relative flex w-60 items-center'>
              <input
                type='text'
                className='block w-full rounded-md border 
                border-neutral-300 py-[5px] pl-10 pr-3
                text-xs text-neutral-700 shadow-sm 
                focus:border-emerald-500 focus:outline-none focus:ring-2 
                focus:ring-emerald-500'
                placeholder='Find member'
                {...bind}
              />
              <div
                className='group absolute left-0 top-1/2 flex aspect-square 
                h-4 max-h-full -translate-y-1/2 transform
                items-center justify-center rounded-md px-3 
                transition-all duration-150 ease-linear'
              >
                <SearchIcon className='h-5 w-5 text-neutral-700' />
              </div>
            </div>

            <Listbox value={selected} onChange={handleSelectedFilter}>
              <div className='relative mt-1'>
                <Listbox.Button
                  className='relative w-full cursor-pointer 
                  py-2 pl-3 pr-6 text-left shadow-none 
                  focus:outline-none
                  sm:text-sm'
                >
                  <span className='block truncate'>{selected.name}</span>
                  <span
                    className='pointer-events-none absolute inset-y-0 
                    right-0 flex items-center'
                  >
                    <ChevronDownIcon
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options
                    className='absolute right-0 mt-1 max-h-60 w-max
                    overflow-auto rounded-md bg-neutral-50 py-1 text-base 
                    shadow-lg ring-1 ring-neutral-900 ring-opacity-5 
                    focus:outline-none sm:text-sm'
                  >
                    {typeOfUser.map((type, typeIdx) => (
                      <Listbox.Option
                        key={typeIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-1 pl-8 
                          pr-4 ${
                            active
                              ? 'bg-emerald-600 text-emerald-50'
                              : 'text-neutral-700'
                          }`
                        }
                        value={type}
                      >
                        {({ selected }) => {
                          return (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {type.name}
                              </span>
                              {selected ? (
                                <span
                                  className='absolute inset-y-0 left-0 
                                flex items-center pl-3 text-emerald-800'
                                >
                                  <CheckIcon
                                    className='h-4 w-4'
                                    aria-hidden='true'
                                  />
                                </span>
                              ) : null}
                            </>
                          )
                        }}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div className=''>
            {isLoading && (
              <div
                className='flex w-full items-center justify-center
                  border-t-2 border-[#282828] px-6 py-10'
              >
                <BallTriangle w={30} h={30} stroke={'#059669'} />
              </div>
            )}

            {!isLoading && !dataProject?.member?.length && (
              <div
                className='flex w-full items-center justify-center
                  border-t-2 border-[#282828] px-6 py-10'
              >
                <p
                  className='w-full text-center text-xs 
                  text-neutral-500'
                >
                  No collaborator
                </p>
              </div>
            )}

            {!isLoading &&
              dataProject?.member?.length &&
              dataProject.member
                ?.filter(filterCollaborator)
                .sort(sortCollaborator)
                .map((member) => (
                  <div
                    key={member._id}
                    className='flex items-center justify-between border-t-2
                  border-[#282828] px-6 py-3'
                  >
                    <div className='flex items-center space-x-3'>
                      <img
                        src={member.avatar}
                        alt='user avatar'
                        className='h-10 w-10 rounded-full object-cover'
                      />

                      <div className='space-y-1'>
                        <div
                          className='flex items-center space-x-2 text-sm 
                        font-medium text-neutral-50'
                        >
                          <span>{member.name}</span>
                          {ownId === member._id && (
                            <span
                              className='rounded-lg bg-emerald-600 px-2 py-[3px] 
                            text-[10px] leading-3 text-neutral-200'
                            >
                              You
                            </span>
                          )}
                        </div>

                        {dropdownChangeRole(member?.role, member._id)}
                      </div>
                    </div>
                    <div className='action text-xs'>Remove</div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
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

      <footer
        className='flex min-h-[58px] items-center justify-end 
        bg-neutral-800 px-6 py-3'
      >
        {action}
      </footer>
    </div>
  )
}

function ProjectName({ data: _dataProject, isLoading }) {
  //? Connect redux
  const dispatch = useDispatch()

  const [allowActionForm, setAllowActionForm] = useState({
    projectName: false
  })

  const { pid } = useParams()

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
  const projectNameInForm = watchName('projectName')

  const onSaveName = (data) => {
    !allowActionForm.projectName &&
      dispatch(actUpdateIssue(pid, { name: data.projectName }))
  }

  //? Effect
  useEffect(() => {
    const checkDuplicateName = (name = '') => {
      return name?.trim() === _dataProject?.name?.trim()
    }

    setAllowActionForm((prev) => ({
      ...prev,
      projectName: checkDuplicateName(projectNameInForm)
    }))
  }, [_dataProject?.name, projectNameInForm])

  useEffect(() => {
    setValueName('projectName', _dataProject?.name)
  }, [_dataProject?.name, setValueName])
  return (
    <SettingActionBox
      title={'Project Name'}
      description={'Used to identify Project'}
      action={
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
          disabled={allowActionForm.projectName}
          onClick={handleSubmitName(onSaveName)}
        >
          Save
        </button>
      }
    >
      <form className='w-full' onSubmit={handleSubmitName(onSaveName)}>
        <input
          {...registerName('projectName', {
            required: true
          })}
          type='text'
          className='mt-1 block w-full rounded-md border 
          border-neutral-300 py-[7px] pl-3 text-neutral-700 
          shadow-sm focus:border-emerald-500 focus:outline-none 
          focus:ring-2 focus:ring-emerald-500 
          disabled:cursor-not-allowed 
          disabled:opacity-70 sm:text-sm'
          placeholder='Project name...'
          disabled={isLoading}
        />

        {errorsName?.projectName && (
          <span className='text-xs italic text-red-500'>
            {errorsName?.projectName?.message}
          </span>
        )}
      </form>
    </SettingActionBox>
  )
}

function ProjectID({ id }) {
  const [, setIsCopied] = useCopyClipboard()

  const copyToClipboard = () => {
    setIsCopied(id)
    successToast('Copied to clipboard')
  }

  return (
    <SettingActionBox
      title='Project ID'
      description='Used to interacting'
      action={
        <>
          <span className='mr-1 text-sm'>Learn more</span>
          <a href='#project-id' className='text-sm hover:underline'>
            Project ID
          </a>
        </>
      }
    >
      <div className='relative'>
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

function DeleteProject({ id, name }) {
  const { openDialog } = useContext(LayoutContext)

  const removeProject = () => {
    openDialog('remove-project', {
      projectName: name,
      pid: id
    })
  }

  return (
    <SettingActionBox
      className={'border-red-500'}
      title={'Delete Project'}
      description='The project will be permanently deleted. This action is irreversible and can not be undone.'
      action={
        <button
          type='submit'
          className='rounded-md border border-red-600 
          bg-red-600 px-3 py-1 text-neutral-100
          transition-all duration-150 ease-linear 
          hover:bg-transparent 
          hover:text-red-600'
          onClick={removeProject}
        >
          Delete
        </button>
      }
    />
  )
}
