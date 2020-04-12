import React from 'react';
import { Route,  Redirect } from 'react-router-dom';
import {
  UserSession,
  AppConfig,
} from 'blockstack';
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      userSession.isUserSignedIn()?
      <Component {...props} />:
      <Redirect to="/" />
    )} />
  );
};

export default PublicRoute;