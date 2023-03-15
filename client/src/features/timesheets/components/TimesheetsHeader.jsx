import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon
} from '@heroicons/react/outline'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import ButtonNormal from 'components/Button/ButtonNormal'

const TimesheetsHeader = ({ title, previous, next, returnPresent }) => {
  return (
    <div className='flex flex-wrap justify-between'>
      <div className='space-y-1'>
        <div className='flex items-center gap-2'>
          <ButtonNormal onClick={previous}>
            <ArrowNarrowLeftIcon className='w-4' />
          </ButtonNormal>

          <ButtonNormal onClick={returnPresent}>Present</ButtonNormal>

          <ButtonNormal onClick={next}>
            <ArrowNarrowRightIcon className='w-4' />
          </ButtonNormal>
        </div>
        <h4 className='text-xl font-bold text-neutral-50'>{title}</h4>
      </div>
      <div className='flex items-end gap-2 text-sm text-neutral-200'>
        <div className='flex items-center'>
          <BadgeCheckIcon className='w-4 text-emerald-600' />:
        </div>
        <p className='font-bevn'>Complete the day mission</p>
      </div>
    </div>
  )
}

export default TimesheetsHeader
