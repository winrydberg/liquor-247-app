import { combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './reducers/productsReducer';
import cartsReducer from './reducers/cartReducer';
import ordersReducer from './reducers/ordersReducer';
import usersReducer from './reducers/userReducer';
import categoriesReducer from './reducers/categoriesReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
  orders: ordersReducer,
  user: usersReducer,
  categories: categoriesReducer
});

const store = configureStore({ reducer: rootReducer })

export default store;