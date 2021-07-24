import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import ImageUploadCard from './ImageUplaod'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import CardActionArea from '@material-ui/core/CardActionArea'
import Fab from '@material-ui/core/Fab'

export default function FormPage1(props) {
  const { data } = props

  // const [upload, setUpload] = React.useState(false)
  // const [image, setImage] = React.useState(null)
  const [count, setCount] = React.useState(0)

  const handleUploadClick = (event) => {
    var file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = function (e) {
      var v = {
        name: 'imageURL',
        value: [reader.result],
      }
      props.handleImage(v)
    }.bind(this)
    // setUpload(true)
    var v = {
      name: 'imageURL',
      value: event.target.files[0],
    }
    props.handleImage(v)
    // setImage(event.target.files[0])
    setCount(1)
  }
  const imageResetHandler = (event) => {
    // setUpload(false)
    var v = {
      name: 'imageURL',
      value: 'publicimagesempty.jpg',
    }
    // setImage(null)
    setCount(0)
  }

  const renderInitialState = () => {
    const { classes, theme } = props

    return (
      <div>
        <input
          accept='image/*'
          // className={classes.input}
          id='contained-button-file'
          multiple
          name='imageURL'
          value={props.data.imageURL}
          type='file'
          onChange={handleUploadClick}
        />
        <label htmlFor='contained-button-file'>
          <Fab
            component='span'
            // className={classes.button}
          >
            <AddPhotoAlternateIcon />
          </Fab>
        </label>
      </div>
    )
  }

  const renderUploadedState = () => {
    const { classes, theme } = props
    return (
      <div>
        <CardActionArea onClick={imageResetHandler}>
          <img
            width='100%'
            // className={classes.media}
            src={props.imageURL}
          />
        </CardActionArea>
        <div>
          <input
            accept='image/*'
            // className={classes.input}
            id='contained-button-file'
            multiple
            type='file'
            onChange={handleUploadClick}
          />
          <label htmlFor='contained-button-file'>
            <Fab
              component='span'
              // className={classes.button}
            >
              <AddPhotoAlternateIcon />
            </Fab>
          </label>
        </div>
      </div>
    )
  }

  return (
    <Grid direction='column' container spacing={3}>
      <Grid item xs={12}>
        <div
        // className={classes.root}
        >
          {renderUploadedState}
          {/* {(props.imageURL === null && renderInitialState()) ||
            (props.imageURL != null && renderUploadedState())} */}
        </div>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id='title'
          label='Title'
          variant='outlined'
          name='title'
          value={props.data.title}
          onChange={(e) => {
            props.handleChange(e)
          }}
          fullWidth
          autoComplete='given-name'
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id='description'
          label='Description'
          variant='outlined'
          name='description'
          value={props.data.description}
          onChange={(e) => {
            props.handleChange(e)
          }}
          fullWidth
          autoComplete='family-name'
        />
      </Grid>
    </Grid>
  )
}
