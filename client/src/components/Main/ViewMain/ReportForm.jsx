import reportApi from 'api/reportApi'
import { motion } from 'framer-motion'
import moment from 'moment'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

//? Create Variable
const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
const variants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { duration: 1.5, ...transition }
  }
}

const ReportForm = () => {
  const [state, setState] = useState({
    halfDay: 'col setDate d-none',
    severalDays: 'col setDate',
    start: '',
    end: '',
    date: '',
    reportContent: '',
    act1: '',
    act2: 'active'
  })

  useEffect(() => {
    document.title = 'Báo cáo'
  }, [])

  const checkNow = (value, type) => {
    let now = Number(moment().format('YYYYMMDD'))
    let current = parseInt(value.replace(/-/g, ''), 10)

    if (type) {
      let check = now > current ? false : true
      return check
    } else {
      let check = now >= current ? false : true
      return check
    }
  }

  const handleChangeStart = (e) => {
    if (checkNow(e.target.value, true)) {
      if (state.end !== '') {
        let start = e.target.value
        let end = state.end
        if (
          parseInt(start.replace(/-/g, ''), 10) <
          parseInt(end.replace(/-/g, ''), 10)
        )
          setState({ ...state, start: e.target.value })
      } else setState({ ...state, start: e.target.value })
    }
  }

  const handleChangeEnd = (e) => {
    if (checkNow(e.target.value, false)) {
      if (state.start !== '') {
        let start = state.start
        let end = e.target.value
        if (
          parseInt(start.replace(/-/g, ''), 10) <
          parseInt(end.replace(/-/g, ''), 10)
        )
          setState({ ...state, end: e.target.value })
      } else setState({ ...state, end: e.target.value })
    }
  }

  const handleChangeDate = (e) => {
    if (checkNow(e.target.value, true)) {
      setState({ ...state, date: e.target.value })
    }
  }

  const handleTextarea = (e) => {
    setState({ ...state, reportContent: e.target.value })
  }

  const setTypeReport = (value) => {
    switch (value) {
      case true:
        setState({
          ...state,
          halfDay: 'col setDate',
          severalDays: 'col setDate d-none',
          act1: 'active',
          act2: ''
        })
        break
      case false:
        setState({
          ...state,
          halfDay: 'col setDate d-none',
          severalDays: 'col setDate',
          act1: '',
          act2: 'active'
        })
        break
      default: {
        break
      }
    }
  }

  const handleSubmit = () => {
    if (state.reportContent === '') {
      toast.error('Không được để trống!')
    } else {
      if (state.act1 === '') {
        reportApi({
          typeReport: 'true',
          date: {
            dateStart: state.start,
            dateEnd: state.end
          },
          content: state.reportContent
        })
      } else {
        reportApi({
          typeReport: 'false',
          date: {
            dateStart: state.date
          },
          content: state.reportContent
        })
      }
    }
  }

  return (
    <motion.div
      className='report-form'
      variants={variants}
      initial='initial'
      animate='enter'
      exit='exit'
    >
      <div className='row'>
        <div className='col choose-type'>
          <input
            className={state.act1}
            type='button'
            value='Nửa ngày'
            onClick={() => setTypeReport(true)}
          />
          <input
            className={state.act2}
            type='button'
            value='Dài ngày'
            onClick={() => setTypeReport(false)}
          />
        </div>
        <div className={state.severalDays}>
          <label>
            <p>Từ</p>
            <input
              type='date'
              value={state.start}
              onChange={handleChangeStart}
            />
          </label>
          <label>
            <p>Đến</p>
            <input type='date' value={state.end} onChange={handleChangeEnd} />
          </label>
        </div>
        <div className={state.halfDay}>
          <label>
            <p>Ngày</p>
            <input type='date' value={state.date} onChange={handleChangeDate} />
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <textarea
            rows='10'
            placeholder='Nhập lí do của bạn vào đây...'
            value={state.reportContent}
            onChange={handleTextarea}
            required
          ></textarea>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='btn btn-submit-report' onClick={handleSubmit}>
            Gửi
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ReportForm
