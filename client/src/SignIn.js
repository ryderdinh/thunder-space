import React from "react";
import "./fonts/BeVietnam-Bold.ttf";
import "./fonts/BeVietnam-Italic.ttf";
import "./fonts/BeVietnam-LightItalic.ttf";
import "./fonts/BeVietnam-Medium.ttf";
import "../public/images/sapiens.svg";
import "./Signin.min.css";
import { connect } from "react-redux";
import { actSignIn } from "./actions";

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }
  handleUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleSignIn = () => {
    this.props.actSignIn(this.state);
  };
  render() {
    return (
      <div className="login-box animate__animated animate__fadeIn">
        <div className="login-box-formbox">
          <div className="login-box-login">
            <h1>Chào mừng đến với HRM ZS</h1>
            <p>Phát triển tiềm năng và nâng cao giá trị bản thân</p>
            <form>
              <div>
                <label> Tên đăng nhập</label>
                <input
                  type="email"
                  name="email"
                  className="input-email"
                  onChange={this.handleUsername}
                />
              </div>
              <div>
                <label> Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  className="input-password"
                  onChange={this.handlePassword}
                />
              </div>
              <div>
                <input
                  type="button"
                  value="Đăng nhập"
                  className="btn"
                  onClick={this.handleSignIn}
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
  }
}

export default connect(null, { actSignIn })(SignIn);
