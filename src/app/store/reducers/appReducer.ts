import {ACTION_LOGOUT,ACTION_LOGIN} from '../actions/appActions';
import {Action} from '@ngrx/store';

export interface appReducerState{
    login:boolean,
    user:object
}

const initialState:appReducerState ={
    login:true,
    user:{}
}

export function reducer(state = initialState,action): appReducerState {
    switch(action.type)
    {
        case ACTION_LOGOUT:
        return {
            ...state,
            login:false,
            user:action.payload
        }
        case ACTION_LOGIN:
        return{
            ...state,
            login:true,
            user:action.payload
        }
        default:
        return state;
    }
}