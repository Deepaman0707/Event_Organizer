import React from 'react'
import EventList from './EventList'
import EventFilters from './EventFilters'

import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import ParticlesBg from 'particles-bg'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'

import Popup from '../Wrappers/Popup'
import AddEventForm from '../CreateEventForm/AddEventForm'
// import ModalDialog from '../CreateEventForm/AddEventForm'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit'>Your Website</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
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
      <CssBaseline />
      {/* Hero unit */}
      <div
        className={classes.heroContent}
        style={{ backgroundColor: 'transparent', position: 'relative' }}
      >
        <Container maxWidth='sm'>
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
          <ParticlesBg type='random' bg={true} />
        </Container>
      </div>
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
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant='h6' align='center' gutterBottom>
          Footer
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='textSecondary'
          component='p'
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}

export default DashboardPage
