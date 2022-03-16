import {AUTH_LOGOUT, AUTH_SUCCESS, WRONG_PAS_EMAIL} from '../actions/actionTypes';

const initialState = {
  token: null,
  authSuccess: true
}


export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case AUTH_SUCCESS:
      return {
        ...state, token: action.token
      }

    case AUTH_LOGOUT:
      return {
        ...state, token: null
      }

    case WRONG_PAS_EMAIL: 
      return {
        ...state, 
        authSuccess: false
      }

    default:
      return state
  }
}