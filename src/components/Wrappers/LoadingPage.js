import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const LoadingPage = ({ loading }) => {
  return (
    <div>
      {loading ? <CircularProgress /> : <div></div>}
      {/* <ClimbingBoxLoader color={color} loading={loading} /> o7 */}
    </div>
  )
}

export default LoadingPage
