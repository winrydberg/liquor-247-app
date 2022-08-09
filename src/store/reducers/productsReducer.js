import { longPressHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler';
import {SET_NEW_ARRIVALS, SET_POPULAR_PRODUCTS, SET_PRODUCTS, SET_PRODUCTS_LOADED, SET_SEARCH_RESULTS, SET_SLIDER_PRODUCTS} from '../types';
const initialState = {

    loading: true,
    sliders: [],
    newarrivals: [],
    popular: [],
    products: [],
    searches: [],
    searchTerm: '',
};
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
            ...state,
            products: action.payload,
        };
    case SET_SLIDER_PRODUCTS:
      return {
            ...state,
            sliders: action.payload,
        };
      
    case SET_NEW_ARRIVALS:
        return {
            ...state,
            newarrivals: action.payload,
        }; 

    case SET_PRODUCTS_LOADED:
        return {
            ...state,
            loading: action.payload,
        }; 

    case SET_POPULAR_PRODUCTS:
        return {
            ...state,
            popular: action.payload,
        };

    case SET_SEARCH_RESULTS:
        return {
            ...state,
            searches: action.payload.products,
            searchTerm: action.payload.term
        };

    default:
      return state;
  }
};
export default productsReducer;