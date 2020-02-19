import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostReducer from './PostReducer';


export default combineReducers ({

    auth: AuthReducer, //<-- Key Auth is peace of state produced from AuthReducer
    post: PostReducer

});

