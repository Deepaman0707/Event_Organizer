import React from 'react'
import UserEventList from './UserEventList'
// import { makeStyles } from '@material-ui/core/styles'
import Popup from '../Wrappers/Popup'
import AddEventForm from '../CreateEventForm/AddEventForm'
import Typography from '@material-ui/core/Typography'
import ParticleBgSection from '../Wrappers/ParticleBgSection'

// const useStyles = makeStyles((theme) => ({
//   contain: {
//     width: '1000px',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     alignItems: 'center',
//     padding: theme.spacing(4),
//   },
// }))

const UserEventDashboard = (props) => {
  // const classes = useStyles()
  const [open, setOpen] = React.useState(false)

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
          My Events
        </Typography>

        {/* <Grid container spacing={2} justifyContent='center'>
        <EventFilters /> 
        </Grid> */}
      </div>
    )
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <ParticleBgSection component={sectionHeader} />
      {/* <Grid container className={classes.contain}>
        <Grid item xs={6}> */}
      {/* <Timeline align='alternate'>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot variant='outlined' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Timeline Element 1</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot variant='outlined' color='primary' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Timeline Element 2</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot variant='outlined' color='secondary' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Timeline Element 3</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot variant='outlined' />
              </TimelineSeparator>
              <TimelineContent>Timeline Element 4</TimelineContent>
            </TimelineItem>
          </Timeline> */}
      {/* </Grid>
      </Grid> */}
      <UserEventList handleOpen={handleOpen} open={open} />
      <Popup open={open} handleClose={handleClose} componenet={AddEventForm} />
    </>
  )
}

export default UserEventDashboard
