import React from "react";
import { connect } from "react-redux";
import BtnTimeKeeping from "../Button/BtnTimeKeeping";
export class TimeKeeping extends React.Component {
  render() {
    const { count, status } = this.props;
    return (
      <div className="view_item time-keeping animate__animated animate__zoomIn">
        <div className="time-keeping_hour">
          <div className="hour">
            <p className="hour-realtime">{count}</p>h
          </div>
        </div>
        <div className="time-keeping_label">
          <p className="status-realtime">
            {status === false
              ? "Chưa chấm công"
              : count < 8.5
              ? "Chưa đủ công"
              : "Đã đủ công"}
          </p>
          <p className="status-hour"></p>
        </div>
        <BtnTimeKeeping
          className={"btn time-keeping_btn"}
          content={"Chấm công"}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    count: state._timeOfAttendance._count,
    status: state._timeOfAttendance._status,
  };
};
export default connect(mapStateToProps, null)(TimeKeeping);
