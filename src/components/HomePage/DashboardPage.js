import React from 'react'
import EventList from './EventList'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Popup from '../Wrappers/Popup'
import AddEventForm from '../CreateEventForm/AddEventForm'
import EventCard from '../EventDetails/EventCard'
import { Typography } from '@material-ui/core'
import EventFilters from './EventFilters'
import { Grid } from '@material-ui/core'
import ParticleBgSection from '../Wrappers/ParticleBgSection'

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
}))

// import FamousCard from './FamousCard';
const DashboardPage = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [openEvent, setOpenEvent] = React.useState(false)
  const [eventID, setEventID] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEventOpen = () => {
    setOpenEvent(true)
  }

  const handleEventClose = () => {
    setOpenEvent(false)
  }

  const handleEventID = (eId) => {
    setEventID(eId)
  }

  const getEventDetails = () => <EventCard eventID={eventID} />
  const sectionHeader = () => {
    return (
      <div>
        <Typography
          component='h1'
          variant='h2'
          align='center'
          color='textPrimary'
          gutterBottom
        >
          Explore
        </Typography>

        <Grid container spacing={2} justifyContent='center'>
          <EventFilters />
        </Grid>
      </div>
    )
  }

  return (
    <React.Fragment>
      <ParticleBgSection component={sectionHeader} />
      <EventList handleEventOpen={handleEventOpen} setEventID={handleEventID} />
      <Fab
        size='large'
        className={classes.fab}
        component='span'
        aria-label='add'
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Popup open={open} handleClose={handleClose} componenet={AddEventForm} />
      <Popup
        open={openEvent}
        handleClose={handleEventClose}
        componenet={getEventDetails}
      />
    </React.Fragment>
  )
}

export default DashboardPage
