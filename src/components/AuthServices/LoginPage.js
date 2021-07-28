import React, { useState } from "react";
import { connect } from "react-redux";
import { startLogin } from "./../../actions/auth";
import isEmail from "validator/lib/isEmail";
import Link from "react-router-dom/Link";
import LoadingPage from "../Wrappers/LoadingPage";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CircularProgress } from "@material-ui/core";

import { faGoogle, faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

export const LoginPage = ({ startLogin, error, unsetError, loading }) => {
  const classes = useStyles();

  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");

  const onStartLogin = (e) => {
    e.preventDefault();
    if (isEmail(email)) {
      const credentials = {
        email,
        password,
      };

      startLogin(credentials).then(() => {});
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
        <div></div>
      )}
      {/* {loading && <ClimbingBoxLoader color={color} loading={loading} />} */}
      <Container className="main" component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={onStartLogin} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
              onChange={(e) => getPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>

      {/* <h5>or login using</h5>
                        <div className="box-layout__signin"> 
                             <button>
                                 <FontAwesomeIcon icon={faGoogle}size="3x"/>
                             </button> 
                             <button>
                                 <FontAwesomeIcon icon={faFacebookSquare}  size="3x"/>
                             </button>
                            
                         </div> */}
      {error && showErrors()}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: (credentials) => dispatch(startLogin(credentials)),
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
