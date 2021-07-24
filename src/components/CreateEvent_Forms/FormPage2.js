import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'


export default function FormPage2(props) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id='fee'
            type='number'
            label='Fees'
            variant='outlined'
            name='fee'
            value={props.data.fee}
            onChange={(e) => {
              props.handleChange(e)
            }}
            fullWidth
            autoComplete='cc-name'
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Date
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h6' gutterBottom>
            From :
          </Typography>
          <TextField
            required
            id='startDate'
            type='date'
            variant='outlined'
            name='startDate'
            value={props.data.startDate}
            onChange={(e) => {
              props.handleChange(e)
            }}
            fullWidth
            autoComplete='cc-number'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h6' gutterBottom>
            To :
          </Typography>
          <TextField
            required
            id='endDate'
            type='date'
            variant='outlined'
            name='endDate'
            value={props.data.endDate}
            onChange={(e) => {
              props.handleChange(e)
            }}
            fullWidth
            autoComplete='cc-number'
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Time
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h6' gutterBottom>
            From :
          </Typography>
          <TextField
            required
            id='startTime'
            type='time'
            variant='outlined'
            name='startTime'
            value={props.data.startTime}
            onChange={(e) => {
              props.handleChange(e)
            }}
            fullWidth
            autoComplete='cc-exp'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h6' gutterBottom>
            To :
          </Typography>
          <TextField
            required
            id='endTime'
            type='time'
            variant='outlined'
            name='endTime'
            value={props.data.endTime}
            onChange={(e) => {
              props.handleChange(e)
            }}
            fullWidth
            autoComplete='cc-exp'
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
