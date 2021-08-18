import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { useSelector } from 'react-redux'
import categories from '../../literals/category'
// styles //

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    width: '700px',
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(4),
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  heading: {
    padding: theme.spacing(4),
  },
}))

const AddEventForm = ({ handleClose }) => {
  const classes = useStyles()
  const { user } = useSelector((state) => state.auth)
  const creator = user.id
  // Hook for form data
  const [data, setData] = useState({
    title: '',
    description: '',
    fee: '0.0',
    category: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  })
  const {
    title,
    description,
    fee,
    category,
    startDate,
    endDate,
    startTime,
    endTime,
  } = data

  // function to handle changes

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = {
        title,
        description,
        fee,
        creator,
        category,
        startDate,
        endDate,
        startTime,
        endTime,
      }
      const response = await fetch('http://localhost:5000/events/newevent', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const parseRes = await response.json()
      console.log(parseRes.eventData)
    } catch (err) {
      alert(err)
      console.error(err.message)
    }
  }
  return (
    <Paper className={classes.paper}>
      <form onSubmit={onSubmit}>
        <Typography
          variant='h4'
          align='center'
          style={{
            padding: '30px',
          }}
        >
          Create Event
        </Typography>

        <TextField
          style={{
            padding: '5px',
          }}
          required
          id='title'
          label='Title'
          variant='outlined'
          name='title'
          value={data.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          style={{
            padding: '5px',
          }}
          required
          id='description'
          label='Description'
          variant='outlined'
          name='description'
          value={data.description}
          multiline
          onChange={handleChange}
          fullWidth
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              style={{
                padding: '5px',
              }}
              required
              id='fee'
              type='number'
              label='Fees'
              variant='outlined'
              name='fee'
              value={data.fee}
              onChange={handleChange}
              fullWidth
              autoComplete='cc-name'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel
              style={{
                padding: '5px',
              }}
              id='demo-simple-select-label'
            >
              Category
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='category'
              onChange={handleChange}
              fullWidth
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.categoryTitle}>
                  {cat.categoryTitle}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Typography
          variant='h6'
          gutterBottom
          style={{
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          Date
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant='h7' gutterBottom>
              From :
            </Typography>
            <TextField
              style={{
                padding: '10px',
              }}
              required
              id='startDate'
              type='date'
              variant='outlined'
              name='startDate'
              value={data.startDate}
              onChange={handleChange}
              fullWidth
              autoComplete='cc-number'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h7' gutterBottom>
              To :
            </Typography>
            <TextField
              required
              style={{
                padding: '10px',
              }}
              id='endDate'
              type='date'
              variant='outlined'
              name='endDate'
              value={data.endDate}
              onChange={handleChange}
              fullWidth
              autoComplete='cc-number'
            />
          </Grid>
        </Grid>
        <Typography
          variant='h6'
          gutterBottom
          style={{
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          Time
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant='h7' gutterBottom>
              From :
            </Typography>
            <TextField
              style={{
                padding: '10px',
              }}
              required='true'
              id='startTime'
              type='time'
              variant='outlined'
              name='startTime'
              value={data.startTime}
              onChange={handleChange}
              fullWidth
              autoComplete='cc-exp'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h7' gutterBottom>
              To :
            </Typography>
            <TextField
              style={{
                padding: '10px',
              }}
              required
              id='endTime'
              type='time'
              variant='outlined'
              name='endTime'
              value={data.endTime}
              onChange={handleChange}
              fullWidth
              autoComplete='cc-exp'
            />
          </Grid>
        </Grid>
        <Button
          variant='contained'
          color='primary'
          onClick={onSubmit}
          className={classes.button}
          type='submit'
          disabled={
            data.title === '' ||
            data.startDate === '' ||
            data.endDate === '' ||
            data.startTime === '' ||
            data.endTime === ''
          }
        >
          Submit
        </Button>
      </form>
    </Paper>
  )
}

export default AddEventForm
