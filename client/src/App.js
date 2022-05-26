import { actRefreshPage } from 'actions'
import 'animate.css'
import { AnimatePresence } from 'framer-motion'
import NotFound from 'pages/404'
import Home from 'pages/Home'
import IssuePage from 'pages/Issue'
import Landing from 'pages/Landing'
import Login from 'pages/Login'
import Profile from 'pages/Profile'
import ProjectPage from 'pages/Project'
import Report from 'pages/Report'
import TimeSheets from 'pages/TimeSheets'
import Work from 'pages/Work'
import Workflow from 'pages/Workflow'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default function App() {
  //? Connect Redux store
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

              <Route path='/workflow'>
                <Route component={Workflow} />
              </Route>

              <Route exact path='/works'>
                <Work />
              </Route>

              <Route exact path='/projects'>
                <ProjectPage />
              </Route>
              <Route exact path='/projects/:pid'>
                <ProjectPage />
              </Route>
              <Route exact path='/projects/:pid/settings'>
                <ProjectPage type='setting' />
              </Route>
              <Route exact path='/projects/:pid/:iid'>
                <IssuePage />
              </Route>
              <Route exact path='/projects/:pid/:iid/settings'>
                <IssuePage type='setting' />
              </Route>

              <Route exact path='/account'>
                <Profile />
              </Route>

              <Route exact path='/login'>
                <Login />
              </Route>

              <Route exact path='/landing'>
                <Landing />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </AnimatePresence>
        )}
      />
    </Router>
  )
}
