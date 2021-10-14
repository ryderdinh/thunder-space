import React from "react";
import { connect } from "react-redux";
import ListTimeKeepingItem from "./ListTimeKeepingItem";
import { actFetchTimeKeeping } from "actions";
import { motion } from "framer-motion";
export class ListTimeKeeping extends React.Component {
  componentDidMount() {
    this.props.actFetchTimeKeeping();
  }
  render() {
    let { timeOfAttendance, variants } = this.props;
    return (
      <motion.div
        className="view_item list-time-keeping"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="label">Lịch sử chấm công</div>
        <div className="list-time-keeping_box">
          {timeOfAttendance.length === 0
            ? "Không có dữ liệu"
            : timeOfAttendance
                .reverse()
                .map((value, index) => (
                  <ListTimeKeepingItem
                    key={index}
                    time={value[0]}
                    rangeMetter={value[1]}
                  />
                ))}
        </div>
      </motion.div>
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
