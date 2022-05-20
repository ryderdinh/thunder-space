import { Fragment } from 'react'
import { BreadcumbItem } from './BreadcumbItem'

export const Breadcumb = ({ list }) => {
  return (
    <div className='flex items-center gap-2'>
      {list.map((item, index) =>
        index === list.length - 1 ? (
          <BreadcumbItem key={index} link={item.link} name={item.name} />
        ) : (
          <Fragment key={index}>
            <BreadcumbItem link={item.link} name={item.name} />
            <p className='text-xs text-neutral-50 md:text-base'>/</p>
          </Fragment>
        )
      )}
    </div>
  )
}
