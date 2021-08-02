import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/HomePage/DashboardPage';
import SignupPage from '../components/AuthServices/SignupPage';
import NotFoundPage from '../components/Wrappers/NotFoundPage';
import LoginPage from '../components/AuthServices/LoginPage';
import EventCard from '../components/EventDetails/EventCard';
import UserDetailsPage from '../components/UserDetails/UserDetailsPage';
import EditEventPage from '../components/UserEvent/EditEventPage';
import MyEventsPage from '../components/UserEvent/MyEventsPage';
import EditUserDetails from '../components/UserDetails/EditUserDetails';
import UserEventDashboard from '../components/UserEvent/UserEventDashboard';
import EventDetails from '../components/EventDetails/EventDetails';
import LoadingPage from '../components/Wrappers/LoadingPage';

import PrivateRoute from './PrivateRoute';
import HeaderlessRoute from './HeaderlessRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PublicRoute path="/signup" component={SignupPage} />
        <Route path="/loading" component={LoadingPage} />
        <HeaderlessRoute path="/dashboard" component={DashboardPage} />
        <HeaderlessRoute path="/event" component={EventDetails} />
        <HeaderlessRoute path="/events/:handle" component={UserEventDashboard} />
        {/* <PrivateRoute path='/event/:id' component={EventCard}></PrivateRoute> */}
        <PrivateRoute path='/edit/:id' component={EditEventPage}></PrivateRoute>
        <HeaderlessRoute path='/user/:handle' component={MyEventsPage} />
        {/* <PrivateRoute path='/edit' component={EditUserDetails} exact={true}></PrivateRoute> */}
        {/* <PrivateRoute path='/me' component={MyEventsPage} exact={true}></PrivateRoute> */}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
