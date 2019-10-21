import axios from 'axios';
import {history} from '../routers/AppRouter';

export const checkLikeEvent = (condition) => {
    return {
      type: "CHECK_LIKE_EVENT",
      condition
    };
  }

export const setCheckLikeEvent = (eventId) => {
    return (dispatch) => {
        return axios.get(`${eventId}/checkLike`).then((res) => {
            dispatch(checkLikeEvent(res.data))
            return res.data;
        }).catch(err => {
            if(err.response)
                alert(err.response.data)
            console.log(err)
        })
    }
}

export const getAuthenticatedUser =  (user, notifications,follows) => {
    return{
        type: 'GET_AUTHENTICATED_USER',
        user,
        notifications,
        follows
    };
};
export const startGetAuthenticatedUser =  () => {
    return (dispatch) => {
        return axios.get(`/user/profile`).then(res => {
            dispatch(getAuthenticatedUser(res.data.credentials, res.data.notifications,res.data.follows))
        }).catch(err => console.log(err.response))
    }
};


export const getUserHandle =  (userHandle) => {
    return{
        type: 'GET_USERHANDLE',
        userHandle
    };
};
export const startGetUserHandle =  () => {
    return (dispatch) => {
        return axios.get('/userHandle').then(async res => {
            dispatch(getUserHandle(res.data))
            console.log(res.data);
            await sessionStorage.setItem('userHandle', res.data)
        }).catch(err => console.log(err.response))
    }
};

export const startGetUserDetails =  (userHandle) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_UI'});
        return axios.get(`/user/${userHandle}`).then(({data}) => {
            console.log(data);
            const userData = {
                user: data.user,
                follows: data.follows
            }
            dispatch({type: 'UNLOADING_UI'});
            return userData;
        }).catch(err => console.log(err.response))
    }
};

export const getUserEvents =  (events) => {
    return{
        type: 'GET_USER_EVENTS',
        events
    };
};
export const startGetUserEvents =  (userHandle) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_UI'});
        console.log(123456);
        return axios.get(`/user/${userHandle}`).then(({data}) => {
            console.log(userHandle)
            dispatch(getUserEvents(data.events))
            dispatch({type: 'UNLOADING_UI'});
        }).catch(err => console.log(err.response))
    }
};

export const addUserData = (details) => {
    return {
        type: "ADD_USER_DETAILS",
        details
    };
}

export const startAddUserDetails =  (details) => {
    return (dispatch) => {
        return axios.post(`/user`, details).then(res => {
            dispatch(addUserData(details));
            history.goBack();
        }).catch(err => console.log(err.response))
    }
};

export const addUserImage = (imageUrl) => {
    return {
        type: "ADD_USER_IMAGE",
        imageUrl: imageUrl
    };
}

export const startAddUserImage =  (formData) => {
    return (dispatch) => {
        dispatch({type: 'LOADING_UI'});
        return axios.post(`/user/image`, formData).then(res => {
            dispatch(addUserImage(res.data));
            dispatch({type: 'UNLOADING_UI'});
            return res.data;
            // history.goBack();
        }).catch(err => console.log(err.response))
    }
};