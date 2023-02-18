import { actRefreshPage } from 'actions'
import 'animate.css'
import LayoutContextProvider from 'context/LayoutContext'
import { AnimatePresence } from 'framer-motion'
import NotFound from 'pages/404'
import Documentation from 'pages/Documentation'
import ForgotPassword from 'pages/ForgotPassword'
import Home from 'pages/Home'
import IssuePage from 'pages/Issue'
import Landing from 'pages/Landing'
import Login from 'pages/Login'
import NotificationPage from 'pages/NotificationPage'
import Profile from 'pages/Profile'
import ProjectPage from 'pages/Project'
import Report from 'pages/Report'
import TimeSheets from 'pages/TimeSheets'
import Work from 'pages/Work'
import Workflow from 'pages/Workflow'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
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
    <LayoutContextProvider>
      <Toaster position='top-center' reverseOrder={true} />
      <Router>
        <Route
          render={({ location }) => (
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                {/* Landing page */}
                <Route exact path='/'>
                  <Landing />
                </Route>

                {/* Home pages */}
                <Route exact path='/home'>
                  <Home />
                </Route>

                {/* Home pages */}
                <Route exact path='/account'>
                  <Profile />
                </Route>

                {/* Timesheet page */}
                <Route exact path='/timesheets'>
                  <TimeSheets />
                </Route>

                {/* Report page */}
                <Route exact path='/report'>
                  <Report />
                </Route>

                {/* Overview works and projects */}
                <Route path='/workflow'>
                  <Route component={Workflow} />
                </Route>

                {/* Work pages */}
                <Route exact path='/works'>
                  <Work />
                </Route>

                {/* Project pages */}
                <Route exact path='/projects'>
                  <ProjectPage />
                </Route>
                <Route exact path='/projects/invitation'>
                  <ProjectPage type='invitation' />
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

                {/* Notification page*/}
                <Route exact path='/notifications'>
                  <NotificationPage />
                </Route>

                {/* Login page */}
                <Route exact path='/login'>
                  <Login />
                </Route>

                {/* Documentation */}
                <Route path='/documentation'>
                  <Documentation />
                </Route>

                {/* Forgot password page */}
                <Route exact path='/forgot-password'>
                  <ForgotPassword />
                </Route>

                {/* 404 */}
                <Route component={NotFound} />
              </Switch>
            </AnimatePresence>
          )}
        />
      </Router>
    </LayoutContextProvider>
  )
}
