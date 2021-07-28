import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import EventListItem from "../HomePage/EventListItem";
import { startGetUserEvents } from "../../actions/user";

import { Button, ImageList } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Tilt from "react-tilt";

const useStyles = makeStyles((theme) => ({
  grid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  imageList: {
    transform: "translateZ(0)",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const events = [
  {
    id: 1,
    eventName: 'abc',
    imageUrl: "https://source.unsplash.com/random",
  },
  {
    id: 2,
    eventName: 'abc',
    imageUrl: "https://source.unsplash.com/random",
  },
  {
    id: 3,
    eventName: 'abc',
    imageUrl: "https://source.unsplash.com/random",
  },
  {
    id: 4,
    eventName: 'abc',
    imageUrl: "https://source.unsplash.com/random",
  },
  {
    id: 5,
    eventName: 'abc',
    imageUrl: "https://source.unsplash.com/random",
  },
]

export const UserEventList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getUserEvents(props.handle || props.userHandle);
  }, []);
  return (
    <>
      <Container className={classes.grid}>
        <ImageList
          rowHeight={200}
          gap={1}
          className={classes.imageList}
          cols={3}
        >
      {props.events.length === 0 ? (
        <Button variant="contained" color="primary" onClick={props.handleOpen}>
          No Events? Want To Organise One?
        </Button>
      ) : (
        // <Container className={classes.grid}>
        //   <ImageList
        //     rowHeight={200}
        //     gap={1}
        //     className={classes.imageList}
        //     cols={3}
        //   >
            // {() =>
            props.events.map((event) => {
                // console.log('Hello');
                return (
                  <Grid item key={event.id} xs={6} sm={6} md={4}>
                    <Tilt>
                      <ButtonBase
                        focusRipple
                        key={event.eventName}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                          width: "100%",
                        }}
                        onClick={props.handleOpen}
                      >
                        <span
                          className={classes.imageSrc}
                          style={{
                            backgroundImage: `url(${event.imageUrl})`,
                          }}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                          <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                          >
                            {event.eventName}
                            <span className={classes.imageMarked} />
                          </Typography>
                        </span>
                      </ButtonBase>
                    </Tilt>
                  </Grid>
                );
              })
            // }
          /* </ImageList>
        // </Container> */
      )}
      </ImageList>
      </Container>
    </>
  );
};
{
  /* <EventListItem key={event.id} {...event} /> */
}
const mapStateToProps = (state) => ({
  userHandle: state.user.userHandle,
  events: state.user.userEvents ? state.user.userEvents : [],
});

const mapDispatchToProps = (dispatch) => ({
  getUserEvents: (userHandle) => dispatch(startGetUserEvents(userHandle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEventList);