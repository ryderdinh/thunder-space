import { combineReducers } from 'redux'
import checkLogin from './checkLogin'
import events from './events'
import issue from './issue'
import loading from './loading'
import notification from './notification'
import project from './project'
import report from './report'
import staffInfomation from './staffInfomation'
import timeKeeping from './timeKeeping'
import getTimesheets from './timesheets'
import users from './users'
import workflow from './workflow'

export default combineReducers({
  _timesheets: getTimesheets,
  _timeOfAttendance: timeKeeping,
  _checkLogin: checkLogin,
  _staffInfomation: staffInfomation,
  _events: events,
  _report: report,
  _workflow: workflow,
  _project: project,
  _issue: issue,
  _users: users,
  _notification: notification,
  loading
})
