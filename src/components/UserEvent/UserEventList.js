import React, { useEffect, useState } from 'react'
import { ImageList } from '@material-ui/core'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Tilt from 'react-tilt'
import { useDispatch } from 'react-redux'
import EventData from '../../apis/EventData'
import Music from '../../assets/Music.jpg'
import Arts_and_Craft from '../../assets/Arts_and_Craft.jpg'
import Esports from '../../assets/E-sports.jpg'
import Sports from '../../assets/Sports.jpg'
import Dance from '../../assets/Dance.jpg'
const useStyles = makeStyles((theme) => ({
  grid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  imageList: {
    transform: 'translateZ(0)',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}))

export const UserEventList = ({ handleOpen, userid }) => {
  const classes = useStyles()
  const [events, setEvents] = useState([])
  const dispatch = useDispatch()
  const setEvent = (e) =>
    dispatch({
      type: 'SET_EVENT',
      payload: e,
    })

  useEffect(() => {
    EventData.get(`/${userid}`).then((response) => {
      setEvents(response.data.data)
    })
  }, [setEvents])
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
    }
  }
  return (
    <>
      <Container className={classes.grid}>
        <ImageList
          rowHeight={200}
          gap={1}
          className={classes.imageList}
          cols={3}
        >
          {events.length === 0 ? (
            <div></div>
          ) : (
            // <Container className={classes.grid}>
            //   <ImageList
            //     rowHeight={200}
            //     gap={1}
            //     className={classes.imageList}
            //     cols={3}
            //   >
            // {() =>
            events.map((event) => {
              // console.log('Hello');
              return (
                <Grid item key={event.id} xs={6} sm={6} md={4}>
                  <Tilt>
                    <ButtonBase
                      focusRipple
                      key={event.event_name}
                      className={classes.image}
                      focusVisibleClassName={classes.focusVisible}
                      style={{
                        width: '100%',
                      }}
                      onClick={() => {
                        handleOpen()
                        setEvent(event)
                      }}
                    >
                      <span
                        className={classes.imageSrc}
                        style={{
                          backgroundImage: `url(${image(event.category)})`,
                        }}
                      />
                      <span className={classes.imageBackdrop} />
                      <span className={classes.imageButton}>
                        <Typography
                          component='span'
                          variant='subtitle1'
                          color='inherit'
                          className={classes.imageTitle}
                        >
                          {event.event_name}
                          <span className={classes.imageMarked} />
                        </Typography>
                      </span>
                    </ButtonBase>
                  </Tilt>
                </Grid>
              )
            })
            // }
            /* </ImageList>
        // </Container> */
          )}
        </ImageList>
      </Container>
    </>
  )
}

export default UserEventList
