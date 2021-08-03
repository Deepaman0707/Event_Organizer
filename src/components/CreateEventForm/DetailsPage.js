import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { Clear } from "@material-ui/icons";
import { Card, CardMedia } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";

import defaultImage from "../../assets/empty.jpg";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop: '30',
    marginBottom: '50px'
  },
  card: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(4),
    },
  },
  reset: {
    margin: 0,
    left: '53%',
    top: '57%',
    position: 'absolute',
  },
  fab: {
    top:'57%',
    margin: 0,
    left: '40%',
    position: 'absolute',
  },
}))

const DetailsPage = (props) => {
  const classes = useStyles();
  const [count, setCount] = React.useState(0);
  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      var image = {
        name: "imageURL",
        value: [reader.result],
      };
      props.handleImage(image);
    }.bind(this);

    var v = {
      name: "imageURL",
      value: event.target.files[0],
    };
    props.handleImage(v);
    setCount(1);
  };

  const imageResetHandler = (event) => {
    setCount(0);

    var v = {
      name: "imageURL",
      value: defaultImage,
    };
    props.handleImage(v);
  };

  return (
    <div>
      <Card elevation={0} className={classes.card}>
        <Fab
          size="small"
          className={classes.reset}
          component="span"
          onClick={imageResetHandler}
          aria-label="add"
        >
          <Clear />
        </Fab>
        <CardMedia
          className={classes.media}
          image={props.data.imageURL}
          title={props.data.title}
        >
        </CardMedia>
        <label htmlFor="upload-photo">
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={handleUploadClick}
          />
          <Fab
            size="small"
            className={classes.fab}
            component="span"
            aria-label="add"
          >
            <AddPhotoAlternateIcon />
          </Fab>
        </label>
      </Card>
      <TextField
        required
        id="title"
        label="Title"
        variant="outlined"
        name="title"
        value={props.data.title}
        onChange={(e) => {
          props.handleChange(e);
        }}
        fullWidth
      />
      <TextField
        required
        id="description"
        label="Description"
        variant="outlined"
        name="description"
        value={props.data.description}
        onChange={(e) => {
          props.handleChange(e);
        }}
        fullWidth
      />
    </div>
  );
};

export default DetailsPage;
