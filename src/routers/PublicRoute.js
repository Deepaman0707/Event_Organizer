import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import ParticlesBg from 'particles-bg'
import { useSelector } from 'react-redux'

export const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <Redirect to='/dashboard' />
        ) : (
          <div>
            <Component {...props} />
            <ParticlesBg type='random' bg={true} />
          </div>
        )
      }
    />
  )
}

export default PublicRoute
