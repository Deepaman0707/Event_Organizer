import React from "react";
import { connect } from "react-redux";
import EventListItem from "./EventListItem";
import selectEvents from "./../../selectors/events";
import Link from "react-router-dom/Link";

import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Tilt from "react-tilt";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  grid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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

export const EventList = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.grid} maxWidth="md">
      <Grid container spacing={1}>
        {props.events.length === 0 ? (
          <p>No Events</p>
        ) : (
          props.events.map((event) => {
            return (
              <Grid item key={event.id} xs={12} sm={6} md={4}>
                <Tilt>
                  <Link
                    className="list-card__body-title"
                    to={`/event/${event.id || event.eventId}`}
                  >
                    <ButtonBase
                      focusRipple
                      key={event.eventName}
                      className={classes.image}
                      focusVisibleClassName={classes.focusVisible}
                      style={{
                        width: "100%",
                      }}
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
                  </Link>
                </Tilt>
              </Grid>
            );
          })
        )}
      </Grid>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  events: selectEvents(state.events, state.filters),
  // userImage: state.user.user ? state.auth.user.imageUrl: ''
});

export default connect(mapStateToProps)(EventList);
