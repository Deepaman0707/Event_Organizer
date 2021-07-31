import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import {startGetUserDetails} from './../../actions/user';

import UserEventList from './UserEventList'
import { makeStyles } from '@material-ui/core/styles'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import Popup from '../Wrappers/Popup'
import AddEventForm from '../CreateEventForm/AddEventForm'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ParticleBgSection from '../Wrappers/ParticleBgSection'
import { red } from '@material-ui/core/colors'
import PersonIcon from '@material-ui/icons/Person'
import { Grid } from '@material-ui/core'
import { PanoramaSharp } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  contain:{
    width: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    padding: theme.spacing(4),

  }
}))

const UserEventDashboard = (props) => {
  const classes = useStyles()
  const handle = props.match.params.handle
  
  const [open, setOpen] = React.useState(false)
  const [userData, setUserData] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  
  useEffect(() => {
    if (handle) {
      props.getUserDetails(handle).then((data) => {
        setUserData(data.user)
        setFollowers(data.follows.followers)
        setFollowing(data.follows.following)
      })
    }
    console.log(handle)
  }, [])
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

        <Grid container spacing={2} justifyContent='center'>
          {/* <EventFilters /> */}
        </Grid>
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
      <Grid container className={classes.contain}>
        <Grid item xs={6}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image='src\assets\empty.jpg'
              title='Paella dish'
            />
            <CardHeader
              avatar={
                <Avatar aria-label='recipe' className={classes.avatar}>
                  <img src={userData.imageURL || props.user.imageURL} alt='' />{' '}
                  User
                </Avatar>
              }
              title={`User Name : ${(userData.name && userData.name) || (props.user.name && props.user.name)}`}
              subheader={`userHandle: ${userData.handle || props.user.handle}`}
            />

            <CardContent>
              <Typography variant='h5' color='textSecondary' component='p'>
                <PersonIcon fontSize='large' /> Followers:
                {followers.length || props.follows.followers.length}
              </Typography>
              <Typography variant='h5' color='textSecondary' component='p'>
                <FavoriteIcon /> Following:
                {following.length || props.follows.following.length}
              </Typography>
              <Typography variant='h5' color='textSecondary' component='p'>
                {(userData.bio && <h3>bio: {userData.bio}</h3>) ||
            (props.user.bio && <h3>bio: {props.user.bio}</h3>)}
                User Bio:
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Timeline align='alternate'>
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
          </Timeline>
        </Grid>
      </Grid>
      <UserEventList handleOpen={handleOpen} open={open} />
      <Popup open={open} handleClose={handleClose} componenet={AddEventForm} />
    </>
  )
}
const mapStateToProps = (state,props) => ({
    user: props.match.params.handle ? '' : state.user.user,
    follows: state.user.follows
})
const mapDispatchToProps = (dispatch) => ({
    getUserDetails: (handle) => dispatch(startGetUserDetails(handle)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEventDashboard)