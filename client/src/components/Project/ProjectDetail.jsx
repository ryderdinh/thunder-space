import { ChevronRightIcon } from '@heroicons/react/solid'
import { actFetchProject } from 'actions'
import 'assets/css/project.css'
import Col from 'components/Layouts/Col'
import Row from 'components/Layouts/Row'
import { LayoutContext } from 'context/LayoutContext'
import { useContext, useEffect } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import MenuItem from './MenuItem'
import ProjectSelector from './ProjectSelector'
import SearchBox from './SearchBox'

export default function ProjectDetail({ variant }) {
  const { openDialog } = useContext(LayoutContext)
  const { _dataProject, isLoading } = useSelector((state) => state._project)
  const dispatch = useDispatch()
  const { pid } = useParams()

  useEffect(() => {
    dispatch(actFetchProject(pid))
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
          <ProjectSelector />
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

          {!isLoading && _dataProject?.length > 0 && (
            <div
              className='grid w-full grid-cols-1 gap-3 md:grid-cols-2
              xl:grid-cols-3'
            >
              {_dataProject.issue.map((item) => (
                <IssueGridItem data={item} key={item._id.toString()} />
              ))}
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

function IssueGridItem({ data }) {
  return (
    <Link to={`/projects/12345/${12}`}>
      <div
        className='card-panel group relative flex h-36 w-full 
              cursor-pointer rounded-md border duration-150 ease-in-out'
      >
        <div className='mr-4 flex flex-col'>
          <img
            src=''
            className='h-8 w-8 transition-all group-hover:scale-110'
            alt='avatar'
          />
        </div>
        <div className='flex w-4/5 flex-col justify-between space-y-2'>
          <div className='h-3/4 space-y-2'>
            <h5 className='font-medium text-zinc-200'>Edit task</h5>
            <p className='text-sm text-zinc-500 line-clamp-2'>
              React Native Todo List example with ExpoReact Native Todo List
              example with Expo React Native Todo List example with ExpoReact
              Native Todo List example with Expo
            </p>
          </div>
          <div className=''>
            <code className='bg-emerald-500 text-xs text-white'>task</code>
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
