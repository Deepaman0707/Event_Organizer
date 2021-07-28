import React from "react";
import EventFilters from "../HomePage/EventFilters";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ParticlesBg from "particles-bg";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  fab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
}));

const ParticleBgSection = ({ title, page }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div
        className={classes.heroContent}
        style={{ backgroundColor: "transparent", position: "relative" }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {title}
          </Typography>
          {page === "Dashboard" ? (
            <Grid container spacing={2} justifyContent="center">
              <EventFilters />
            </Grid>
          ) : (
            <div></div>
          )}
          <ParticlesBg type="random" bg={true} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ParticleBgSection;
