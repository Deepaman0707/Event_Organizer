import React from 'react'
import UserEventList from './UserEventList'
import { makeStyles } from '@material-ui/core/styles'

import Popup from "../Wrappers/Popup";
import AddEventForm from "../CreateEventForm/AddEventForm";

import ParticleBgSection from '../Wrappers/ParticleBgSection'

// const useStyles = makeStyles((theme) => ({
// }))

const UserEventDashboard = () => {
//   const classes = useStyles()
const [open, setOpen] = React.useState(false);

const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

  return (
    <React.Fragment>
      <ParticleBgSection title={'My Events'} />
      <UserEventList handleOpen={handleOpen} open={open}/>
      <Popup open={open} handleClose={handleClose} componenet={AddEventForm}/>
    </React.Fragment>
  )
}

export default UserEventDashboard