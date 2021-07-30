import React, { useState, useEffect } from 'react'
// react plugin for creating charts
import ChartistGraph from 'react-chartist'
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
// @material-ui/icons
import Store from '@material-ui/icons/Store'
import DateRange from '@material-ui/icons/DateRange'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import AccessTime from '@material-ui/icons/AccessTime'
//@material-ui/core
import Grid from '@material-ui/core/Grid'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
// core components
import Card from '../Reusables/Card'
import CardHeader from '../Reusables/CardHeader.js'
import CardIcon from '../Reusables/CardIcon.js'
import CardBody from '../Reusables/CardBody.js'
import CardFooter from '../Reusables/CardFooter.js'
import { CardContent } from '@material-ui/core'
import clsx from 'clsx'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { dailySalesChart, emailsSubscriptionChart } from '../../assets/charts'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import { setLikeEvent, setUnLikeEvent } from './../../actions/events'
import { setCheckLikeEvent } from './../../actions/user'
import {
  startRegisterEvent,
  startUnRegisterEvent,
} from './../../actions/events'

import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from '../../assets/UIItems'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '500px',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRadius: 0,
    OverflowEvent: 'scroll',
  },

  successText: {
    color: successColor[0],
  },
  upArrowCardCategory: {
    width: '16px',
    height: '16px',
  },
  stats: {
    color: grayColor[0],
    display: 'inline-flex',
    fontSize: '12px',
    lineHeight: '22px',
    '& svg': {
      top: '4px',
      width: '16px',
      height: '16px',
      position: 'relative',
      marginRight: '3px',
      marginLeft: '3px',
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      top: '4px',
      fontSize: '16px',
      position: 'relative',
      marginRight: '3px',
      marginLeft: '3px',
    },
  },
  content: {
    padding: theme.spacing(2),
  },
  grid: {
    margin: '0 -15px !important',
    width: 'unset',
  },
  gridItem: {
    padding: '0 15px !important',
  },
  cardCategory: {
    color: grayColor[0],
    margin: '0',
    fontSize: '14px',
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
  cardTitle: {
    color: grayColor[2],
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
    marginBottom: theme.spacing(2),
  },
}))

const EventDetails = ({ eventID, event, userHandle, checkLike, likeEvent, unLikeEvent, checkLikeEvent, registerEvent, unRegisterEvent}) => {
  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(false)
  const [likeCount, setLikeCount] = useState(event.likeCount)
  const [like, setLike] = useState(checkLike)
  const [checkRegister, setRegister] = useState(
    event.members.hasOwnProperty(userHandle)
  )

  useEffect(() => {
    checkLikeEvent(eventID).then((data) => {
      setLike(data)
    })
  }, [])

  useEffect(() => {
    setRegister(event.members.hasOwnProperty(userHandle))
  }, [checkRegister])

  const onClickLike = () => {
    likeEvent(eventID).then(() => {
      setLikeCount(likeCount + 1)
      setLike(true)
    })
  }

  const onClickUnLike = () => {
    unLikeEvent(eventID).then(() => {
      setLikeCount(likeCount - 1)
      setLike(false)
    })
  }

  const startRegisterEvent = () => {
    registerEvent(eventID)
  }
  const startUnRegisterEvent = () => {
    unRegisterEvent(eventID)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={classes.content}>
      <Card className={classes.root}>
        <CardHeader color='warning' stats icon>
          <CardIcon color='warning'>
            <img src={event.userImageUrl} />
            <Link to={`../user/${event.userHandle}`}></Link>
          </CardIcon>
          <p className={classes.cardCategory}>Used Handle</p>
          <h3 className={classes.cardTitle}>
            created At
            {event.createdAt}
          </h3>
        </CardHeader>
        <CardContent>
          {checkLike ? (
          <Button
            title='unlike?'
            variant='text'
            color='secondary'
            size='large' //larger no size
            onClick={onClickUnLike}
          >
            <FavoriteBorderIcon />
            {likeCount}
          </Button>
          ) : (
          <Button
            title='like?'
            variant='text'
            color='secondary'
            size='large' //can't give pixels. if you want to give pixels use styles
            onClick={onClickLike}
          >
            <FavoriteIcon />
            {likeCount}
          </Button>
          )}
        </CardContent>
        <CardFooter stats>
          <div className={classes.stats}>
            <a onClick={(e) => e.preventDefault()}>Know More about the event</a>
          </div>
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
        </CardFooter>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Grid container className={classes.grid}>
            <Grid item className={classes.gridItem} xs={12} sm={12} md={6}>
              <CardContent>
                <p>
                  Event Description
                  {event.description}
                </p>
              </CardContent>
              <Card chart>
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
                      <ArrowUpward className={classes.upArrowCardCategory} />{' '}
                      55%
                    </span>{' '}
                    increase in today sales.
                  </p>
                </CardBody>
              </Card>
            </Grid>
            <Grid item className={classes.gridItem} xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color='warning'>
                  <ChartistGraph
                    className='ct-chart'
                    data={emailsSubscriptionChart.data}
                    type='Bar'
                    options={emailsSubscriptionChart.options}
                    responsiveOptions={
                      emailsSubscriptionChart.responsiveOptions
                    }
                    listener={emailsSubscriptionChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                  <p className={classes.cardCategory}>
                    Last Campaign Performance
                  </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime />
                    time and date
                    {' ' +
                      event.startDate +
                      (event.endDate !== event.startDate
                        ? ' - ' + event.endDate
                        : '')}
                  </div>
                  <div>
                    <p>
                      venue:
                      {event.location}
                    </p>
                    <p>
                      fee:
                      {event.fee}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </Grid>
          </Grid>
          {!checkRegister && (
          <Button
            variant='contained'
            color='primary'
            className={classes.btn}
            onClick={startRegisterEvent}
          >
            Register
          </Button>
          )}
          {checkRegister && (
          <Button
            variant='contained'
            color='primary'
            className={classes.btn}
            onClick={startUnRegisterEvent}
          >
            Unregister
          </Button>
          )}
        </Collapse>
      </Card>
      {/* <Grid container className={classes.grid}>
        <Grid item className={classes.gridItem} xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </Grid>
        <Grid item className={classes.gridItem} xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </Grid>
      </Grid> */}
    </div>
  )
}
const mapDispatchToProps = (dispatch) => ({
  likeEvent: (eventId) => dispatch(setLikeEvent(eventId)),
  unLikeEvent: (eventId) => dispatch(setUnLikeEvent(eventId)),
  checkLikeEvent: (eventId) => dispatch(setCheckLikeEvent(eventId)),
  registerEvent: (eventId) => dispatch(startRegisterEvent(eventId)),
  unRegisterEvent: (eventId) => dispatch(startUnRegisterEvent(eventId)),
})

const mapStateToProps = (state, props) => ({
  event: state.events.find((event) => event.id === props.eventID),
  userHandle: state.user.userHandle,
  checkLike: state.user.checkLike,
})
export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)