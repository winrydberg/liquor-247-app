import AsyncStorage from '@react-native-async-storage/async-storage';
import { storekeys } from '../constants/constants';

export const storeOderNos = async(value) => {
    try {
        await AsyncStorage.setItem('@storage_Key', JSON.stringify(value));
        return {
            status: 'success',
            message: 'Order Ids saved'
        }
      } catch (e) {
        // saving error
        return {
            status: 'error',
            message: 'Unable to save to store'
        }
      }
}

export const storeUser = async(value) => {
    try {
        await AsyncStorage.setItem(storekeys.userkey, JSON.stringify(value));
        return {
            status: 'success',
            message: 'User data saved to storage'
        }
      } catch (e) {
        // saving error
        return {
            status: 'error',
            message: 'Unable to save to store'
        }
      }
}


export const getuserData = async() => {
    try {
        let user =  JSON.parse(await AsyncStorage.getItem(storekeys.userkey));
        return {
            status: 'success',
            user: user,
            message: 'User data successfully retreived'
        }
      } catch (e) {
        // saving error
        return {
            status: 'error',
            message: 'Unable to get user data'
        }
      }
}

export const storeToken = async(token) => {
  try {
      await AsyncStorage.setItem(storekeys.tokenKey, token);
      return {
          status: 'success',
          message: 'Logged in token successfully'
      }
    } catch (e) {
      // saving error
      return {
          status: 'error',
          message: 'Unable to save to store'
      }
    }
}

export const getLoggedInToken = async() => {
  try {
      let token =  await AsyncStorage.getItem(storekeys.tokenKey);
      return {
          status: 'success',
          token: token,
          message: 'Token successfully retreived'
      }
    } catch (e) {
      // saving error
      return {
          status: 'error',
          message: 'Unable to get user data'
      }
    }
}