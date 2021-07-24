import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import FormPage1 from './FormPage1'
import FormPage2 from './FormPage2'
import FormPage3 from './FormPage3'
import Dialog from '@material-ui/core/Dialog'

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
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(4),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

// function for checkout

function Checkout({ handleClose }) {
  // function to tranverse inside the form

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FormPage1 data={data} handleChange={handleChange} handleImage={handleImage} />
      case 1:
        return <FormPage2 data={data} handleChange={handleChange} />
      case 2:
        return <FormPage3 data={data} handleChange={handleChange} />
      case 3:
        return null
      default:
        throw new Error('Unknown step')
    }
  }
  const classes = useStyles()

  const steps = [
    'Title and Description',
    'Fees and Timings',
    'Review your Event',
  ]

  // js object state for all the data

  const [data, setData] = useState({
    title: '',
    description: '',
    fee: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    imageURL: 'public\images\empty.jpg',
  })
  const [activeStep, setActiveStep] = React.useState(0)

  const handleImage = (e) => {
    
    const { name, value } = e
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // function to handle changes

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // function to handle changes

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClose()
    console.log(data)
  }

  // function to handle next button

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  // function to handle back button

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h4' align='center'>
          Create Event
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {getStepContent(activeStep)}
          <div className={classes.buttons}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} className={classes.button}>
                Back
              </Button>
            )}
            <Button
              variant='contained'
              color='primary'
              onClick={handleNext}
              className={classes.button}
              type={activeStep === steps.length ? 'submit' : 'button'}
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </React.Fragment>
      </Paper>
    </form>
  )
}

// ModalDialog for pop form

const ModalDialog = ({ open, handleClose }) => {
  return (
    // props received from App.js

    <Dialog open={open} onClose={handleClose}>
      <Checkout handleClose={handleClose} />
    </Dialog>
  )
}

export default ModalDialog
