import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon
} from '@heroicons/react/outline'
import ButtonNormal from 'components/Button/ButtonNormal'

const TimesheetsHeader = ({ title, previous, next, returnPresent }) => {
  return (
    <div className='flex justify-between'>
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
    </div>
  )
}

export default TimesheetsHeader
