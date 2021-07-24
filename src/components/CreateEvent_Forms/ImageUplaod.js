// imports the React Javascript Library
import React from 'react'
//Card
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import { useState } from 'react'

import Fab from '@material-ui/core/Fab'

import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'

//Tabs
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
  cardHeader: {
    textalign: 'center',
    align: 'center',
    backgroundColor: 'white',
  },
  input: {
    display: 'none',
  },
  title: {
    color: blue[800],
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    align: 'center',
  },
  button: {
    color: blue[900],
    margin: 10,
  },
  secondaryButton: {
    color: 'gray',
    margin: 10,
  },
  typography: {
    margin: theme.spacing.unit * 2,
    backgroundColor: 'default',
  },

  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
  searchDivider: {
    width: 1,
    height: 28,
    margin: 4,
  },
})

const ImageUploadCard = (props) => {
 
  const { classes, theme } = props

  const [upload, setUpload] = React.useState(false)
  const [image, setImage] = React.useState(null)
  const [count, setCount] = React.useState(0)

  const handleUploadClick = (event) => {
    console.log()
    var file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = function (e) {
      setImage([reader.result])
     
    }.bind(this)
    setUpload(true)
    setImage(event.target.files[0])
    setCount(1)
   
  }
  const imageResetHandler = (event) => {
    setUpload(false)
    setImage(null)
    setCount(0)
    console.log('Click!')
    
  }

  const renderInitialState = () => {
    const { classes, theme } = props

    return (
      <div>
        <input
          accept='image/*'
          className={classes.input}
          id='contained-button-file'
          multiple
          value={props.data.image}
          type='file'
          onChange={handleUploadClick}
        />
        <label htmlFor='contained-button-file'>
          <Fab component='span' className={classes.button}>
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
            className={classes.media}
            src={image}
          />
        </CardActionArea>
        <div>
          <input
            accept='image/*'
            className={classes.input}
            id='contained-button-file'
            multiple
            type='file'
            onChange={handleUploadClick}
          />
          <label htmlFor='contained-button-file'>
            <Fab component='span' className={classes.button}>
              <AddPhotoAlternateIcon />
            </Fab>
          </label>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      {(upload === false && renderInitialState()) ||
        (upload === true && renderUploadedState())}
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard)