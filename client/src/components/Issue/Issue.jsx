import { AnnotationIcon } from '@heroicons/react/solid'
import { actFetchProject, actQueryIssue } from 'actions'
import { Breadcumb } from 'components/Breadcumb/Breadcumb'
import { Col, Row } from 'components/Layouts'
import MenuComponent from 'components/Project/MenuComponent'
import MenuItem from 'components/Project/MenuItem'
import { LayoutContext } from 'context/LayoutContext'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96], delay: 0 }
const variants = (delay) => {
  return {
    initial: { scale: 0.8, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition: { ...transition, delay } },
    exit: {
      scale: 0.7,
      opacity: 0,
      transition: { duration: 1, ...transition }
    }
  }
}

export default function Issue() {
  //? Connect redux
  const { _dataProject } = useSelector((state) => state._project)
  const { _data: _dataIssue } = useSelector((state) => state._issue)
  const dispatch = useDispatch()

  //? Connect router
  const { pid, iid } = useParams()

  //? State
  const [breadcumbs, setBreadcumbs] = useState([
    {
      name: 'Projects',
      link: '/projects'
    }
  ])

  useEffect(() => {
    Promise.all([
      dispatch(actFetchProject(pid)),
      dispatch(actQueryIssue(pid, iid))
    ])
  }, [pid, iid, dispatch])

  useEffect(() => {
    setBreadcumbs([
      {
        name: 'Projects',
        link: '/projects'
      },
      {
        name: _dataProject.name,
        link: `/projects/${pid}`
      },
      {
        name: _dataIssue.name,
        link: `/projects/${pid}/${iid}`
      }
    ])
  }, [_dataProject.name, _dataIssue.name, pid, iid])
  return (
    <div className='view-item project w-full space-y-3'>
      <Row className='md:flex'>
        <Col className='mb-2 w-full md:mb-0 md:w-1/2'>
          <Breadcumb list={breadcumbs} />
        </Col>
        <Col className='w-full md:w-1/2'>
          <div className='flex w-full justify-end gap-2'>
            <Menu dataProject={_dataIssue} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className='w-full md:w-1/3'>
          <div
            className='w-full rounded-md border-4 border-neutral-700 
            bg-neutral-800 p-3'
          >
            <div className='flex w-full items-center'>
              <div
                className='flex aspect-square w-1/5 max-w-[50px] items-center 
                justify-center rounded-full bg-emerald-600'
              >
                <AnnotationIcon
                  className='h-6 w-6 text-white transition-all 
                  group-hover:scale-110'
                />
              </div>
              <div className='ml-3 flex w-full flex-col gap-2'>
                <h3 className='text-xl font-bold capitalize text-white line-clamp-1'>
                  {_dataIssue.name}
                </h3>
                <p className='text-sm italic text-neutral-500'>
                  {_dataIssue.code}
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col className='w-full md:w-2/3'></Col>
      </Row>
    </div>
  )
}

function Menu({ data }) {
  //? Connect context
  const { openDialog } = useContext(LayoutContext)

  return (
    <MenuComponent>
      <div className='px-1 py-1'>
        <MenuItem
          type='edit'
          onClick={() => {
            openDialog('edit-issue')
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
      <div className='px-1 py-1'>
        <MenuItem
          type='delete'
          onClick={() => {
            openDialog('remove-issue', {
              issueName: data?.name,
              iid: data?._id
            })
          }}
        />
      </div>
    </MenuComponent>
  )
}
