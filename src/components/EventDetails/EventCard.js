import React, { useState, useEffect } from 'react'
// react plugin for creating charts
import ChartistGraph from 'react-chartist'
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
// @material-ui/icons
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import AccessTime from '@material-ui/icons/AccessTime'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
//@material-ui/core
import Grid from '@material-ui/core/Grid'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
// core components
import Card from '../Reusables/Card'
import CardHeader from '../Reusables/CardHeader.js'
import CardBody from '../Reusables/CardBody.js'
import CardFooter from '../Reusables/CardFooter.js'
import clsx from 'clsx'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { CardContent } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import { dailySalesChart, emailsSubscriptionChart } from '../../assets/charts'
import { Typography } from '@material-ui/core'
import Music from '../../assets/Music.jpg'
import Arts_and_Craft from '../../assets/Arts_and_Craft.jpg'
import Esports from '../../assets/E-sports.jpg'
import Sports from '../../assets/Sports.jpg'
import Dance from '../../assets/Dance.jpg'
import Empty from '../../assets/empty.jpg'
import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from '../../assets/UIItems'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'react-router-dom/Link'
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '54px',
    width: '1000px',
    borderRadius: 0,
  },

  successText: {
    color: successColor[0],
  },

  upArrowCardCategory: {
    width: '16px',
    height: '16px',
  },

  cardCategory: {
    color: grayColor[0],
    margin: '0',
    fontSize: '24px',
    marginTop: '0',
    paddingTop: '10px',
    marginBottom: '0',
  },

  cardCategoryWhite: {
    color: 'rgba(' + hexToRgb(whiteColor) + ',.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },

  stats: {
    color: grayColor[0],
    display: 'inline-flex',
    fontSize: '12px',
    '& svg': {
      top: '4px',
      width: '16px',
      height: '16px',
      position: 'relative',
      marginRight: '10px',
      marginLeft: '10px',
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      top: '4px',
      fontSize: '16px',
      position: 'relative',
      marginRight: '3px',
      marginLeft: '3px',
    },
  },

  cardTitle: {
    color: grayColor[2],
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontSize: '15px',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1',
    },
  },

  cardTitleWhite: {
    color: whiteColor,
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1',
    },
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expandOpen: {
    transform: 'rotate(180deg)',
  },

  btn: {
    margin: theme.spacing(2),
    alignSelf: 'center',
  },

  fonts: {
    fontSize: '30px',
  },
  icon: {
    padding: '0 5px 0 5px',
    fontSize: '30px',
  },
  btnLike: {
    fontSize: '20px',
    paddingRight: theme.spacing(4),
  },

  desc: {
    marginTop: 0,
    color: grayColor[0],
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: 0,
  },

  handle: {
    display: 'flex',
    alignItems: 'center',
  },

  time: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginLeft: '10px',
    marginRight: '10px',
    padding: theme.spacing(2),
  },

  register: {
    display: 'flex',
    justifyContent: 'center',
  },

  created: {
    textAlign: 'center',
  },

  name: {
    paddingTop: theme.spacing(1),
    textAlign: 'center',
    margin: 0,
  },

  avaIcon: {
    margin: theme.spacing(1),
    width: '35px',
    height: '35px',
    fontSize: '20px',
    backgroundColor: 'black',
  },

  values: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },

  fees: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: 'green',
    paddingLeft: theme.spacing(4),
  },

  attendNum: {
    textAlign: 'center',
    color: grayColor[0],
    fontSize: '50px',
  },

  attendValue: {
    textAlign: 'center',
    color: grayColor[0],
    fontSize: '20px',
  },

  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  eventImage: {
    padding: theme.spacing(3),
    width: '100%',
    height: '400px',
  },

  foot: {
    fontSize: '12px',
    color: grayColor[0],
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: 0,
    marginTop: 0,
  },

  graph: {
    marginTop: '15px',
    marginBottom: '10px',
  },
  details: {
    color: grayColor[0],
    display: 'flex',
    fontSize: '12px',
    alignItems: 'center',
    padding: '0 15px 0 15px',
  },
}))

