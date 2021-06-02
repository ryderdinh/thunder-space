import React, { Component } from "react";

export class DayItem extends Component {
  state = {
    classLabel: "day",
    classSpan: "",
  };
  componentDidMount() {
    if (this.props.numberDay < 1) this.setState({ classLabel: "day invalid" });
    if (this.props.numberDay === new Date().getDate())
      this.setState({ classSpan: "now" });
  }

  render() {
    const { numberDay, dataDay } = this.props;
    return (
      <label
        className={`${this.state.classLabel} animate__slow animate__delay-3s animate__fadeIn`}
      >
        <textarea
          className="appointment"
          readOnly
          value={`Status:             ${dataDay}\nTimekeeping on:     ${dataDay}\nTimekeeping out:    ${dataDay}\nTotal hours worked: ${dataDay}\nWorkdays:           ${dataDay}`}
        ></textarea>
        <span className={this.state.classSpan}>{numberDay}</span>
        <em></em>
      </label>
    );
  }
}

export default DayItem;
