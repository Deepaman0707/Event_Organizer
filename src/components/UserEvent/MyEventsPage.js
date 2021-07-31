import React from 'react'
import UserEventList from './UserEventList'
import UserDetails from './UserDetails'
import ParticleBgSection from '../Wrappers/ParticleBgSection'
const MyBlogsPage = (props) => (
  <div>
    <ParticleBgSection
      component={() => <UserDetails handle={props.match.params.handle} />}
    />
    <UserEventList handle={props.match.params.handle} />
  </div>
)

export default MyBlogsPage
