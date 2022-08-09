/**
 * @format
 */
import React, {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import store from './src/store';
import FlashMessage from "react-native-flash-message";

const RNRedux = () => {
    useEffect(() => {
     SplashScreen.hide();
  }, [])
  return (
      <Provider store={store}>
      <App />
      <FlashMessage position="bottom" />
    </Provider>
    )
}

AppRegistry.registerComponent(appName, () => RNRedux);
