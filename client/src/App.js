import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { actRefreshPage } from "actions";
import { SignIn } from "components/SignIn";
import Main from "components/Main/Main";
import { Popup } from "components/Main/Popup";
import NotFound from "components/404";
import "animate.css";
import Sidebar from "components/Sidebar/Sidebar";
import ProgressBarLoading from "components/Loading/ProgressBarLoading";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  //? Create State
  const [state, setState] = useState({
    sidebar: false,
  });

  //? Connect Redux
  const checkId = useSelector((state) => state._checkLogin._checkLogin);
  const dispatch = useDispatch();

  //? Create Effect
  useEffect(() => {
    dispatch(actRefreshPage());
    window.scrollTo(0, 0);
  }, [dispatch]);

  //? Create Function
  const activeSidebar = (value) => {
    value === undefined
      ? setState({ sidebar: !state.sidebar })
      : setState({ sidebar: Boolean(value) });
  };
  const checkAndRenderCPN = (checkId, path) => {
    return checkId ? (
      <motion.div
        className="container"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
      >
        <Sidebar sidebar={state.sidebar} activeSidebar={activeSidebar} />
        <Main pathName={path} activeSidebar={activeSidebar} />
        <Toaster position="top-right" reverseOrder={true} />
        <Popup />
        <ProgressBarLoading />
      </motion.div>
    ) : (
      <>
        <SignIn />
        <Toaster position="top-right" reverseOrder={true} />
      </>
    );
  };

  return (
    <Router>
      <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/">
                {checkAndRenderCPN(checkId, "home")}
              </Route>
              <Route exact path="/timesheets">
                {checkAndRenderCPN(checkId, "timesheets")}
              </Route>
              <Route exact path="/report">
                {checkAndRenderCPN(checkId, "report")}
              </Route>
              <Route exact path="/work">
                {checkAndRenderCPN(checkId, "work")}
              </Route>
              <Route exact path="/project">
                {checkAndRenderCPN(checkId, "project")}
              </Route>
              <Route exact path="/project/:pcode">
                {checkAndRenderCPN(checkId, "project")}
              </Route>
              <Route exact path="/project/:pid/:iid">
                {checkAndRenderCPN(checkId, "issue")}
              </Route>
              <Route exact path="/account">
                {checkAndRenderCPN(checkId, "account")}
              </Route>
              <Route component={NotFound} />
            </Switch>
          </AnimatePresence>
        )}
      />
    </Router>
  );
}

export default App;
