import {SET_NEW_ARRIVALS, SET_POPULAR_PRODUCTS, SET_PRODUCTS, SET_PRODUCTS_LOADED, SET_SEARCH_RESULTS, SET_SLIDER_PRODUCTS} from '../types';

export function setProducts(products) {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
}

export function setNewArrivals(products) {
  return {
    type: SET_NEW_ARRIVALS,
    payload: products,
  };
}

export function setPopular(products) {
  return {
    type: SET_POPULAR_PRODUCTS,
    payload: products,
  };
}

export function setSliderProducts(products) {
  return {
    type: SET_SLIDER_PRODUCTS,
    payload: products,
  };
}

export function setProductsLoaded(isloaded) {
  return {
    type: SET_PRODUCTS_LOADED,
    payload: isloaded,
  };
}

export function setSearchResults(products, term) {
  return {
    type: SET_SEARCH_RESULTS,
    payload: {
      products: products,
      term: term
    },
  };
}