import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColor, secondaryColor } from '../constants/constants';

export default function Cart() {
  return (
        <View style={{height: 30, width:30, borderColor: secondaryColor, borderWidth: 1, borderRadius: 50, padding: 5, alignItems:'center', justifyContent:'center', backgroundColor:"#FFF",}}>
    <Ionicons name='ios-cart-outline' size={15} color={secondaryColor} />
         </View>
  )
}