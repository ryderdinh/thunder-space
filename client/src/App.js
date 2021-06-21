import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { connect } from "react-redux";
import { actRefreshPage } from "actions";
import { SignIn } from "components/SignIn";
import Main from "components/Main/Main";
import { Popup } from "components/Main/Popup";
import NotFound from "components/404";
import "animate.css";
import Sidebar from "components/Sidebar/Sidebar";

class App extends React.Component {
  state = {
    sidebar: false,
  };
  componentDidMount() {
    this.props.actRefreshPage();
  }
  activeSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
  };
  checkAndRenderCPN = (checkId, path) =>
    checkId ? (
      <div className="container animate__animated animate__fadeIn">
        <Sidebar sidebar={this.state.sidebar} />
        <Main pathName={path} activeSidebar={this.activeSidebar} />
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
          <Route exact path="/works">
            {this.checkAndRenderCPN(checkId, "works")}
          </Route>
          <Route exact path="/project">
            {this.checkAndRenderCPN(checkId, "project")}
          </Route>
          <Route exact path="/account">
            {this.checkAndRenderCPN(checkId, "account")}
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
