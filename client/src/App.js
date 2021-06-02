import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignIn from "./SignIn";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import SidebarMobileMain from "./components/Sidebar/SidebarMain-Mobile/SidebarMobileMain";
import "./fonts/BeVietnam-Bold.ttf";
import "./fonts/BeVietnam-Italic.ttf";
import "./fonts/BeVietnam-LightItalic.ttf";
import "./fonts/BeVietnam-Medium.ttf";
import { connect } from "react-redux";
import { actRefreshPage } from "./actions";
import "animate.css";
import Popup from "./components/Main/Popup";

class App extends React.Component {
  componentDidMount() {
    this.props.actRefreshPage();
  }
  checkAndRenderCPN = (value) => {
    if (value) {
      return (
        <div className="container animate__animated animate__fadeIn">
          <Sidebar />
          <Switch>
            <Main />
          </Switch>
          <SidebarMobileMain />
          <Toaster position="top-right" reverseOrder={true} />
          <Popup />
        </div>
      );
    } else {
      return (
        <>
          <SignIn />
          <Toaster position="top-right" reverseOrder={true} />
        </>
      );
    }
  };
  render() {
    const { checkId } = this.props;
    return <Router>{this.checkAndRenderCPN(checkId)}</Router>;
  }
}
const mapStateToProps = (state) => {
  return {
    checkId: state._checkLogin._checkLogin,
  };
};
export default connect(mapStateToProps, { actRefreshPage })(App);
