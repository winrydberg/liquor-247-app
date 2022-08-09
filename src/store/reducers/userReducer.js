import {SET_TOKEN, SET_USER} from '../types';
const initialState = {
    user: null,
    token: null
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          user: action.payload,
        };

      case SET_TOKEN:
        return {
          ...state,
          token: action.payload,
       };
       
      default:
        return state;
    }
  };
  export default usersReducer;