import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import DashboardPage from '../components/HomePage/DashboardPage'
import SignupPage from '../components/AuthServices/SignupPage'
import NotFoundPage from '../components/Wrappers/NotFoundPage'
import LoginPage from '../components/AuthServices/LoginPage'
import MyEventsPage from '../components/UserEvent/MyEventsPage'
import UserEventDashboard from '../components/UserEvent/UserEventDashboard'
import EventCard from '../components/EventDetails/EventCard'
import LoadingPage from '../components/Wrappers/LoadingPage'
import HeaderlessRoute from './HeaderlessRoute'
import PublicRoute from './PublicRoute'

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path='/' component={LoginPage} exact={true} />
        <PublicRoute path='/signup' component={SignupPage} />
        <Route path='/loading' component={LoadingPage} />
        <HeaderlessRoute path='/dashboard' component={DashboardPage} />
        <HeaderlessRoute path='/event' component={EventCard} />
        <HeaderlessRoute
          path='/me/events'
          component={UserEventDashboard}
        />
        <HeaderlessRoute path='/user/:userid' component={MyEventsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter
