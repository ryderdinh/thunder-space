import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { connect } from "react-redux";
import { actRefreshPage } from "actions";
import { SignIn } from "components/SignIn";
import Sidebar from "components/Sidebar/Sidebar";
import Main from "components/Main/Main";
import SidebarMobileMain from "components/Sidebar/SidebarMain-Mobile/SidebarMobileMain";
import { Popup } from "components/Main/Popup";
import NotFound from "components/404";
import "animate.css";

class App extends React.Component {
  componentDidMount() {
    this.props.actRefreshPage();
  }
  checkAndRenderCPN = (checkId, path) =>
    checkId ? (
      <div className="container animate__animated animate__fadeIn">
        <Sidebar />
        <Main pathName={path} />
        <SidebarMobileMain />
        <Toaster position="top-right" reverseOrder={true} />
        <Popup />
      </div>
    ) : (
      <>
        <SignIn />
        <Toaster position="top-right" reverseOrder={true} />
      </>
    );
  render() {
    const { checkId } = this.props;
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {this.checkAndRenderCPN(checkId, "home")}
          </Route>
          <Route exact path="/table-of-work">
            {this.checkAndRenderCPN(checkId, "table-of-work")}
          </Route>
          <Route exact path="/report">
            {this.checkAndRenderCPN(checkId, "report")}
          </Route>
          <Route exact path="/account">
            {this.checkAndRenderCPN(checkId, "account")}
          </Route>
          <Route exact path="/workflow">
            <Redirect to="/workflow/project" />
          </Route>
          <Route exact path="/workflow/project">
            {this.checkAndRenderCPN(checkId, "project")}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    checkId: state._checkLogin._checkLogin,
  };
};
export default connect(mapStateToProps, { actRefreshPage })(App);
