import { AnnotationIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { actFetchProject, actQueryProject, setInitialIssue } from 'actions'
import 'assets/css/project.css'
import { Breadcumb } from 'components/Breadcumb/Breadcumb'
import { Col, Row } from 'components/Layouts'
import { LayoutContext } from 'context/LayoutContext'
import { motion } from 'framer-motion'
import queryString from 'query-string'
import { useContext, useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import MenuItem from './MenuItem'
import SearchBox from './SearchBox'

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
export default function ProjectDetail() {
  //? Connect context
  const { openDialog } = useContext(LayoutContext)

  //? Connect redux
  const { _dataProject, _dataProjects, isLoading } = useSelector(
    (state) => state._project
  )
  const dispatch = useDispatch()

  //? Connect router
  const { pid } = useParams()
  const history = useHistory()

  //? State
  const [selected, setSelected] = useState({})
  const [query, setQuery] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [defaultSearchValue, setDefaultSearchValue] = useState('')
  const [issues, setIssues] = useState(_dataProject.issue)
  const [breadcumbs, setBreadcumbs] = useState([])

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
    let { _id, code, name } = _dataProject
    setSelected({ _id, code, name })
  }, [_dataProject])

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
    if (searchValue) {
      let data = _dataProject.issue.filter((issue) => {
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
      setIssues(_dataProject.issue)
    }
  }, [_dataProject.issue, searchValue])

  useEffect(() => {
    setBreadcumbs(() => [
      {
        name: 'Projects',
        link: '/projects'
      },
      {
        name: _dataProject.name,
        link: `/projects/${_dataProject._id}`
      }
    ])
  }, [_dataProject.name, _dataProject._id])

  return (
    <div className='view-item project w-full space-y-3'>
      <Row className='md:flex'>
        <Col className='mb-2 w-full md:mb-0 md:w-1/2'>
          <Breadcumb list={breadcumbs} />
          {/* <div className='flex items-center gap-2'>
            <WorkflowBreadcumbItemSelector
              list={getListProjects()}
              current={_dataProject}
              selected={selected}
              setSelected={setSelected}
              query={query}
              setQuery={setQuery}
            />
          </div> */}
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
      <Row>
        <Col>
          <div
            className='grid grid-cols-1 gap-3 md:grid-cols-2
              xl:grid-cols-3 2xl:grid-cols-4'
          >
            {/* <DefinedRange
                onChange={(item) => setState([item.selection])}
                ranges={state}
              />
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
              /> */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className='w-full'>
          {isLoading && (
            <p className='w-full py-14 text-center text-xs text-neutral-500'>
              Loading issues...
            </p>
          )}

          {!isLoading && !issues?.length && (
            <p className='w-full py-14 text-center text-xs text-neutral-500'>
              No data
            </p>
          )}

          {!isLoading && issues?.length > 0 && (
            <div
              className='grid w-full grid-cols-1 gap-3 md:grid-cols-2
              xl:grid-cols-3'
            >
              {issues.map((item, index) => (
                <IssueGridItem
                  key={item._id.toString()}
                  pid={pid}
                  data={item}
                  variants={variants(index * 0.1)}
                />
              ))}
            </div>
          )}
        </Col>
      </Row>
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
          <AnnotationIcon className='h-8 w-8 transition-all group-hover:scale-110' />
        </div>
        <div className='flex w-4/5 flex-col justify-between space-y-2'>
          <div className='h-3/4 space-y-2'>
            <h5 className='font-medium text-zinc-200'>{data.name}</h5>
            <p className='text-sm text-zinc-500 line-clamp-2'>
              {data.description ? data.description : 'No description'}
            </p>
          </div>
          <div className=''>
            <code
              className={`${
                data.type === 'task' ? 'bg-emerald-500' : 'bg-red-500'
              } text-xs text-white`}
            >
              {data.type}
            </code>
          </div>
        </div>
        <div
          className='6duration-200 absolute right-4 top-4 w-6 text-zinc-500 
          transition-all group-hover:right-3'
        >
          <ChevronRightIcon className='' />
        </div>
      </motion.div>
    </Link>
  )
}

function Menu({ openDialog, dataProject }) {
  return (
    <MenuComponent>
      <div className='px-1 py-1'>
        <MenuItem
          type='add'
          onClick={() => {
            openDialog('create-issue')
          }}
        />

        <MenuItem
          type='edit'
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
          type='delete'
          onClick={() => {
            openDialog('remove-project', {
              projectName: dataProject?.name,
              pid: dataProject?._id
            })
          }}
        />
      </div>
    </MenuComponent>
  )
}
