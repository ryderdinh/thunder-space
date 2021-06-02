import React from "react";
import ViewBoxName from "./ViewBoxName";
import TimeKeeping from "./TimeKeeping";
import ListTimeKeeping from "./ListTimeKeeping";
import Event from "./Event";
import TableOfWork from "./TableOfWorks";
import ReportForm from "./ReportForm";
import AccountContainer from "./AccountContainer";
import { Route, Redirect } from "react-router-dom";
export default class ViewBox extends React.Component {
  render() {
    return (
      <div className="col view-box">
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <ViewBoxName name={"Chấm công"} />
          <TimeKeeping />
          <ListTimeKeeping />
          <ViewBoxName name={"Sự kiện"} />
          <Event />
        </Route>
        <Route path="/table-of-work">
          <TableOfWork />
        </Route>
        <Route path="/report">
          <ViewBoxName name={"Form xin nghỉ phép"} />
          <ReportForm />
        </Route>
        <Route path="/info-account">
          <AccountContainer />
        </Route>
      </div>
    );
  }
}
