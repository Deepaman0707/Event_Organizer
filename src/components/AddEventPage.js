import React from 'react'
import EventForm from './EventForm'
import Checkout from './CreateEvent_Forms/Forms.js'
import { connect } from 'react-redux'
import { startAddEvent } from '../actions/events'
import ImageUploadCard from './CreateEvent_Forms/ImageUplaod'
import ModalDialog from './CreateEvent_Forms/Forms.js'

export const AddEventPage = ({ addEvent, history, loading }) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      {loading && <div className='spinner'></div>}
      {/* <EventForm
        onSubmit={(event) => {
          addEvent(event)
          console.log(event.get('image'))
          history.push('/')
        }}
      /> */}
      {/* <Checkout></Checkout> */}
      {/* <Checkout
      // onSubmit={(event) => {
      //   addEvent(event)
      //   console.log(event.get('image'))
      //   history.push('/')
      // }}
      />
      <ImageUploadCard /> */}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: (event) => dispatch(startAddEvent(event)),
  }
}
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
})
export default connect(mapStateToProps, mapDispatchToProps)(AddEventPage)