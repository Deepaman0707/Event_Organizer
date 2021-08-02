import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { connect } from 'react-redux'
import { startGetUserDetails } from './../../actions/user'
import Card from '../Reusables/Card'
import CardContent from '@material-ui/core/CardContent'
import { Typography } from '@material-ui/core'
import { Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    marginTop: '20px',
    marginBottom: 0,
    width: 500,
    textAlign: 'center',
    padding: '20px',
  },
  content: {
    padding: '20px 0',
  },
  fonts: {
    fontSize: '45px',
    paddingRight: '5px',
  },

  handle: {
    padding: theme.spacing(2),
    paddingBottom: 0,
    textAlign: 'center',
  },
  values: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  avaIcon: {
    margin: theme.spacing(1),
    width: '100px',
    height: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 30px 0 30px',
  },
}))

export const UserDetails = ({ user, handle, getUserDetails, follows }) => {
  const classes = useStyles()

  const [userData, setUserData] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  useEffect(() => {
    console.log(handle)
    if (handle) {
      getUserDetails(handle).then((data) => {
        setUserData(data.user)
        setFollowers(data.follows.followers)
        setFollowing(data.follows.following)
      })
    }
  }, [])

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Avatar className={classes.avaIcon}>
          <img src={userData.imageURL || user.imageURL} />
        </Avatar>
        <Typography variant='h4'>
          {(userData.name && userData.name) || (user.name && user.name)}
        </Typography>
        <Typography variant='h4'>{userData.handle || user.handle}</Typography>
        <div className={classes.values}>
          <div className={classes.details}>
            <FavoriteIcon className={classes.fonts} color='secondary' />
            <Typography variant='h3' color='secondary'>
              {followers.length || follows.followers.length}
            </Typography>
          </div>
          <div className={classes.details}>
            <CheckCircleIcon className={classes.fonts} color='primary' />
            <Typography variant='h3' color='primary'>
              {following.length || follows.following.length}
            </Typography>
          </div>
        </div>
        {(userData.bio && (
          <Typography variant='h4'>{userData.bio}</Typography>
        )) ||
          (user.bio && <Typography variant='h4'>{user.bio}</Typography>)}
      </CardContent>
    </Card>
  )
}

const mapStateToProps = (state, props) => ({
  user: props.handle ? '' : state.user.user,
  follows: state.user.follows,
})
const mapDispatchToProps = (dispatch) => ({
  getUserDetails: (handle) => dispatch(startGetUserDetails(handle)),
})
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)
