import { ChevronRightIcon, PlusIcon } from '@heroicons/react/solid'
import { actQueryProject, setInitialProject } from 'actions'
import 'assets/css/project.css'
import { Breadcumb } from 'components/Breadcumb/Breadcumb'
import { Col, Row } from 'components/Layouts'
import BallTriangle from 'components/Loading/BallTriangle'
import { LayoutContext } from 'context/LayoutContext'
import { motion } from 'framer-motion'
import queryString from 'query-string'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { genConfig } from 'react-nice-avatar'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import variantGlobal from 'units/variantGlobal'
import SearchBox from './SearchBox'

export default function ProjectsOverview() {
  const { openDialog } = useContext(LayoutContext)

  const { isLoading, _dataProjects } = useSelector((state) => state._project)
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState('')
  const [defaultSearchValue, setDefaultSearchValue] = useState('')
  const [projects, setProjects] = useState(_dataProjects)
  const [breadcumbs] = useState([
    {
      name: 'Projects',
      link: '/projects'
    }
  ])

  const history = useHistory()

  const config = genConfig()

  const optimizeText = (text) => {
    return text.trim().replace(/\s/g, '').toLowerCase()
  }

  const handleSearch = (value) => {
    if (value === searchValue) return
    setSearchValue(value)

    history.push(`${history.location.pathname}?search=${value}`)
  }

  const handleOpenDialog = () => {
    openDialog('create-project')
  }

  useEffect(() => {
    const query = queryString.parse(history.location.search)

    if ('search' in query) {
      setDefaultSearchValue(query.search)
    }
  }, [history.location.search])

  useLayoutEffect(() => {
    dispatch(actQueryProject())
  }, [dispatch])

  useEffect(() => {
    if (searchValue) {
      let data = _dataProjects.filter((project) => {
        let optimizeTextValue = optimizeText(searchValue)
        let optimizeProjectName = optimizeText(project.name)
        let optimizeProjectCode = optimizeText(project.code)

        return (
          optimizeProjectName.includes(optimizeTextValue) ||
          optimizeProjectCode.includes(optimizeTextValue)
        )
      })

      setProjects(data)
    } else {
      setProjects(_dataProjects)
    }
  }, [_dataProjects, searchValue])

  return (
    <div className='view-item project w-full space-y-3'>
      <Row
        className='view-row sticky top-0 z-10 bg-deepdark pb-3 
        transition-all duration-500 ease-linear md:flex'
      >
        <Col className='mb-2 w-full md:mb-0 md:w-1/2'>
          <Breadcumb list={breadcumbs} />
        </Col>
        <Col className='w-full md:w-1/2'>
          <div className='flex w-full justify-end gap-2'>
            <SearchBox
              placeholder={'Filter projects'}
              handleSearch={handleSearch}
              defaultValue={defaultSearchValue}
            />
            <button
              className='panel inline-flex h-9 w-max items-center 
              justify-center gap-1 rounded-md bg-opacity-20 py-2 px-4
              text-sm font-medium text-neutral-200 outline-none
              transition-all 
              duration-200
              ease-in-out
              hover:bg-opacity-30 
              hover:text-neutral-100
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-white 
              focus-visible:ring-opacity-75'
              onClick={handleOpenDialog}
            >
              <PlusIcon className='h-5 w-5' aria-hidden='true' />
              <p className='truncate'>Add Project</p>
            </button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoading && (
            <div className='flex w-full justify-center px-6 py-14'>
              <BallTriangle w={30} h={30} stroke={'#059669'} />
            </div>
          )}

          {!isLoading && !projects.length && (
            <p className='w-full py-14 text-center text-xs text-neutral-500'>
              Nothing found
            </p>
          )}

          {!isLoading && projects.length > 0 && (
            <div
              className='grid w-full grid-cols-1 gap-3 md:grid-cols-2
              xl:grid-cols-3'
            >
              {projects.map((project, index) => (
                <ProjectItemGrid
                  key={project._id}
                  config={config}
                  projectOverview={project}
                  variants={variantGlobal(3, index * 0.05)}
                />
              ))}
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

function ProjectItemGrid({ config, projectOverview, variants }) {
  const dispatch = useDispatch()
  const initDataPreviewProject = () => {
    dispatch(
      setInitialProject({
        name: projectOverview.name,
        code: projectOverview.code,
        _id: projectOverview._id
      })
    )
  }

  return (
    <Link
      to={`/projects/${projectOverview._id}`}
      onClick={initDataPreviewProject}
    >
      <motion.div
        className='card-panel-a group relative flex h-36 w-full 
        cursor-pointer overflow-hidden rounded-md border
        duration-150 ease-in-out'
        variants={variants}
        initial='initial'
        animate='enter'
        exit='exit'
      >
        <div
          className='mr-4 flex w-6 flex-col items-center justify-center 
          bg-emerald-600 py-4'
        >
          <p
            className='-rotate-90 truncate text-sm font-medium uppercase 
            text-neutral-200'
          >
            {projectOverview.code}
          </p>
        </div>
        <div className='flex w-full p-4 pl-0'>
          <div className='mr-4'>
            <div
              className='relative top-1 flex flex-col -space-y-1 
              transition-all duration-100 group-hover:scale-110'
            >
              {projectOverview.member.map((member, index) =>
                index > 5 ? null : (
                  <div
                    className='relative z-[2] inline-block h-6 w-6 
                    overflow-hidden rounded-full ring-2 
                    ring-[color:var(--background-panel)]'
                    key={index}
                  >
                    <img
                      className='relative h-full w-full object-cover'
                      src={member.avatar}
                      alt=''
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <div className='flex w-4/5 flex-col justify-between space-y-2'>
            <div className='h-3/4 space-y-2'>
              <h5 className='font-medium text-neutral-200 line-clamp-1'>
                {projectOverview.name}
              </h5>
              <p className='text-sm text-neutral-500 line-clamp-2'>
                {projectOverview?.description
                  ? projectOverview?.description
                  : 'No description'}
              </p>
            </div>
            <div className='flex items-center'>
              <code className={`!ml-0 text-xs text-neutral-50`}>
                {projectOverview.issue.length} issues
              </code>
            </div>
          </div>

          <div
            className='absolute right-4 top-4 w-6 text-zinc-500 transition-all 
            duration-200 group-hover:right-3'
          >
            <ChevronRightIcon className='' />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
