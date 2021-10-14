import { combineReducers } from "redux";
import menuReducer from "./menuReducer";
import nameContainer from "./nameContainer";
import timeKeeping from "./listTimeKeeping";
import getTimesheets from "./timesheets";
import listTimeKeeping from "./listTimeKeeping";
import checkLogin from "./checkLogin";
import staffInfomation from "./staffInfomation";
import events from "./events";
import setActiveSidebar from "./activeSidebar";
import popup from "./popup";
import loading from "./loading";
import project from "./project";
import issue from "./issue";
import workflow from "./workflow";

export default combineReducers({
  side_item_name: menuReducer,
  indexActiveSidebar: setActiveSidebar,
  name_container: nameContainer,
  _location: timeKeeping,
  _timesheets: getTimesheets,
  _timeOfAttendance: listTimeKeeping,
  _checkLogin: checkLogin,
  _staffInfomation: staffInfomation,
  _events: events,
  _report: "",
  _popup: popup,
  _workflow: workflow,
  _project: project,
  _issue: issue,
  loading,
});
