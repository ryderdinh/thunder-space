import { ChevronRightIcon } from '@heroicons/react/solid'
import 'assets/css/project.css'
import Col from 'components/Layouts/Col'
import Row from 'components/Layouts/Row'
import { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Avatar, { genConfig } from 'react-nice-avatar'
import { Link } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import ProjectSelector from './ProjectSelector'
import SearchBox from './SearchBox'

function ProjectDetail({ variant }) {

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ])

  const config = genConfig()

  return (
    <div className='view-item project w-full space-y-3'>
      <Row className='flex justify-between'>
        <Col>
          <ProjectSelector />
        </Col>
        <Col>
          <div className='flex justify-end gap-2'>
            <SearchBox placeholder={'Filter issues'} />
            <MenuComponent addDialogName={'create-issue'} />
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
          <div
            className='grid w-full grid-cols-1 gap-3 md:grid-cols-2
            xl:grid-cols-3'
          >
            <Link to={`/projects/12345/asas`}>
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
                    <h5 className='font-medium text-zinc-200'>Edit task</h5>
                    <p className='text-sm text-zinc-500 line-clamp-2'>
                      React Native Todo List example with ExpoReact Native Todo
                      List example with Expo React Native Todo List example with
                      ExpoReact Native Todo List example with Expo
                    </p>
                  </div>
                  <div className=''>
                    <code className='bg-emerald-500 text-xs text-white'>
                      task
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
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProjectDetail
