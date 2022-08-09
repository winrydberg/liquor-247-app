import {ADD_TO_CART, DECREASE_CART_PRODUCT, INCREASE_CART_PRODUCT, REMOVE_ITEM_FROM_CART, SET_CART, SET_CITIES} from '../types';


export function addToCartRedux(product) {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
}

export function removeItemFromCart(productid) {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: productid,
  };
}

export function incrementCartProduct(id) {
  return {
    type: INCREASE_CART_PRODUCT,
    payload: id,
  };
}

export function decrementCartProduct(id) {
  return {
    type: DECREASE_CART_PRODUCT,
    payload: id,
  };
}

export function setCities(cities) {
  return {
    type: SET_CITIES,
    payload: cities,
  }
}

export function clearCart() {
  return {
    type: SET_CART,
    payload: [],
  }
}