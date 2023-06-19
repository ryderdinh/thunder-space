import { combineReducers } from 'redux'
import app from './app'
import checkLogin from './checkLogin'
import events from './events'
import issue from './issue'
import loading from './loading'
import notification from './notification'
import project from './project'
import report from './report'
import staffInfomation from './staffInfomation'
import timeKeeping from './timeKeeping'
import timesheets from './timesheets'
import todos from './todos'
import users from './users'
import workflow from './workflow'

export default combineReducers({
  _app: app,
  _timesheets: timesheets,
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
  _todos: todos,
  loading
})
