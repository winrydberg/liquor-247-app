import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import FlashMessage from "react-native-flash-message";
import { useSelector } from 'react-redux'
import HomeTabs from './src/Navigations/HomeTabs';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import { primaryColor, secondaryColor } from './src/constants/constants';
import LoadingScreen from './src/screens/LoadingScreen/LoadingScreen';


const newColorTheme = {
  colors: {
      // Add new color
      primary: {
        50: primaryColor,
        100: primaryColor,
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: primaryColor,
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  
  fontConfig: {
    Nunito: {
      100: {
        normal: 'NunitoSans-Regular',
        italic: 'NunitoSans-Italic',
      },
      200: {
        normal: 'NunitoSans-SemiBold',
        italic: 'NunitoSans-Italic',
      },
    },
    Poppins: {
      100: {
        normal: 'Poppins-Medium',
        italic: 'Poppins-MediumItalic',
      },
      200: {
        normal: 'NunitoSans-SemiBold',
        italic: 'Roboto-LightItalic',
      },
      // 300: {
      //   normal: 'Roboto-Light',
      //   italic: 'Roboto-LightItalic',
      // }
    }
  },

  fonts: {
    heading: 'Nunito',
    body: 'Poppins',
    mono: 'Nunito',
  },

};
const theme = extendTheme({ colors: newColorTheme });


const App= ()  => {

  let loading = useSelector(state => state.products.loading);

  const myRenderer = () => {
    if(loading){
      return <LoadingScreen/>
    }else{
      return <HomeTabs/>
    }
  }


  return (
    <NativeBaseProvider theme={theme}>
    <NavigationContainer>
       <SafeAreaProvider>
          
             {myRenderer()}
           
        </SafeAreaProvider>
     </NavigationContainer>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
