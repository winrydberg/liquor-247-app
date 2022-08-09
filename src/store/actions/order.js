import { ADD_ORDER, SET_NEW_ORDER_LANDMARK, SET_NEW_ORDER_PHONENO, SET_NEW_ORDER_USERNAME, SET_ORDERS } from "../types";

export function setOrders(orders) {
    return {
      type: SET_ORDERS,
      payload: orders,
    };
  }

export function addOrder(order) {
    return {
      type: ADD_ORDER,
      payload: order,
    };
  }

export function setNewOrderUsername(name) {
    return {
      type: SET_NEW_ORDER_USERNAME,
      payload: name,
    };
  }

export function setNewOrderPhoneNo(phoneno) {
    return {
      type: SET_NEW_ORDER_PHONENO,
      payload: phoneno,
    };
  }

export function setNewOrderCity(phoneno) {
    return {
      type: SET_NEW_ORDER_PHONENO,
      payload: phoneno,
    };
}

export function setNewOrderLandmark(landmark) {
    return {
      type: SET_NEW_ORDER_LANDMARK,
      payload: landmark,
    };
  }

export function setNewOrderLongitude(long) {
    return {
      type: SET_NEW_ORDER_LANDMARK,
      payload: long,
    };
  }


export function setNewOrderLatitude(lat) {
    return {
      type: SET_NEW_ORDER_LANDMARK,
      payload: lat,
    };
  }