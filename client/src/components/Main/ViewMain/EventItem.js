import React from "react";
export default class EventItem extends React.Component {
  render() {
    const { name, time, place } = this.props;
    let timeChange = time.replace("-", "/").split("T")[0].replace("-", "/");
    return (
      <div className="event_item">
        <div className="name">{name}</div>
        <div className="time-local">
          <div className="time">{timeChange}</div>
          <div className="local">{place}</div>
        </div>
      </div>
    );
  }
}
