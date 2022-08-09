import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen/OrdersScreen';
import CartScreen from '../screens/CartScreen/CartScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { secondaryColor } from '../constants/constants';
import AboutScreen from '../screens/About/AboutScreen';
import { useSelector } from 'react-redux';
import ProductDetailsScreen from '../screens/ProductDetails/ProductDetailsScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import CheckoutScreen from '../screens/CheckoutScreen/CheckoutScreen';
import SummaryScreen from '../screens/SummaryScreen/SummaryScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import CategoryDetailsScreen from '../screens/CategoryDetails/CategoryDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {
    const carts = useSelector(state=>state.carts.carts)
    return (
      <Tab.Navigator initialRouteName='Home'  screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#FFF',
          borderRadius: 30,
          height: 50,
          border: 0,
          ...styles.shadow,
        },
      }}> 
        <Tab.Screen name="Home" component={HomeScreen} options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text style={{
              color: focused ? secondaryColor : '#748c94',
              fontSize: 10,
              marginBottom: 5
            }}>Home</Text>
          ),
          tabBarIcon: ({focused}) => (
              <Ionicons
                name="home"
                size={focused?30:20}
                style={{
                  color: focused ? secondaryColor : '#748c94',
                }}
              />
          ),
        }}/>
        <Tab.Screen name="Orders" component={OrdersScreen} options={{
          headerShown:false,
          tabBarLabel: ({focused}) => (
            <Text style={{
              color: focused ? secondaryColor : '#748c94',
              fontSize: 10,
              marginBottom: 5
            }}>My Orders</Text>
          ),
          tabBarIcon: ({focused}) => (
              <Ionicons
                name="list"
                size={focused?30:20}
                style={{
                  color: focused ? secondaryColor : '#748c94',
                }}
              />
          ),
        }}/>
        <Tab.Screen name="Cart" component={CartScreen} options={{
          headerShown:false,
          tabBarLabel: ({focused}) => (
            <Text style={{
              color: focused ? secondaryColor : '#748c94',
              fontSize: 10,
              marginBottom: 5
            }}>Cart</Text>
          ),
          tabBarBadge: carts.length,
          tabBarIcon: ({focused}) => (
              <Ionicons
                name="cart"
                size={focused?30:20}
                style={{
                  color: focused ? secondaryColor : '#748c94',
                }}
              />
          ),
        }} />
        

        <Tab.Screen name="Account" component={AccountScreen} options={{
          headerShown:false,
          tabBarLabel: ({focused}) => (
            <Text style={{
              color: focused ? secondaryColor : '#748c94',
              fontSize: 10,
              marginBottom: 5
            }}>Account</Text>
          ),
          tabBarIcon: ({focused}) => (
              <Ionicons
                name="person-circle"
                size={focused?30: 20}
                style={{
                  color: focused ? secondaryColor : '#748c94',
                }}
              />
          ),
        }}/>
      </Tab.Navigator>
    );
  }

  function AppStack() {
    // const isNewInstall = useSelector(state => state.user.newInstall);
    return (
      <Stack.Navigator initialRouteName={'HomeTabs'}>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerMode: 'screen',
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            headerMode: 'screen',
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        <Stack.Screen
          name="Details"
          component={ProductDetailsScreen}
          options={{
            headerMode: 'screen',
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        <Stack.Screen
          name="CheckOut"
          component={CheckoutScreen}
          options={{
            headerMode: 'screen',
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
          options={{
            headerMode: 'screen',
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerMode: 'screen',
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerMode: 'screen',
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        <Stack.Screen
          name="Category"
          component={CategoryDetailsScreen}
          options={{
            headerMode: 'screen',
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        </Stack.Navigator>
    )
}


const styles = StyleSheet.create({
    shadow: {
      shadowColor: '#7f5DF0',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
  });

// export default HomeTabs;
export default AppStack;