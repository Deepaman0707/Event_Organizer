import React from 'react'
import EventList from './EventList'

import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'

import Popup from '../Wrappers/Popup'
import AddEventForm from '../CreateEventForm/AddEventForm'
import EventDetails from '../EventDetails/EventDetails'

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
  const [open, setOpen] = React.useState(false);
  const [openEvent, setOpenEvent] = React.useState(false);
  const [eventID, setEventID] = React.useState(false);

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

  const getEventDetails = () => (
    <EventDetails eventID={eventID} />
  )

  return (
    <React.Fragment>
      <ParticleBgSection title={'Explore'} page={'Dashboard'}/>
      <EventList handleEventOpen={handleEventOpen} setEventID={handleEventID}/>
      <Fab
        size='large'
        className={classes.fab}
        component='span'
        aria-label='add'
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Popup open={open} handleClose={handleClose} componenet={AddEventForm}/>
      <Popup open={openEvent} handleClose={handleEventClose} componenet={getEventDetails}/>
    </React.Fragment>
  )
}

export default DashboardPage
