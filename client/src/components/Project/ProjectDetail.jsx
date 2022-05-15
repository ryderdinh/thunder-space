import { AnnotationIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { actFetchProject, actQueryProject } from 'actions'
import 'assets/css/project.css'
import Col from 'components/Layouts/Col'
import Row from 'components/Layouts/Row'
import { LayoutContext } from 'context/LayoutContext'
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import MenuItem from './MenuItem'
import ProjectSelector from './ProjectSelector'
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
  const { openDialog } = useContext(LayoutContext)
  const { _dataProject, _dataProjects, isLoading } = useSelector(
    (state) => state._project
  )
  const dispatch = useDispatch()

  const { pid } = useParams()
  const history = useHistory()

  const [selected, setSelected] = useState({})
  const [query, setQuery] = useState('')

  const getListProjects = () =>
    _dataProjects.map(({ _id, name, code }) => ({
      _id,
      name,
      code,
      onClick: function () {
        history.push(`/projects/${_id}`)
      }
    }))

  useEffect(() => {
    let { _id, code, name } = _dataProject
    setSelected({ _id, code, name })
  }, [_dataProject])

  useEffect(() => {
    Promise.all([dispatch(actQueryProject()), dispatch(actFetchProject(pid))])
  }, [dispatch, pid])

  // const [date, setDate] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: null,
  //     key: 'selection'
  //   }
  // ])

  // const config = genConfig()

  return (
    <div className='view-item project w-full space-y-3'>
      <Row className='flex justify-between'>
        <Col>
          <ProjectSelector
            list={getListProjects()}
            current={_dataProject}
            selected={selected}
            setSelected={setSelected}
            query={query}
            setQuery={setQuery}
          />
        </Col>
        <Col>
          <div className='flex justify-end gap-2'>
            <SearchBox placeholder={'Filter issues'} />
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
        <Col>
          {isLoading && (
            <p className='w-full py-14 text-center text-xs text-neutral-500'>
              Loading issues...
            </p>
          )}

          {!isLoading && !_dataProject?.issue?.length && (
            <p className='w-full py-14 text-center text-xs text-neutral-500'>
              No data
            </p>
          )}

          {!isLoading && _dataProject.issue?.length > 0 && (
            <div
              className='grid w-full grid-cols-1 gap-3 md:grid-cols-2
              xl:grid-cols-3'
            >
              {_dataProject.issue.map((item, index) => (
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
  return (
    <Link to={`/projects/${pid}/${data._id}`}>
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
          className='absolute right-4 top-4 w-6 text-zinc-500 transition-all 
                duration-200 group-hover:right-3'
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
