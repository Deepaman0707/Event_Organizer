import React from 'react'
import { makeStyles } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Card from '../Reusables/Card'
import CardContent from '@material-ui/core/CardContent'
import { Typography } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import { useSelector } from 'react-redux'

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
    fontSize: '30px',
    backgroundColor: 'black',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 30px 0 30px',
  },
}))

export const UserDetails = () => {
  const classes = useStyles()
  const view = useSelector((state) => state.auth.view)
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Avatar className={classes.avaIcon}>
          {view.name === undefined ? 'A' : view.name.slice(0, 1)}
        </Avatar>
        <Typography variant='h4'>{view.name}</Typography>
        <Typography variant='h4'>{view.email}</Typography>
        <div className={classes.values}>
          <div className={classes.details}>
            <FavoriteIcon className={classes.fonts} color='secondary' />
            <Typography variant='h3' color='secondary'>
              {/* {followers.length || follows.followers.length} */}
            </Typography>
          </div>
          <div className={classes.details}>
            <CheckCircleIcon className={classes.fonts} color='primary' />
            <Typography variant='h3' color='primary'>
              {/* {following.length || follows.following.length} */}
            </Typography>
          </div>
        </div>
        {/* {(userData.bio && (
          <Typography variant='h4'>{userData.bio}</Typography>
        )) ||
          (user.bio && <Typography variant='h4'>{user.bio}</Typography>)} */}
      </CardContent>
    </Card>
  )
}

export default UserDetails
