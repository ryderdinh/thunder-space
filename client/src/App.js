import { Transition } from '@headlessui/react'
import { actRefreshPage } from 'actions'
import 'animate.css'
import Dialog from 'components/Dialog'
import Loading from 'components/Dialog/Loading'
import { LayoutContext } from 'context/LayoutContext'
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
import Space from 'pages/Space'
import TimeSheets from 'pages/TimeSheets'
import Todos from 'pages/Todos'
import { Fragment, useContext, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

export default function App() {
  //? Redux
  const dispatch = useDispatch()

  //? Context
  const { loading } = useContext(LayoutContext)

  //? State

  //? Effect
  useEffect(() => {
    dispatch(actRefreshPage())
  }, [dispatch])

  console.log(1, loading)

  return (
    <>
      <Toaster position='top-center' reverseOrder={true} />
      <Dialog />
      <Transition
        appear={true}
        show={loading}
        as={Fragment}
        enter='transform transition duration-[200ms]'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transform duration-200 transition ease-linear'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div
          key='modal'
          className={`pointer-events-none fixed h-screen
            w-full select-none
            ${loading ? 'z-50' : 'z-50'}`}
        >
          <Loading load={loading} />
        </div>
      </Transition>

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
              <Route path='/spaces'>
                <Route component={Space} />
              </Route>

              {/* Todos pages */}
              <Route exact path='/todos'>
                <Todos />
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
    </>
  )
}
