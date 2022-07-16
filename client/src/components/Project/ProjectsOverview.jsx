import { ChevronRightIcon } from '@heroicons/react/solid'
import { actQueryProject, setInitialProject } from 'actions'
import 'assets/css/project.css'
import { Breadcumb } from 'components/Breadcumb/Breadcumb'
import { Col, Row } from 'components/Layouts'
import { LayoutContext } from 'context/LayoutContext'
import { motion } from 'framer-motion'
import queryString from 'query-string'
import { useContext, useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import Avatar, { genConfig } from 'react-nice-avatar'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import variantGlobal from 'units/variantGlobal'
import MenuComponent from './MenuComponent'
import MenuItem from './MenuItem'
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

  useEffect(() => {
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
      <Row className='md:flex'>
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

            <MenuComponent>
              <div className='px-1 py-1'>
                <MenuItem onClick={handleOpenDialog} type={'add'} />
              </div>
            </MenuComponent>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoading && (
            <p className='w-full py-14 text-center text-xs text-neutral-500'>
              Loading projects...
            </p>
          )}

          {!isLoading && !projects.length && (
            <p className='w-full py-14 text-center text-xs text-neutral-500'>
              No data
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
                  variants={variantGlobal(3, index * 0.1)}
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
          <div className='mr-4 flex flex-col'>
            <Avatar
              className='h-8 w-8 transition-all group-hover:scale-110'
              {...config}
            />
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
            <div className=''>
              <div className='relative left-1 flex -space-x-1'>
                {projectOverview.member.map((member, index) => (
                  <div
                    className='relative inline-block h-6 w-6 overflow-hidden rounded-full ring-2 ring-white'
                    key={index}
                  >
                    <img
                      className='relative z-10 h-full w-full'
                      src={member.avatar}
                      alt=''
                    />
                    <div className='absolute top-0 left-0 z-0 h-full w-full bg-neutral-800'></div>
                  </div>
                ))}
              </div>
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
