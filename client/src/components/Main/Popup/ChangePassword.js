import React, { useState } from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { closePopup, actChangePassword } from "../../../actions/index";

export const ChangePassword = (props) => {
  const [state, setState] = useState({ newPassword: "", currentPassword: "" });

  return (
    <div className="popup__change-password">
      <div className="popup__change-password__title">Đổi mật khẩu</div>
      <form className="popup__change-password__form">
        <label className="popup__change-password__item">
          <p className="popup__change-password__label">Mật khẩu cũ</p>
          <input
            type="password"
            className="popup__change-password__input"
            name="current-password"
            onChange={(e) => {
              setState({ ...state, currentPassword: e.target.value });
            }}
          />
        </label>
        <label className="popup__change-password__item">
          <p className="popup__change-password__label">Mật khẩu mới</p>
          <input
            type="password"
            className="popup__change-password__input"
            name="new-password"
            onChange={(e) => {
              setState({ ...state, newPassword: e.target.value });
            }}
          />
        </label>
        <div className="popup__change-password__btn-box">
          <div
            className="change-password__btn"
            onClick={() => {
              let checkOut = true;
              if (state.currentPassword === "" || state.newPassword === "") {
                checkOut = false;
                toast.error("Không được để trống các trường");
              } else {
                if (state.currentPassword.length < 6 || state.newPassword < 6) {
                  checkOut = false;
                  toast.error("Mật khẩu nhập vào phải trên 5 kí tự");
                }
              }

              if (checkOut) {
                props.actChangePassword(state);
              }
            }}
          >
            Xác nhận
          </div>
          <div
            className="change-password__btn"
            onClick={() => {
              props.closePopup();
            }}
          >
            Huỷ
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { closePopup, actChangePassword })(ChangePassword);
