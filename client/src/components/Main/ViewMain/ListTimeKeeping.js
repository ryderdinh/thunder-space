import React from "react";
import { connect } from "react-redux";
import ListTimeKeepingItem from "./ListTimeKeepingItem";
import { actFetchTimeKeeping } from "actions";
export class ListTimeKeeping extends React.Component {
  componentDidMount() {
    this.props.actFetchTimeKeeping();
  }
  render() {
    let { timeOfAttendance } = this.props;
    return (
      <div className="view_item list-time-keeping  animate__animated  animate__zoomIn">
        <div className="label">Income</div>
        <div className="list-time-keeping_box">
          {timeOfAttendance.reverse().map((value, index) => (
            <ListTimeKeepingItem
              key={index}
              time={value[0]}
              rangeMetter={value[1]}
            />
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    timeOfAttendance: state._timeOfAttendance._list,
  };
};
export default connect(mapStateToProps, { actFetchTimeKeeping })(
  ListTimeKeeping
);
