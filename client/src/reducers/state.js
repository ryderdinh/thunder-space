import { combineReducers } from "redux";
import menuReducer from "./menuReducer";
import nameContainer from "./nameContainer";
import timeKeeping from "./listTimeKeeping";
import getTOW from "./tableOfWork";
import listTimeKeeping from "./listTimeKeeping";
import checkLogin from "./checkLogin";
import staffInfomation from "./staffInfomation";
import events from "./events";
import setActiveSidebar from "./activeSidebar";
import popup from "./popup";
import loading from "./loading";

export default combineReducers({
  side_item_name: menuReducer,
  indexActiveSidebar: setActiveSidebar,
  name_container: nameContainer,
  _location: timeKeeping,
  _tableOfWorks: getTOW,
  _timeOfAttendance: listTimeKeeping,
  _checkLogin: checkLogin,
  _staffInfomation: staffInfomation,
  _events: events,
  _report: "",
  _popup: popup,
  loading: loading,
});
