import axios from 'axios'
import axiosRetry from 'axios-retry'

const EventData = axios.create({
  baseURL:
    'https://mighty-anchorage-45416.herokuapp.com/events',
  timeout: 5000,
})

axiosRetry(EventData, { retries: 3 })

export default EventData
