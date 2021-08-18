import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
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

const LoginPage = () => {
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
    name: '',
    password: '',
    confirmPassword: '',
  })

  const { email, name, password } = inputs
  // const dispatch = useDispatch({ type: 'LOGIN' })
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password === inputs.confirmPassword) {
      try {
        setLoading(true)
        const body = { email, name, password }
        const response = await fetch(
          'https://mighty-anchorage-45416.herokuapp.com/auth/register',
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
        if (parseRes.jwtToken) {
          localStorage.setItem('token', parseRes.jwtToken)
          // setAuth(true)
          toast.success('Register Successfully')
        } else {
          // setAuth(false)
          alert('error')
          toast.error(parseRes)
        }

        setUser(parseRes.userData)

        setLoading(false)

        setAuth()
      } catch (err) {
        alert(err)
        console.error(err.message)
      }
    } else {
      alert("Your password doesn't match!")
    }
  }

  return (
    <div>
      {loading === true ? (
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
              <form
                className={classes.form}
                // onSubmit={onStartSignUp}
                onSubmit={onSubmit}
                noValidate
              >
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
                  id='name'
                  label='Name'
                  name='name'
                  autoComplete='name'
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
                  onChange={(e) => onChange(e)}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirm_password'
                  onChange={(e) => onChange(e)}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </Container>
        </div>
      )}
    </div>
  )
}

export default LoginPage
