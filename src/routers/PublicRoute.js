import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import ParticlesBg from "particles-bg";
export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <div>

          <Component {...props} />
          <ParticlesBg type="random" bg={true} />
        </div>
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PublicRoute);
