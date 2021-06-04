import React from "react";
export default class EventItem extends React.Component {
  render() {
    const { dataEvent } = this.props;
    // let timeChange = time.replace("-", "/").split("T")[0].replace("-", "/");
    return (
      <div className="event_item">
        <div className="event-time">{dataEvent[0].date}</div>
        <div className="event-detail">
          {dataEvent.map((value, index) => (
            <div className="detail_item">
              <div className="detail-name">{value.name}</div>
              <div className="detail-data">Chi tiết</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
