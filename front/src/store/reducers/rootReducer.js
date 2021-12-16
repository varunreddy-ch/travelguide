import { combineReducers } from 'redux';
import tovisitReducer from './tovisitReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({ 
    tovisits: tovisitReducer,
    auth: authReducer
})

export default rootReducer;