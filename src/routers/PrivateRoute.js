import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Wrappers/Header';
import jwtDecode from 'jwt-decode';
import ModalDialog from '../components/CreateEventForm/AddEventForm'; 



export const PrivateRoute = ({
  login,
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated === true ? (
          <div>
            <Header
              handleOpen={handleOpen}
            />
            <Component {...props} />
            <ModalDialog open={open} handleClose={handleClose} />
          </div>
        ) : (
          <Redirect to='/' />
        )
      }
    />
  )
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps)(PrivateRoute);
