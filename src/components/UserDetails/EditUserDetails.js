import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0px',
    padding: '0px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    top: 0,
    marginBottom: '10px',
  },
  handle: {
    padding: '25px',
  },
  content: {
    padding: 0,
    marginBottom: 0,
  },
  textBtn: {
    fontSize: '10px',
  },
  btn: {
    width: '100px',
    margin: '25px',
  },
}))

export const EditUserDetails = () => {
  const classes = useStyles()
  const {user} = useSelector(state => state.auth)
  const [name, setName] = useState(user.name)
  const [college, setCollege] = useState(user.college)
  const [year, setYear] = useState(user.year)
  const [contact_no, setContact] = useState(user.contact_no)

  const onSubmit = (e) => {
    e.preventDefault()
    const details = {
      name,
      college,
      year: year.toString(),
      contact_no,
    }
    console.log(details)
  }

  return (
    <Card elevation={0}>
      <CardContent className={classes.content}>
        <form onSubmit={onSubmit}>
          <Typography
            className={classes.handle}
            variant='h5'
            color='textSecondary'
            component='p'
          >
            {user.handle}
          </Typography>
          <TextField
            id='username'
            label='Name'
            name='name'
            variant='outlined'
            value={name || user.name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            id='usercollege'
            label='College'
            variant='outlined'
            name='college'
            value={college || user.college}
            onChange={(e) => setCollege(e.target.value)}
            fullWidth
          />
          <TextField
            type='number'
            id='year'
            label='Year'
            variant='outlined'
            name='year'
            value={year || user.year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
          />
          <TextField
            type='text'
            id='contact'
            label='Contact No'
            variant='outlined'
            name='contact_no'
            value={contact_no || user.contact_no}
            onChange={(e) => setContact(e.target.value)}
            fullWidth
          />

          <Button
            className={classes.btn}
            type='submit'
            variant='contained'
            color='primary'
          >
            <p className={classes.textBtn}>SUBMIT</p>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default (EditUserDetails)
