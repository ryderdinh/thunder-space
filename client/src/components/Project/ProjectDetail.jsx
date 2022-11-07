import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { actFetchProject, actQueryProject, setInitialIssue } from 'actions'
import 'assets/css/project.css'
import { Breadcumb } from 'components/Breadcumb/Breadcumb'
import { Col, Row } from 'components/Layouts'
import BallTriangle from 'components/Loading/BallTriangle'
import { LayoutContext } from 'context/LayoutContext'
import { motion } from 'framer-motion'
import queryString from 'query-string'
import { useContext, useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import variantGlobal from 'units/variantGlobal'
import MenuComponent from './MenuComponent'
import MenuItem from './MenuItem'
import SearchBox from './SearchBox'

export default function ProjectDetail() {
  //? Connect context
  const { openDialog } = useContext(LayoutContext)

  //? Connect redux
  const { _dataProject, isLoading, error } = useSelector(
    (state) => state._project
  )
  const dispatch = useDispatch()

  //? Connect router
  const { pid } = useParams()
  const history = useHistory()

  //? State
  const [searchValue, setSearchValue] = useState('')
  const [defaultSearchValue, setDefaultSearchValue] = useState('')
  const [issues, setIssues] = useState(_dataProject?.issue || [])
  const [breadcumbs, setBreadcumbs] = useState([])

  //? Ref
  const [rf] = useAutoAnimate()

  //? Variable
  // const getListProjects = () =>
  //   _dataProjects.map(({ _id, name, code }) => ({
  //     _id,
  //     name,
  //     code,
  //     onClick: function () {
  //       const currPid = pid
  //       if (pid !== _id) {
  //         Promise.all([
  //           dispatch(setProjectLoading(true)),
  //           dispatch(setInitialProject({ _id, name: '...', code }))
  //         ]).then(() => {
  //           history.push(`/projects/${_id}`)
  //           setTimeout(() => {
  //             if (_id !== currPid) history.push(`/projects/${_id}`)
  //           }, 2000)
  //         })
  //       }
  //     }
  //   }))

  const optimizeText = (text) => {
    return text.trim().replace(/\s/g, '').toLowerCase()
  }

  const handleSearch = (value) => {
    if (value === searchValue) return

    setSearchValue(value)

    history.push(`${history.location.pathname}?search=${value}`)
  }

  //? Effect
  useEffect(() => {
    Promise.all([dispatch(actQueryProject()), dispatch(actFetchProject(pid))])
  }, [dispatch, pid])

  useEffect(() => {
    const query = queryString.parse(history.location.search)

    if ('search' in query) {
      setDefaultSearchValue(query.search)
    }
  }, [history.location.search])

  useEffect(() => {
    let dataIssue = _dataProject?.issue
    if (searchValue) {
      let data = dataIssue.filter((issue) => {
        let optimizeTextValue = optimizeText(searchValue)
        let optimizeProjectName = optimizeText(issue.name)
        let optimizeProjectCode = optimizeText(issue.code)

        return (
          optimizeProjectName.includes(optimizeTextValue) ||
          optimizeProjectCode.includes(optimizeTextValue)
        )
      })

      setIssues(data)
    } else {
      setIssues(dataIssue)
    }
  }, [_dataProject?.issue, searchValue])

  useEffect(() => {
    setBreadcumbs(() => [
      {
        name: 'Projects',
        link: '/projects'
      },
      {
        name: _dataProject?.code,
        link: `/projects/${_dataProject?._id}`
      }
    ])
  }, [_dataProject?.code, _dataProject?._id])

  return (
    <div className='view-item project w-full space-y-5'>
      {(!_dataProject || error === 'something went wrong') && (
        <motion.div
          variants={variantGlobal(4, 0.1)}
          initial='initial'
          animate='enter'
          exit='exit'
        >
          <p className='w-full pt-14 pb-5 text-center text-lg text-neutral-500'>
            The project does not exist.
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

      {_dataProject && (
        <>
          <Row className='md:flex'>
            <Col className='mb-2 w-full md:mb-0 md:w-1/2'>
              <Breadcumb list={breadcumbs} />
            </Col>
            <Col className='w-full md:w-1/2'>
              <div className='flex w-full justify-end gap-2'>
                <SearchBox
                  placeholder={'Filter issues'}
                  handleSearch={handleSearch}
                  defaultValue={defaultSearchValue}
                />
                <Menu openDialog={openDialog} dataProject={_dataProject} />
              </div>
            </Col>
          </Row>
          {/* <Row>
        <Col>
          <div
            className='grid grid-cols-1 gap-3 md:grid-cols-2
              xl:grid-cols-3 2xl:grid-cols-4'
          >
            <DefinedRange
                onChange={(item) => setState([item.selection])}
                ranges={state}
              />
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
          </div>
        </Col>
      </Row> */}
          <Row>
            <Col className='w-full'>
              <div ref={rf}>
                {isLoading && (
                  <div className='flex w-full justify-center px-6 py-14'>
                    <BallTriangle w={30} h={30} stroke={'#059669'} />
                  </div>
                )}

                {issues?.length > 0 ? (
                  <div
                    className='grid w-full grid-cols-1 gap-3 md:grid-cols-2
                    xl:grid-cols-3'
                  >
                    {issues.map((item, index) => (
                      <IssueGridItem
                        key={item._id.toString()}
                        pid={pid}
                        data={item}
                        variants={variantGlobal(3, index * 0.1)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className='w-full py-14 text-center text-xs text-neutral-500'>
                    Nothing found
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

function IssueGridItem({ data, pid, variants }) {
  const dispatch = useDispatch()
  const initDataPreviewIssue = () => {
    dispatch(
      setInitialIssue({
        name: data.name,
        code: data.code,
        _id: data._id
      })
    )
  }

  return (
    <Link to={`/projects/${pid}/${data._id}`} onClick={initDataPreviewIssue}>
      <motion.div
        className='card-panel group relative flex h-36 w-full 
        cursor-pointer rounded-md border duration-150 ease-in-out'
        variants={variants}
        initial='initial'
        animate='enter'
        exit='exit'
      >
        <div className='mr-4 flex flex-col'>
          <div
            className='h-8 w-8 overflow-hidden rounded-full transition-all
            duration-100 group-hover:scale-110'
          >
            <img src={data.creator.avatar} alt='' />
          </div>
        </div>
        <div className='flex w-4/5 flex-col justify-between space-y-2'>
          <div className='h-2/4 space-y-2'>
            <h5 className='font-medium text-neutral-200 line-clamp-2'>
              {data.name}
            </h5>
          </div>
          <div className='flex h-2/4 items-end'>
            <code
              className={`${
                data.type === 'task' ? 'bg-emerald-500' : 'bg-red-500'
              } text-xs text-neutral-50`}
            >
              {data.type}
            </code>
          </div>
        </div>
        <div
          className='6duration-200 absolute right-4 top-4 w-6 text-neutral-500 
          transition-all group-hover:right-3'
        >
          <ChevronRightIcon className='' />
        </div>
      </motion.div>
    </Link>
  )
}

function Menu({ openDialog, dataProject }) {
  const history = useHistory()
  const location = useLocation()

  return (
    <MenuComponent>
      <div className='px-1 py-1'>
        <MenuItem
          type='add'
          onClick={() => {
            openDialog('create-issue')
          }}
        />
      </div>
      <div className='px-1 py-1'>
        <MenuItem
          type='archive'
          onClick={() => {
            openDialog('create-issue')
          }}
        />
      </div>
      <div className='px-1 py-1'>
        <MenuItem
          type='setting'
          onClick={() => {
            history.push(`${location.pathname}/settings`)
          }}
        />
      </div>
    </MenuComponent>
  )
}
