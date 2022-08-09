import {ADD_ORDER, SET_NEW_ORDER_CITY, SET_NEW_ORDER_DETAILS, SET_NEW_ORDER_LANDMARK, SET_NEW_ORDER_LATITUDE, SET_NEW_ORDER_LONGITUDE, SET_NEW_ORDER_PHONENO, SET_NEW_ORDER_USERID, SET_NEW_ORDER_USERNAME, SET_ORDERS} from '../types';
const initialState = {
    orders: [
      
    ],
    localstoreorders: [],
    order: {
      username: null,
      phoneno: null,
      landmark: null,
      longitude: null,
      latitude: null,
      city: null,
    }
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ORDERS:
        return {
          ...state,
          orders: action.payload,
        };
      case ADD_ORDER:
        return {
          ...state,
          orders: [ action.payload, ...state.orders,],
        };

      case SET_NEW_ORDER_USERNAME:
        return {
          ...state,
          order: {
            ...state.order,
            username: action.payload
          },
        };
      case SET_NEW_ORDER_PHONENO:
          return {
            ...state,
            order: {
              ...state.order,
              phoneno: action.payload
            },
          };

      case SET_NEW_ORDER_LANDMARK:
            return {
              ...state,
              order: {
                ...state.order,
                landmark: action.payload
              },
            };

      case SET_NEW_ORDER_CITY:
              return {
                ...state,
                order: {
                  ...state.order,
                  city: action.payload
                },
              };

      case SET_NEW_ORDER_LONGITUDE:
                return {
                  ...state,
                  order: {
                    ...state.order,
                    longitude: action.payload
                  },
                };

      case SET_NEW_ORDER_LATITUDE:
                  return {
                    ...state,
                    order: {
                      ...state.order,
                      latitude: action.payload
                    },
                  };
     
      default:
        return state;
    }
  };
  export default ordersReducer;