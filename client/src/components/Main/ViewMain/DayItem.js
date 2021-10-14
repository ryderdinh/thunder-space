import React, { Component } from "react";
import { connect } from "react-redux";
import { getDataTimesheetsDetail } from "actions";
export class DayItem extends Component {
  state = {
    classLabel: "day",
    classSpan: "",
    dd: 0,
    mm: 0,
  };
  componentDidMount() {
    if (this.props.numberDay < 1) this.setState({ classLabel: "day invalid" });
    if (this.props.numberDay === new Date().getDate())
      this.setState({ classSpan: "now" });
    if (this.props.numberDay > 0) {
      this.setState({
        dd:
          this.props.dateRelative.day < 10
            ? `0${this.props.dateRelative.day}`
            : this.props.dateRelative.day,
        mm:
          this.props.dateRelative.month < 10
            ? `0${this.props.dateRelative.month}`
            : this.props.dateRelative.month,
      });
    }
  }

  render() {
    const { numberDay, dateRelative } = this.props;
    return (
      <label
        className={`${this.state.classLabel} animate__slow animate__delay-3s animate__fadeIn`}
        onClick={() => {
          this.props.getDataTimesheetsDetail(
            `${this.state.dd}/${this.state.mm}/${dateRelative.year}`
          );
        }}
      >
        {/* <textarea
          className="appointment"
          readOnly
          value={`Status:             ${dataDay}\nTimekeeping on:     ${dataDay}\nTimekeeping out:    ${dataDay}\nTotal hours worked: ${dataDay}\nWorkdays:           ${dataDay}`}
        ></textarea> */}
        <span className={this.state.classSpan}>{numberDay}</span>
        <em></em>
      </label>
    );
  }
}

export default connect(null, { getDataTimesheetsDetail })(DayItem);
