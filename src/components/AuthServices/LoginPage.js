import React, { useState, useEffect } from 'react'
import Link from 'react-router-dom/Link'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { CircularProgress } from '@material-ui/core'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const LoginPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  console.log(user)
  const setAuth = () =>
    dispatch({
      type: 'LOGIN',
    })
  const setUser = (user) =>
    dispatch({
      type: 'INPUTUSER',
      payload: user,
    })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })
  const { email, password } = inputs
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const body = { email, password }
      const response = await fetch(
        'https://mighty-anchorage-45416.herokuapp.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      )
      const parseRes = await response.json()
      console.log(parseRes.userData)
      setUser(parseRes.userData)
      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken)
        setLoading(false)
        setAuth()
        toast.success('Logged in Successfully')
      } else {
        setLoading(false)
        alert('error')
        toast.error(parseRes)
      }
    } catch (err) {
      alert(err)
      console.error(err.message)
    }
  }

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Container className='main' component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={onSubmit} noValidate>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  onChange={(e) => onChange(e)}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  onChange={(e) => onChange(e)}
                />
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2"> */}
                    Forgot password?
                    {/* </Link> */}
                  </Grid>
                  <Grid item>
                    <Link to='/signup' variant='body2'>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </div>
      )}
      {/* {loading && <ClimbingBoxLoader color={color} loading={loading} />} */}

      {/* <h5>or login using</h5>
                        <div className="box-layout__signin"> 
                             <button>
                                 <FontAwesomeIcon icon={faGoogle}size="3x"/>
                             </button> 
                             <button>
                                 <FontAwesomeIcon icon={faFacebookSquare}  size="3x"/>
                             </button>
                            
                         </div> */}
      {/* {error && showErrors()} */}
    </div>
  )
}

export default LoginPage
