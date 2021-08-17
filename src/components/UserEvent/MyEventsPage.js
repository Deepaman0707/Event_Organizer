import React from 'react'
import UserEventList from './UserEventList'
import UserDetails from '../UserDetails/UserDetails'
import ParticleBgSection from '../Wrappers/ParticleBgSection'
import EventCard from '../EventDetails/EventCard'
import Popup from '../Wrappers/Popup'
import { useState } from 'react'

const MyEventPage = (props) => {
  const [open, setOpen] = useState(false)
  const getEventDetails = () => <EventCard />
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <ParticleBgSection
        component={() => <UserDetails userid={props.match.params.userid} />}
      />
      <Popup
        open={open}
        handleClose={handleClose}
        componenet={getEventDetails}
      />
      <UserEventList
        handleOpen={handleOpen}
        userid={props.match.params.userid}
      />
    </div>
  )
}

export default MyEventPage
