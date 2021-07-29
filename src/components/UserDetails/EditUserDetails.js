import React, { useState } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { startAddUserDetails, startAddUserImage } from './../../actions/user'
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    top: 0,
    marginBottom: '10px',
  },
  handle: {
    padding: '25px',
  },
  textBtn: {
    fontSize: '10px',
  },
  btn: {
    width: '100px',
    margin: '25px',
  },
}))

export const EditUserDetails = ({ user, addUserDetails, addUserImage }) => {
  const classes = useStyles()

  const [name, setName] = useState(user.name)
  const [college, setCollege] = useState(user.college)
  const [year, setYear] = useState(user.year)
  const [contact_no, setContact] = useState(user.contact_no)
  const [imageUrl, setImageUrl] = useState(user.imageUrl)
  const onSubmit = (e) => {
    e.preventDefault()
    const details = {
      name,
      college,
      year: year.toString(),
      contact_no,
    }
    console.log(details)
    addUserDetails(details)
  }
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageChange')
    fileInput.click()
  }

  const onImageChange = (e) => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    addUserImage(formData).then((data) => setImageUrl(data))
  }
  return (
    <Card elevation={0}>
      <CardContent>
        <CardMedia
          className={classes.media}
          image={imageUrl || user.imageURL}
        ></CardMedia>
        <input
          type='file'
          hidden='hidden'
          name='imageUrl'
          id='imageChange'
          onChange={onImageChange}
        />
        <Button variant='contained' color='primary' onClick={handleEditPicture}>
          <p className={classes.textBtn}>CHANGE IMAGE</p>
        </Button>
        <form onSubmit={onSubmit}>
          <Typography
            className={classes.handle}
            variant='h5'
            color='textSecondary'
            component='p'
          >
            {user.handle}
          </Typography>
          <TextField
            id='username'
            label='Name'
            name='name'
            variant='outlined'
            value={name || user.name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            id='usercollege'
            label='College'
            variant='outlined'
            name='college'
            value={college || user.college}
            onChange={(e) => setCollege(e.target.value)}
            fullWidth
          />
          <TextField
            type='number'
            id='year'
            label='Year'
            variant='outlined'
            name='year'
            value={year || user.year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
          />
          <TextField
            type='text'
            id='contact'
            label='Contact No'
            variant='outlined'
            name='contact_no'
            value={contact_no || user.contact_no}
            onChange={(e) => setContact(e.target.value)}
            fullWidth
          />

          <Button
            className={classes.btn}
            type='submit'
            variant='contained'
            color='primary'
          >
            <p className={classes.textBtn}>SUBMIT</p>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
})

const mapDispatchToProps = (dispatch) => ({
  addUserDetails: (details) => dispatch(startAddUserDetails(details)),
  addUserImage: (formData) => dispatch(startAddUserImage(formData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUserDetails)
