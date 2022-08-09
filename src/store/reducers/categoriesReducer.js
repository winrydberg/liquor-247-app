import {ADD_TO_CATEGORY_SELECTED_PPRODUCTS, SET_CATEGORIES, SET_CATEGORY_PRODUCTS, SET_SELECTED_CATEGORY, SET_SELECTED_CATEGORY_PRODUCTS} from '../types';
const initialState = {
    categories: [],
    category: null
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CATEGORIES:
        return {
          ...state,
          categories: action.payload,
        };

        case SET_SELECTED_CATEGORY:
          return {
            ...state,
            category: action.payload,
          };

        case SET_SELECTED_CATEGORY_PRODUCTS:
            return {
              ...state,
              category: {...state.category, products: action.payload},
            };

        case ADD_TO_CATEGORY_SELECTED_PPRODUCTS:
              return {
                ...state,
                category: {...state.category, products: [...state.category.products, action.products]},
              };

      case SET_CATEGORY_PRODUCTS:
        return {
          ...state,
          categories: state.categories.map(category => {
            if(category.id === action.payload.id){
              return {
                ...category,
                products: [...category.products, action.payload.products]}
            }else{
              return {
                ...category,
                products: category.products
              };
            }
          })
        }
      default:
        return state;
    }
  };

export default categoriesReducer;