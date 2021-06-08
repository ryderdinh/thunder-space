import React from "react";
import { closePopup } from "actions";
import { useDispatch } from "react-redux";
export default function EventPopup({ dataPopup }) {
  console.log(dataPopup);
  const dispatch = useDispatch();
  return (
    <div className="popup__event-popup">
      <div className="popup__event-popup_data">
        <div className="popup__event-popup__item">
          <div className="popup__event-popup__label">Tên sự kiện:</div>
          <div className="popup__event-popup__content">{dataPopup.name}</div>
        </div>
        <div className="popup__event-popup__item">
          <div className="popup__event-popup__label">Thời gian diễn ra:</div>
          <div className="popup__event-popup__content">{`${dataPopup.event_detail.hours} - ${dataPopup.date}`}</div>
        </div>
        <div className="popup__event-popup__item">
          <div className="popup__event-popup__label">Địa điểm tổ chức:</div>
          <div className="popup__event-popup__content">
            {dataPopup.event_detail.position}
          </div>
        </div>
        <div className="popup__event-popup__item">
          <div className="popup__event-popup__label">Nội dung:</div>
          <div className="popup__event-popup__content">
            {dataPopup.event_detail.content}
          </div>
        </div>
      </div>
      <div
        className="popup__event-popup__btn"
        onClick={() => {
          dispatch(closePopup());
        }}
      >
        Đóng
      </div>
    </div>
  );
}
