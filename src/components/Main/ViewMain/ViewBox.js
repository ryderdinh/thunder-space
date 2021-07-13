import React from "react";
import ViewBoxName from "./ViewBoxName";
import TimeKeeping from "./TimeKeeping";
import ListTimeKeeping from "./ListTimeKeeping";
import Event from "./Event";
import TableOfWork from "./TableOfWorks";
import ReportForm from "./ReportForm";
import AccountContainer from "./AccountContainer";
import ProjectContainer from "./Workfow/ProjectContainer";
import IssueDetailContainer from "./Issue/IssueDetailContainer";

export default class ViewBox extends React.Component {
  renderComponent = (type) => {
    switch (type) {
      case "table-of-work":
        return <TableOfWork />;
      case "report":
        return (
          <>
            <ViewBoxName name={"Form xin nghỉ phép"} />
            <ReportForm />
          </>
        );
      case "project":
        return <ProjectContainer />;
      case "issue":
        return <IssueDetailContainer />;
      case "account":
        return <AccountContainer />;
      default:
        return (
          <>
            <ViewBoxName name={"Chấm công"} />
            <TimeKeeping />
            <ListTimeKeeping />
            <ViewBoxName name={"Sự kiện"} />
            <Event />
          </>
        );
    }
  };
  render() {
    return (
      <div className="col view-box">
        {this.renderComponent(this.props.pathName)}
      </div>
    );
  }
}
