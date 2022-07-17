import React from "react";
import { removeCookie } from "units/cookieWeb";
import { useDispatch } from "react-redux";
import { setPopup } from "actions";

export const AccountButton = ({ content, type }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`account__btn ${type}`}
      onClick={() => {
        if (type === "signout") {
          removeCookie(true, true);
          window.location.href = "https://zelios-sea.netlify.app/";
        }
        if (type === "change-password") {
          dispatch(
            setPopup({
              typePopup: "change-password",
              isShow: true,
              dataPopup: "",
            })
          );
        }
      }}
    >
      {content}
    </div>
  );
};

