import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
  card: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(4),
    },
  },
}));

const Review = ({ data }) => {
  const classes = useStyles();

  return (
    <div>
      <Card elevation={0} className={classes.card}>
          <CardMedia
            className={classes.media}
            image={data.imageURL}
            title={data.title}
          />
        </Card>
      <Typography variant="h6" gutterBottom>
        Event Summary
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem} key={data.name}>
          <ListItemText primary={data.title} secondary={data.description} />
          <Typography variant="body2">{data.fee}</Typography>
        </ListItem>
        <ListItem className={classes.listItem} key={data.name}>
          <ListItemText primary={`${data.startDate} TO ${data.endDate}`} secondary={`${data.startTime} TO ${data.endTime}`} />
        </ListItem>
      </List>
    </div>
  );
};

export default Review;
