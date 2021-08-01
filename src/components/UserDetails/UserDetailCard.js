import React from 'react'
import cx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CardActions from '@material-ui/core/CardActions'
import TextInfoContent from '@mui-treasury/components/content/textInfo'
import useBlogTextInfoContentStyles from '@mui-treasury/styles/textInfoContent/blog'
import Collapse from '@material-ui/core/Collapse'
import clsx from 'clsx'
import CardFooter from '../Reusables/CardFooter.js'
import { Avatar } from '@material-ui/core'
import { connect } from 'react-redux'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from '../../assets/UIItems'
import { CardHeader } from '@material-ui/core'
import Link from 'react-router-dom/Link'
import { Theme } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import EditUserDetails from './EditUserDetails'
import useOverShadowStyles from '@mui-treasury/styles/shadow/over'
import { Typography } from '@material-ui/core'
import sample from '../../assets/empty.jpg'
import auto from 'async'
import ThemeConsumer from 'styled-components'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    marginTop: '20px',
    marginBottom: 0,
    width: 500,
    textAlign: 'center',
    padding: '20px',
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
  },
  details:{
    display: 'flex',
    alignItems: 'center',
    padding: '5px 30px 0 30px',
  },
}))

export const UserDetailCard = (props) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Avatar className={classes.avaIcon}>
          <img src={props.imageUrl || props.user.imageURL} />
        </Avatar>
        <Typography variant='h4'>{props.userHandle}</Typography>
        <div className={classes.values}>
          <div className={classes.details}>
            <FavoriteIcon className={classes.fonts} color='secondary' />
            <Typography variant='h3' color='secondary'>
              {props.follows.followers.length}
            </Typography>
          </div>
          <div className={classes.details}>
            <CheckCircleIcon className={classes.fonts} color='primary' />
            <Typography variant='h3' color='primary'>
              {props.follows.followers.length}
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
          <p> EDIT</p>
        </Button>
      </CardFooter>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent className={classes.content}>
          <EditUserDetails />
        </CardContent>
      </Collapse>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  userHandle: state.user.userHandle,
  follows: state.user.follows,
})

export default connect(mapStateToProps)(UserDetailCard)

//   return (
//     <Card elevation={0} className={classes.root}>
//       <CardContent>
//         <CardMedia image={props.user.imageURL} />
//         <Typography variant='h5' color='textSecondary' component='p'>
//           User Image // yaha link daal dena
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button
//           variant='outlined'
//           color='primary'
//           className={classes.editBtn}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label='show more'
//         >
//           <p className={classes.textBtn}> EDIT</p>
//         </Button>
//       </CardActions>
//     </Card>
//   )
// }
