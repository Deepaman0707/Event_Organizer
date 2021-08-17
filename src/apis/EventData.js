import axios from 'axios'
import axiosRetry from 'axios-retry'

const EventData = axios.create({
  baseURL:
    // process.env.NODE_ENV !== 'production'
    //   ? 'http://localhost:7000/api/v1/restaurants'
    //   :
    'http://localhost:5000/events',
  timeout: 5000,
})

axiosRetry(EventData, { retries: 3 })

export default EventData
