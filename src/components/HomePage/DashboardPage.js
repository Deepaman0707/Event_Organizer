import React from 'react'
import EventList from './EventList'

import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'

import Popup from '../Wrappers/Popup'
import AddEventForm from '../CreateEventForm/AddEventForm'

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

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <ParticleBgSection title={'Explore'} page={'Dashboard'}/>
      <EventList />
      <Fab
        size='small'
        className={classes.fab}
        component='span'
        aria-label='add'
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Popup open={open} handleClose={handleClose} componenet={AddEventForm}/>
    </React.Fragment>
  )
}

export default DashboardPage
