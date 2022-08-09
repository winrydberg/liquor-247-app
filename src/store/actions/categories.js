import { ADD_TO_CATEGORY_SELECTED_PPRODUCTS, SET_CATEGORIES, SET_CATEGORY_PRODUCTS, SET_SELECTED_CATEGORY, SET_SELECTED_CATEGORY_PRODUCTS } from "../types";

export function setCategories(categories) {
    return {
      type: SET_CATEGORIES,
      payload: categories,
    };
}

export function setSelectedCategory(category) {
  return {
    type: SET_SELECTED_CATEGORY,
    payload: category,
  };
}

export function setSelectedCategoryProducts(products) {
  return {
    type: SET_SELECTED_CATEGORY_PRODUCTS,
    payload: products,
  };
}

export function addToSelectedCategoryProducts(products) {
  return {
    type: ADD_TO_CATEGORY_SELECTED_PPRODUCTS,
    payload: products,
  };
}

export function setCategoryProducts(details) {
  return {
    type: SET_CATEGORY_PRODUCTS,
    payload: {
      id: details.categoryid,
      products: details.products
    },
  };
}