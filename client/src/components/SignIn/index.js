import React, { useState } from "react";
import "fonts/BeVietnam-Bold.ttf";
import "fonts/BeVietnam-Italic.ttf";
import "fonts/BeVietnam-LightItalic.ttf";
import "fonts/BeVietnam-Medium.ttf";
import "../../public/images/sapiens.svg";
import "./Signin.css";
// import { connect } from "react-redux";
import { actSignIn } from "actions/index";
import { useDispatch } from "react-redux";

export const SignIn = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleUsername = (e) => {
    setState({ ...state, username: e.target.value });
  };
  const handlePassword = (e) => {
    setState({ ...state, password: e.target.value });
  };
  const handleSignIn = () => {
    dispatch(actSignIn(state));
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <div className="login-box animate__animated animate__fadeIn">
      <div className="login-box-formbox">
        <div className="login-box-login">
          <h1>Hệ thống HRM Zelios Sea</h1>
          <p>Phát triển tiềm năng và nâng cao giá trị bản thân</p>
          <form>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="input-email"
                onChange={handleUsername}
              />
            </div>
            <div>
              <label> Mật khẩu</label>
              <input
                type="password"
                name="password"
                className="input-password"
                onChange={handlePassword}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div>
              <input
                type="button"
                value="Đăng nhập"
                className="btn"
                onClick={handleSignIn}
              />
            </div>
          </form>
        </div>
      </div>
      <div
        className="login-box-quotebox"
        style={{
          backgroundImage: `url(./images/sapiens.svg)`,
        }}
      >
        <div className="quote-container"></div>
      </div>
    </div>
  );
};
