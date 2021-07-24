import React, { useState, useEffect } from 'react'
import { DateRangePicker, SingleDatePicker } from 'react-dates'
import moment from 'moment'
import 'react-dates/initialize'
import TimePicker from 'rc-time-picker'
import { InputBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  inputBase: {
    border: '1px solid white',
    borderRadius: theme.shape.borderRadius,
    height: '6vh',
    width: '40vw',
    padding: theme.spacing(2),
    backgroundColor: '#62666e',
    color: 'white',
    fontSize: 'larger',
    marginBottom: '10px',
  },
  venue: {},
}))

const EventForm = (props) => {
  const [eventName, onEventNameChange] = useState(
    props.event ? props.event.eventName : ''
  )
  const [description, onDescriptionChange] = useState(
    props.event ? props.event.description : ''
  )
  const [imageUrl, onImageUrlChange] = useState(
    props.event ? props.event.imageUrl : ''
  )
  const [startDate, onStartDateChange] = useState(
    props.event ? moment(props.event.startDate, 'LL') : moment()
  )
  const [endDate, onEndDateChange] = useState(
    props.event ? moment(props.event.endDate, 'LL') : moment()
  )
  const [startTime, onStartTimeChange] = useState(
    props.event ? moment(props.event.startTime, 'LT') : moment()
  )
  const [endTime, onEndTimeChange] = useState(
    props.event ? moment(props.event.endTime, 'LT') : moment()
  )
  const [location, onLocationChange] = useState(
    props.event ? props.event.location : ''
  )
  const [fee, onFeeChange] = useState(
    props.event ? props.event.fee : '')
  const [focusedInput, onFocusedInputChange] = useState(null)
  const [calendarFocused, onCalendarFocusedChange] = useState(false)
  const [error, onErrorChange] = useState('')
  const [toggle, toggler] = useState(false)
  const [image, onImage] = useState()
  const [multiDayEvent, onMultiDayEventChange] = useState('')
  const formData = new FormData()

  const onTitleChange = (e) => {
    onEventNameChange(e.target.value)
  }

  const handleLocationChange = (e) => {
    onLocationChange(e.target.value)
  }
  const handleFeeChange = (e) => {
    const fees = e.target.value
    if (!fees || fees.match(/^\d{1,}(\.\d{0,2})?$/)) {
      onFeeChange(fees)
    }
  }

  const handleDescriptionChange = (e) => {
    const description = e.target.value
    onDescriptionChange(description)
  }

  const handleStartTimeChange = (startTime) => {
    onStartTimeChange(startTime)
    console.log(startTime)
  }

  const handleEndTimeChange = (endTime) => {
    onEndTimeChange(endTime)
    console.log(endTime)
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageChange')
    fileInput.click()
  }
  const onImageChange = (e) => {
    onImage(e.target.files[0])
    const url = URL.createObjectURL(e.target.files[0])
    onImageUrlChange(url)
    console.log(!!image)
  }

  //for DateRangePicker
  // const handleDatesChange = ({ startDate, endDate }) => {
  //   onStartDateChange(startDate)
  //   onEndDateChange(endDate)
  // }

  // const handleMultiFocusChange = (focusedInput) => {
  //   onFocusedInputChange(focusedInput)
  // }

  const handleStartDateChange = (startDate) => {
    onStartDateChange(startDate)
  }
  const handleEndDateChange = (endDate) => {
    onEndDateChange(endDate)
  }

  // for singleDatePicker
  // const handleDateChange = (startDate) => {
  //   onStartDateChange(startDate)
  //   onEndDateChange(startDate)
  // }

  const handleFocusChange = ({ focused }) => {
    onCalendarFocusedChange(focused)
  }

  // const isMultiDayEvent = () => {
  //   onMultiDayEventChange(!multiDayEvent)
  // }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!eventName) {
      onErrorChange('Please provide the Event name.')
    } else if (!description) {
      onErrorChange('Please provide the description.')
    } else if (!location) {
      onErrorChange('Please provide the venue.')
    } else if (!fee) {
      onErrorChange('Please provide the fee.')
    } else {
      onErrorChange('')
      const check = {
        eventName,
        description,
        startDate: startDate.format('LL'),
        endDate: endDate.format('LL'),
        startTime: startTime.format('LT'),
        endTime: endTime.format('LT'),
        fee,
        location,
      }
      formData.append('eventName', eventName)
      formData.append('description', description)
      formData.append('startDate', startDate.format('LL'))
      formData.append('endDate', endDate.format('LL'))
      formData.append('startTime', startTime.format('LT'))
      formData.append('endTime', endTime.format('LT'))
      formData.append('fee', fee)
      formData.append('location', location)
      console.log(!!image)
      !!image && formData.append('image', image, image.name)
      console.log(check)
      props.onSubmit(formData)
    }
  }
  const classes = useStyles()

  return (
    <div className='form'>
      <div className='form-image'>
        {props.event ? (
          <div className='form-image-exist'>
            <img src={imageUrl || props.event.imageUrl} alt='' />
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt='' />
        ) : (
          <img src='images/empty.jpg' alt='' />
        )}
        <input
          type='file'
          hidden='hidden'
          name=''
          id='imageChange'
          onChange={onImageChange}
        />
        <button className='btn third' onClick={handleEditPicture}>
          {props.event ? 'edit image' : 'add image'}
        </button>
      </div>
      <form action='' onSubmit={onSubmit}>
        {error && <p className='form__error'>{error}</p>}
        <div className='form-content__main'>
          {/* <input
              type='text'
              placeholder='Enter the title here'
              className='form-title'
              value={eventName}
              onChange={onTitleChange}
            /> */}
          <div className='title'>
            <InputBase
              id='outlined-secondary'
              placeholder='Title'
              variant='outlined'
              className={classes.inputBase}
              value={eventName}
              onChange={onTitleChange}
            />
          </div>
          {/* <textarea
            placeholder='A description for your event'
            className='form-description'
            value={description}
            onChange={handleDescriptionChange}
          ></textarea> */}
          <InputBase
            id='outlined-secondary'
            placeholder='Description'
            variant='outlined'
            className={classes.inputBase}
            value={description}
            onChange={handleDescriptionChange}
          />
          <div className='form-content__others'>
            <div className='form-content__others-others'>
              {/* <div className='form-venue'> */}
              {/* <label>Venue:</label> */}
              {/* <input
                  type='text'
                  className=''
                  value={location}
                  onChange={handleLocationChange}
                /> */}
              <InputBase
                id='outlined-secondary'
                placeholder='Venue'
                variant='outlined'
                className={classes.inputBase}
                value={location}
                onChange={handleLocationChange}
              />
              {/* </div> */}
              {/* <div className='form-fees'> */}
              {/* <label>Fees:</label> */}
              <div className='form-fees__icon'>
                {/* <input type='text' value={fee} onChange={handleFeeChange} /> */}
                {/* <FontAwesomeIcon className="icon" icon={faRupeeSign} /> */}
              </div>
              {/* </div> */}
              <InputBase
                id='outlined-secondary'
                placeholder='Fees'
                variant='outlined'
                className={classes.inputBase}
                value={fee}
                onChange={handleFeeChange}
              />
              <div className='form-time'>
                <label>Time:</label>
                <TimePicker
                  onChange={handleStartTimeChange}
                  showSecond={false}
                  format={'h:mm a'}
                  use12Hours
                  inputReadOnly
                  value={startTime ? startTime : moment()}
                />
                <label className='to'>to</label>
                <TimePicker
                  onChange={handleEndTimeChange}
                  showSecond={false}
                  format={'h:mm a'}
                  use12Hours
                  inputReadOnly
                  value={endTime ? endTime : moment()}
                />
                {/* <KeyboardTimePicker
                  margin='normal'
                  id='time-picker'
                  label='Time picker'
                  value={endTime ? endTime : moment()}
                  onChange={handleEndTimeChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time'
                  }}
                /> */}
              </div>
            </div>
            <div className='form-content__checkbox'>
              {/* <div>
                <input type='checkbox' onClick={isMultiDayEvent} />
                <label>Multi-day Event?</label>
              </div> */}
              <div className='form-content__checkbox-calendar'>
                {/* // <DateRangePicker
                  //   startDate={startDate}
                  //   startDateId='datepicker_start_home'
                  //   endDate={endDate}
                  //   endDateId='datepicker_end_home'
                  //   onDatesChange={handleDatesChange}
                  //   focusedInput={focusedInput}
                  //   onFocusChange={handleMultiFocusChange}
                  //   numberOfMonths={1}
                  //   displayFormat={() => 'DD/MM/YYYY'}
                  //   isOutsideRange={() => false}
                  // /> */}

                <InputBase
                  id='outlined-secondary'
                  type='date'
                  placeholder='Title'
                  variant='outlined'
                  className={classes.inputBase}
                  startDate={startDate}
                  startDateId='datepicker_start_home'
                  onDatesChange={handleStartDateChange}
                  // focusedInput={focusedInput}
                  onFocusChange={handleFocusChange}
                  numberOfMonths={1}
                  // displayFormat={() => 'DD/MM/YYYY'}
                  isOutsideRange={() => false}
                />

                {/* // <SingleDatePicker
                  //   date={startDate}
                  //   onDateChange={handleDateChange}
                  //   focused={calendarFocused}
                  //   onFocusChange={handleFocusChange}
                  //   numberOfMonths={1}
                  //   displayFormat={() => 'DD/MM/YYYY'}
                  //   isOutsideRange={() => false}
                  // /> */}

                <InputBase
                  id='outlined-secondary'
                  type='date'
                  placeholder='Title'
                  variant='outlined'
                  className={classes.inputBase}
                  endDate={endDate}
                  endDateId='datepicker_end_home'
                  onDateChange={handleEndDateChange}
                  // focused={calendarFocused}
                  onFocusChange={handleFocusChange}
                  numberOfMonths={1}
                  // displayFormat={() => 'DD/MM/YYYY'}
                  isOutsideRange={() => false}
                />
              </div>
            </div>
          </div>
          <button type='submit' className='button button-primary button-submit'>
            Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default EventForm
