import React from "react";
export default class ListTimeKeepingItem extends React.Component {
  render() {
    const { time, rangeMetter } = this.props;
    return (
      <div className="list-time-keeping_item">
        <div className="icon_timeline">
          <img src={require("assets/images/icons/gps.svg").default} alt="" />
          <div className="rect"></div>
        </div>
        <div className="time">{time}</div>
        <div className="range">
          <p>{`cách công ty ${rangeMetter}m`}</p>
        </div>
      </div>
    );
  }
}
