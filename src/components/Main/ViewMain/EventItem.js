import React from "react";
import { setPopup } from "actions";
import { useDispatch } from "react-redux";

export default function EventItem({ dataEvent }) {
  const dispatch = useDispatch();
  return (
    <div className="event_item">
      <div className="event-time">{dataEvent[0].date}</div>
      <div className="event-detail">
        {dataEvent.map((value,index) => (
          <div
            className="detail_item"
            onClick={() => {
              dispatch(
                setPopup({
                  isShow: true,
                  typePopup: "event-popup",
                  dataPopup: value,
                })
              );
            }}
          >
            <div className="detail-name">{value.name}</div>
            <div className="detail-data">Chi tiết</div>
          </div>
        ))}
      </div>
    </div>
  );
}
