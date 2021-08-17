import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import CardFooter from '../Reusables/CardFooter.js'
import { Avatar } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import FavoriteIcon from '@material-ui/icons/Favorite'
import EditUserDetails from './EditUserDetails'
import { Typography } from '@material-ui/core'
import Cardbg from '../../assets/cardbg.jpg'
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
  bg: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    top: 0,
    marginBottom: '10px',
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
  sides: {
    bottom: 0,
  },
  values: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  editBtn: {
    marginLeft: 'auto',
    marginRight: 'auto',
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

export const UserDetailCard = () => {
  const classes = useStyles()
  const {user} = useSelector((state) => state.auth)
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <Card className={classes.root}>
      <div style={{ backgroundImage: `url(${Cardbg})` }}>
        <CardContent className={classes.content}>
          <Avatar className={classes.avaIcon}>
            {user.name === undefined ? 'A' : user.name.slice(0, 1)}
          </Avatar>

          <Typography variant='h4'>
            <strong>{user.name} </strong>
            <br />
            <strong>{user.email}</strong>
          </Typography>
          <div className={classes.values}>
            <div className={classes.details}>
              <FavoriteIcon className={classes.fonts} color='secondary' />
              <Typography variant='h3' color='secondary'>
                {/* {user.followers.length} */}
              </Typography>
            </div>
            <div className={classes.details}>
              <CheckCircleIcon className={classes.fonts} color='primary' />
              <Typography variant='h3' color='primary'>
                {/* {user.following.length} */}
              </Typography>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant='outlined'
            color='primary'
            className={classes.editBtn}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <p>EDIT</p>
          </Button>
        </CardFooter>
      </div>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent className={classes.content}>
          <EditUserDetails />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default UserDetailCard