const EventCard = () => {
  const classes = useStyles()
  const event = useSelector((state) => state.auth.e)
  const user = useSelector((state) => state.auth.user)
  const view = useSelector((state) => state.auth.view)
  console.log(event)
  const dispatch = useDispatch()
  const setEvent = (e) =>
    dispatch({
      type: 'SET_EVENT',
      payload: e,
    })
  const setCreator = (view) =>
    dispatch({
      type: 'SET_VIEW',
      payload: view,
    })

  useEffect(() => {
    (async() => {
    try {
      // const body = { id: user.id }
      const response = await fetch(
        `https://mighty-anchorage-45416.herokuapp.com/userdetail/${event.creator}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        }
      )
      const parseRes = await response.json()
      console.log(parseRes.data)
      setCreator(parseRes.data)
    } catch (err) {
      alert(err)
      console.error(err.message)
    }
    })()
  })
  const setLike = async () => {
    try {
      // const body = { id: user.id }
      const response = await fetch(`https://mighty-anchorage-45416.herokuapp.com/likes/${event.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          id: parseInt(user.id),
        }),
      })
      const parseRes = await response.json()
      console.log(parseRes.data)
      setEvent(parseRes.data)
    } catch (err) {
      alert(err)
      console.error(err.message)
    }
  }
  const setUnlike = async () => {
    try {
      const response = await fetch(`https://mighty-anchorage-45416.herokuapp.com/likes/${event.id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          id: parseInt(user.id),
        }),
      })
      const parseRes = await response.json()
      console.log(parseRes.data)
      setEvent(parseRes.data)
    } catch (err) {
      alert(err)
      console.error(err.message)
    }
  }
  const setRegister = async () => {
    try {
      const response = await fetch(
        `https://mighty-anchorage-45416.herokuapp.com/attendees/${event.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            id: parseInt(user.id),
          }),
        }
      )
      const parseRes = await response.json()
      console.log(parseRes.data)
      setEvent(parseRes.data)
    } catch (err) {
      alert(err)
      console.error(err.message)
    }
  }
  const setUnregister = async () => {
    try {
      const response = await fetch(
        `https://mighty-anchorage-45416.herokuapp.com/attendees/${event.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            id: parseInt(user.id),
          }),
        }
      )
      const parseRes = await response.json()
      console.log(parseRes.data)
      setEvent(parseRes.data)
    } catch (err) {
      alert(err)
      console.error(err.message)
    }
  }
  const [expanded, setExpanded] = React.useState(false)
  const [liked, setLiked] = useState(event.likes.includes(user.id))
  const [registered, setRegistered] = useState(
    event.attendees.includes(user.id)
  )
  const image = (category) => {
    switch (category) {
      case 'Music':
        return Music
      case 'Dance':
        return Dance
      case 'E-Sports':
        return Esports
      case 'Sports':
        return Sports
      case 'Art_and_Craft':
        return Arts_and_Craft
      default: 
        return Empty
    }
  }
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const toggleLike = () => {
    liked ? setUnlike() : setLike()
    setLiked(!liked)
  }
  const toggleRegister = () => {
    registered ? setUnregister() : setRegister()
    setRegistered(!registered)
  }

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid className={classes.item} item xs={6}>
          <img
            className={classes.eventImage}
            src={image(event.category)}
            alt='Event'
          />
        </Grid>
        <Grid items xs={6}>
          <CardContent>
            <CardHeader
              style={{
                padding: 0,
              }}
            >
              <Link to={`../user/${event.creator}`}>
                <div className={classes.handle}>
                  <Avatar className={classes.avaIcon}>
                    {view.name === undefined ? 'A' : view.name.slice(0, 1)}
                  </Avatar>
                  <Typography variant='h4' color='secondary'>
                    {view.name}
                  </Typography>
                </div>
              </Link>
              <Typography
                className={classes.created}
                variant='h5'
                style={{
                  color: 'black',
                }}
              >
                presents
              </Typography>
              <Typography
                className={classes.name}
                variant='h3'
                color='secondary'
              >
                {event.event_name}
              </Typography>
            </CardHeader>
            <Typography className={classes.attendNum}>
              {event.attendees.length}
            </Typography>
            <Typography className={classes.attendValue}>Attendees</Typography>
            <div className={classes.values}>
              <Button
                className={classes.btnLike}
                title={liked ? 'unlike' : 'like'}
                variant='text'
                color='secondary'
                size='large'
                onClick={toggleLike}
              >
                {liked ? (
                  <FavoriteIcon className={classes.fonts} />
                ) : (
                  <FavoriteBorderIcon className={classes.fonts} />
                )}
                {event.likes.length}
              </Button>

              <Typography variant='h4' className={classes.fees}>
                <MonetizationOnIcon
                  className={classes.fonts}
                  style={{
                    color: 'green',
                  }}
                />
                {event.fee}
              </Typography>
            </div>
          </CardContent>
          <Typography className={classes.desc} variant='h6'>
            {event.description}
          </Typography>
        </Grid>
      </Grid>
      <CardFooter className={classes.foot}>
        <div>Know More about the event</div>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
        <div className={classes.register}>
          <Button
            className={classes.btn}
            title={registered ? 'unRegister' : 'register'}
            variant='contained'
            color='primary'
            onClick={toggleRegister}
          >
            {registered ? <p>Unregister</p> : <p>Register</p>}
          </Button>
        </div>
      </CardFooter>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <Grid container className={classes.grid}>
          <Grid
            item
            style={{
              padding: '0 0 0 30px',
            }}
            xs={12}
            sm={12}
            md={6}
          >
            <Card className={classes.graph} chart>
              <CardHeader color='success'>
                <ChartistGraph
                  className='ct-chart'
                  data={dailySalesChart.data}
                  type='Line'
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{' '}
                  increase in today sales.
                </p>
              </CardBody>
            </Card>
          </Grid>
          <Grid
            item
            style={{
              padding: '0 30px 0',
            }}
            xs={12}
            sm={12}
            md={6}
          >
            <Card className={classes.graph} chart>
              <CardHeader color='warning'>
                <ChartistGraph
                  className='ct-chart'
                  data={emailsSubscriptionChart.data}
                  type='Bar'
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
            </Card>
          </Grid>
          <Card className={classes.time}>
            <div className={classes.details}>
              <AccessTime className={classes.icon} />
              {`${event.startdate}, ${event.starttime} - ${event.enddate}, ${event.endtime}`}
            </div>
            <div className={classes.details}>
              <LocationOnIcon className={classes.icon} />
              {'UIET'}
            </div>
          </Card>
        </Grid>
      </Collapse>
    </Card>
  )
}

export default EventCard
