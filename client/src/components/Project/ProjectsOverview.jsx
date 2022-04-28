import { ChevronRightIcon } from '@heroicons/react/solid'
import { actQueryProject } from 'actions'
import 'assets/css/project.css'
import Col from 'components/Layouts/Col'
import Row from 'components/Layouts/Row'
import { LayoutContext } from 'context/LayoutContext'
import queryString from 'query-string'
import { useContext, useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import Avatar, { genConfig } from 'react-nice-avatar'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import MenuItem from './MenuItem'
import SearchBox from './SearchBox'

function ProjectsOverview() {
  const { openDialog } = useContext(LayoutContext)

  const { isLoading, _dataProjects } = useSelector((state) => state._project)
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState('')
  const [defaultSearchValue, setDefaultSearchValue] = useState('')
  const [projects, setProjects] = useState(
    useSelector((state) => state._project)._dataProjects
  )

  const history = useHistory()

  const config = genConfig()

  const optimizeText = (text) => {
    return text.trim().replace(/\s/g, '')
  }

  const handleSearch = (value) => {
    if (value === searchValue) return

    let optimizeTextValue = optimizeText(value)
    setSearchValue(optimizeTextValue)
    history.push(`${history.location.pathname}?project=${optimizeTextValue}`)
  }

  const handleOpenDialog = () => {
    openDialog('create-project')
  }

  useEffect(() => {
    const query = queryString.parse(history.location.search)

    if ('project' in query) {
      setDefaultSearchValue(query.project)
    }
  }, [history.location.search])

  useEffect(() => {
    dispatch(actQueryProject())
  }, [dispatch])

  useEffect(() => {
    if (searchValue) {
      let data = _dataProjects.filter((project) => {
        let optimizeTextValue = optimizeText(searchValue)

        return optimizeTextValue.includes(project.name)
      })

      setProjects(data)
    } else {
      setProjects(_dataProjects)
    }
  }, [_dataProjects, searchValue])

  return (
    <div className='view-item project w-full space-y-3'>
      <Row className='flex justify-between'>
        <Col></Col>
        <Col>
          <div className='flex justify-end gap-2'>
            <SearchBox
              placeholder={'Filter project'}
              handleSearch={handleSearch}
              defaultValue={defaultSearchValue}
            />
            {/* <MenuComponent addDialogName={'create-project'} /> */}

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

          {!isLoading && !_dataProjects.length && (
            <p className='w-full py-14 text-center text-xs text-neutral-500'>
              No data
            </p>
          )}

          {!isLoading && _dataProjects.length > 0 && (
            <div
              className='grid w-full grid-cols-1 gap-3 md:grid-cols-2
              xl:grid-cols-3'
            >
              {projects.map((project) => (
                <ProjectItemGrid
                  key={project._id}
                  config={config}
                  projectOverview={project}
                />
              ))}
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default ProjectsOverview

function ProjectItemGrid({ config, projectOverview }) {
  return (
    <Link to={`/projects/${projectOverview._id}`}>
      <div
        className='card-panel group relative flex h-36 w-full 
                    cursor-pointer rounded-md border duration-150 ease-in-out'
      >
        <div className='mr-4 flex flex-col'>
          <Avatar
            className='h-8 w-8 transition-all group-hover:scale-110'
            {...config}
          />
        </div>
        <div className='flex w-4/5 flex-col justify-between space-y-2'>
          <div className='h-3/4 space-y-2'>
            <h5 className='font-medium text-zinc-200'>
              {projectOverview.name}
            </h5>
            <p className='text-sm text-zinc-500 line-clamp-2'>
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
    </Link>
  )
}
