import React from 'react'
import EventList from './EventList'
import EventFilters from './EventFilters'
import { Link } from 'react-router-dom'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalDialog from '../components/CreateEvent_Forms/Forms'

// import FamousCard from './FamousCard';
const DashboardPage = () => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <EventFilters />
      <div className='card'>
        <div className='blog-card'>
          <EventList />
        </div>
        <div className='famous-card'>{/* <FamousCard/> */}</div>
        <ModalDialog open={open} handleClose={handleClose} />
        {true && (
          <Link to='/add' className='button-floating'>
            <button className='button-floating' >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
