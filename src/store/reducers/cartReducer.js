import produce from "immer"
import { ADD_TO_CART, DECREASE_CART_PRODUCT, INCREASE_CART_PRODUCT, REMOVE_ITEM_FROM_CART, SET_CART, SET_CITIES} from '../types';
const INITIAL_STATE  = {
  carts: [],
  cartcount: 0,
  totalAmount: 0,
  cities: []
}



const cartsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          ...state,
          carts: [...state.carts, action.payload],
        };
      
      case REMOVE_ITEM_FROM_CART:
        return {
          carts: [
            ...state.carts.filter(item => item.id !== action.payload)
          ]
        }
      
      case INCREASE_CART_PRODUCT:
        return {
          ...state,
          carts: state.carts.map(product => {
            if (product.id === action.payload) {
              return {...product, total: product.total + 1}
            };
            return product;
          })
        }
        
      case DECREASE_CART_PRODUCT: 
        return {
          ...state,
          carts: state.carts.map(product => {
            if (product.id === action.payload) {
              return {...product, total: product.total - 1}
            };
            return product;
          })
        }

      case SET_CITIES:
        return {
            ...state,
            cities: action.payload,
        };

      case SET_CART:
        return {
            ...state,
            carts: [],
        };

        
      default:
        return state;
  }

  };
  export default cartsReducer;