import React from 'react';
import UserEventList from './UserEventList';
import UserDetails from '../UserDetails/UserDetails';
const MyBlogsPage = (props) => (
    <div className="my-blogs">
        <div className="my-blogs__blogs">
            <UserEventList handle={props.match.params.handle}/>
        </div>
        <div className="my-blogs__user">
            <UserDetails handle={props.match.params.handle}/>
        </div>
    </div>
)

export default MyBlogsPage;