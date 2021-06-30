import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChangePassword } from "./ChangePassword";
import EventPopup from "./EventPopup";

export const Popup = (props) => {
  const [state, setState] = useState("popup-container");
  const popup = useSelector((state) => state._popup);
  let { typePopup, isShow, dataPopup } = popup;
  useEffect(() => {
    if (isShow) setState("popup-container active");
    if (!isShow) setState("popup-container");
  }, [isShow]);

  switch (typePopup) {
    case "change-password": {
      return (
        <div className={state}>
          <ChangePassword />
        </div>
      );
    }

    case "event-popup": {
      return (
        <div className={state}>
          <EventPopup dataPopup={dataPopup} />
        </div>
      );
    }

    default:
      return <div className={state}></div>;
  }
};
