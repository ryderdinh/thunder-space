import IssueComment from './IssueComment'
import IssueDescription from './IssueDescription'
import IssueDetail from './IssueDetail'
import IssueFiles from './IssueFiles'
import IssueHistory from './IssueHistory'
import IssuePreview from './Preview'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, PencilIcon } from '@heroicons/react/solid'
import {
  actDeleteIssue,
  actFetchProject,
  actQueryIssue,
  actUpdateIssue
} from 'actions'
import { Breadcumb } from 'components/Breadcumb/Breadcumb'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import { Col, Row } from 'components/Layouts'
import MenuComponent from 'components/Project/MenuComponent'
import MenuItem from 'components/Project/MenuItem'
import { LayoutContext } from 'context/LayoutContext'
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import variantGlobal from 'units/variantGlobal'

export default function Issue() {
  //? Connect redux
  const { _dataProject } = useSelector((state) => state._project)
  const {
    _data: _dataIssue,
    isLoading,
    error
  } = useSelector((state) => state._issue)
  const dispatch = useDispatch()

  //? Connect router
  const history = useHistory()
  const { pid, iid } = useParams()

  //? State
  const [breadcumbs, setBreadcumbs] = useState([
    {
      name: 'Projects',
      link: '/projects'
    }
  ])
  const [description, setDescription] = useState({
    data: ''
  })
  const [attachments, setAttachments] = useState([])
  const [descriptionPanel, setDescriptionPanel] = useState({
    edit: false,
    loading: false
  })
  const [isErr, setIsErr] = useState(false)
  const [loadingDescription, setLoadingDescription] = useState(false)

  //? Function
  const handleDescriptionDataChange = (data) => {
    setDescription({ ...description, data })
  }

  const handleAttachmentChange = (newFile) => {
    setAttachments([...attachments, newFile])
  }

  const uploadAttachments = () => {}

  const handleDescriptionPanel = (type) => {
    !type &&
      setDescriptionPanel({
        ...descriptionPanel,
        edit: !descriptionPanel.edit
      })

    const onSuccess = () => {
      setLoadingDescription(false)

      setDescriptionPanel({
        ...descriptionPanel,
        edit: !descriptionPanel.edit
      })
    }

    const onError = () => {
      setLoadingDescription(false)

      setDescriptionPanel({
        ...descriptionPanel,
        edit: descriptionPanel.edit
      })
    }
    if (type && _dataIssue.description !== description) {
      setLoadingDescription(true)
      dispatch(
        actUpdateIssue(
          iid,
          { description: description.data },
          onSuccess,
          onError
        )
      )
    }
  }

  const deleteIssue = () => {
    dispatch(
      actDeleteIssue(iid, () => {
        history.push(`/projects/${pid}`)
      })
    )
  }

  //? Effect
  useEffect(() => {
    Promise.all([
      dispatch(
        actFetchProject(
          pid,
          () => setIsErr(false),
          () => setIsErr(true)
        )
      ),
      dispatch(actQueryIssue(iid))
    ])
  }, [pid, iid, dispatch])

  useEffect(() => {
    setBreadcumbs([
      {
        name: 'Projects',
        link: '/projects'
      },
      {
        name: _dataProject?.code,
        link: `/projects/${pid}`
      },
      {
        name: _dataIssue?.code,
        link: `/projects/${pid}/${iid}`
      }
    ])
  }, [_dataProject?.code, _dataIssue?.code, pid, iid])

  return (
    <div className='relative h-full w-full space-y-5'>
      {(error === 'issue does not exist' || isErr) && (
        <motion.div
          variants={variantGlobal(4, 0.1)}
          initial='initial'
          animate='enter'
          exit='exit'
        >
          <p className='w-full pt-14 pb-5 text-center text-lg text-neutral-500'>
            The issue does not exist.
          </p>
          <Link to={'/projects'}>
            <button
              className='m-auto block 
              rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold 
              leading-6 text-neutral-50 shadow'
            >
              Return to projects
            </button>
          </Link>
        </motion.div>
      )}

      {error !== 'issue does not exist' && !isErr && (
        <>
          <Row
            className='sticky top-10 z-10 flex rounded-md bg-deepdark p-2 
            md:static md:p-0'
          >
            <Col className='mb-2 w-full md:mb-0 md:w-1/2'>
              <Breadcumb list={breadcumbs} />
            </Col>

            <Col className='w-max md:w-1/2'>
              <div className='z-10 flex w-full justify-end gap-2'>
                <Menu dataProject={_dataIssue} deleteAction={deleteIssue} />
              </div>
            </Col>
          </Row>

          <Row className='grid h-[calc(100%-40px)] grid-cols-3 gap-5'>
            <Col className='col-span-3 space-y-5 md:col-span-1'>
              {isLoading && (
                <p className='w-full py-14 text-center text-xs text-neutral-500'>
                  Loading preview...
                </p>
              )}

              {!isLoading && (
                <IssuePreview
                  dataIssue={_dataIssue}
                  dataProject={_dataProject}
                />
              )}

              {!isLoading && <IssueDetail data={_dataIssue} />}
            </Col>
            <Col
              className='custom-scrollbar col-span-3 block h-full overflow-auto pr-0 
              md:col-span-2 md:overflow-y-scroll md:pr-2'
            >
              {isLoading && (
                <p className='w-full py-14 text-center text-xs text-neutral-500'>
                  Loading panels...
                </p>
              )}

              {!isLoading && (
                <div className='space-y-5'>
                  <DisclosureCustom delayShow={0.2} title={'Description'}>
                    <IssueDescription
                      content={_dataIssue.description}
                      show={descriptionPanel.edit}
                      onClick={handleDescriptionPanel}
                      onChange={handleDescriptionDataChange}
                    />

                    {!descriptionPanel.edit && (
                      <div
                        className='absolute top-0 left-0 -z-10 flex h-full 
                        w-full items-center justify-center space-x-1 
                        rounded-lg bg-neutral-500/50 opacity-0
                        transition-all duration-300 ease-linear 
                        group-hover:z-[1] group-hover:cursor-pointer 
                        group-hover:opacity-100'
                        onClick={() => handleDescriptionPanel(false)}
                      >
                        <PencilIcon className='h-6 w-6 text-neutral-200' />
                        <span className='text-neutral-200'>Edit</span>
                      </div>
                    )}

                    {descriptionPanel.edit && (
                      <div className='flex items-center justify-end pt-3'>
                        <ButtonSuccess
                          loading={loadingDescription}
                          onClick={() => handleDescriptionPanel(true)}
                        >
                          <p className='select-none'>Update</p>
                        </ButtonSuccess>
                      </div>
                    )}
                  </DisclosureCustom>

                  <DisclosureCustom delayShow={0.3} title={'Attachments'}>
                    <IssueFiles
                      data={_dataIssue?.attachment}
                      onFileChange={(files) => handleAttachmentChange(files)}
                      upload={uploadAttachments}
                    />
                  </DisclosureCustom>

                  <DisclosureCustom delayShow={0.4} title={'Comment'}>
                    <IssueComment data={_dataIssue?.comment} />
                  </DisclosureCustom>

                  <DisclosureCustom delayShow={0.5} title={'History'}>
                    <IssueHistory data={_dataIssue?.history} />
                  </DisclosureCustom>
                </div>
              )}
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

function Menu({ data }) {
  const history = useHistory()
  const location = useLocation()

  //? Connect context
  const { openDialog } = useContext(LayoutContext)

  return (
    <MenuComponent>
      <div className='px-1 py-1'>
        <MenuItem
          type='setting'
          onClick={() => {
            history.push(`${location.pathname}/settings`)
          }}
        />
      </div>
      <div className='px-1 py-1'>
        <MenuItem
          type='archive'
          onClick={() => {
            openDialog('archive-issue')
          }}
        />
      </div>
    </MenuComponent>
  )
}

function TitlePanel({ name, children }) {
  return (
    <div className='flex w-full justify-between'>
      <h3 className='text-lg font-bold text-neutral-50'>{name}</h3>
      {children}
    </div>
  )
}

function DisclosureCustom({
  children,
  title,
  customTitlePanel,
  delayShow = 0
}) {
  return (
    <motion.div
      className='group relative w-full rounded-lg border 
      border-[#282828] bg-[#1f1f1f]'
      variants={variantGlobal(4, delayShow)}
      initial='initial'
      animate='enter'
      exit='exit'
    >
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button
              className='flex w-full justify-between rounded-lg px-4 py-2 
              text-left text-sm font-medium'
            >
              <TitlePanel name={title}>
                <div className='flex items-center gap-2'>
                  {customTitlePanel && customTitlePanel}
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-neutral-200`}
                  />
                </div>
              </TitlePanel>
            </Disclosure.Button>

            <Disclosure.Panel className='group relative min-h-[200px] p-4'>
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </motion.div>
  )
}
