import React, { useState } from "react";
import { connect } from "react-redux";
import { startSignUp } from "./../../actions/auth";
import isEmail from "validator/lib/isEmail";

import { CircularProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const LoginPage = ({
  startSignUp,
  error,
  setUIErrors,
  loading,
  unsetError,
}) => {
  const classes = useStyles();

  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const [handle, getUserHandle] = useState("");
  const [confirmPassword, getConfirmPassword] = useState("");
  const [name, getName] = useState("");
  //   const [college, getCollege] = useState("");

  const onStartSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const credentials = {
        email,
        name,
        password,
        confirmPassword,
        handle,
      };
      startSignUp(credentials);
    } else {
      alert("Your password doesn't match!");
    }
  };
  const showErrors = () => {
    if (!!error) alert(error);
    unsetError();
  };
  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Container className="main" component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form
                className={classes.form}
                onSubmit={onStartSignUp}
                noValidate
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={(e) => getName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="handle"
                  label="Handle"
                  name="handle"
                  autoComplete="handle"
                  onChange={(e) => getUserHandle(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => getEmail(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => getPassword(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  onChange={(e) => getConfirmPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </Container>
        </div>
      )}
      {error && showErrors()}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startSignUp: (credentials) => dispatch(startSignUp(credentials)),
  setUIErrors: (error) =>
    dispatch({
      type: "SET_ERRORS",
      error: error,
    }),
  unsetError: () =>
    dispatch({
      type: "SET_ERRORS",
      error: "",
    }),
});

const mapStateToProps = (state) => ({
  error: state.auth.error,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
