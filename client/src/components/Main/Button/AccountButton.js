import React from "react";
import { removeCookie } from "../../../units/cookieWeb";
import { connect } from "react-redux";
import { setPopup } from "../../../actions/index";

export const AccountButton = ({ content, type, setPopup }) => {
  return (
    <div
      className={`account__btn ${type}`}
      onClick={() => {
        if (type === "signout") {
          removeCookie(true, true);
          window.location.href = "https://zelios-sea.netlify.app/";
        }
        if (type === "change-password") {
          setPopup({ typePopup: "change-password", isShow: true });
        }
      }}
    >
      {content}
    </div>
  );
};

export default connect(null, { setPopup })(AccountButton);
