import React, { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";
import { connect } from "react-redux";

export const Popup = ({ popup }) => {
  const [state, setState] = useState("popup-container");
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

const mapStateToProps = (state) => ({
  popup: state._popup,
});

export default connect(mapStateToProps, null)(Popup);
