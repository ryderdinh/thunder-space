import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChangePassword } from "./ChangePassword";

export const Popup = () => {
  const [state, setState] = useState("popup-container");
  const popup = useSelector((state) => state._popup);
  let { typePopup, isShow } = popup;
  useEffect(() => {
    if (isShow) setState("popup-container active");
    if (!isShow) setState("popup-container");
  }, [isShow]);

  switch (typePopup) {
    case "change-password":
      return (
        <div className={state}>
          <ChangePassword />
        </div>
      );
    default:
      return <div className={state}></div>;
  }
};


