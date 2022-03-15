import { actRefreshPage } from 'actions'
import 'animate.css'
import { AnimatePresence } from 'framer-motion'
import NotFound from 'pages/404'
import Account from 'pages/Account'
import Home from 'pages/Home'
import Issue from 'pages/Issue'
import Login from 'pages/Login'
import Project from 'pages/Project'
import Report from 'pages/Report'
import TimeSheets from 'pages/TimeSheets'
import Work from 'pages/Work'
import Workflow from 'pages/Workflow'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default function App() {
  //? Connect Redux
  const dispatch = useDispatch()

  //? Create Effect
  useEffect(() => {
    dispatch(actRefreshPage())
  }, [dispatch])

  return (
    <Router>
      <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/timesheets'>
                <TimeSheets />
              </Route>
              <Route exact path='/report'>
                <Report />
              </Route>
              <Route exact path='/workflow'>
                <Workflow />
              </Route>
              <Route exact path='/work'>
                <Work />
              </Route>
              <Route exact path='/project'>
                <Project />
              </Route>
              <Route exact path='/project/:pid'>
                <Project />
              </Route>
              <Route exact path='/project/:pid/:iid'>
                <Issue />
              </Route>
              <Route exact path='/account'>
                <Account />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </AnimatePresence>
        )}
      />
    </Router>
  )
}
